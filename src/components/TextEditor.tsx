import * as React from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";
import { Cell } from "../state";
import { useActions } from "../hooks/useActions";
import ActionBar from "./ActionBar";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const divRef = React.useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = React.useState(false);
  const { updateCell } = useActions();

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
        <MDEditor
          value={cell.content}
          onChange={(val) => updateCell(cell.id, val ?? "")}
        />
      </div>
    );
  }

  return (
    <>
      <div onClick={() => setEditing(true)} className="text-editor card">
        <div className="card-content">
          <MDEditor.Markdown
            source={cell.content || "Click to edit"}
            style={{ background: "none" }}
          />
        </div>
      </div>
      <ActionBar cellId={cell.id} />
    </>
  );
};

export default TextEditor;
