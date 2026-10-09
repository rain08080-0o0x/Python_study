def clamp_hp(value):
    return max(0, min(100, value))

assert clamp_hp(-1) == 0
assert clamp_hp(100) == 100
assert clamp_hp(101) == 100
print("境界ケースを確認")
