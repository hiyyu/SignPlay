import sys, zipfile, difflib
import pandas as pd

z = zipfile.ZipFile(sys.argv[1])
with z.open("ASL_Citizen/splits/train.csv") as f:
    train = pd.read_csv(f)

counts = train["Gloss"].value_counts()
glosses = list(counts.index)
words = [w.strip().upper() for w in open("words.txt") if w.strip()]

for w in words:
    if w in counts:
        print(f"FOUND   {w}: {counts[w]} training clips")
    else:
        close = difflib.get_close_matches(w, glosses, n=4, cutoff=0.5)
        print(f"MISSING {w}: maybe one of {close}")