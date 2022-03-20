import { checkStorage, readItem, saveItem } from "../../helper/localStorage";
import { IAction, types } from "./cartActions";

export interface IState {
  selectedItems: Array<{ id: number; quantity: number }>;
}

const initialState: IState = {
  selectedItems: checkStorage("cart") ? readItem("cart") : [],
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
      saveItem("cart", itemsAdd);

      return { ...state, selectedItems: itemsAdd };

    case types.remove:
      const itemsRemove = [...state.selectedItems].filter(
        (item) => item.id !== action.id
      );
      saveItem("cart", itemsRemove);

      return { ...state, selectedItems: itemsRemove };

    case types.increase:
      const itemsIncrease = [...state.selectedItems];
      const itemsIncreaseIndex = itemsIncrease.findIndex(
        (item) => item.id === action.id
      );
      itemsIncrease[itemsIncreaseIndex].quantity++;
      saveItem("cart", itemsIncrease);

      return { ...state, selectedItems: itemsIncrease };

    case types.decrease:
      const itemsDecrease = [...state.selectedItems];
      const itemsDecreaseIndex = itemsDecrease.findIndex(
        (item) => item.id === action.id
      );

      itemsDecrease[itemsDecreaseIndex].quantity--;
      saveItem("cart", itemsDecrease);

      return { ...state, selectedItems: itemsDecrease };

    case types.clear:
      saveItem("cart", []);

      return { ...state, selectedItems: [] };

    default:
      return initialState;
  }
}
