def apply_damage(hp, damage):
    return max(0, hp - max(0, damage))
print(apply_damage(20, 8))
