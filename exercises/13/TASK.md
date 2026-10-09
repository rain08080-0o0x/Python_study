# 13 クラス・dataclass・型ヒント

状態と振る舞いをまとめ、型ヒントの役割と限界を理解する。

Playerにheal(amount)を実装します。負のamountは0、最大HPは100です。hpは0〜100の整数を前提にします。

## ヒント

self.hpへ再代入します。maxでamountの下限、minでhpの上限を処理します。
