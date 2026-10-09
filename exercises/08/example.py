def parse_level(text):
    try:
        return int(text)
    except ValueError:
        return 1

print(parse_level("3"))
print(parse_level("abc"))
