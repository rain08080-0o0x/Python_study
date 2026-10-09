import json
FALLBACK = {"text": "少し待ってから話しかけて。", "action": "talk"}
def ask_turn(message, state, provider):
    return FALLBACK.copy(), state.copy()

def mock(message):
    return '{"text":"東へ進もう","action":"hint"}'
print(ask_turn("ヒント", {"floor": 1, "hints": 0}, mock))
