import * as esbuild from "esbuild-wasm";
import * as React from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

const DEFAULT_VAL =
  "const App = () => { return <div>Hello there!</div>;}\nconsole.log(App);";
// 'import "bulma/css/bulma.css"'

const App = () => {
  const [input, setInput] = React.useState(DEFAULT_VAL);
  const serviceRef = React.useRef<esbuild.Service | null>(null);
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  const startService = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      // wasmURL: "/esbuild.wasm",
      wasmURL: "https://www.unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  React.useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!serviceRef.current) return;
    // const res = await serviceRef.current.transform(input, {
    //   loader: "jsx",
    //   target: "es2015",
    // });

    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
    }

    const res = await serviceRef.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    console.log(res);
    iframeRef.current?.contentWindow?.postMessage(res.outputFiles[0].text, "*");
  };

  const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <div id="errorRoot" style="color: red"></div>
    <script>
      window.addEventListener(
        "message",
        (event) => {
          try {
            eval(event.data);
          } catch (error) {
            console.error(error);
            const rootEl = document.getElementById("errorRoot");
            rootEl.innerHTML = "<div><h4>Runtime Error</h4>" + error + "</div>";
          }
        },
        false
      );
    </script>
  </body>
</html>

  `;

  return (
    <div>
      <CodeEditor
        initialValue={DEFAULT_VAL}
        onChange={(value) => setInput(value)}
      />
      <textarea
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        ref={iframeRef}
        srcDoc={html}
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-scripts allow-downloads allow-pointer-lock"
        title="Code Preview"
      ></iframe>
    </div>
  );
};

export default App;
