import * as React from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundle from "../bundler";
import Resizable from "./Resizable";

const DEFAULT_VAL =
  "const App = () => { return <div>Hello there!</div>;}\nconsole.log(App);";
// 'import "bulma/css/bulma.css"'

const CodeCell = () => {
  const [input, setInput] = React.useState(DEFAULT_VAL);
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setError(output.error);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={DEFAULT_VAL}
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
