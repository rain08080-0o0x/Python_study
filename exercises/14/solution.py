def classify_status(status):
    if 200 <= status < 300:
        return "ok"
    if status == 429 or 500 <= status < 600:
        return "retry"
    return "fail"
print(classify_status(429))
