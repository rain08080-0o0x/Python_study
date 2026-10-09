/* Pythonは別スレッドで実行し、無限ループ時もページを操作できるようにします。 */
const INDEX_URL = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/";
let runtime;
let loading;
let output = "";
let truncated = false;
function append(line) {
  const text = line + "\n";
  const remaining = 20000 - output.length;
  if (text.length > remaining) truncated = true;
  if (remaining > 0) output += text.slice(0, remaining);
}
async function init() {
  if (runtime) return runtime;
  if (!loading) loading = (async () => {
    postMessage({type: "loading"});
    importScripts(INDEX_URL + "pyodide.js");
    runtime = await loadPyodide({indexURL: INDEX_URL});
    runtime.setStdout({batched: append});
    runtime.setStderr({batched: append});
    postMessage({type: "ready", version: runtime.runPython("import sys; sys.version.split()[0]")});
    return runtime;
  })();
  return loading;
}
self.onmessage = async ({data}) => {
  let namespace;
  try {
    const py = await init();
    output = ""; truncated = false;
    namespace = py.runPython("dict(__name__='__main__')");
    const lines = data.stdin === "" ? [] : data.stdin.replace(/\r/g, "").split("\n");
    namespace.set("_course_input_json", JSON.stringify(lines));
    py.runPython(
      "import json as _course_json\n" +
      "_course_inputs = _course_json.loads(_course_input_json)\n" +
      "def input(prompt=''):\n" +
      "    if prompt:\n" +
      "        print(prompt, end='')\n" +
      "    if not _course_inputs:\n" +
      "        raise EOFError('標準入力欄の行数が足りません')\n" +
      "    return _course_inputs.pop(0)\n",
      {globals: namespace}
    );
    await py.runPythonAsync(data.code, {globals: namespace, filename: "main.py"});
    const results = [];
    if (data.mode === "test") {
      for (const test of data.tests) {
        try {
          await py.runPythonAsync(test.code, {globals: namespace, filename: "exercise_test.py"});
          results.push({label: test.label, pass: true});
        } catch (error) {
          results.push({label: test.label, pass: false, error: String(error)});
        }
      }
    }
    postMessage({type: "result", output: output + (truncated ? "\n[出力を20000文字で省略]" : ""), results});
  } catch (error) {
    postMessage({type: "error", output, error: String(error)});
  } finally {
    if (namespace) namespace.destroy();
  }
};
