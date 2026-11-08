import json, collections
import numpy as np
import torch, torch.nn as nn

labels = json.load(open("data/processed/labels.json"))
d = np.load("data/processed/test.npz")
X, y = torch.tensor(d["X"]), d["y"]

class Net(nn.Module):
    def __init__(self, n_in, n_out):
        super().__init__()
        self.gru = nn.GRU(n_in, 64, batch_first=True, bidirectional=True)
        self.drop = nn.Dropout(0.3)
        self.fc = nn.Linear(128, n_out)
    def forward(self, x):
        out, _ = self.gru(x)
        return self.fc(self.drop(out.mean(dim=1)))

model = Net(X.shape[2], len(labels))
model.load_state_dict(torch.load("models/sign_gru.pt"))
model.eval()
with torch.no_grad():
    pred = model(X).argmax(1).numpy()

def base(name):
    return name.rstrip("0123456789")

merged = np.mean([base(labels[a]) == base(labels[b]) for a, b in zip(y, pred)])
print(f"exact accuracy: {np.mean(pred == y):.2f}")
print(f"accuracy when variants (EAT1/EAT2...) count as one word: {merged:.2f}")
print()

rows = []
for k, name in enumerate(labels):
    m = y == k
    right = int((pred[m] == k).sum())
    wrong = collections.Counter(labels[p] for p in pred[m] if p != k).most_common(1)
    rows.append((right / m.sum(), name, right, int(m.sum()), wrong[0][0] if wrong else ""))
rows.sort()
print("weakest signs first:")
for acc, name, r, n, w in rows[:12]:
    print(f"  {name}: {r}/{n}   most often confused with: {w}")