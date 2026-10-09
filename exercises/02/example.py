name = "探索者"
hp = int("80")
ratio = hp / 100
alive = hp > 0
print(f"{name}: HP {hp} / 生存 {alive}")
print(f"体力割合: {ratio:.0%}")
