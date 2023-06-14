import { ActionType } from "../action-types";
import { CellType } from "../cell";

export interface MoveCellAction {
  type: ActionType.MoveCell;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.DeleteCell;
  payload: string;
}

export interface InsertCellAfterAction {
  type: ActionType.InsertCellAfter;
  payload: {
    id: string | null;
    type: CellType;
  };
}

export interface UpdateCellAction {
  type: ActionType.UpdateCell;
  payload: {
    id: string;
    content: string;
  };
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction;

export type Direction = "up" | "down";
