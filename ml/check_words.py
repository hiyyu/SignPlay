import sys, zipfile, difflib
import pandas as pd

z = zipfile.ZipFile(sys.argv[1])
with z.open("ASL_Citizen/splits/train.csv") as f:
    train = pd.read_csv(f)

counts = train["Gloss"].value_counts()
glosses = list(counts.index)
path = sys.argv[2] if len(sys.argv) > 2 else "words.txt"
words = [w.strip().upper() for w in open(path) if w.strip()]

found = 0
for w in words:
    if w in counts:
        found += 1
    else:
        close = difflib.get_close_matches(w, glosses, n=5, cutoff=0.5)
        print(f"MISSING {w}: maybe one of {close}")
print(f"{found} of {len(words)} words found")