import * as React from "react";
import CodeEditor from "./code-editor";
import Preview from "./Preview";
import bundle from "../bundler";

const DEFAULT_VAL =
  "const App = () => { return <div>Hello there!</div>;}\nconsole.log(App);";
// 'import "bulma/css/bulma.css"'

const CodeCell = () => {
  const [input, setInput] = React.useState(DEFAULT_VAL);
  const [code, setCode] = React.useState("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue={DEFAULT_VAL}
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
