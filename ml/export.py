import json
import torch, torch.nn as nn

labels = json.load(open("data/processed/labels.json"))

class Net(nn.Module):
    def __init__(self, n_in, n_out):
        super().__init__()
        self.gru = nn.GRU(n_in, 64, batch_first=True, bidirectional=True)
        self.drop = nn.Dropout(0.3)
        self.fc = nn.Linear(128, n_out)
    def forward(self, x):
        out, _ = self.gru(x)
        return self.fc(self.drop(out.mean(dim=1)))

model = Net(273, len(labels))
model.load_state_dict(torch.load("models/sign_gru.pt"))
model.eval()

torch.onnx.export(model, torch.zeros(1, 48, 273), "models/sign_gru.onnx",
                  input_names=["x"], output_names=["logits"],
                  dynamic_axes={"x": {0: "batch"}}, dynamo=False)

words = {}
for name in labels:
    words[name] = name.rstrip("0123456789")
json.dump({"labels": labels, "word_of": words}, open("models/labels.json", "w"), indent=1)
print("saved models/sign_gru.onnx and models/labels.json")