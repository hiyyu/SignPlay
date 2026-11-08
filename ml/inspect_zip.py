import sys, zipfile

z = zipfile.ZipFile(sys.argv[1])
names = z.namelist()
print("total files:", len(names))
print("first 15:")
for n in names[:15]:
    print("  ", n)
print("csv files:")
for n in names:
    if n.endswith(".csv"):
        print("  ", n)