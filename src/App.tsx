import * as esbuild from "esbuild-wasm";
import * as React from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App = () => {
  const [input, setInput] = React.useState(
    "const App = () => { return <div>Hello there!</div>;}\nconsole.log(App);"
    // 'import "bulma/css/bulma.css"'
  );
  const [code, setCode] = React.useState("");
  const serviceRef = React.useRef<esbuild.Service | null>(null);

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
    setCode(res.outputFiles[0].text);
    try {
      eval(res.outputFiles[0].text);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <textarea
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe src="/test.html" sandbox="" title="execSandbox"></iframe>
    </div>
  );
};

export default App;
