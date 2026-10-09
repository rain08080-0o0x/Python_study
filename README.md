# Python Quest

Python未経験から、調べながら実装できる状態を目指す学習サイトです。
スクウェア・エニックスの生成AIゲーム開発ハッカソンに備える自主学習教材として作成しました。
主催企業の公式教材ではありません。選考問題・採点基準・当日の環境は未確認です。

## 最初に確認

- 応募締切: 2026年10月16日23:59（日本時間）
- 開催: 2026年10月31日〜11月2日、3日間
- 応募資格にプログラミング経験とPython利用経験（調べながら実装可能）が含まれます。
- 応募にはプログラミングテストと応募書類の提出が必要です。
- 卒業期間など、その他の条件も公式ページで確認してください。
- 確認日: 2026年10月9日
- 募集要項: https://www.jp.square-enix.com/recruit/fresh/intern/2026/09/018407.html

## GitHub Pagesで公開

1. ZIPを展開する。
2. 展開したフォルダの「中身」をリポジトリ直下へ置く。index.htmlが直下にある構成です。
3. mainブランチへコミットする。
4. Settings → Pages → Build and deployment → Source: Deploy from a branchを選ぶ。
5. Branch: main、Folder: /(root) → Save。
6. 公開完了後、Pagesに表示されたURLを開く。

通常のプロジェクト用リポジトリにも対応しています。すべてのサイト内のファイル参照は相対パスです。
公開設定の可否はGitHubのプランと公開範囲に依存します。
ZIPだけをアップロードしてもサイトは表示されません。npmやビルドは不要です。

公式手順:
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## ローカルで見る

このフォルダで、Windowsなら次を実行します。

```powershell
py -m http.server 8000
```

http://localhost:8000 を開いてください。
pyがなければpythonまたはpython3に読み替えます。
index.htmlの直接ダブルクリックでは本文は読めますが、Python実行欄はfile://では使えません。

## 優先度と学習時間

|優先度|範囲|目安|目的|
|---|---|---|---|
|A|01〜10|18.5時間|文法、型、分岐、ループ、標準入力、リスト、辞書、関数、例外、問題演習|
|B|11〜18|18時間|環境、JSON、クラス、API、AI応答検証、モック、テスト、最終制作|
|C|19〜21|4.5時間|非同期、数値処理、AI技術の整理|
|合計|21講座|41時間|個人差あり。選考通過や応募資格を保証する時間ではありません|

応募前はAを優先し、応募作業を並行します。
10月17日〜30日はBを中心に進め、余った時間を復習と完成課題の確認へ使います。
テスト内容を把握している前提の教材ではありません。

## サイトの機能

- 各講座の解説、実行例、変数と関数の役割、注意点
- ブラウザ内でのPython編集と実行
- 演習ケースの確認、ヒント、模範解答、理解度確認
- 学習済みマークと下書きの端末内保存
- 進捗JSONの書き出しと読み込み
- PCで実行するコードのダウンロード
- スマートフォン・PCに対応するレイアウト

初回のPython実行時にPyodide 0.27.7を
https://cdn.jsdelivr.net/pyodide/v0.27.7/full/
から読み込みます。数十MBの通信が必要です。
CDNへ接続できなくても教材本文と解答は読めます。
読込には90秒、読込後の1回の実行には8秒の上限を設けています。
停止時はWorkerを終了し、次回Pythonを再読込します。
stdout/stderrの表示は20000文字までです。

## ブラウザでの制限

- 基本文法と標準ライブラリの演習を対象にしています。
- 実際のpip・venv・PCのファイル操作・外部HTTP通信はPC側で学びます。
- 変数は実行ごとに初期化します。仮想ファイルは同じWorkerの中で残る場合がありますが、ページ再読込や停止で消えます。
- input()は標準入力欄の行を使います。実行中に追加入力はできません。
- トップレベルawaitはブラウザ欄で使えます。PCではasyncio.runで起動します。
- 進捗はlocalStorageに保存します。端末間同期はなく、データ削除で消えます。
- 端末を移る前に進捗JSONを書き出してください。
- 演習の確認は学習用です。全ケース・全仕様を保証する採点ではありません。
- 外部サービスのAPIキーをコード欄や進捗JSONに保存しないでください。

## ファイル構成

```text
index.html
assets/
  style.css
  course.js
  app.js
  python-worker.js
exercises/
  01/ ... 21/
    TASK.md
    example.py
    starter.py
    solution.py
local_project/
  npc_game.py
  http_adapter.py
  test_npc_game.py
  README.md
.nojekyll
.gitignore
README.md
LICENSE.txt
```

exercisesのコードはPython 3.12以降を想定しています。
講座19のPC用ファイルはasyncio.runで起動する形になっています。
NPC対話のモック版は外部パッケージ不要です。
local_projectのREADMEに環境構築・実行・テストの手順があります。

## 実APIについて

このサイトではAPIキー不要のモックを使います。特定のAIサービスの稼働や接続を検証したものではありません。
http_adapter.pyはPC側の汎用POST例です。サービス固有のURL・認証・ボディ・応答の抽出を実装してから使います。
実際のAI利用経験とモック実装の経験は区別して説明してください。

## 編集

教材の内容はassets/course.jsのwindow.COURSEにあります。
レイアウトはassets/style.css、画面の動作はassets/app.js、Python実行はassets/python-worker.jsです。
GitHub Pages以外へ移す場合も、同じフォルダ構成で静的配信できます。

## 参照資料

- Python公式: https://docs.python.org/ja/3/tutorial/
- Pyodide公式: https://pyodide.org/en/0.27.7/usage/quickstart.html
- GitHub公式: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- 各講座にもテーマ別の一次資料へのリンクがあります。

教材の本文と演習は新規作成したものです。公式サイトの本文を転載したものではありません。

## この版での確認範囲

- 21講座の実行例・ひな形・模範解答（63件）をPythonで実行。
- 模範解答の79ケースをPythonとPyodide 0.27.7の両方で確認。
- PyodideはNode上で同一バージョンの配布を使い、実行Workerのコードを確認。標準入力、エラー、実行ごとの変数初期化も確認。
- NPC対話の8テストをunittestで確認。
- JavaScriptの構文と、DOM上の21講座表示生成、進捗・下書き・回答保存、JSON書き出し、メニューの操作ロジックを確認。
- 実ブラウザの画面表示、スマートフォン実機、CDNからのブラウザ内読み込み、GitHub Pagesの実際の公開は環境の制約で未確認。公開後に01の演習実行とスマートフォン表示を確認してください。
- 実際の生成AI API接続は未実施です。
