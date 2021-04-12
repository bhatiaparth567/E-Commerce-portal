import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "redux-logger";

import reducers from "../reducers/index";

let store;
const middleware = [thunk, logger];
export function configureStore() {
  store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return store;
}
