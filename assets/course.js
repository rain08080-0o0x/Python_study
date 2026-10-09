window.COURSE = {
  "lessons": [
    {
      "id": "01",
      "title": "実行の仕組みと最初のプログラム",
      "priority": "A",
      "minutes": 60,
      "goal": "コード・実行結果・エラーを区別し、printで値を確認できる。",
      "sections": [
        {
          "title": "Pythonは何をする言語か",
          "text": "Pythonは、ゲームの補助ツール、データ処理、Webサービス、AIとの通信などに使える汎用言語です。AIだけの言語ではありません。まずは処理を上から順に実行する感覚を身につけます。Pythonの処理系がソースコードを読み、実行します。内部ではバイトコードへの変換も行われるので「コンパイルを全くしない」と覚えないでください。"
        },
        {
          "title": "C++・C#からの切り替え",
          "text": "文の終端にセミコロンは通常書きません。処理のまとまりは中括弧ではなくインデントで表します。小文字・大文字は区別されます。printとPrintは別の名前です。コメントは#から始まり、その行の実行対象にはなりません。"
        },
        {
          "title": "ブラウザと手元のPCの役割",
          "text": "右の実行欄ではPyodideというPython処理系を使います。インストールなしで基本文法と標準ライブラリを試せます。実際の開発では.pyファイルをPCのPythonで動かします。ブラウザはPCの任意のファイルに直接アクセスできません。後半ではこの違いを明示します。"
        },
        {
          "title": "エラーも学習の材料にする",
          "text": "printの閉じ括弧を一つ消して実行してみてください。SyntaxErrorは構文を解釈できないという意味です。まず該当行と周辺の括弧・引用符を見ます。次に元に戻します。実行結果が思った通りになる理由を一文で説明してから演習へ進んでください。"
        }
      ],
      "example": "# 上から順に実行されます。\nprint(\"Pythonでゲーム開発の準備\")\nprint(3 + 4)\n",
      "roles": [
        "printは値を画面の出力へ送る組み込み関数です。",
        "引用符で囲んだ部分は文字列です。3と4は整数です。",
        "この例には保存状態や関数定義はなく、表示だけを担当します。"
      ],
      "pitfall": "全角の括弧や曲がった引用符はコードに使わないでください。Pythonコード欄では半角の()と通常の引用符を使います。",
      "task": "messageに文字列「準備完了」、totalに2+3の結果を代入してください。両方をprintで表示します。",
      "starter": "message = \"\"\ntotal = 0\nprint(message)\nprint(total)\n",
      "solution": "message = \"準備完了\"\ntotal = 2 + 3\nprint(message)\nprint(total)\n",
      "tests": [
        {
          "label": "メッセージ",
          "code": "assert message == \"準備完了\", \"messageを確認\"\n"
        },
        {
          "label": "計算結果",
          "code": "assert total == 5, \"totalを確認\"\n"
        }
      ],
      "hint": "代入は「名前 = 値」です。代入の右側は先に計算されます。",
      "quiz": {
        "question": "Pythonの通常のブロックを表すものは？",
        "options": [
          "中括弧だけ",
          "インデント",
          "セミコロン"
        ],
        "answer": 1,
        "why": "ifや関数などのブロックはインデントで表します。字下げは見た目だけではありません。"
      },
      "references": [
        "https://docs.python.org/ja/3/tutorial/introduction.html"
      ]
    },
    {
      "id": "02",
      "title": "変数・型・演算・文字列",
      "priority": "A",
      "minutes": 90,
      "goal": "int・float・str・bool・Noneを使い分け、型変換と文字列整形を行う。",
      "sections": [
        {
          "title": "変数はオブジェクトにつけた名前",
          "text": "hp = 100は、整数100をhpという名前で参照する処理です。C#のint hpのような型宣言は不要です。Pythonは動的に型を扱いますが、型がなくなるわけではありません。100 + '20'は自動で整数同士にならずTypeErrorになります。type(hp)で実際の型を確認できます。"
        },
        {
          "title": "よく使う五つの値",
          "text": "intは整数、floatは小数、strは文字列、boolはTrueまたはFalseです。Noneは値がない状態を表します。True・False・Noneは先頭が大文字です。Noneの判定にはis Noneを使います。空文字列、0、False、Noneは同じ意味のデータではありません。"
        },
        {
          "title": "割り算と比較を間違えない",
          "text": "/は通常の割り算で5 / 2は2.5、//は切り捨て方向の整数除算で5 // 2は2です。負数では-5 // 2は-3になる点に注意します。%は余り、**は累乗です。代入は=、等しいかの比較は==です。floatには丸め誤差があるので、計算結果の厳密な等価比較を避ける場合があります。"
        },
        {
          "title": "型変換とf文字列",
          "text": "int('12')で文字列を整数に変換できます。変換できない文字列はValueErrorになります。f文字列はfをつけた文字列で、{hp}のように式を埋め込めます。文字列は不変なので、変更処理は新しい文字列を作ります。"
        }
      ],
      "example": "name = \"探索者\"\nhp = int(\"80\")\nratio = hp / 100\nalive = hp > 0\nprint(f\"{name}: HP {hp} / 生存 {alive}\")\nprint(f\"体力割合: {ratio:.0%}\")\n",
      "roles": [
        "nameは表示名、hpは体力です。入力形式と計算用形式を分けています。",
        "ratioは0〜1の割合、aliveは条件判定の結果です。",
        "f文字列内の:.0%は小数点以下0桁の百分率表示です。"
      ],
      "pitfall": "bool('False')はTrueです。空でない文字列をboolに変換しても、その内容の真偽を読んでくれるわけではありません。",
      "task": "price=120、count=3からtotalを計算し、labelに「合計: 360G」を作ってください。",
      "starter": "price = 120\ncount = 3\ntotal = 0\nlabel = \"\"\nprint(label)\n",
      "solution": "price = 120\ncount = 3\ntotal = price * count\nlabel = f\"合計: {total}G\"\nprint(label)\n",
      "tests": [
        {
          "label": "整数の計算",
          "code": "assert total == 360\n"
        },
        {
          "label": "表示文",
          "code": "assert label == \"合計: 360G\"\n"
        },
        {
          "label": "型",
          "code": "assert type(total) is int\n"
        }
      ],
      "hint": "掛け算は*です。f文字列の波括弧には変数名を入れます。",
      "quiz": {
        "question": "int('12') + 3の結果は？",
        "options": [
          "'123'",
          "15",
          "エラー"
        ],
        "answer": 1,
        "why": "文字列をintで整数に変換した後、整数同士の加算になります。"
      },
      "references": [
        "https://docs.python.org/ja/3/tutorial/introduction.html",
        "https://docs.python.org/ja/3/tutorial/inputoutput.html"
      ]
    },
    {
      "id": "03",
      "title": "条件分岐とインデント",
      "priority": "A",
      "minutes": 90,
      "goal": "if・elif・elseと論理演算で、境界を含むゲームの条件を表す。",
      "sections": [
        {
          "title": "条件で処理を分ける",
          "text": "if 条件:の次の行から、4スペース字下げして処理を書きます。続くelifは別の条件、elseはそれまでの条件がどれも成立しない場合です。一連のif・elif・elseでは最初に成立した一つの分岐だけが実行されます。"
        },
        {
          "title": "条件の組み合わせ",
          "text": "andは両方が成立、orは少なくとも一方が成立、notは否定です。C++の&&・||・!ではありません。比較は>=や<=です。0 <= hp <= 100のような連鎖比較も使えます。条件に複数の演算があるときは、括弧で意図を明示して構いません。"
        },
        {
          "title": "境界から仕様を考える",
          "text": "「HPが30以下なら危険」と「HPが30未満なら危険」は異なります。30をどちらに含めるか先に決めてください。0、1、30、31のように、境界そのものと前後で試すと不具合を見つけやすくなります。"
        },
        {
          "title": "独立したifとの違い",
          "text": "ifを二つ書くと両方実行される可能性があります。排他的な状態を選ぶならelifで連結します。死亡状態を先に調べれば、HPが0のとき「危険」より「死亡」を優先できます。"
        }
      ],
      "example": "hp = 25\nif hp <= 0:\n    status = \"死亡\"\nelif hp <= 30:\n    status = \"危険\"\nelse:\n    status = \"通常\"\nprint(status)\n",
      "roles": [
        "hpは判定対象です。statusは判定後の表示用の値です。",
        "条件順序は、死亡を最優先にするという仕様を表します。",
        "代入後のprintを分岐の外に置くことで、全状態で一度だけ表示します。"
      ],
      "pitfall": "タブとスペースを混ぜないでください。字下げを変えると所属するブロックが変わります。",
      "task": "hpからstatusを決めてください。0以下は「死亡」、1〜30は「危険」、31以上は「通常」。演習ではhp=30を使います。",
      "starter": "hp = 30\nstatus = \"\"\n# この下に分岐を書きます。\nprint(status)\n",
      "solution": "hp = 30\nif hp <= 0:\n    status = \"死亡\"\nelif hp <= 30:\n    status = \"危険\"\nelse:\n    status = \"通常\"\nprint(status)\n",
      "tests": [
        {
          "label": "境界30",
          "code": "assert status == \"危険\"\n"
        }
      ],
      "hint": "例のhpを30に変えて試してください。その後0と31でも結果を確認します。",
      "quiz": {
        "question": "hp=0のとき最初に調べるべき条件は？",
        "options": [
          "hp <= 30",
          "hp <= 0",
          "hp > 100"
        ],
        "answer": 1,
        "why": "死亡を優先する仕様なので、より限定された死亡の条件を先に置きます。"
      },
      "references": [
        "https://docs.python.org/ja/3/tutorial/controlflow.html#if-statements"
      ]
    },
    {
      "id": "04",
      "title": "繰り返しと標準入力",
      "priority": "A",
      "minutes": 120,
      "goal": "for・range・whileを扱い、inputの文字列を計算用の値へ変換する。",
      "sections": [
        {
          "title": "forは要素を順に取り出す",
          "text": "for item in items:はコレクションの要素を一つずつ取り出します。C#のforeachに近い使い方です。range(5)は0〜4で、終端の5は含みません。range(1, 6)は1〜5です。enumerateを使えば要素と位置を同時に得られます。"
        },
        {
          "title": "whileは条件が続く間繰り返す",
          "text": "while 条件:は条件がTrueの間実行されます。条件を変える処理を忘れると無限ループになります。breakでループを抜け、continueで次の反復へ進みます。本サイトでは停止ボタンでPython実行環境ごと終了できます。"
        },
        {
          "title": "プログラミングテストへの備え",
          "text": "input()は一行を文字列として受け取ります。n = int(input())で整数にします。複数の数値はinput().split()で空白区切りにし、map(int, ...)で変換します。本サイトの標準入力欄に複数行を用意して実行してください。"
        },
        {
          "title": "読み取りと計算の分離",
          "text": "入力を読む責務と数値を処理する責務は分けて考えます。最初は必要な個数を読み、次にループで集計します。問題文の指定がない説明文をprintすると、出力形式の照合で不一致になる場合があります。実際の選考の出題形式は未確認です。"
        }
      ],
      "example": "# 標準入力欄に 3 と 10 20 30 を2行で入力してください。\nn = int(input())\nvalues = list(map(int, input().split()))\ntotal = 0\nfor value in values[:n]:\n    total += value\nprint(total)\n",
      "roles": [
        "nは使用する値の個数です。valuesは文字列から作った整数のリストです。",
        "totalは反復をまたいで保持する累積値です。",
        "values[:n]は先頭n個です。実務では入力個数が正しいかの検証も考えます。"
      ],
      "pitfall": "rangeの終端は含みません。for i in range(1, 5)は1〜4です。",
      "task": "forとrangeで1〜10を足し、totalに結果を保存してください。sumだけで済ませず、累積の処理を書きます。",
      "starter": "total = 0\n# 1から10を順に足します。\nprint(total)\n",
      "solution": "total = 0\nfor value in range(1, 11):\n    total += value\nprint(total)\n",
      "tests": [
        {
          "label": "1〜10の合計",
          "code": "assert total == 55\n"
        }
      ],
      "hint": "range(1, 11)を使います。total += valueはtotal = total + valueと同じ更新です。",
      "quiz": {
        "question": "input()が返す型は？",
        "options": [
          "int",
          "str",
          "入力内容に応じて変わる"
        ],
        "answer": 1,
        "why": "常に文字列です。数として扱う場合はintなどで明示的に変換します。"
      },
      "references": [
        "https://docs.python.org/ja/3/tutorial/controlflow.html",
        "https://docs.python.org/ja/3/library/functions.html#input"
      ]
    },
    {
      "id": "05",
      "title": "リスト・タプル・参照とコピー",
      "priority": "A",
      "minutes": 120,
      "goal": "listの追加・走査・スライスを使い、同じリストの共有を理解する。",
      "sections": [
        {
          "title": "順序のあるデータ",
          "text": "listは変更できる順序つきコレクションです。[10, 20, 30]の先頭はvalues[0]、最後はvalues[-1]です。appendで末尾へ追加し、lenで個数を取得します。範囲外アクセスはIndexErrorになります。tupleは要素の差し替えができない順序つきコレクションで、座標や複数の戻り値に使えます。"
        },
        {
          "title": "スライスと内包表記",
          "text": "values[1:3]は位置1と2の要素を取り出します。終端3は含みません。リスト内包表記は[式 for 要素 in リスト if 条件]です。短い変換には便利ですが、複雑な条件や副作用を押し込めると読みづらくなります。まず通常のforで書けるようにします。"
        },
        {
          "title": "代入してもコピーにならない",
          "text": "b = aでaがリストの場合、二つの名前が同じリストを参照します。b.appendでaも変わります。a.copy()は外側のリストの浅いコピーです。入れ子の辞書などはまだ共有されます。独立した全体が必要ならcopy.deepcopyを検討します。"
        },
        {
          "title": "繰り返し中の変更に注意",
          "text": "走査しているリストから要素をremoveすると、次の要素を飛ばすことがあります。条件に一致する要素だけを新しいリストに集める方法が分かりやすいです。配列の添字と値を混同しないことも重要です。"
        }
      ],
      "example": "damages = [10, 0, 25, -5]\npositive = [d for d in damages if d > 0]\ncopied = damages.copy()\ncopied.append(40)\nprint(positive)\nprint(damages)\nprint(copied)\n",
      "roles": [
        "damagesは元データです。positiveは正の値だけを持つ新しいリストです。",
        "copiedは外側をコピーしたリストです。元のdamagesへの追加にはなりません。",
        "この例は表示と抽出を担い、体力を変更する処理は含みません。"
      ],
      "pitfall": "[[0]*3]*3は同じ内側のリストを共有します。独立した行なら[[0]*3 for _ in range(3)]です。",
      "task": "valuesから正の数だけを順序を保ってresultへ入れる関数positive_valuesを作ります。元のvaluesは変更しないでください。",
      "starter": "def positive_values(values):\n    return []\nprint(positive_values([10, 0, -2, 7]))\n",
      "solution": "def positive_values(values):\n    return [value for value in values if value > 0]\nprint(positive_values([10, 0, -2, 7]))\n",
      "tests": [
        {
          "label": "正・ゼロ・負数",
          "code": "assert positive_values([10, 0, -2, 7]) == [10, 7]\n"
        },
        {
          "label": "空リスト",
          "code": "assert positive_values([]) == []\n"
        },
        {
          "label": "順序と重複",
          "code": "assert positive_values([2, 1, 2]) == [2, 1, 2]\n"
        },
        {
          "label": "元データ保持",
          "code": "source = [1, -1]\npositive_values(source)\nassert source == [1, -1]\n"
        }
      ],
      "hint": "forで新しいリストにappendしても、内包表記でも構いません。defの詳細は講座07で扱います。",
      "quiz": {
        "question": "b = aの後にb.append(1)を行うと？ aはリストです。",
        "options": [
          "aも変わる",
          "aは変わらない",
          "代入時に自動で深いコピー"
        ],
        "answer": 0,
        "why": "aとbは同じリストを参照します。C#の参照型を代入した場合に近い関係です。"
      },
      "references": [
        "https://docs.python.org/ja/3/tutorial/datastructures.html",
        "https://docs.python.org/ja/3/library/copy.html"
      ]
    },
    {
      "id": "06",
      "title": "辞書・集合・集計",
      "priority": "A",
      "minutes": 120,
      "goal": "dictとsetを使い、名前つきデータ・出現回数・重複除去を扱う。",
      "sections": [
        {
          "title": "辞書で値に名前をつける",
          "text": "dictはキーと値の対応です。{'hp': 100}からplayer['hp']で取得します。存在しないキーはKeyErrorになるので、任意項目ならplayer.get('mp', 0)で既定値を使います。inはキーの存在を調べます。辞書の反復では標準ではキーが出てきます。"
        },
        {
          "title": "キーと値を同時に使う",
          "text": "for key, value in data.items():で組を順に取り出せます。辞書は挿入順を保持しますが、数値の小さい順に並ぶわけではありません。APIのJSONオブジェクトを読み込むと辞書になるため、後半でも頻繁に使います。"
        },
        {
          "title": "集合で重複を扱う",
          "text": "setは重複しない要素を持ちます。順序は仕様として頼らないでください。空の集合はset()です。{}は空の辞書になります。要素や辞書キーにはハッシュ可能な値が必要で、listをそのまま辞書キーにはできません。"
        },
        {
          "title": "頻度表を作る",
          "text": "counts[item] = counts.get(item, 0) + 1で、初登場なら0から数えます。collections.Counterでも集計できますが、まず仕組みを自分で書きます。辞書・集合の検索は平均的には効率的ですが、全処理が必ず定数時間になるわけではありません。"
        }
      ],
      "example": "items = [\"薬草\", \"石\", \"薬草\"]\ncounts = {}\nfor item in items:\n    counts[item] = counts.get(item, 0) + 1\nprint(counts)\nprint(sorted(set(items)))\n",
      "roles": [
        "itemsは取得したアイテムの履歴です。countsはアイテム名から個数への辞書です。",
        "get(item, 0)は未登録の場合の初期値を担当します。",
        "sortedは表示順を安定させるために使っています。set自体の順序には依存しません。"
      ],
      "pitfall": "player.get('hp', 100)はhp=Noneの場合に100を返しません。既定値はキーがない場合にだけ使われます。",
      "task": "count_items(items)で名前ごとの個数を辞書として返してください。空の入力なら空の辞書です。",
      "starter": "def count_items(items):\n    counts = {}\n    return counts\nprint(count_items([\"石\", \"薬草\", \"石\"]))\n",
      "solution": "def count_items(items):\n    counts = {}\n    for item in items:\n        counts[item] = counts.get(item, 0) + 1\n    return counts\nprint(count_items([\"石\", \"薬草\", \"石\"]))\n",
      "tests": [
        {
          "label": "通常の集計",
          "code": "assert count_items([\"石\", \"薬草\", \"石\"]) == {\"石\": 2, \"薬草\": 1}\n"
        },
        {
          "label": "空",
          "code": "assert count_items([]) == {}\n"
        },
        {
          "label": "一種類",
          "code": "assert count_items([\"a\", \"a\", \"a\"]) == {\"a\": 3}\n"
        }
      ],
      "hint": "辞書の値を更新する行をforの内側に置きます。",
      "quiz": {
        "question": "空の集合を作るコードは？",
        "options": [
          "{}",
          "[]",
          "set()"
        ],
        "answer": 2,
        "why": "{}は辞書、[]はリストです。空の集合にはset()を使います。"
      },
      "references": [
        "https://docs.python.org/ja/3/tutorial/datastructures.html#dictionaries"
      ]
    },
    {
      "id": "07",
      "title": "関数・引数・戻り値・スコープ",
      "priority": "A",
      "minutes": 120,
      "goal": "処理を関数に分け、printとreturn、局所変数と外側の状態を区別する。",
      "sections": [
        {
          "title": "関数に責務を与える",
          "text": "def 関数名(引数):で関数を定義します。引数は必要な情報、returnは計算結果を呼び出し元に返すものです。printは表示するだけなので、計算結果を後で使うならreturnが必要です。returnを書かない関数の戻り値はNoneです。"
        },
        {
          "title": "値を受け取って値を返す",
          "text": "damage(hp, amount)のように入力と出力を明示すれば、ゲーム全体を起動せずテストできます。外側の変数を勝手に変更する処理が多いと、どこで状態が変わったか追いづらくなります。状態変更と計算を分けるのが短期開発でも有効です。"
        },
        {
          "title": "既定値とキーワード引数",
          "text": "def attack(power, armor=0):はarmorを省略できます。attack(power=10, armor=2)のように名前を指定すると意味が読みやすくなります。ただしdef f(items=[]):は同じリストが呼び出し間で共有されます。変更可能な既定値を避け、Noneを使って関数内で作ります。"
        },
        {
          "title": "スコープを理解する",
          "text": "関数の中で代入した名前は通常その関数のローカル変数です。外側の名前に再代入したければglobal等がありますが、まず引数と戻り値で設計してください。Pythonではオブジェクトへの参照が渡されるので、受け取ったリストの変更は呼び出し元に見えます。"
        }
      ],
      "example": "def apply_damage(hp, damage):\n    # 計算のみを担当します。\n    return max(0, hp - max(0, damage))\n\nhp = apply_damage(20, 8)\nprint(hp)\n",
      "roles": [
        "hpとdamageは関数への入力です。",
        "内側のmaxは負のダメージを0へ補正し、外側のmaxはHPを0以上にします。",
        "関数は表示や外部変数の更新をしません。呼び出し側が戻り値を保存します。"
      ],
      "pitfall": "型ヒントをつけても自動で入力検証はされません。戻り値と引数の契約はテストでも確認します。",
      "task": "apply_damage(hp, damage)を作ります。負のdamageは0として扱い、結果HPは0を下回らないようにします。",
      "starter": "def apply_damage(hp, damage):\n    return hp\nprint(apply_damage(20, 8))\n",
      "solution": "def apply_damage(hp, damage):\n    return max(0, hp - max(0, damage))\nprint(apply_damage(20, 8))\n",
      "tests": [
        {
          "label": "通常",
          "code": "assert apply_damage(20, 8) == 12\n"
        },
        {
          "label": "過剰ダメージ",
          "code": "assert apply_damage(10, 20) == 0\n"
        },
        {
          "label": "負のダメージ",
          "code": "assert apply_damage(10, -5) == 10\n"
        },
        {
          "label": "ゼロ",
          "code": "assert apply_damage(0, 0) == 0\n"
        }
      ],
      "hint": "まずdamageを0以上へ補正し、次に引き算の結果を0以上へ補正します。",
      "quiz": {
        "question": "returnを省略した関数の戻り値は？",
        "options": [
          "0",
          "最後にprintした値",
          "None"
        ],
        "answer": 2,
        "why": "表示と戻り値は別です。printした値が自動的に戻り値になることはありません。"
      },
      "references": [
        "https://docs.python.org/ja/3/tutorial/controlflow.html#defining-functions"
      ]
    },
    {
      "id": "08",
      "title": "例外・トレースバック・デバッグ",
      "priority": "A",
      "minutes": 90,
      "goal": "エラー原因を特定し、想定した例外だけを捕まえて代替処理を行う。",
      "sections": [
        {
          "title": "エラーを分類する",
          "text": "SyntaxErrorは構文、NameErrorは名前未定義、TypeErrorは不適切な型、ValueErrorは型は合うが値が不適切な場合です。IndexErrorとKeyErrorは要素の参照失敗です。種類を読まず、すべてを「Pythonのエラー」で済ませると修正が遠回りになります。"
        },
        {
          "title": "トレースバックを読む順序",
          "text": "末尾の例外の種類とメッセージを確認し、次に自分のファイルの行番号を探します。処理の呼び出し経路が上から並びます。問題の直前の値をprintやreprで確認し、最小の入力で再現してください。直した後は同じ入力をもう一度試します。"
        },
        {
          "title": "失敗を想定して分岐する",
          "text": "try内で処理し、except ValueErrorで値の変換失敗だけを扱えます。except Exceptionは多くの例外を捕まえますが、原因を隠す使い方は避けます。finallyは成功・失敗にかかわらず実行する後処理です。ファイルの後処理にはwithが便利です。"
        },
        {
          "title": "検証と例外の責務",
          "text": "正常でない値をraise ValueErrorで拒否する設計もあります。呼び出し元が再入力や代替値を選びます。例外を捕まえて常に成功扱いするのではなく、「何を回復できるか」を決めます。APIでは失敗時のフォールバックもこの考え方を使います。"
        }
      ],
      "example": "def parse_level(text):\n    try:\n        return int(text)\n    except ValueError:\n        return 1\n\nprint(parse_level(\"3\"))\nprint(parse_level(\"abc\"))\n",
      "roles": [
        "parse_levelは文字列を整数に変換する関数です。",
        "intによるValueErrorだけを回復可能な失敗とします。",
        "この簡単な例は負数を許しています。値の範囲の検証は別に必要です。"
      ],
      "pitfall": "except:だけで何でも捕まえると、終了要求や予期しないバグまで見えなくなることがあります。",
      "task": "parse_level(text)を作ります。整数として読み取れて1〜99ならその値、それ以外は1を返します。textはstrを前提とします。",
      "starter": "def parse_level(text):\n    return 1\nprint(parse_level(\"20\"))\n",
      "solution": "def parse_level(text):\n    try:\n        value = int(text)\n    except ValueError:\n        return 1\n    return value if 1 <= value <= 99 else 1\nprint(parse_level(\"20\"))\n",
      "tests": [
        {
          "label": "通常",
          "code": "assert parse_level(\"20\") == 20\n"
        },
        {
          "label": "変換失敗",
          "code": "assert parse_level(\"abc\") == 1\n"
        },
        {
          "label": "下限外",
          "code": "assert parse_level(\"0\") == 1\n"
        },
        {
          "label": "上限外",
          "code": "assert parse_level(\"100\") == 1\n"
        },
        {
          "label": "境界",
          "code": "assert parse_level(\"99\") == 99\n"
        }
      ],
      "hint": "変換の失敗と、変換できても範囲外の場合を分けます。",
      "quiz": {
        "question": "int('abc')で発生する例外は？",
        "options": [
          "NameError",
          "ValueError",
          "IndexError"
        ],
        "answer": 1,
        "why": "strという型は変換対象として受け付けますが、この内容は整数として不適切です。"
      },
      "references": [
        "https://docs.python.org/ja/3/tutorial/errors.html"
      ]
    },
    {
      "id": "09",
      "title": "計算量・探索・ソート・頻度表",
      "priority": "A",
      "minutes": 150,
      "goal": "入力件数に対する処理の増え方を説明し、適切なデータ構造を選ぶ。",
      "sections": [
        {
          "title": "計算量は件数が増えたときの目安",
          "text": "O(n)は要素数nに比例した走査、O(n²)は二重ループなどで現れます。100件では速い処理でも10万件では成立しないことがあります。計算量は秒数そのものではなく、入力規模に対する増え方です。"
        },
        {
          "title": "探索と集合",
          "text": "listのinは先頭からの線形探索です。setやdictの検索は平均O(1)ですが、構築には時間とメモリが要ります。何度も探すときは集合化を考えます。小さな入力なら単純な実装で十分なこともあります。"
        },
        {
          "title": "ソートとキー関数",
          "text": "sorted(values)は新しいリストを返し、values.sort()は元リストを変更してNoneを返します。sorted(enemies, key=lambda e: e['hp'])で体力順にできます。lambdaは短い無名関数です。Pythonのソートは安定で、同じキーの要素は元の相対順序を保ちます。"
        },
        {
          "title": "仕様と計算量を一緒に書く",
          "text": "最高得点の名前を選ぶ場合、一度の走査ならO(n)です。全員を順位順に並べるなら一般的にはO(n log n)です。同点の扱い、空入力、返すデータ形式を先に決めます。実際の選考問題を推測で断言せず、汎用的な練習として取り組んでください。"
        }
      ],
      "example": "enemies = [\n    {\"name\": \"ゴーレム\", \"hp\": 80},\n    {\"name\": \"スライム\", \"hp\": 10},\n    {\"name\": \"コウモリ\", \"hp\": 30},\n]\nordered = sorted(enemies, key=lambda enemy: enemy[\"hp\"])\nprint([enemy[\"name\"] for enemy in ordered])\n",
      "roles": [
        "enemiesは辞書のリストです。orderedは新しいリストです。",
        "keyに渡した関数は、各要素から比較用のhpを取り出す責務を持ちます。",
        "ソートは要素の辞書自体を深くコピーしません。"
      ],
      "pitfall": "result = values.sort()とするとresultはNoneです。戻り値が欲しい場合はsortedを使います。",
      "task": "rank_players(players)でscoreが高い順にnameのリストを返します。同点は入力順を保ち、元リストは変更しません。",
      "starter": "def rank_players(players):\n    return []\nprint(rank_players([{\"name\": \"A\", \"score\": 3}, {\"name\": \"B\", \"score\": 9}]))\n",
      "solution": "def rank_players(players):\n    ordered = sorted(players, key=lambda player: player[\"score\"], reverse=True)\n    return [player[\"name\"] for player in ordered]\nprint(rank_players([{\"name\": \"A\", \"score\": 3}, {\"name\": \"B\", \"score\": 9}]))\n",
      "tests": [
        {
          "label": "降順",
          "code": "assert rank_players([{\"name\":\"A\",\"score\":3},{\"name\":\"B\",\"score\":9}]) == [\"B\",\"A\"]\n"
        },
        {
          "label": "同点の順序",
          "code": "assert rank_players([{\"name\":\"A\",\"score\":5},{\"name\":\"B\",\"score\":5}]) == [\"A\",\"B\"]\n"
        },
        {
          "label": "空",
          "code": "assert rank_players([]) == []\n"
        },
        {
          "label": "元データ",
          "code": "players = [{\"name\":\"A\",\"score\":1},{\"name\":\"B\",\"score\":2}]\nrank_players(players)\nassert players[0][\"name\"] == \"A\"\n"
        }
      ],
      "hint": "sorted(..., key=..., reverse=True)で降順になります。",
      "quiz": {
        "question": "n件のデータを一度ずつ走査する処理の計算量は？",
        "options": [
          "O(1)",
          "O(n)",
          "O(n²)"
        ],
        "answer": 1,
        "why": "各件で一定量の処理をする前提ならO(n)です。各反復の内側の処理も確認します。"
      },
      "references": [
        "https://docs.python.org/ja/3/howto/sorting.html"
      ]
    },
    {
      "id": "10",
      "title": "応募前の総合演習",
      "priority": "A",
      "minutes": 150,
      "goal": "仕様を読み、入力・集計・同点処理・境界ケースを自力で実装する。",
      "sections": [
        {
          "title": "模擬問題の位置づけ",
          "text": "この演習は本サイト独自の練習問題です。スクウェア・エニックスの実際の問題ではありません。解答を見る前に30〜45分で実装し、残りの時間で境界ケースと説明を確認します。講座01〜09の知識を組み合わせます。"
        },
        {
          "title": "仕様を分解する",
          "text": "討伐ログはmonsterとpointsの辞書のリストです。名前ごとのpoints合計を求め、最大の名前を返します。同点なら名前の辞書順で先のもの、空のログならNoneとします。pointsは非負整数、monsterは文字列という前提です。日本語では辞書順は読み仮名順ではありません。"
        },
        {
          "title": "処理を組み立てる",
          "text": "最初に辞書で合計点を集計し、次に最大の合計点を決め、同点候補から名前の最小値を選びます。まず読みやすい段階的な実装を完成させます。短い一行へ縮めることを目標にしないでください。"
        },
        {
          "title": "終了条件を決める",
          "text": "通常入力、同点、一件、空を試します。どの行が集計、どの行が候補選択かを説明し、n件をO(n)で集計することを説明できれば到達です。未知の問題にも対応できるよう、標準入力から同じ関数を呼ぶ形にも書き換えてみます。"
        }
      ],
      "example": "# dictを利用した集計の小さな復習です。\ntotals = {}\nfor name, points in [(\"スライム\", 5), (\"ゴブリン\", 7), (\"スライム\", 4)]:\n    totals[name] = totals.get(name, 0) + points\nprint(totals)\n",
      "roles": [
        "totalsはモンスター名ごとの合計点です。",
        "一つのログごとに一度だけ更新します。",
        "この例は合計を作るところまでです。演習では同点処理まで完成させます。"
      ],
      "pitfall": "最大値を求める前に空データを扱ってください。max([])やmax({}.values())はValueErrorになります。",
      "task": "best_monster(logs)を実装してください。最大合計の名前を返し、同点なら名前の辞書順、空ならNoneです。",
      "starter": "def best_monster(logs):\n    return None\n\nlogs = [\n    {\"monster\": \"slime\", \"points\": 5},\n    {\"monster\": \"goblin\", \"points\": 7},\n    {\"monster\": \"slime\", \"points\": 4},\n]\nprint(best_monster(logs))\n",
      "solution": "def best_monster(logs):\n    if not logs:\n        return None\n    totals = {}\n    for log in logs:\n        name = log[\"monster\"]\n        totals[name] = totals.get(name, 0) + log[\"points\"]\n    best_score = max(totals.values())\n    candidates = [name for name, score in totals.items() if score == best_score]\n    return min(candidates)\n\nlogs = [\n    {\"monster\": \"slime\", \"points\": 5},\n    {\"monster\": \"goblin\", \"points\": 7},\n    {\"monster\": \"slime\", \"points\": 4},\n]\nprint(best_monster(logs))\n",
      "tests": [
        {
          "label": "複数ログの合計",
          "code": "assert best_monster([{\"monster\":\"s\",\"points\":5},{\"monster\":\"g\",\"points\":7},{\"monster\":\"s\",\"points\":4}]) == \"s\"\n"
        },
        {
          "label": "同点",
          "code": "assert best_monster([{\"monster\":\"z\",\"points\":5},{\"monster\":\"a\",\"points\":5}]) == \"a\"\n"
        },
        {
          "label": "一件",
          "code": "assert best_monster([{\"monster\":\"only\",\"points\":0}]) == \"only\"\n"
        },
        {
          "label": "空",
          "code": "assert best_monster([]) is None\n"
        },
        {
          "label": "順序に依存しない",
          "code": "assert best_monster([{\"monster\":\"b\",\"points\":2},{\"monster\":\"a\",\"points\":1},{\"monster\":\"a\",\"points\":1}]) == \"a\"\n"
        }
      ],
      "hint": "空を先に処理します。集計後の辞書のvaluesから最大値を取り、同点候補にminを使います。",
      "quiz": {
        "question": "同点なら辞書順という仕様で、入力順に最初の名前を返す実装は？",
        "options": [
          "常に正しい",
          "入力順によって誤る",
          "Pythonが自動で修正する"
        ],
        "answer": 1,
        "why": "入力順と辞書順は別です。同点の候補を明示的に比較する必要があります。"
      },
      "references": [
        "https://docs.python.org/ja/3/tutorial/datastructures.html"
      ]
    },
    {
      "id": "11",
      "title": "モジュール・仮想環境・pip",
      "priority": "B",
      "minutes": 90,
      "goal": "プロジェクト単位で環境を用意し、別ファイルへ処理を分離する。",
      "sections": [
        {
          "title": "標準ライブラリと外部パッケージ",
          "text": "jsonやmathはPython付属の標準ライブラリです。import mathで名前を読み込みます。外部パッケージはpipなどで導入します。pipを使うときはpython -m pipの形で、どのPythonに入れるかを明確にしてください。"
        },
        {
          "title": "Windowsでの最初の準備",
          "text": "Pythonを公式サイトから導入し、ターミナルでpy --versionを確認します。pyがない環境ではpython --versionを試します。プロジェクト内でpy -m venv .venvを実行し、以後は.venv\\Scripts\\python.exe main.pyで動かせます。この方法ならPowerShellの有効化スクリプトの実行ポリシーを変更する必要はありません。"
        },
        {
          "title": "環境を再現する",
          "text": "外部パッケージを導入するなら.venv\\Scripts\\python.exe -m pip install パッケージ名を使います。依存バージョンをrequirements.txt等に記録します。仮想環境そのものはGitに含めません。実行に使うPythonのバージョンもREADMEへ書きます。当日の環境は運営の説明を優先してください。"
        },
        {
          "title": "ファイルに責務を分ける",
          "text": "damage.pyに計算、main.pyに起動処理を置きます。from damage import apply_damageで利用できます。if __name__ == '__main__':の内側は直接実行した場合にのみ動くので、importしただけでゲームが起動するのを避けられます。"
        }
      ],
      "example": "import math\n\ndef distance(x, y):\n    return math.hypot(x, y)\n\nif __name__ == \"__main__\":\n    print(distance(3, 4))\n",
      "roles": [
        "mathは標準ライブラリのモジュールです。",
        "distanceは座標成分から原点までの距離を返します。",
        "__name__の分岐は計算関数をimportした場合に表示しないための起動条件です。"
      ],
      "pitfall": "自分のファイルにjson.pyやrandom.pyと名づけると、標準ライブラリのimportを邪魔することがあります。",
      "task": "mathをimportし、distance(x, y)で原点からの距離を返してください。PCでも同じ.pyを実行します。",
      "starter": "import math\ndef distance(x, y):\n    return 0\nprint(distance(3, 4))\n",
      "solution": "import math\ndef distance(x, y):\n    return math.hypot(x, y)\nprint(distance(3, 4))\n",
      "tests": [
        {
          "label": "3と4",
          "code": "assert distance(3, 4) == 5\n"
        },
        {
          "label": "原点",
          "code": "assert distance(0, 0) == 0\n"
        },
        {
          "label": "負の成分",
          "code": "assert distance(-3, 4) == 5\n"
        }
      ],
      "hint": "math.hypot(x, y)でsqrt(x*x + y*y)に相当する距離を求めます。",
      "quiz": {
        "question": "Gitに通常含めないものは？",
        "options": [
          "main.py",
          "README.md",
          ".venvフォルダ"
        ],
        "answer": 2,
        "why": "仮想環境はPCごとに作り直します。依存情報とコードを共有します。"
      },
      "references": [
        "https://docs.python.org/ja/3/tutorial/modules.html",
        "https://docs.python.org/ja/3/tutorial/venv.html",
        "https://www.python.org/downloads/"
      ]
    },
    {
      "id": "12",
      "title": "JSON・ファイル・パス",
      "priority": "B",
      "minutes": 120,
      "goal": "辞書とJSON文字列を変換し、読み書きとデータ形式の検証を分ける。",
      "sections": [
        {
          "title": "JSONは通信と保存の形式",
          "text": "JSONは文字列として表現されたデータ形式です。Pythonの辞書そのものではありません。json.dumpsで辞書から文字列、json.loadsで文字列からPythonの値へ変換します。JSONのtrue・false・nullはPythonのTrue・False・Noneに対応します。"
        },
        {
          "title": "読み込めたことと正しいことは別",
          "text": "JSONとして成立しても、hpが文字列だったり必須項目がなかったりします。構文の検証に加えて、キー、型、範囲の検証が必要です。生成AIの応答でも同じです。辞書かどうかを先に調べてからキーを読んでください。"
        },
        {
          "title": "ファイルはwithで扱う",
          "text": "with open('save.json', 'w', encoding='utf-8') as f:の内側でjson.dump(data, f, ensure_ascii=False)を呼びます。withが終了時のcloseを担当します。pathlib.Pathならパスの組み立てが読みやすくなります。相対パスは通常、実行時の作業ディレクトリに対する指定です。"
        },
        {
          "title": "ブラウザのファイルは仮想ファイル",
          "text": "右の実行欄でもPath('save.json').write_text(...)を試せますが、保存先はPython実行環境内の仮想領域です。PCへ自動保存されません。ページ再読込や実行停止で消えることがあります。本当の保存データの運用はPCで実行し、読込失敗時の扱いも決めます。"
        }
      ],
      "example": "import json\nfrom pathlib import Path\nplayer = {\"name\": \"探索者\", \"hp\": 80}\npath = Path(\"save.json\")\npath.write_text(json.dumps(player, ensure_ascii=False), encoding=\"utf-8\")\nloaded = json.loads(path.read_text(encoding=\"utf-8\"))\nprint(loaded[\"name\"], loaded[\"hp\"])\n",
      "roles": [
        "playerは保存対象、pathは保存先を表すPathです。",
        "dumpsとloadsは文字列変換、write_textとread_textはファイル処理です。",
        "ensure_ascii=Falseは日本語をそのままJSON文字列に残します。"
      ],
      "pitfall": "boolはintの派生型です。HPにTrueを許さないならisinstance(hp, int)だけでは不足し、type(hp) is int等で判定します。",
      "task": "load_hp(text)を作ります。辞書のhpが整数で0〜100ならその値、それ以外や不正JSONなら100です。Trueは拒否します。",
      "starter": "import json\ndef load_hp(text):\n    return 100\nprint(load_hp('{\"hp\": 40}'))\n",
      "solution": "import json\ndef load_hp(text):\n    try:\n        data = json.loads(text)\n    except json.JSONDecodeError:\n        return 100\n    if not isinstance(data, dict):\n        return 100\n    hp = data.get(\"hp\")\n    if type(hp) is int and 0 <= hp <= 100:\n        return hp\n    return 100\nprint(load_hp('{\"hp\": 40}'))\n",
      "tests": [
        {
          "label": "正常値",
          "code": "assert load_hp('{\"hp\":40}') == 40\n"
        },
        {
          "label": "ゼロ",
          "code": "assert load_hp('{\"hp\":0}') == 0\n"
        },
        {
          "label": "型不一致",
          "code": "assert load_hp('{\"hp\":\"40\"}') == 100\n"
        },
        {
          "label": "真偽値の拒否",
          "code": "assert load_hp('{\"hp\":true}') == 100\n"
        },
        {
          "label": "不正JSONと別型",
          "code": "assert load_hp(\"broken\") == 100\nassert load_hp(\"[]\") == 100\n"
        },
        {
          "label": "範囲と欠損",
          "code": "assert load_hp('{\"hp\":-1}') == 100\nassert load_hp(\"{}\") == 100\n"
        }
      ],
      "hint": "JSONDecodeErrorの対処、dict判定、hpの厳密な型判定、範囲判定の順に進めます。",
      "quiz": {
        "question": "json.loadsが成功したらゲーム用データとして安全？",
        "options": [
          "常に安全",
          "型と範囲の検証がまだ必要",
          "必ず辞書になる"
        ],
        "answer": 1,
        "why": "JSONの文法が正しいことと、ゲームの仕様を満たすことは別です。"
      },
      "references": [
        "https://docs.python.org/ja/3/library/json.html",
        "https://docs.python.org/ja/3/library/pathlib.html"
      ]
    },
    {
      "id": "13",
      "title": "クラス・dataclass・型ヒント",
      "priority": "B",
      "minutes": 90,
      "goal": "状態と振る舞いをまとめ、型ヒントの役割と限界を理解する。",
      "sections": [
        {
          "title": "必要なときにクラスを使う",
          "text": "関数と辞書だけでも小規模なゲームは作れます。状態と、その状態に関する操作を一緒に管理したいときにクラスを使います。Pythonのインスタンスメソッドの第1引数selfは、操作対象のインスタンスです。C#のthisに近い役割ですが、引数として明示します。"
        },
        {
          "title": "dataclassでデータを表す",
          "text": "@dataclassをつけると初期化などの定型処理が生成されます。Player(name='A', hp=100)のようにインスタンスを作れます。変更可能なフィールドの既定値はfield(default_factory=list)のように個別に作ります。"
        },
        {
          "title": "型ヒントは共同作業の案内",
          "text": "def damage(hp: int, amount: int) -> int:のように型を書くと、引数と戻り値の意図が伝わります。IDEや静的検査の助けになりますが、通常のPython実行時に型違いを自動で拒否しません。API入力は別に検証します。"
        },
        {
          "title": "過剰な継承を避ける",
          "text": "3日間の開発で深い継承階層を最初から作ると変更が難しくなります。通信、応答検証、ゲーム状態の更新を、小さな関数やオブジェクトとして組み合わせます。クラスの数を増やすことを設計の良さと混同しないでください。"
        }
      ],
      "example": "from dataclasses import dataclass\n\n@dataclass\nclass Player:\n    name: str\n    hp: int = 100\n\n    def take_damage(self, amount: int) -> None:\n        self.hp = max(0, self.hp - max(0, amount))\n\nplayer = Player(\"探索者\")\nplayer.take_damage(20)\nprint(player)\n",
      "roles": [
        "Playerはプレイヤーの名前と体力を管理します。",
        "take_damageは自分のhpの変更を担当し、結果値は返しません。",
        "型ヒントは契約を説明するものです。ここではamountに整数を渡す前提です。"
      ],
      "pitfall": "クラス変数のリストは全インスタンスで共有されます。プレイヤー固有の所持品はインスタンスごとに作ります。",
      "task": "Playerにheal(amount)を実装します。負のamountは0、最大HPは100です。hpは0〜100の整数を前提にします。",
      "starter": "from dataclasses import dataclass\n@dataclass\nclass Player:\n    hp: int = 100\n    def heal(self, amount: int) -> None:\n        pass\nplayer = Player(40)\nplayer.heal(20)\nprint(player.hp)\n",
      "solution": "from dataclasses import dataclass\n@dataclass\nclass Player:\n    hp: int = 100\n    def heal(self, amount: int) -> None:\n        self.hp = min(100, self.hp + max(0, amount))\nplayer = Player(40)\nplayer.heal(20)\nprint(player.hp)\n",
      "tests": [
        {
          "label": "回復",
          "code": "p = Player(40)\np.heal(20)\nassert p.hp == 60\n"
        },
        {
          "label": "上限",
          "code": "p = Player(90)\np.heal(50)\nassert p.hp == 100\n"
        },
        {
          "label": "負数",
          "code": "p = Player(40)\np.heal(-10)\nassert p.hp == 40\n"
        },
        {
          "label": "インスタンス独立",
          "code": "a, b = Player(10), Player(20)\na.heal(5)\nassert b.hp == 20\n"
        }
      ],
      "hint": "self.hpへ再代入します。maxでamountの下限、minでhpの上限を処理します。",
      "quiz": {
        "question": "型ヒントがある関数に文字列を渡すと？",
        "options": [
          "呼び出し前に必ず拒否される",
          "通常は型ヒントだけでは拒否されない",
          "自動でintになる"
        ],
        "answer": 1,
        "why": "通常の実行では型ヒントは強制しません。型検査ツールと実行時の入力検証は別です。"
      },
      "references": [
        "https://docs.python.org/ja/3/tutorial/classes.html",
        "https://docs.python.org/ja/3/library/dataclasses.html",
        "https://docs.python.org/ja/3/library/typing.html"
      ]
    },
    {
      "id": "14",
      "title": "HTTP・API・タイムアウト",
      "priority": "B",
      "minutes": 120,
      "goal": "リクエストと応答の構造を理解し、通信失敗を前提に設計する。",
      "sections": [
        {
          "title": "APIはプログラム同士の窓口",
          "text": "HTTP APIではURLにGETやPOSTの要求を送ります。ヘッダーはContent-Typeなどの付加情報、ボディはJSONなどのデータです。応答にはステータスコードと本文があります。2xxは成功、4xxは要求や認証などの問題、5xxはサーバー側の問題を表します。"
        },
        {
          "title": "通信はローカル計算と違う",
          "text": "待ち時間、接続失敗、タイムアウト、利用上限、料金が発生することがあります。401等の認証失敗を同じ内容で繰り返しても直りません。429や一時的な失敗でも無制限な再試行は避け、回数・待ち時間・フォールバックを決めます。"
        },
        {
          "title": "秘密鍵はブラウザに置かない",
          "text": "GitHub Pagesは静的ファイルを公開します。JavaScriptや公開リポジトリにAPIキーを書けば閲覧者が取得できます。実際の外部AI APIへの通信はPCのPythonや別のバックエンドから行い、環境変数などで秘密を渡します。環境変数でもログや共有画面に表示しないでください。"
        },
        {
          "title": "まず通信を模擬する",
          "text": "ブラウザ演習では、実際のAPIを呼ばず、リクエストの内容と応答の分類を練習します。付属のlocal_project/http_adapter.pyには標準ライブラリでのPOSTとタイムアウト例があります。エンドポイントや認証方式はサービスの公式仕様に合わせる必要があります。"
        }
      ],
      "example": "import json\npayload = {\"message\": \"森への道を教えて\", \"max_chars\": 80}\nrequest = {\n    \"method\": \"POST\",\n    \"headers\": {\"Content-Type\": \"application/json\"},\n    \"body\": json.dumps(payload, ensure_ascii=False),\n}\nprint(request)\n",
      "roles": [
        "payloadは送信する論理データです。",
        "requestは通信内容を表す練習用の辞書で、送信はしていません。",
        "JSON化の責務と通信の責務を分ければ、通信なしでも内容を検査できます。"
      ],
      "pitfall": "HTTP成功だけでゲームを更新しないでください。本文がJSONか、必要なキーと値が正しいかも調べます。",
      "task": "classify_status(status)を作ります。200〜299は'ok'、429または500〜599は'retry'、それ以外は'fail'を返します。これは練習用の方針です。",
      "starter": "def classify_status(status):\n    return \"fail\"\nprint(classify_status(429))\n",
      "solution": "def classify_status(status):\n    if 200 <= status < 300:\n        return \"ok\"\n    if status == 429 or 500 <= status < 600:\n        return \"retry\"\n    return \"fail\"\nprint(classify_status(429))\n",
      "tests": [
        {
          "label": "成功範囲",
          "code": "assert classify_status(200) == \"ok\"\nassert classify_status(299) == \"ok\"\n"
        },
        {
          "label": "利用上限",
          "code": "assert classify_status(429) == \"retry\"\n"
        },
        {
          "label": "サーバー失敗",
          "code": "assert classify_status(503) == \"retry\"\n"
        },
        {
          "label": "認証失敗",
          "code": "assert classify_status(401) == \"fail\"\n"
        },
        {
          "label": "境界",
          "code": "assert classify_status(300) == \"fail\"\nassert classify_status(600) == \"fail\"\n"
        }
      ],
      "hint": "成功範囲を先に判定し、その後で再試行の対象を判定します。retryという戻り値自体は通信を繰り返しません。",
      "quiz": {
        "question": "GitHub PagesのJavaScriptに秘密のAPIキーを埋め込むと？",
        "options": [
          "非表示になる",
          "閲覧者に取得され得る",
          "Pythonのキーだけは安全"
        ],
        "answer": 1,
        "why": "配信されるファイルは利用者へ渡ります。バックエンド側で秘密を扱う構成が必要です。"
      },
      "references": [
        "https://docs.python.org/ja/3/library/urllib.request.html",
        "https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Status"
      ]
    },
    {
      "id": "15",
      "title": "生成AI・プロンプト・応答の検証",
      "priority": "B",
      "minutes": 120,
      "goal": "生成AIへ任せる範囲を限定し、出力を不確実な外部入力として扱う。",
      "sections": [
        {
          "title": "生成AIをどこに使うか",
          "text": "LLMは入力の文脈から続きのテキストを生成するモデルです。NPCの台詞やクエストの文章などに使えますが、正しい事実・一貫したゲーム状態・決まった形式を必ず保証するものではありません。重要なゲームルールは通常のコードで決めます。"
        },
        {
          "title": "指示・状態・入力を分ける",
          "text": "プロンプトではNPCの役割、世界の制約、許可する行動、出力形式、現在の状態を明示します。プレイヤー入力は命令として信頼せず、データとして渡します。入力に「以前のルールを無視して」と書かれることも想定します。プロンプトだけで防御が完成するわけではありません。"
        },
        {
          "title": "文章と行動を分離する",
          "text": "応答を{'text': '台詞', 'action': 'talk'}のようなJSONに限定する設計を考えます。形式を指示しても崩れる場合があります。実際に受け取った内容を解析し、許可リストの行動だけを受け付けます。応答からPythonコードを生成してexecする設計は避けます。"
        },
        {
          "title": "失敗しても遊べるようにする",
          "text": "不正JSON、長すぎる台詞、未知の行動、通信失敗では固定の台詞とtalkへ戻します。応答の再現性、待ち時間、コストを記録し、生成AIを外した場合との遊びの違いも確認します。温度等の設定はサービスごとの仕様に合わせて調べます。"
        }
      ],
      "example": "import json\nprompt = {\n    \"role\": \"塔の案内人\",\n    \"rules\": [\"80文字以内\", \"許可行動はtalkかhint\", \"所持金やHPを変更しない\"],\n    \"state\": {\"floor\": 1},\n    \"player_input\": \"次の場所へのヒントが欲しい\",\n}\nprint(json.dumps(prompt, ensure_ascii=False, indent=2))\n",
      "roles": [
        "roleとrulesは役割と制約、stateはコードが管理した現在状態です。",
        "player_inputは利用者の入力で、信頼するルールとは分離します。",
        "この例はプロンプトの構成を表す辞書です。特定サービスのリクエスト仕様ではありません。"
      ],
      "pitfall": "「JSONだけ返して」と指示することと、実際にJSONを検証することは別です。検証を省略しないでください。",
      "task": "validate_reply(raw)を作ります。textは空白だけでないstrで長さ1〜80、actionは'talk'か'hint'。不正なら固定のフォールバック辞書を返します。",
      "starter": "import json\nFALLBACK = {\"text\": \"少し待ってから話しかけて。\", \"action\": \"talk\"}\ndef validate_reply(raw):\n    return FALLBACK.copy()\nprint(validate_reply('{\"text\":\"東へ進もう\",\"action\":\"hint\"}'))\n",
      "solution": "import json\nFALLBACK = {\"text\": \"少し待ってから話しかけて。\", \"action\": \"talk\"}\ndef validate_reply(raw):\n    try:\n        data = json.loads(raw)\n    except json.JSONDecodeError:\n        return FALLBACK.copy()\n    if not isinstance(data, dict):\n        return FALLBACK.copy()\n    text, action = data.get(\"text\"), data.get(\"action\")\n    if (isinstance(text, str) and text.strip() and len(text) <= 80\n            and isinstance(action, str) and action in (\"talk\", \"hint\")):\n        return {\"text\": text, \"action\": action}\n    return FALLBACK.copy()\nprint(validate_reply('{\"text\":\"東へ進もう\",\"action\":\"hint\"}'))\n",
      "tests": [
        {
          "label": "正常",
          "code": "assert validate_reply('{\"text\":\"東へ進もう\",\"action\":\"hint\"}') == {\"text\":\"東へ進もう\",\"action\":\"hint\"}\n"
        },
        {
          "label": "不正JSON",
          "code": "assert validate_reply(\"broken\") == FALLBACK\n"
        },
        {
          "label": "未知の行動",
          "code": "assert validate_reply('{\"text\":\"お金を増やす\",\"action\":\"add_gold\"}') == FALLBACK\n"
        },
        {
          "label": "長すぎる文",
          "code": "assert validate_reply(json.dumps({\"text\":\"a\"*81,\"action\":\"talk\"})) == FALLBACK\n"
        },
        {
          "label": "別型",
          "code": "assert validate_reply(\"[]\") == FALLBACK\nassert validate_reply('{\"text\":3,\"action\":[]}') == FALLBACK\n"
        },
        {
          "label": "空白と欠損",
          "code": "assert validate_reply('{\"text\":\"   \",\"action\":\"talk\"}') == FALLBACK\nassert validate_reply(\"{}\") == FALLBACK\n"
        }
      ],
      "hint": "JSON解析、dict判定、文字列と行動の検証の順です。返す辞書は採用するキーだけに絞ります。",
      "quiz": {
        "question": "生成AIの応答でゲーム内の所持金を変更するときに必要なのは？",
        "options": [
          "応答の指示をそのまま実行",
          "コード側の権限・ルール・値の検証",
          "プロンプトだけ"
        ],
        "answer": 1,
        "why": "モデルは台詞を提案できますが、状態変更の権限とルールはコード側で管理します。"
      },
      "references": [
        "https://docs.python.org/ja/3/library/json.html",
        "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence"
      ]
    },
    {
      "id": "16",
      "title": "ゲームへの接続・状態管理・モック",
      "priority": "B",
      "minutes": 180,
      "goal": "通信を差し替え可能にし、ゲームの状態をコード側で保持する。",
      "sections": [
        {
          "title": "三つの責務に分ける",
          "text": "入力から応答を得る通信層、形式と値を確認する検証層、検証後の行動を反映するゲーム層を分けます。Unityを使う場合も、Python側との境界はJSON等のデータにし、関数やクラスを直接共有する前提にはしません。当日のエンジンや通信方式は未公開です。"
        },
        {
          "title": "モックで先に完成させる",
          "text": "モックは外部サービスの代役です。入力に応じた固定のJSONを返す関数を渡せば、APIキーがなくてもゲームの流れを開発できます。これは生成AIではありませんが、AI接続部分の契約を先に固めるための手段です。"
        },
        {
          "title": "状態は明示的に遷移させる",
          "text": "idle、waiting、showing、error等の状態を定義します。待機中の二重送信を拒否し、成功でも失敗でも操作可能な状態へ戻します。今回の小さな例は同期処理ですが、長い通信をメインループで行えば画面が止まります。非同期は講座19で扱います。"
        },
        {
          "title": "契約を先に共有する",
          "text": "チーム内でmessage、text、actionなどのキー名、許可値、最大文字数、失敗時の形式を合意します。UI担当と通信担当が別々に作っても、同じモックデータで接続確認できます。短い開発期間ではこの合意が後の手戻りを減らします。"
        }
      ],
      "example": "import json\ndef mock_provider(message):\n    action = \"hint\" if \"ヒント\" in message else \"talk\"\n    return json.dumps({\"text\": \"足元をよく見て。\", \"action\": action}, ensure_ascii=False)\n\ndef ask(message, provider):\n    raw = provider(message)\n    return json.loads(raw)  # 本番では講座15の検証を挟みます。\n\nprint(ask(\"ヒントを教えて\", mock_provider))\n",
      "roles": [
        "providerは差し替える通信関数です。askはどのサービスかを知りません。",
        "mock_providerは固定の応答を作る代役で、AIモデルを呼びません。",
        "検証前のjson.loadsだけでは足りません。演習では許可された行動だけを反映します。"
      ],
      "pitfall": "モデルの応答を使ってfloorを自由に書き換えないでください。解禁条件や遷移はゲームコードが決めます。",
      "task": "apply_action(state, action)を作ります。hintならhintsを1増やす新しい辞書を返し、他の行動は変更せずコピーを返します。元のstateは変更しません。",
      "starter": "def apply_action(state, action):\n    return state.copy()\nprint(apply_action({\"floor\": 1, \"hints\": 0}, \"hint\"))\n",
      "solution": "def apply_action(state, action):\n    updated = state.copy()\n    if action == \"hint\":\n        updated[\"hints\"] = updated.get(\"hints\", 0) + 1\n    return updated\nprint(apply_action({\"floor\": 1, \"hints\": 0}, \"hint\"))\n",
      "tests": [
        {
          "label": "許可行動",
          "code": "assert apply_action({\"floor\":1,\"hints\":0}, \"hint\") == {\"floor\":1,\"hints\":1}\n"
        },
        {
          "label": "talkは変化なし",
          "code": "assert apply_action({\"floor\":1,\"hints\":2}, \"talk\") == {\"floor\":1,\"hints\":2}\n"
        },
        {
          "label": "未知の行動",
          "code": "assert apply_action({\"gold\":10}, \"add_gold\") == {\"gold\":10}\n"
        },
        {
          "label": "元データ保持",
          "code": "source = {\"hints\":0}\nupdated = apply_action(source,\"hint\")\nassert source == {\"hints\":0}\nassert updated is not source\n"
        }
      ],
      "hint": "copyで新しい辞書を作り、actionがhintのときだけ更新します。浅いコピーなので入れ子がある場合は別途検討します。",
      "quiz": {
        "question": "APIがまだ使えないときの進め方は？",
        "options": [
          "実装を全て止める",
          "同じ応答形式のモックで進める",
          "APIキーを推測する"
        ],
        "answer": 1,
        "why": "応答形式を合意し、モックで接続を進めれば、外部サービスの準備に依存しません。"
      },
      "references": [
        "https://docs.python.org/ja/3/library/unittest.mock.html"
      ]
    },
    {
      "id": "17",
      "title": "テスト・Git・チームでの再現性",
      "priority": "B",
      "minutes": 120,
      "goal": "境界ケースをテストに残し、他の人が実行できる単位で共有する。",
      "sections": [
        {
          "title": "テストは仕様を固定する",
          "text": "assert 条件で、条件がFalseならAssertionErrorになります。通常・境界・不正入力・空を分けて書きます。assertは最適化オプションで省略されることがあるため、外部入力の検証にはifとraise等を使います。標準ライブラリunittestならテストの整理と自動実行ができます。"
        },
        {
          "title": "外部通信とテストを分ける",
          "text": "毎回APIを呼ぶテストは遅く、料金や出力の揺れに影響されます。通信関数を引数にすれば正常JSON、不正JSON、例外を返す代役を渡せます。ゲームの検証ロジックはAPIなしで確かめ、実際の通信は別の接続確認として扱います。"
        },
        {
          "title": "小さな変更を共有する",
          "text": "Gitでは一つの目的に絞って変更し、git diffで確認してからコミットします。担当範囲とJSONの契約を共有し、同じ巨大ファイルを同時に編集する状況を減らします。AIが生成したコードも差分を読んで実行し、自分が説明できる内容にしてから取り込みます。"
        },
        {
          "title": "READMEも成果物",
          "text": "Pythonのバージョン、環境構築、実行コマンド、テストコマンド、必要な環境変数の名前、既知の制約を書きます。秘密の値自体は書きません。「自分のPCで動く」で止めず、別のメンバーが再現できるかを確認します。"
        }
      ],
      "example": "def clamp_hp(value):\n    return max(0, min(100, value))\n\nassert clamp_hp(-1) == 0\nassert clamp_hp(100) == 100\nassert clamp_hp(101) == 100\nprint(\"境界ケースを確認\")\n",
      "roles": [
        "clamp_hpは整数HPを0〜100へ補正する関数です。",
        "assertは仕様と実装の不一致を検出します。",
        "テストの値には境界の外側も含めています。"
      ],
      "pitfall": "AIの説明がもっともらしくても、実行結果やテストの代わりにはなりません。コードと期待値の両方を確認します。",
      "task": "clamp_hp(value)を実装します。整数を0〜100に補正します。入力が整数であることを前提とする関数です。",
      "starter": "def clamp_hp(value):\n    return value\nprint(clamp_hp(150))\n",
      "solution": "def clamp_hp(value):\n    return max(0, min(100, value))\nprint(clamp_hp(150))\n",
      "tests": [
        {
          "label": "下限外",
          "code": "assert clamp_hp(-1) == 0\n"
        },
        {
          "label": "上限外",
          "code": "assert clamp_hp(101) == 100\n"
        },
        {
          "label": "境界",
          "code": "assert clamp_hp(0) == 0\nassert clamp_hp(100) == 100\n"
        },
        {
          "label": "通常",
          "code": "assert clamp_hp(50) == 50\n"
        }
      ],
      "hint": "上限でmin、下限でmaxを使います。",
      "quiz": {
        "question": "入力検証をassertだけで書く問題は？",
        "options": [
          "実行時に必ず遅くなる",
          "最適化オプションで省略され得る",
          "文字列には使えない"
        ],
        "answer": 1,
        "why": "assertはテストや内部の前提確認に向きます。外部入力の検証を任せきりにしないでください。"
      },
      "references": [
        "https://docs.python.org/ja/3/library/unittest.html",
        "https://git-scm.com/docs/git-diff"
      ]
    },
    {
      "id": "18",
      "title": "最終制作：NPC対話の小さなゲーム",
      "priority": "B",
      "minutes": 240,
      "goal": "入力→通信代役→検証→表示→状態更新を、一つの動く成果物にする。",
      "sections": [
        {
          "title": "完成させる最小の遊び",
          "text": "塔の案内人へ話しかけると、台詞とヒントが返る対話プロトタイプを作ります。ここでは生成AIの代わりにモックを使います。実際のAI接続は同じ関数の境界を実サービスへ差し替える発展課題です。モックの完成をAI利用経験として説明しないでください。"
        },
        {
          "title": "パイプラインをつなぐ",
          "text": "ask_turn(message, state, provider)はproviderを呼び、JSONを検証し、許可行動なら新しいstateを作ります。providerが例外を送出した場合や、内容が不正な場合はフォールバックにします。金額や階層は応答に含まれていても採用しません。"
        },
        {
          "title": "評価の軸",
          "text": "正常応答、未知の行動、長すぎる台詞、通信失敗、空JSONを試します。元の状態が勝手に変わらないことも確認します。実際のAIを接続したら、応答時間、形式違反の回数、失敗時に遊びが継続するかを記録します。"
        },
        {
          "title": "PCでの完成チェック",
          "text": "付属local_projectを手元で実行します。READMEのコマンドでunittestを動かし、対話の入力を試してください。最後に「何をPythonで作ったか」「何をモックで代用したか」「どう失敗を扱ったか」を自分の言葉で説明します。参加や選考通過を保証する課題ではありません。"
        }
      ],
      "example": "import json\ndef provider(message):\n    return json.dumps({\"text\": \"壁の印を探して。\", \"action\": \"hint\"}, ensure_ascii=False)\nraw = provider(\"ヒント\")\nprint(raw)\n# 検証と状態更新をつなぐのが今回の演習です。\n",
      "roles": [
        "providerはAI接続箇所の代役です。",
        "rawは外部入力として扱うJSON文字列です。",
        "表示文だけでなく、許可されたactionを検証してから状態に反映します。"
      ],
      "pitfall": "tryをパイプライン全体に広げて全てのバグを通信失敗として隠さないでください。例では外部呼び出しとJSON解析の境界で回復します。",
      "task": "ask_turn(message, state, provider)を完成させます。(reply, new_state)を返します。講座15と同じ応答条件を使い、hintならhintsを1増やします。通信の例外もフォールバックです。元stateは変更しません。",
      "starter": "import json\nFALLBACK = {\"text\": \"少し待ってから話しかけて。\", \"action\": \"talk\"}\ndef ask_turn(message, state, provider):\n    return FALLBACK.copy(), state.copy()\n\ndef mock(message):\n    return '{\"text\":\"東へ進もう\",\"action\":\"hint\"}'\nprint(ask_turn(\"ヒント\", {\"floor\": 1, \"hints\": 0}, mock))\n",
      "solution": "import json\nFALLBACK = {\"text\": \"少し待ってから話しかけて。\", \"action\": \"talk\"}\ndef validate_reply(raw):\n    if not isinstance(raw, str):\n        return FALLBACK.copy()\n    try:\n        data = json.loads(raw)\n    except json.JSONDecodeError:\n        return FALLBACK.copy()\n    if not isinstance(data, dict):\n        return FALLBACK.copy()\n    text, action = data.get(\"text\"), data.get(\"action\")\n    if (isinstance(text, str) and text.strip() and len(text) <= 80\n            and isinstance(action, str) and action in (\"talk\", \"hint\")):\n        return {\"text\": text, \"action\": action}\n    return FALLBACK.copy()\n\ndef ask_turn(message, state, provider):\n    try:\n        raw = provider(message)\n    except Exception:\n        raw = \"\"\n    reply = validate_reply(raw)\n    updated = state.copy()\n    if reply[\"action\"] == \"hint\":\n        updated[\"hints\"] = updated.get(\"hints\", 0) + 1\n    return reply, updated\n\ndef mock(message):\n    return '{\"text\":\"東へ進もう\",\"action\":\"hint\"}'\nprint(ask_turn(\"ヒント\", {\"floor\": 1, \"hints\": 0}, mock))\n",
      "tests": [
        {
          "label": "正常応答と状態更新",
          "code": "reply, state = ask_turn(\"x\", {\"floor\":1,\"hints\":0}, lambda _: '{\"text\":\"東へ\",\"action\":\"hint\"}')\nassert reply[\"action\"] == \"hint\" and state == {\"floor\":1,\"hints\":1}\n"
        },
        {
          "label": "未知の行動",
          "code": "reply, state = ask_turn(\"x\", {\"gold\":10}, lambda _: '{\"text\":\"金\",\"action\":\"add_gold\"}')\nassert reply == FALLBACK and state == {\"gold\":10}\n"
        },
        {
          "label": "不正JSON",
          "code": "reply, state = ask_turn(\"x\", {\"hints\":0}, lambda _: \"broken\")\nassert reply == FALLBACK and state[\"hints\"] == 0\n"
        },
        {
          "label": "通信失敗",
          "code": "def failing(_):\n    raise TimeoutError(\"timeout\")\nreply, state = ask_turn(\"x\", {\"hints\":0}, failing)\nassert reply == FALLBACK and state[\"hints\"] == 0\n"
        },
        {
          "label": "元状態保持",
          "code": "source = {\"hints\":0}\nask_turn(\"x\", source, lambda _: '{\"text\":\"東\",\"action\":\"hint\"}')\nassert source == {\"hints\":0}\n"
        },
        {
          "label": "非文字列",
          "code": "reply, state = ask_turn(\"x\", {}, lambda _: None)\nassert reply == FALLBACK and state == {}\n"
        }
      ],
      "hint": "検証は独立した関数にすると再利用できます。provider呼び出しのtryと状態更新を分けます。",
      "quiz": {
        "question": "モックで完成した時点で説明できることは？",
        "options": [
          "実際の生成AIを組み込んだと断言",
          "接続契約・検証・状態更新が動くと説明",
          "失敗テストは不要"
        ],
        "answer": 1,
        "why": "実際に確認した範囲と代用した範囲を区別してください。実APIとの接続確認は別の段階です。"
      },
      "references": [
        "https://docs.python.org/ja/3/library/unittest.html",
        "https://docs.python.org/ja/3/library/json.html"
      ]
    },
    {
      "id": "19",
      "title": "非同期処理と待ち時間",
      "priority": "C",
      "minutes": 90,
      "goal": "async・awaitの意味を理解し、待機中のUIや操作制限を設計する。",
      "sections": [
        {
          "title": "非同期が解く問題",
          "text": "通信の応答を待つ間に別の仕事を進めたいときに非同期処理を使います。計算そのものが自動で高速化されるわけではありません。CPUを使い続ける重い処理と、I/Oを待つ処理は区別します。"
        },
        {
          "title": "asyncとawait",
          "text": "async defはコルーチン関数を定義します。呼ぶだけでは通常は本体が完了せず、await等で実行を進めます。awaitは結果が得られるまで待ちますが、イベントループが他の仕事を実行できる待機です。普通のtime.sleepをasync関数内で呼ぶとイベントループを止めます。"
        },
        {
          "title": "タイムアウトと多重送信",
          "text": "asyncio.wait_forで待ち時間を制限できます。待機中は送信ボタンを無効にし、結果に対応するリクエストを識別します。古い応答が新しい状態を上書きすることもあるため、キャンセルや要求IDを考えます。"
        },
        {
          "title": "実行環境の違い",
          "text": "PCのスクリプトではasyncio.run(main())が基本です。既にイベントループがあるブラウザ・ノートブックでは同じ使い方ができない場合があります。本サイトの実行欄はトップレベルawaitに対応しています。学習用の短い待機だけを使います。"
        }
      ],
      "example": "import asyncio\nasync def delayed_reply():\n    await asyncio.sleep(0.05)\n    return \"応答\"\nresult = await delayed_reply()\nprint(result)\n",
      "roles": [
        "delayed_replyは短い待ち時間の代役です。",
        "awaitは完了を待って戻り値を受け取ります。",
        "PCではasync関数mainにまとめ、asyncio.run(main())で起動します。"
      ],
      "pitfall": "async defと書いただけで中の同期通信が非同期になるわけではありません。対応する通信APIを選びます。",
      "task": "async def delayed_hint()を作り、await asyncio.sleep(0.01)の後に「東へ進もう」を返します。",
      "starter": "import asyncio\nasync def delayed_hint():\n    return \"\"\nprint(await delayed_hint())\n",
      "solution": "import asyncio\nasync def delayed_hint():\n    await asyncio.sleep(0.01)\n    return \"東へ進もう\"\nprint(await delayed_hint())\n",
      "tests": [
        {
          "label": "コルーチン",
          "code": "import inspect\nassert inspect.iscoroutinefunction(delayed_hint)\n"
        },
        {
          "label": "非同期の戻り値",
          "code": "assert await delayed_hint() == \"東へ進もう\"\n"
        }
      ],
      "hint": "実行欄ではawaitをトップレベルで使えます。PC用にはmain関数へ移してください。",
      "quiz": {
        "question": "asyncにすれば重い数値計算は必ず速くなる？",
        "options": [
          "必ず速くなる",
          "待機と計算は別なので保証されない",
          "CPUコアが自動で増える"
        ],
        "answer": 1,
        "why": "非同期は主に待ち時間の活用です。CPU処理の高速化には別の手法が必要です。"
      },
      "references": [
        "https://docs.python.org/ja/3/library/asyncio-task.html"
      ]
    },
    {
      "id": "20",
      "title": "数値処理とベクトルの基礎",
      "priority": "C",
      "minutes": 90,
      "goal": "ベクトル計算をPythonで表し、数値配列ライブラリの役割を理解する。",
      "sections": [
        {
          "title": "数値処理は発展として学ぶ",
          "text": "募集要項はNumPyやモデル学習を明示していません。まず文法とAPI接続を優先し、余裕があれば数値処理を学びます。C++やDirectXMathの経験があれば、成分の配列、内積、長さは馴染みのある題材です。"
        },
        {
          "title": "Pythonのlistと数値配列",
          "text": "listは任意のオブジェクトを並べます。NumPyのndarrayはdtypeとshapeを持ち、まとまった数値演算に向きます。配列を使えばどんな処理でも速くなるわけではありませんが、多数の数値を一括処理する際に利点があります。"
        },
        {
          "title": "形と型を確認する",
          "text": "行列の次元、配列のshape、floatやintなどのdtypeを先に確認します。NumPyではブロードキャストで異なる形が計算できる場合があり、意図せず成立する計算もあります。単位や座標系と同様、形を契約として扱います。"
        },
        {
          "title": "まず標準ライブラリで内積を書く",
          "text": "今回は追加導入なしで内積を実装します。zipは二つのコレクションを対応させますが、通常は短い方で終了するため、長さが同じかの検証が必要です。NumPyへの移行は手元の仮想環境で、公式入門を参照して行ってください。"
        }
      ],
      "example": "a = [1, 2, 3]\nb = [4, 5, 6]\nproducts = [x * y for x, y in zip(a, b)]\nprint(products)\nprint(sum(products))\n",
      "roles": [
        "aとbは同じ長さのベクトルです。productsは成分ごとの積です。",
        "zipは対応する成分を一組ずつ取り出します。",
        "sumは全ての積を合計し、内積を得ます。"
      ],
      "pitfall": "zipだけでは長さ不一致を見逃します。演習では異なる長さをValueErrorにします。",
      "task": "dot(a, b)を作ります。同じ長さなら内積、異なる長さならValueErrorです。空同士は0にします。",
      "starter": "def dot(a, b):\n    return 0\nprint(dot([1, 2, 3], [4, 5, 6]))\n",
      "solution": "def dot(a, b):\n    if len(a) != len(b):\n        raise ValueError(\"ベクトルの長さが違います\")\n    return sum(x * y for x, y in zip(a, b))\nprint(dot([1, 2, 3], [4, 5, 6]))\n",
      "tests": [
        {
          "label": "内積",
          "code": "assert dot([1,2,3],[4,5,6]) == 32\n"
        },
        {
          "label": "空",
          "code": "assert dot([],[]) == 0\n"
        },
        {
          "label": "負数",
          "code": "assert dot([-1,2],[3,4]) == 5\n"
        },
        {
          "label": "長さ違い",
          "code": "try:\n    dot([1], [1,2])\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError(\"ValueErrorが必要\")\n"
        }
      ],
      "hint": "長さを先に比べてからzipを使います。",
      "quiz": {
        "question": "NumPyを使う際、先に確認すべきものは？",
        "options": [
          "変数名の長さ",
          "shapeとdtype",
          "必ずGPUを使っているか"
        ],
        "answer": 1,
        "why": "計算の次元と数値型は、正しい数値処理の前提です。"
      },
      "references": [
        "https://numpy.org/doc/stable/user/absolute_beginners.html",
        "https://docs.python.org/ja/3/library/functions.html#zip"
      ]
    },
    {
      "id": "21",
      "title": "AI技術の整理と当日の準備",
      "priority": "C",
      "minutes": 90,
      "goal": "学習・推論・検索を区別し、3日間で完成できる範囲を判断する。",
      "sections": [
        {
          "title": "モデル学習とAPI利用は別",
          "text": "モデル学習はデータからパラメータを調整する作業、推論は学習済みモデルから出力を得る作業です。外部APIで生成AIを使うだけなら、通常は自分でモデルを学習しません。深層学習を網羅しないと参加できない、と募集文だけから判断する根拠はありません。"
        },
        {
          "title": "RAG等は必要が出たら",
          "text": "RAGは必要な情報を検索して、生成時の文脈に加える構成です。埋め込みはテキスト等を比較に使える数値表現へ変換します。世界設定が短いなら、そのまま文脈に入れる方が単純な場合もあります。技術名を先に決めず、実際の問題から選びます。"
        },
        {
          "title": "3日間のスコープ",
          "text": "最初に遊びの核を一つ選び、通信なしの縦一列の流れを完成させます。次に実AIを接続し、失敗時の代替動作を入れます。最後に遊びの評価と発表を整えます。機能を増やして未完成にするより、検証できる小さな体験を持つ方が議論できます。"
        },
        {
          "title": "応募と参加準備は並行する",
          "text": "2026年10月16日23:59が応募締切です。学習の終了まで登録や応募書類の確認を後回しにしないでください。日程・応募資格は公式情報で再確認します。Python未経験なら利用経験があると偽らず、実際に作り動かした内容を説明できる状態を目指します。"
        }
      ],
      "example": "# 外部AIなしで、まず条件と結果を確認する小さな処理です。\ndef choose_feature(days_left, has_api):\n    if days_left <= 1:\n        return \"完成と失敗対策\"\n    return \"AI接続\" if has_api else \"モックでゲーム完成\"\nprint(choose_feature(3, False))\n",
      "roles": [
        "days_leftとhas_apiは開発上の制約を表します。",
        "choose_featureは優先順位の考え方を簡単な分岐として示したものです。",
        "現実の計画は品質やチームの能力も考慮します。この関数が万能な計画ではありません。"
      ],
      "pitfall": "技術を学んだ時間と、手を動かして実装できることを混同しないでください。応募時は実績を具体的に説明します。",
      "task": "choose_feature(days_left, has_api)を例の仕様で実装します。1日以下なら「完成と失敗対策」、それ以外はAPIがあれば「AI接続」、なければ「モックでゲーム完成」。",
      "starter": "def choose_feature(days_left, has_api):\n    return \"\"\nprint(choose_feature(3, False))\n",
      "solution": "def choose_feature(days_left, has_api):\n    if days_left <= 1:\n        return \"完成と失敗対策\"\n    return \"AI接続\" if has_api else \"モックでゲーム完成\"\nprint(choose_feature(3, False))\n",
      "tests": [
        {
          "label": "残り1日",
          "code": "assert choose_feature(1, True) == \"完成と失敗対策\"\n"
        },
        {
          "label": "APIあり",
          "code": "assert choose_feature(3, True) == \"AI接続\"\n"
        },
        {
          "label": "APIなし",
          "code": "assert choose_feature(3, False) == \"モックでゲーム完成\"\n"
        }
      ],
      "hint": "締切直前の条件を最初に判定します。",
      "quiz": {
        "question": "APIで生成AIを使うには自分でモデル学習が必須？",
        "options": [
          "必須",
          "通常は学習済みモデルを利用できる",
          "Pythonではモデル学習しかできない"
        ],
        "answer": 1,
        "why": "API利用とモデル学習は別です。今回の準備は実装と接続を優先します。"
      },
      "references": [
        "https://www.jp.square-enix.com/recruit/fresh/intern/2026/09/018407.html"
      ]
    }
  ],
  "checked": "2026-10-09",
  "version": 1
};
