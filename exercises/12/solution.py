import json
def load_hp(text):
    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        return 100
    if not isinstance(data, dict):
        return 100
    hp = data.get("hp")
    if type(hp) is int and 0 <= hp <= 100:
        return hp
    return 100
print(load_hp('{"hp": 40}'))
