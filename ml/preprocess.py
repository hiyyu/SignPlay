import glob, os, json
import numpy as np

words = [w.strip().upper() for w in open("words.txt") if w.strip()]
POSE_KEEP = [0, 11, 12, 13, 14, 15, 16]    # nose, shoulders, elbows, wrists
N_FRAMES = 48

def process(a):
    T = len(a)
    pts = a.reshape(T, 75, 3)                # 21 left hand, 21 right hand, 33 body
    present = np.abs(pts).sum(axis=2) > 0
    ls, rs = pts[:, 42 + 11], pts[:, 42 + 12]
    ok = present[:, 42 + 11] & present[:, 42 + 12]
    if not ok.any():
        return None
    ctr = np.median(((ls + rs) / 2)[ok], axis=0)
    scale = np.median(np.linalg.norm((ls - rs)[ok], axis=1))
    if scale < 1e-6:
        return None
    pts = (pts - ctr) / scale
    pts[~present] = 0
    keep = list(range(42)) + [42 + i for i in POSE_KEEP]
    pts = pts[:, keep]
    present = present[:, keep]
    hands = []
    for s in (0, 21):
        h = pts[:, s:s + 21]
        local = h - h[:, :1]
        size = np.linalg.norm(h[:, 9] - h[:, 0], axis=1)
        size = np.where(size > 1e-6, size, 1.0)
        local = local / size[:, None, None]
        local[~present[:, s:s + 21]] = 0
        hands.append(local)
    pts = np.concatenate([pts] + hands, axis=1)
    present = np.concatenate([present, present[:, :42]], axis=1)
    
    idx = np.where(present[:, :42].any(axis=1))[0]
    if len(idx) == 0:
        return None
    pts = pts[idx[0]: idx[-1] + 1]
    flat = pts.reshape(len(pts), -1)
    src = np.linspace(0, 1, len(flat))
    dst = np.linspace(0, 1, N_FRAMES)
    return np.stack([np.interp(dst, src, flat[:, j]) for j in range(flat.shape[1])], axis=1)

os.makedirs("data/processed", exist_ok=True)
json.dump(words, open("data/processed/labels.json", "w"))

for split in ["train", "val", "test"]:
    X, y, skipped = [], [], 0
    for f in sorted(glob.glob(f"data/landmarks/{split}/*.npy")):
        word = os.path.basename(f).split("__")[0]
        out = process(np.load(f))
        if out is None:
            skipped += 1
            continue
        X.append(out)
        y.append(words.index(word))
    X = np.array(X, dtype=np.float32)
    y = np.array(y)
    np.savez(f"data/processed/{split}.npz", X=X, y=y)
    print(split, "X shape:", X.shape, "skipped:", skipped)