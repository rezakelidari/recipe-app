import { IAction, types } from "./counterActions";

export interface IState {
  selectedItems: Array<{ id: number; quantity: number }>;
}

const initialState: IState = {
  selectedItems: [],
};

export default function counterReducer(
  state: IState = initialState,
  action: IAction
): IState {
  switch (action.type) {
    case types.add:
      const itemsAdd = [...state.selectedItems];
      !itemsAdd.find((item) => item.id === action.id) &&
        itemsAdd.push({ id: action.id as number, quantity: 1 });
      return { ...state, selectedItems: itemsAdd };

    case types.remove:
      const itemsRemove = [...state.selectedItems].filter(
        (item) => item.id !== action.id
      );
      return { ...state, selectedItems: itemsRemove };

    case types.increase:
      const itemsIncrease = [...state.selectedItems];
      const itemsIncreaseIndex = itemsIncrease.findIndex(
        (item) => item.id === action.id
      );

      itemsIncrease[itemsIncreaseIndex].quantity++;

      return { ...state, selectedItems: itemsIncrease };

    case types.decrease:
      const itemsDecrease = [...state.selectedItems];
      const itemsDecreaseIndex = itemsDecrease.findIndex(
        (item) => item.id === action.id
      );

      itemsDecrease[itemsDecreaseIndex].quantity--;

      return { ...state, selectedItems: itemsDecrease };

    case types.clear:
      return { ...state, selectedItems: [] };

    default:
      return initialState;
  }
}
