def rank_players(players):
    ordered = sorted(players, key=lambda player: player["score"], reverse=True)
    return [player["name"] for player in ordered]
print(rank_players([{"name": "A", "score": 3}, {"name": "B", "score": 9}]))
