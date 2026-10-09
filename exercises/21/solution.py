def choose_feature(days_left, has_api):
    if days_left <= 1:
        return "完成と失敗対策"
    return "AI接続" if has_api else "モックでゲーム完成"
print(choose_feature(3, False))
