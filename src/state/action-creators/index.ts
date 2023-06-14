import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import {
  Direction,
  DeleteCellAction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
  Action,
} from "../actions";
import { CellType } from "../cell";
import bundle from "../../bundler";

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

export const insertCellAfter = (
  id: string | null,
  cellType: CellType
): InsertCellAfterAction => {
  return {
    type: ActionType.InsertCellAfter,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BundleStart,
      payload: {
        cellId,
      },
    });
    const result = await bundle(input);
    dispatch({
      type: ActionType.BundleComplete,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};
