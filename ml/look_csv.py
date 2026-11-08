import sys, zipfile
import pandas as pd

z = zipfile.ZipFile(sys.argv[1])
with z.open("ASL_Citizen/splits/train.csv") as f:
    train = pd.read_csv(f)

print("columns:", train.columns.tolist())
print("rows:", len(train))
print(train.head(5).to_string())
print("number of different signs:", train.iloc[:, -1].nunique())