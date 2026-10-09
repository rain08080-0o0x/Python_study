# dictを利用した集計の小さな復習です。
totals = {}
for name, points in [("スライム", 5), ("ゴブリン", 7), ("スライム", 4)]:
    totals[name] = totals.get(name, 0) + points
print(totals)
