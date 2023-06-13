import * as React from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";

const TextEditor: React.FC = () => {
  const divRef = React.useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState("# Header\n**Hello world!!!**");

  React.useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        divRef.current &&
        event.target &&
        divRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={divRef} className="text-editor">
        <MDEditor value={value} onChange={(val) => setValue(val ?? "")} />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown source={value} style={{ background: "none" }} />
      </div>
    </div>
  );
};

export default TextEditor;
