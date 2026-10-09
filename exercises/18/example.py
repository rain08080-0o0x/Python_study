import json
def provider(message):
    return json.dumps({"text": "壁の印を探して。", "action": "hint"}, ensure_ascii=False)
raw = provider("ヒント")
print(raw)
# 検証と状態更新をつなぐのが今回の演習です。
