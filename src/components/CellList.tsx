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
      {cells.map((cell) => (
        <React.Fragment key={cell.id}>
          <AddCell nextCellId={cell.id} />
          <CellListItem cell={cell} />
        </React.Fragment>
      ))}
      <AddCell nextCellId={null} forceVisible={cells.length === 0} />
    </div>
  );
};

export default CellList;
