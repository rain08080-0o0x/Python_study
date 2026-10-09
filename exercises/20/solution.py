def dot(a, b):
    if len(a) != len(b):
        raise ValueError("ベクトルの長さが違います")
    return sum(x * y for x, y in zip(a, b))
print(dot([1, 2, 3], [4, 5, 6]))
