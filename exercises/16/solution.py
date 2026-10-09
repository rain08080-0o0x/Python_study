def apply_action(state, action):
    updated = state.copy()
    if action == "hint":
        updated["hints"] = updated.get("hints", 0) + 1
    return updated
print(apply_action({"floor": 1, "hints": 0}, "hint"))
