import json
def mock_provider(message):
    action = "hint" if "ヒント" in message else "talk"
    return json.dumps({"text": "足元をよく見て。", "action": action}, ensure_ascii=False)

def ask(message, provider):
    raw = provider(message)
    return json.loads(raw)  # 本番では講座15の検証を挟みます。

print(ask("ヒントを教えて", mock_provider))
