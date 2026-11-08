import sys, zipfile, os
import pandas as pd

z = zipfile.ZipFile(sys.argv[1])
with z.open("ASL_Citizen/splits/train.csv") as f:
    df = pd.read_csv(f)

os.makedirs("preview", exist_ok=True)
for word in ["BATHROOM", "BYE"]:
    for _, r in df[df["Gloss"] == word].head(3).iterrows():
        name = r["Video file"]
        with open(f"preview/{name}", "wb") as out:
            out.write(z.read("ASL_Citizen/videos/" + name))
        print("saved", name)