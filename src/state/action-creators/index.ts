import { ActionType } from "../action-types";
import {
  Direction,
  DeleteCellAction,
  InsertCellBeforeAction,
  MoveCellAction,
  UpdateCellAction,
} from "../actions";
import { CellType } from "../cell";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UpdateCell,
    payload: { id, content },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DeleteCell,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MoveCell,
    payload: { id, direction },
  };
};

export const insertCellBefore = (
  id: string | null,
  cellType: CellType
): InsertCellBeforeAction => {
  return {
    type: ActionType.InsertCellBefore,
    payload: {
      id,
      type: cellType,
    },
  };
};