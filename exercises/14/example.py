import json
payload = {"message": "森への道を教えて", "max_chars": 80}
request = {
    "method": "POST",
    "headers": {"Content-Type": "application/json"},
    "body": json.dumps(payload, ensure_ascii=False),
}
print(request)
