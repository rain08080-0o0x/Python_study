def best_monster(logs):
    if not logs:
        return None
    totals = {}
    for log in logs:
        name = log["monster"]
        totals[name] = totals.get(name, 0) + log["points"]
    best_score = max(totals.values())
    candidates = [name for name, score in totals.items() if score == best_score]
    return min(candidates)

logs = [
    {"monster": "slime", "points": 5},
    {"monster": "goblin", "points": 7},
    {"monster": "slime", "points": 4},
]
print(best_monster(logs))
