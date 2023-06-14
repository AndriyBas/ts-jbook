import * as React from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import "./CodeCell.css";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(
    (state) => state.bundles && state.bundles[cell.id]
  );
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells!;
    const orderedCells = order.map((id) => data[id]);
    const cummulativeCode: string[] = [
      `
      const show = (value) => {
        if (typeof value === "object") {
          document.querySelector("#root").innerHTML = JSON.stringify(value);
        } else {
          document.querySelector("#root").innerHTML = value;
        }
      };
      `,
    ];
    for (let c of orderedCells) {
      if (c.type === "code") cummulativeCode.push(c.content);
      if (c.id === cell.id) break;
    }
    return cummulativeCode;
  });

  console.log(cumulativeCode);
  const cumulativeCodeJoined = cumulativeCode.join("\n");

  React.useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCodeJoined);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCodeJoined);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCodeJoined, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="preview-background">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.error} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
