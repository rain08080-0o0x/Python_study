hp = 30
if hp <= 0:
    status = "死亡"
elif hp <= 30:
    status = "危険"
else:
    status = "通常"
print(status)
