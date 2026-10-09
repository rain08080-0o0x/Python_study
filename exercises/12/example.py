import json
from pathlib import Path
player = {"name": "探索者", "hp": 80}
path = Path("save.json")
path.write_text(json.dumps(player, ensure_ascii=False), encoding="utf-8")
loaded = json.loads(path.read_text(encoding="utf-8"))
print(loaded["name"], loaded["hp"])
