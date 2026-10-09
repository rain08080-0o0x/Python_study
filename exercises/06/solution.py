def count_items(items):
    counts = {}
    for item in items:
        counts[item] = counts.get(item, 0) + 1
    return counts
print(count_items(["石", "薬草", "石"]))
