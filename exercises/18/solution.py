import json
FALLBACK = {"text": "少し待ってから話しかけて。", "action": "talk"}
def validate_reply(raw):
    if not isinstance(raw, str):
        return FALLBACK.copy()
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

def ask_turn(message, state, provider):
    try:
        raw = provider(message)
    except Exception:
        raw = ""
    reply = validate_reply(raw)
    updated = state.copy()
    if reply["action"] == "hint":
        updated["hints"] = updated.get("hints", 0) + 1
    return reply, updated

def mock(message):
    return '{"text":"東へ進もう","action":"hint"}'
print(ask_turn("ヒント", {"floor": 1, "hints": 0}, mock))
