import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "../reducers/index";

let store;
const middleware = [thunk];
export function configureStore() {
  store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return store;
}
