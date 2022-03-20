import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import cartReducer from "./cartCounters/cartReducer";

const store = createStore(cartReducer, composeWithDevTools());

export default store;
