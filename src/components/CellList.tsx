import * as React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) => {
    if (!cells) return [];
    return cells.order.map((id) => cells.data[id]);
  });

  return (
    <div>
      <AddCell previousCellId={null} forceVisible={cells.length === 0} />
      {cells.map((cell) => (
        <React.Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell previousCellId={cell.id} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default CellList;
