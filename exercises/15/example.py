import json
prompt = {
    "role": "塔の案内人",
    "rules": ["80文字以内", "許可行動はtalkかhint", "所持金やHPを変更しない"],
    "state": {"floor": 1},
    "player_input": "次の場所へのヒントが欲しい",
}
print(json.dumps(prompt, ensure_ascii=False, indent=2))
