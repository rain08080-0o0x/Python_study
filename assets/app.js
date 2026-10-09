(() => {
  "use strict";
  const lessons = window.COURSE.lessons;
  const SOURCE = "https://www.jp.square-enix.com/recruit/fresh/intern/2026/09/018407.html";
  const KEY = "python-quest-v1";
  const main = document.getElementById("main");
  const $ = id => document.getElementById(id);
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const codeBlock = code => '<pre><code>' + esc(code) + '</code></pre>';
  const link = (url, text) => '<a target="_blank" rel="noopener noreferrer" href="' + esc(url) + '">' + esc(text) + '</a>';
  let state = {done: [], drafts: {}, quiz: {}, tests: {}, last: "01"};
  let canStore = true;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "null");
    if (saved) state = normalize(saved);
  } catch { canStore = false; }
  let worker = null, busy = false, initTimer = null, runTimer = null, toastTimer = null;
  let current = null;
  function normalize(raw) {
    const ids = lessons.map(x => x.id);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("形式を確認してください");
    const clean = {done: [], drafts: {}, quiz: {}, tests: {}, last: ids.includes(raw.last) ? raw.last : "01"};
    clean.done = Array.isArray(raw.done) ? [...new Set(raw.done.filter(id => ids.includes(id)))] : [];
    for (const id of ids) {
      if (typeof raw.drafts?.[id] === "string") clean.drafts[id] = raw.drafts[id].slice(0, 100000);
      if (Number.isInteger(raw.quiz?.[id]) && raw.quiz[id] >= 0 && raw.quiz[id] < 3) clean.quiz[id] = raw.quiz[id];
      if (raw.tests?.[id] === true) clean.tests[id] = true;
    }
    return clean;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch { canStore = false; toast("自動保存できません。進捗をJSONで書き出してください。"); }
  }
  function toast(text) {
    $("toast").textContent = text; $("toast").style.display = "block";
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { $("toast").style.display = "none"; }, 4000);
  }
  function progress() {
    $("progress-text").textContent = state.done.length + " / " + lessons.length;
    $("progress").max = lessons.length; $("progress").value = state.done.length;
    for (const lesson of lessons) {
      const node = document.querySelector('[data-lesson="' + lesson.id + '"]');
      if (!node) continue;
      node.classList.toggle("done", state.done.includes(lesson.id));
      node.classList.toggle("active", current?.id === lesson.id);
      if (current?.id === lesson.id) node.setAttribute("aria-current", "page"); else node.removeAttribute("aria-current");
    }
  }
  function nav() {
    const names = {A: "A / 応募前に最優先", B: "B / 当日までの実践", C: "C / 余裕があれば"};
    $("lesson-nav").innerHTML = ["A", "B", "C"].map(priority =>
      '<p class="nav-group">' + names[priority] + '</p>' + lessons.filter(x => x.priority === priority).map(x =>
        '<a class="lesson-link" data-lesson="' + x.id + '" href="#lesson-' + x.id + '"><span class="num">' +
        x.id + '</span><span>' + esc(x.title) + '</span></a>'
      ).join("")
    ).join("");
    progress();
  }
  const days = [
    ["1日目", "01〜03：実行、型、分岐。変数の型と条件の境界を説明する。", "4時間"],
    ["2日目", "04〜05：ループ、標準入力、リスト。例を変更して結果を予測する。", "4時間"],
    ["3日目", "06：辞書と集計。入力件数が増えても動く集計を作る。", "2時間"],
    ["4日目", "07：関数。入力と戻り値の契約を決める。", "2時間"],
    ["5日目", "08：例外。意図的に壊したコードを直す。", "1.5時間"],
    ["6日目", "09：計算量とソート。同点・空・元データ保持を確認。", "2.5時間"],
    ["7日目", "10：総合演習。応募書類とテスト提出は締切前に完了する。", "2.5時間"]
  ];
  function home() {
    const next = lessons.find(x => !state.done.includes(x.id)) || lessons[0];
    main.innerHTML =
      '<div class="top-line"><p class="eyebrow">LEARNING ROADMAP</p><span class="pill">全21講座 / 約41時間</span></div>' +
      '<h1>ゲーム開発経験を、<br>Pythonの実装力へ。</h1>' +
      '<p class="intro">Python未経験から、調べながら実装できる状態を目指す学習コース。C++・C#との違いを押さえ、生成AIを使うゲームの接続・検証まで進めます。各講座は「解説 → 例を試す → 自分で演習 → 確認」の順です。</p>' +
      '<a class="button-primary" href="#lesson-' + next.id + '">' + (state.done.length ? '続きから学ぶ' : '01から学ぶ') + '</a>' +
      '<div class="deadline"><p><strong>応募締切：2026年10月16日 23:59（日本時間）</strong></p>' +
      '<p>開催：10月31日〜11月2日。応募資格にはPython利用経験（調べながら実装可能）が含まれます。プログラミングテストと応募書類の提出が必要です。' + link(SOURCE, "募集要項を確認") + '</p>' +
      '<small>2026年10月9日確認。学習が終わるまで応募手続きの確認を待たないでください。本サイトは非公式の自主学習教材です。</small></div>' +
      (!canStore ? '<p class="no-store">ブラウザの保存機能が利用できません。ページを閉じる前に進捗を書き出してください。</p>' : '') +
      '<div class="cards">' +
      '<section class="card"><span class="pill">優先度 A</span><h2>応募前の最優先</h2><p>01〜10。文法・データ構造・関数・デバッグ・問題演習。読んだ知識を使って実装する。</p><div class="time">18.5<small>時間 / 目安</small></div><a href="#lesson-01">Pythonの基礎から進む</a></section>' +
      '<section class="card"><span class="pill b">優先度 B</span><h2>当日までの実践準備</h2><p>11〜18。開発環境・JSON・API・応答検証・チーム開発。NPC対話を完成させる。</p><div class="time">18<small>時間 / 目安</small></div><a href="#lesson-11">実践の内容を見る</a></section>' +
      '<section class="card"><span class="pill c">優先度 C</span><h2>余裕があれば</h2><p>19〜21。非同期処理・ベクトル・AIの整理。基礎を飛ばして先に進まない。</p><div class="time">4.5<small>時間 / 目安</small></div><a href="#lesson-19">発展の内容を見る</a></section></div>' +
      '<div class="section-title"><h2>応募前の7日間プラン</h2><small>1日の時間が足りない場合はAを優先</small></div>' +
      '<div class="schedule">' + days.map(d => '<div class="day"><strong>' + d[0] + '</strong><p>' + d[1] + '</p><small>' + d[2] + '</small></div>').join("") + '</div>' +
      '<p class="muted">日付ではなく学習開始からの日数です。目安時間は個人差があります。10月17日〜30日は11〜18を1日1〜2時間程度で進め、残りは苦手な演習と完成課題の確認に使います。学習時間は応募資格や選考通過の保証ではありません。</p>' +
      '<div class="section-title"><h2>カリキュラム一覧</h2><small>必要な講座へ直接移動できます</small></div>' +
      '<div class="catalog">' + lessons.map(l => '<a href="#lesson-' + l.id + '"><span class="chapter">' + l.id + '</span><div><h3>' + esc(l.title) +
      '</h3><small>優先度' + l.priority + ' / ' + l.minutes + '分' + (state.done.includes(l.id) ? ' / 学習済み' : '') + '</small><p>' + esc(l.goal) + '</p></div></a>').join("") +
      '</div><div class="section-title"><h2>進捗の持ち出し</h2></div><p class="muted">コード下書き・確認問題の回答・学習済みマークはこのブラウザだけに保存されます。別のPCに移る場合はJSONを書き出し、移動先で読み込みます。</p>' + exportBar();
    bindExport();
  }
  function exportBar() {
    return '<div class="exportbar"><button id="export">進捗を書き出す</button><button id="import">進捗を読み込む</button><input id="import-file" type="file" accept=".json,application/json" hidden></div>';
  }
  function download(name, text, type = "text/plain") {
    const url = URL.createObjectURL(new Blob([text], {type}));
    const a = document.createElement("a"); a.href = url; a.download = name;
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function bindExport() {
    $("export").onclick = () => download("python-quest-progress.json", JSON.stringify(state, null, 2), "application/json");
    $("import").onclick = () => $("import-file").click();
    $("import-file").onchange = async event => {
      const file = event.target.files[0]; if (!file) return;
      try {
        if (file.size > 3000000) throw new Error("ファイルが大きすぎます");
        const imported = normalize(JSON.parse(await file.text()));
        if (!confirm("現在の進捗と下書きを、このファイルの内容へ置き換えますか？")) return;
        state = imported; save(); render(); toast("進捗を読み込みました。");
      } catch { toast("読み込めませんでした。進捗を書き出したJSONを選んでください。"); }
    };
  }
  function lessonView(l) {
    current = l; state.last = l.id; save();
    main.innerHTML =
      '<header class="lesson-header"><div class="top-line"><p class="eyebrow">LESSON ' + l.id + ' / 21</p><a href="#home">ロードマップ</a></div>' +
      '<h1>' + esc(l.title) + '</h1><div class="meta"><span class="pill ' + l.priority.toLowerCase() + '">優先度 ' + l.priority + '</span>' +
      '<span>学習目安 ' + l.minutes + '分</span><span>解説・演習・確認</span></div>' +
      '<div class="toolbar"><button id="jump-exercise">演習へ移動</button><button id="jump-workspace">実行欄へ移動</button></div></header>' +
      '<div class="lesson-layout"><article class="reading"><div class="goal"><strong>到達目標</strong><br>' + esc(l.goal) + '</div>' +
      l.sections.map(s => '<h2>' + esc(s.title) + '</h2><p>' + esc(s.text) + '</p>').join("") +
      '<h2>小さな実行例</h2>' + codeBlock(l.example) + '<button id="load-example">例を実行欄へ入れる</button>' +
      '<h3>変数・関数の役割</h3><ul>' + l.roles.map(r => '<li>' + esc(r) + '</li>').join("") + '</ul>' +
      '<div class="callout warn"><strong>つまずきやすい点</strong><br>' + esc(l.pitfall) + '</div>' +
      '<section class="exercise"><h2>自分で実装する</h2><p>' + esc(l.task) + '</p>' +
      '<p class="muted">まず解答を見ずに書きます。「演習を確認」で用意したケースを試せます。テストは全仕様を保証するものではありません。値を変えた追加確認も行ってください。</p>' +
      '<details><summary>ヒントを見る</summary><p>' + esc(l.hint) + '</p></details>' +
      '<details class="solution"><summary>模範解答と読み方</summary><p>唯一の書き方ではありません。課題の各条件がどの行に対応するかを確認し、解答を閉じて書き直してください。</p>' +
      codeBlock(l.solution) + '<button id="load-solution">解答を実行欄へ入れる</button></details>' +
      '<details><summary>確認するテストケース</summary>' +
      l.tests.map(t => '<h3>' + esc(t.label) + '</h3>' + codeBlock(t.code)).join("") + '</details></section>' +
      '<section class="quiz"><h2>理解度を確認する</h2><p>' + esc(l.quiz.question) + '</p><fieldset style="border:0;padding:0;margin:0"><legend class="muted">回答を一つ選択</legend>' +
      l.quiz.options.map((o, i) => '<label><input type="radio" name="quiz" value="' + i + '"' + (state.quiz[l.id] === i ? ' checked' : '') + '>' + esc(o) + '</label>').join("") +
      '</fieldset><button id="check-quiz">回答を確認</button><p id="quiz-feedback" class="quiz-feedback" role="status"></p></section>' +
      '<h3>公式資料で調べる</h3><ul class="source-links">' + l.references.map(r => '<li>' + link(r, sourceLabel(r)) + '</li>').join("") + '</ul></article>' +
      '<section class="workspace" aria-label="Python実行欄"><h2>Python実行欄</h2>' +
      '<small>編集して実行できます。Tabで4スペースを入力、Escで入力欄から移動できます。実行ごとに変数は初期化されます。</small>' +
      '<label for="editor" class="muted">コード</label><textarea id="editor" class="editor" spellcheck="false" autocapitalize="off" autocorrect="off" aria-label="Pythonコード">' +
      esc(state.drafts[l.id] ?? l.starter) + '</textarea>' +
      '<label class="stdin-label" for="stdin">標準入力（input用・一行ずつ）</label><textarea id="stdin" spellcheck="false">' + (l.id === "04" ? '3\n10 20 30' : '') + '</textarea>' +
      '<div class="toolbar"><button id="run" class="primary">実行する</button><button id="test">演習を確認</button><button id="stop" disabled>停止</button></div>' +
      '<p id="runner-status" class="status" role="status">初回実行時にPythonを読み込みます。</p>' +
      '<pre id="output" class="console" aria-label="実行結果" tabindex="0">出力はここに表示されます。</pre><div id="test-results" class="test-results" role="status"></div>' +
      '<div class="toolbar"><button id="reset-code">演習のひな形に戻す</button><button id="download-code">コードを保存</button></div>' +
      '<small>初回のPython読込にはインターネット接続と数十MBの転送が必要です。読込後は1回の実行を8秒で停止します。重い処理はPCで実行してください。</small>' +
      '<details><summary>実行できないとき</summary><p>HTTPSのGitHub Pages、またはPCのローカルHTTPサーバーで開いてください。file://で開いた場合はWorkerが利用できないことがあります。CDNへ接続できない環境でも本文と解答は読めます。各講座の.pyも付属しています。</p></details>' +
      (l.priority === "B" ? '<div class="runner-notice">実API通信・環境構築はPC側の課題です。この実行欄には秘密のAPIキーを入力しないでください。JSON・モック・検証の演習はここで実行できます。</div>' : '') +
      '</section></div>' +
      '<footer class="lesson-footer">' + (Number(l.id) > 1 ? '<a href="#lesson-' + lessons[Number(l.id) - 2].id + '">前の講座</a>' : '<a href="#home">ロードマップ</a>') +
      '<button id="mark-done" class="mark-done' + (state.done.includes(l.id) ? ' checked' : '') + '">' + (state.done.includes(l.id) ? '学習済みを解除' : '説明できたので学習済みにする') + '</button>' +
      (Number(l.id) < lessons.length ? '<a href="#lesson-' + lessons[Number(l.id)].id + '">次の講座</a>' : '<a href="#sources">到達目標を確認</a>') + '</footer>';
    $("editor").oninput = () => {
      state.drafts[l.id] = $("editor").value;
      delete state.tests[l.id];
      $("test-results").textContent = "コードを変更しました。演習を再確認してください。";
      save();
    };
    $("jump-exercise").onclick = () => document.querySelector(".exercise").scrollIntoView({block: "start"});
    $("jump-workspace").onclick = () => { document.querySelector(".workspace").scrollIntoView({block: "start"}); $("editor").focus({preventScroll: true}); };
    $("editor").onkeydown = e => {
      if (e.key === "Escape") { $("run").focus(); return; }
      if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        const editor = e.target;
        editor.setRangeText("    ", editor.selectionStart, editor.selectionEnd, "end");
        editor.dispatchEvent(new Event("input"));
      }
    };
    function setCode(code) {
      if (busy) { toast("実行を停止してからコードを変更してください。"); return; }
      if ($("editor").value !== code && $("editor").value !== l.starter && !confirm("実行欄のコードを置き換えますか？必要なら先にコードを保存してください。")) return;
      $("editor").value = code; state.drafts[l.id] = code; delete state.tests[l.id]; save();
      $("test-results").textContent = ""; $("editor").focus();
      toast("実行欄へ入れました。");
    }
    $("load-example").onclick = () => setCode(l.example);
    $("load-solution").onclick = () => setCode(l.solution);
    $("reset-code").onclick = () => setCode(l.starter);
    $("download-code").onclick = () => {
      let code = $("editor").value;
      if (l.id === "19") code = "import asyncio\n\nasync def main():\n" + code.split("\n").map(line => "    " + line).join("\n") + "\n\nif __name__ == '__main__':\n    asyncio.run(main())\n";
      download("lesson_" + l.id + ".py", code);
    };
    $("run").onclick = () => execute("run", l);
    $("test").onclick = () => execute("test", l);
    $("stop").onclick = () => stop("実行を停止しました。次回はPythonを再読込します。");
    $("check-quiz").onclick = () => {
      const selected = document.querySelector('input[name="quiz"]:checked');
      if (!selected) { $("quiz-feedback").textContent = "回答を選んでください。"; return; }
      const choice = Number(selected.value); state.quiz[l.id] = choice; save();
      $("quiz-feedback").textContent = (choice === l.quiz.answer ? "正解です。 " : "もう一度考えてください。 ") + l.quiz.why;
    };
    $("mark-done").onclick = () => {
      if (state.done.includes(l.id)) state.done = state.done.filter(id => id !== l.id); else state.done.push(l.id);
      save(); progress();
      $("mark-done").classList.toggle("checked", state.done.includes(l.id));
      $("mark-done").textContent = state.done.includes(l.id) ? "学習済みを解除" : "説明できたので学習済みにする";
    };
    if (state.tests[l.id]) $("test-results").textContent = "保存済み：以前のコードは全ケースに合格しました。変更したら再確認してください。";
  }
  function sourceLabel(url) {
    if (url.includes("square-enix")) return "スクウェア・エニックス 募集要項";
    if (url.includes("docs.python.org")) return "Python公式: " + url.split("/").pop().split("#")[0].replace(".html", "");
    if (url.includes("numpy.org")) return "NumPy公式入門";
    if (url.includes("nist.gov")) return "NIST: 生成AIのリスク管理";
    if (url.includes("git-scm")) return "Git公式: diff";
    if (url.includes("mozilla.org")) return "MDN: HTTPステータス";
    return url;
  }
  function setBusy(value) {
    busy = value;
    for (const id of ["run", "test", "reset-code", "load-example", "load-solution"]) if ($(id)) $(id).disabled = value;
    if ($("stop")) $("stop").disabled = !value;
    if ($("editor")) $("editor").readOnly = value;
  }
  function stop(message) {
    if (worker) worker.terminate();
    worker = null; clearTimeout(initTimer); clearTimeout(runTimer); setBusy(false);
    if ($("runner-status") && message) $("runner-status").textContent = message;
  }
  function finish() { clearTimeout(initTimer); clearTimeout(runTimer); setBusy(false); }
  function execute(mode, l) {
    if (busy) return;
    if (location.protocol === "file:") {
      $("runner-status").textContent = "file://では実行できません。GitHub PagesかローカルHTTPサーバーで開いてください。"; return;
    }
    setBusy(true); $("test-results").textContent = "";
    $("output").textContent = ""; $("runner-status").textContent = worker ? "実行中…" : "Python読込中… 初回は時間がかかります。";
    const startDeadline = () => {
      clearTimeout(initTimer);
      runTimer = setTimeout(() => {
        stop("8秒を超えたため停止しました。ループ・待機時間を確認してください。");
        $("output").textContent += "\n実行環境を終了しました。";
      }, 8000);
    };
    if (!worker) {
      try { worker = new Worker("./assets/python-worker.js"); }
      catch { stop("Python実行環境を起動できません。HTTPSで開き直してください。"); return; }
      initTimer = setTimeout(() => { stop("Pythonの読み込みが90秒で完了しませんでした。接続を確認して再実行してください。"); }, 90000);
      worker.onmessage = ({data}) => {
        if (!current || current.id !== l.id) return;
        if (data.type === "loading") return;
        if (data.type === "ready") { $("runner-status").textContent = "Python " + data.version + " / 実行中…"; startDeadline(); return; }
        if (data.type === "result") {
          $("output").textContent = data.output || "表示出力はありません。";
          if (data.results.length) {
            const all = data.results.every(r => r.pass);
            $("test-results").innerHTML = data.results.map(r => '<div class="test-row ' + (r.pass ? 'pass' : 'fail') + '">' +
              (r.pass ? '合格：' : '不合格：') + esc(r.label) + (!r.pass ? '<details><summary>エラー詳細</summary>' + codeBlock(r.error) + '</details>' : '') + '</div>').join("");
            state.tests[l.id] = all; save();
            $("runner-status").textContent = all ? "全ケースに合格。追加の値でも試し、説明できたら学習済みにします。" : "不合格のケースがあります。条件とエラーを確認してください。";
          } else $("runner-status").textContent = "実行が完了しました。";
          finish();
        } else if (data.type === "error") {
          $("output").textContent = data.output + "\n" + data.error;
          const wasReady = !!runTimer;
          $("runner-status").textContent = wasReady ? "エラーが発生しました。末尾の種類とmain.pyの行を確認してください。" : "Pythonを読み込めません。CDNへの接続を確認するか、付属の.pyをPCで実行してください。";
          if (!wasReady) { worker.terminate(); worker = null; }
          finish();
        }
      };
      worker.onerror = () => { stop("Python実行環境を読み込めません。接続を確認し、付属の.pyをPCで実行できます。"); };
    } else startDeadline();
    worker.postMessage({mode, code: $("editor").value, stdin: $("stdin").value, tests: mode === "test" ? l.tests : []});
  }
  function guide() {
    main.innerHTML = '<p class="eyebrow">GUIDE</p><h1>使い方・GitHub Pagesでの公開</h1><article class="sheet">' +
      '<h2>学習の進め方</h2><ol><li>解説を読み、変数と関数の役割を確認する。</li><li>実行例を入れて動かし、値を変えたときの結果を予測する。</li><li>ひな形へ戻し、演習を自分で書く。</li><li>演習の確認と理解度確認を行い、失敗したら原因を説明する。</li><li>入力・戻り値・境界を説明できたら学習済みにする。</li></ol>' +
      '<p>画面を見ながら解答を写すだけでは実装経験は増えにくくなります。解答を閉じて再実装し、別の入力でも動くことを確認してください。</p>' +
      '<h2>GitHub Pagesへ配置する</h2><ol><li>ZIPを展開し、index.html、assets、exercises、local_project、README.mdを含む中身をリポジトリへ置きます。ZIP自体だけを置かないでください。</li>' +
      '<li>リポジトリのSettings → Pages → Build and deploymentでSourceをDeploy from a branchにします。</li>' +
      '<li>Branchをmain、Folderを/(root)にし、Saveを押します。index.htmlがリポジトリ直下にある構成です。</li>' +
      '<li>公開処理が完了したらPagesに表示されたURLを開きます。プロジェクト用リポジトリでも相対パスで動きます。</li></ol>' +
      '<p>リポジトリ名をusername.github.ioにするとユーザーサイト、別名なら通常はhttps://username.github.io/リポジトリ名/です。使える公開設定はプランとリポジトリの公開範囲に依存します。</p>' +
      '<p>' + link("https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site", "GitHub公式の公開手順") + '</p>' +
      '<h2>PCで試す</h2><p>フォルダで次を実行し、http://localhost:8000を開きます。pyがない場合はpythonまたはpython3へ読み替えます。</p>' +
      codeBlock("py -m http.server 8000") +
      '<p>Python自体の導入は' + link("https://www.python.org/downloads/", "Python公式ダウンロード") + 'を利用してください。PC演習はPython 3.12以降を想定しています。</p>' +
      '<h2>ブラウザ内実行の範囲</h2><ul><li>Pyodide 0.27.7をCDNから初回実行時に読み込みます。サイトの本文には外部フォントや画像の通信は不要です。</li><li>実行ごとに変数を初期化します。仮想ファイルは同じWorker内で残る場合がありますが、再読込や停止後の保持は保証しません。</li>' +
      '<li>実行は8秒で停止できます。画面は別スレッドなので無限ループ中も停止操作できます。出力表示は20000文字までです。</li>' +
      '<li>標準入力は入力欄の行をinputで消費します。対話しながら後から入力する形式には対応しません。</li><li>PCのpip、仮想環境、urllibの通信、端末のファイル等はブラウザと異なります。これらはPC側で学びます。</li></ul>' +
      '<h2>付属ファイル</h2><p>exercises/01〜21にexample.py、starter.py、solution.pyと課題説明があります。local_projectにはAPIなしで動くNPC対話、テスト、HTTP接続例があります。コードを保存した講座19のファイルはPC用にasyncio.runで起動する形へ変換されます。</p>' +
      '<h2>進捗とコードの保存</h2><p>保存はブラウザのlocalStorageです。アカウント同期はありません。ブラウザのデータ削除で消えるため、必要なら下から書き出してください。ファイルには下書きも含まれます。</p>' + exportBar() +
      '<h2>非公式教材としての位置づけ</h2><p>公式募集要項をもとに構成した自主学習教材です。主催企業の教材ではなく、実際の選考問題、採点基準、開発環境を再現したものではありません。学習例で使う名前やゲーム設定は説明用です。</p></article>';
    bindExport();
  }
  function sources() {
    main.innerHTML = '<p class="eyebrow">GOALS & SOURCES</p><h1>到達目標と根拠</h1><article class="sheet sources">' +
      '<h2>募集要項に書かれていること</h2><p>Python利用経験（調べながら実装可能）、プログラミング経験、全日程参加、対象の卒業期間、AIエンジニアを目指すことが応募資格に含まれます。3名1チームで生成AIを組み込んだゲームを開発します。' + link(SOURCE, "公式募集要項") + '（2026年10月9日確認）。</p>' +
      '<h2>本カリキュラムで判断したこと</h2><p>Aの文法・データ構造・問題演習は、Python利用経験とプログラミングテストへの一般的な準備として優先しました。BのJSON・HTTP・応答検証・モックは、生成AIを組み込む短期のチーム開発に役立つと判断した技術です。特定ライブラリやアルゴリズムが選考で必須と発表されたわけではありません。Cは発展内容です。</p>' +
      '<div class="table-scroll"><table><thead><tr><th>段階</th><th>自分で確認する到達基準</th></tr></thead><tbody>' +
      '<tr><td>A</td><td>入力を読み、list・dict・関数を使って処理を書ける。空・同点・境界を試せる。トレースバックを読んで修正できる。</td></tr>' +
      '<tr><td>B</td><td>PCで環境を再現できる。JSONの型と値を検証し、通信失敗でも継続するプロトタイプを作れる。担当範囲と契約を共有できる。</td></tr>' +
      '<tr><td>C</td><td>待機と計算の違い、数値の形と型、AIの学習と利用の違いを説明できる。</td></tr></tbody></table></div>' +
      '<h2>最後のチェック</h2><ul><li>模範解答を閉じて講座10を実装できる。</li><li>local_projectを起動し、テストを実行できる。</li><li>APIなしのモックと実際のAI接続を区別して説明できる。</li><li>失敗時の代替動作とAPIキーの扱いを説明できる。</li><li>応募資格と締切を確認し、応募に必要な提出を完了する。</li></ul>' +
      '<h2>調べるときの順番</h2><p>公式ドキュメント → 小さなコードで確認 → 自分の処理へ反映、の順です。エラー全文を調べる場合は秘密の値を削除します。AIに相談するときも、期待する結果・最小の再現コード・実際のエラーを示します。</p>' +
      '<h2>参照資料</h2><ul class="sources-list">' +
      [[SOURCE,"スクウェア・エニックス: 開催・応募条件"],
       ["https://docs.python.org/ja/3/tutorial/","Python公式チュートリアル: 文法と標準機能"],
       ["https://docs.python.org/ja/3/library/","Python公式標準ライブラリ: JSON・HTTP・テスト等"],
       ["https://pyodide.org/en/0.27.7/usage/quickstart.html","Pyodide公式: ブラウザPythonの構成"],
       ["https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site","GitHub公式: Pagesの作成"],
       ["https://numpy.org/doc/stable/user/absolute_beginners.html","NumPy公式: 数値配列の入門"]].map(([u,t])=>'<li>'+link(u,t)+'</li>').join("") +
      '</ul><p class="muted">解説・演習・コードはこのサイト用に作成した教材です。公式文書の転載ではありません。各講座末尾にも対応する一次資料へのリンクを置いています。</p></article>';
  }
  function render() {
    if (busy) stop();
    if (worker) { worker.terminate(); worker = null; }
    current = null;
    $("sidebar").classList.remove("open"); $("menu").setAttribute("aria-expanded", "false");
    const route = location.hash.slice(1);
    const lesson = lessons.find(x => route === "lesson-" + x.id);
    if (lesson) lessonView(lesson);
    else if (route === "guide") guide();
    else if (route === "sources") sources();
    else home();
    progress();
    document.title = (current ? current.id + " " + current.title : "学習ロードマップ") + " | Python Quest";
    window.scrollTo(0, 0); main.focus({preventScroll: true});
  }
  $("menu").onclick = () => { const open = $("sidebar").classList.toggle("open"); $("menu").setAttribute("aria-expanded", String(open)); };
  window.addEventListener("hashchange", render);
  nav(); render();
})();
