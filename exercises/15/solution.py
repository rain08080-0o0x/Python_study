import json
FALLBACK = {"text": "少し待ってから話しかけて。", "action": "talk"}
def validate_reply(raw):
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        return FALLBACK.copy()
    if not isinstance(data, dict):
        return FALLBACK.copy()
    text, action = data.get("text"), data.get("action")
    if (isinstance(text, str) and text.strip() and len(text) <= 80
            and isinstance(action, str) and action in ("talk", "hint")):
        return {"text": text, "action": action}
    return FALLBACK.copy()
print(validate_reply('{"text":"東へ進もう","action":"hint"}'))
