def parse_level(text):
    try:
        value = int(text)
    except ValueError:
        return 1
    return value if 1 <= value <= 99 else 1
print(parse_level("20"))
