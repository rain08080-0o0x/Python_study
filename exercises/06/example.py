items = ["薬草", "石", "薬草"]
counts = {}
for item in items:
    counts[item] = counts.get(item, 0) + 1
print(counts)
print(sorted(set(items)))
