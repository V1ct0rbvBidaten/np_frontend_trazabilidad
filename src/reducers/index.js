import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { filterReducer } from "./filterReducer";
import { filterColumnsReducer } from "./filterColumnsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  filter: filterReducer,
  columns: filterColumnsReducer,
});

export default rootReducer;
