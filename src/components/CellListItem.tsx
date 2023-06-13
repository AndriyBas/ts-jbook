import * as React from "react";
import { Cell } from "../state";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
import ActionBar from "./ActionBar";
import "./CellListItem.css";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === "code") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar cellId={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = <TextEditor cell={cell} />;
  }
  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
