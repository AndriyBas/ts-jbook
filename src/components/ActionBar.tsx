import * as React from "react";
import { useActions } from "../hooks/useActions";
import "./ActionBar.css";

interface ActionBarProps {
  cellId: string;
}

const ActionButton = ({
  onClick,
  icon,
}: {
  onClick: () => void;
  icon: string;
}) => {
  return (
    <button className="button is-primary is-small" onClick={onClick}>
      <span className="icon">
        <i className={`fas ${icon}`}></i>
      </span>
    </button>
  );
};

const ActionBar: React.FC<ActionBarProps> = ({ cellId }) => {
  const { deleteCell, moveCell } = useActions();
  return (
    <div className="action-bar">
      <ActionButton icon="fa-arrow-up" onClick={() => moveCell(cellId, "up")} />
      <ActionButton
        icon="fa-arrow-down"
        onClick={() => moveCell(cellId, "down")}
      />
      <ActionButton icon="fa-times" onClick={() => deleteCell(cellId)} />
    </div>
  );
};

export default ActionBar;
