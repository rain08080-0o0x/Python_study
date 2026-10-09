def clamp_hp(value):
    return max(0, min(100, value))
print(clamp_hp(150))
