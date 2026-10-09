enemies = [
    {"name": "ゴーレム", "hp": 80},
    {"name": "スライム", "hp": 10},
    {"name": "コウモリ", "hp": 30},
]
ordered = sorted(enemies, key=lambda enemy: enemy["hp"])
print([enemy["name"] for enemy in ordered])
