export interface IAction {
  type: types;
  id?: number;
}

export enum types {
  add,
  remove,
  increase,
  decrease,
  clear,
}

export function addItem(id: number): IAction {
  return { type: types.add, id: id };
}

export function removeItem(id: number): IAction {
  return { type: types.remove, id: id };
}

export function itemIncrease(id: number): IAction {
  return { type: types.increase, id: id };
}

export function itemDecrease(id: number): IAction {
  return { type: types.decrease, id: id };
}

export function clear(): IAction {
  return { type: types.clear };
}
