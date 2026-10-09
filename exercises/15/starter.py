import json
FALLBACK = {"text": "少し待ってから話しかけて。", "action": "talk"}
def validate_reply(raw):
    return FALLBACK.copy()
print(validate_reply('{"text":"東へ進もう","action":"hint"}'))
