import glob, os
import numpy as np

for split in ["train", "val", "test"]:
    files = glob.glob(f"data/landmarks/{split}/*.npy")
    print(f"\n{split}: {len(files)} files")
    per_word, no_hands = {}, 0
    lengths = []
    for f in files:
        word = os.path.basename(f).split("__")[0]
        per_word[word] = per_word.get(word, 0) + 1
        a = np.load(f)
        lengths.append(len(a))
        if not a[:, :126].any():      # first 126 numbers = both hands
            no_hands += 1
    for w, n in sorted(per_word.items()):
        print(f"    {w}: {n}")
    if lengths:
        print(f"    frames per clip: min {min(lengths)}, max {max(lengths)}, average {sum(lengths)//len(lengths)}")
    print(f"    clips where no hand was ever found: {no_hands}")