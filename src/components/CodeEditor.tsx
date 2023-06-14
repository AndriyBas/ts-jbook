import * as React from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import babelParser from "prettier/parser-babel";
import "./CodeEditor.css";
// import "./syntax.css"; // NOT Used (custom JSX highlighter with 'monaco-jsx-highlighter')

interface CodeEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const monacoEditorRef = React.useRef<any | null>(null);

  const onEditorDidMount: OnMount = (monacoEditor, _): void => {
    monacoEditorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange && onChange(monacoEditor.getValue());
    });
    monacoEditor.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    if (!monacoEditorRef.current) return;
    const unformatted = monacoEditorRef.current.getValue();
    // format value
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [babelParser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, ""); // replace the last newline
    monacoEditorRef.current.setValue(formatted);
    // set the formatted value back to the editor
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onMount={onEditorDidMount}
        value={initialValue}
        height="100%"
        language="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          // tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
