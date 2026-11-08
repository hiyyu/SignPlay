import json
import numpy as np
import torch, torch.nn as nn
from sklearn.metrics import confusion_matrix

torch.manual_seed(0)
np.random.seed(0)
labels = json.load(open("data/processed/labels.json"))

def load(s):
    d = np.load(f"data/processed/{s}.npz")
    return torch.tensor(d["X"]), torch.tensor(d["y"], dtype=torch.long)

Xtr, ytr = load("train")
Xva, yva = load("val")
Xte, yte = load("test")

class Net(nn.Module):
    def __init__(self, n_in, n_out):
        super().__init__()
        self.gru = nn.GRU(n_in, 64, batch_first=True, bidirectional=True)
        self.drop = nn.Dropout(0.3)
        self.fc = nn.Linear(128, n_out)
    def forward(self, x):
        out, _ = self.gru(x)
        return self.fc(self.drop(out.mean(dim=1)))

MIRROR_IDX = list(range(21, 42)) + list(range(0, 21)) + [42, 44, 43, 46, 45, 48, 47] + list(range(70, 91)) + list(range(49, 70))

def mirror(x):
    b, t, _ = x.shape
    p = x.reshape(b, t, 91, 3)[:, :, MIRROR_IDX].clone()
    p[..., 0] = -p[..., 0]
    return p.reshape(b, t, -1)

def augment(x):
    b = x.shape[0]
    flip = torch.rand(b) < 0.5
    x = torch.where(flip[:, None, None], mirror(x), x)
    scale = 1 + (torch.rand(b, 1, 1) - 0.5) * 0.2
    keep = (torch.rand(b, x.shape[1], 1) > 0.1).float()
    noise = torch.randn_like(x) * 0.01 * (x != 0).float()
    return x * scale * keep + noise

model = Net(Xtr.shape[2], len(labels))
opt = torch.optim.Adam(model.parameters(), lr=1e-3, weight_decay=1e-4)
loss_fn = nn.CrossEntropyLoss()

def acc(X, y):
    model.eval()
    with torch.no_grad():
        return (model(X).argmax(1) == y).float().mean().item()

best, best_state = -1, None
for epoch in range(1, 151):
    model.train()
    perm = torch.randperm(len(Xtr))
    total = 0
    for i in range(0, len(perm), 16):
        idx = perm[i:i + 16]
        loss = loss_fn(model(augment(Xtr[idx])), ytr[idx])
        opt.zero_grad()
        loss.backward()
        opt.step()
        total += loss.item()
    va = acc(Xva, yva)
    if va >= best:
        best = va
        best_state = {k: v.clone() for k, v in model.state_dict().items()}
    if epoch % 10 == 0:
        print(f"epoch {epoch}: loss {total:.2f}, train acc {acc(Xtr, ytr):.2f}, val acc {va:.2f}")

model.load_state_dict(best_state)
model.eval()
with torch.no_grad():
    logits = model(Xte)
pred = logits.argmax(1)
top3 = logits.topk(3, dim=1).indices
print()
print(f"TEST top-1 accuracy: {(pred == yte).float().mean().item():.2f}")
print(f"TEST top-3 accuracy: {(top3 == yte[:, None]).any(1).float().mean().item():.2f}")
print("labels:", labels)
print("confusion matrix (rows = true sign, columns = predicted):")
print(confusion_matrix(yte.numpy(), pred.numpy(), labels=list(range(len(labels)))))

torch.save(best_state, "models/sign_gru.pt")
print("saved models/sign_gru.pt")