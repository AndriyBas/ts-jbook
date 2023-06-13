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

export interface InsertCellBeforeAction {
  type: ActionType.InsertCellBefore;
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
  | InsertCellBeforeAction
  | UpdateCellAction;

export type Direction = "up" | "down";
