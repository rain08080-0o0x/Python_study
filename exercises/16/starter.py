def apply_action(state, action):
    return state.copy()
print(apply_action({"floor": 1, "hints": 0}, "hint"))
