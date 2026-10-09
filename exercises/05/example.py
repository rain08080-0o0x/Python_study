damages = [10, 0, 25, -5]
positive = [d for d in damages if d > 0]
copied = damages.copy()
copied.append(40)
print(positive)
print(damages)
print(copied)
