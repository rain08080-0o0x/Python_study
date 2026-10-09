def apply_damage(hp, damage):
    # 計算のみを担当します。
    return max(0, hp - max(0, damage))

hp = apply_damage(20, 8)
print(hp)
