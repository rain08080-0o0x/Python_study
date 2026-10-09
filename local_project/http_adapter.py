"""PC側のHTTP接続例。特定のAIサービスの仕様を実装したものではない。"""
from __future__ import annotations

import json
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import Request, urlopen


def post_json(url: str, payload: dict, headers: dict[str, str] | None = None,
              timeout: float = 5.0) -> dict:
    """HTTPSでJSONを送る。応答のサービス固有の変換は呼び出し側の責務。"""
    parsed = urlsplit(url)
    if parsed.scheme != "https" or not parsed.hostname:
        raise ValueError("HTTPSのエンドポイントを指定してください")
    if timeout <= 0:
        raise ValueError("timeoutは正の値が必要です")
    # APIキーが必要な場合は、呼び出し元で環境変数から読み、
    # 対象サービスの仕様に合うヘッダーとして渡します。
    request_headers = {"Content-Type": "application/json", **(headers or {})}
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    request = Request(url, data=body, headers=request_headers, method="POST")
    try:
        with urlopen(request, timeout=timeout) as response:
            # 小さな学習用応答を前提に、読み込みサイズにも上限を置きます。
            raw = response.read(1_000_001)
    except HTTPError as error:
        status = error.code
        error.close()
        raise RuntimeError(f"HTTPエラー: {status}") from None
    except (URLError, TimeoutError, OSError):
        raise RuntimeError("接続失敗またはタイムアウト") from None
    if len(raw) > 1_000_000:
        raise ValueError("応答が大きすぎます")
    data = json.loads(raw.decode("utf-8"))
    if not isinstance(data, dict):
        raise ValueError("JSONオブジェクトが必要です")
    return data


# 実サービスで使う際に追加すること:
# 1. 公式仕様のURL、認証、モデル名、要求ボディを確認する。
# 2. 応答のどのフィールドが生成テキストかを確認する。
# 3. provider(prompt)内でサービス固有の応答からJSON文字列を抽出する。
# 4. npc_game.ask_turnからproviderを渡す。validate_replyを通して反映する。
# 5. 429等の再試行は上限回数と待ち時間を決める。
# urllibのtimeoutはネットワーク操作の待機上限で、
# 処理全体が厳密に同じ秒数で終了する保証ではありません。
