# 入力例:
# 3
# 10 20 30
# 標準入力欄に 3 と 10 20 30 を2行で入力してください。
n = int(input())
values = list(map(int, input().split()))
total = 0
for value in values[:n]:
    total += value
print(total)
