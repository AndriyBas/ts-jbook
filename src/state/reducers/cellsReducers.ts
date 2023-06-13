import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";
import { produce } from "immer";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce(
  (state: CellsState = initialState, action: Action): CellsState => {
    switch (action.type) {
      case ActionType.UpdateCell:
        const { id: updId, content } = action.payload;
        state.data[updId].content = content;
        return state;
      // return {
      //   ...state,
      //   data: {
      //     ...state.data,
      //     [id]: {
      //       ...state.data[id],
      //       content,
      //     },
      //   },
      // };

      case ActionType.DeleteCell:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        return state;

      case ActionType.MoveCell:
        const { id: moveId, direction } = action.payload;
        const index = state.order.findIndex((id) => id === moveId);
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= state.order.length) return state;
        // swap
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = moveId;
        return state;

      case ActionType.InsertCellBefore:
        const cell: Cell = {
          id: randomId(),
          type: action.payload.type,
          content: "",
        };
        const insertIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );
        if (insertIndex < 0) {
          state.order.push(cell.id);
        } else {
          state.order.splice(insertIndex, 0, cell.id);
        }
        state.data[cell.id] = cell;
        return state;

      default:
        return state;
    }
  }
);

const randomId = () => {
  return Math.random().toString(36).substring(2, 6);
};

export default reducer;
