import * as React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) => {
    if (!cells) return [];
    return cells.order.map((id) => cells.data[id]);
  });

  return (
    <div>
      {cells.map((cell) => (
        <CellListItem cell={cell} key={cell.id} />
      ))}
    </div>
  );
};

export default CellList;
