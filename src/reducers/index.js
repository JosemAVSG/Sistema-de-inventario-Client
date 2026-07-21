import { combineReducers } from "redux";
import authReducer from './authReducer.jsx';
import trasaccionReducer from "./trasaccionReducer.jsx";

const reducer = combineReducers({
  auth: authReducer,
  transacciones: trasaccionReducer
});

export default reducer;
