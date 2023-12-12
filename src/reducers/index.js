import { combineReducers } from "redux";
import authReducer from './authReducer.jsx';
import categoryReducer from "./categoryReducer.jsx";
import ProveedorReducer from "./proveedorReducer.jsx";
import productReducer from "./productsReducer.jsx";
import trasaccionReducer from "./trasaccionReducer.jsx";

const reducer = combineReducers({
auth:authReducer,
category:categoryReducer,
proveedor:ProveedorReducer,
product:productReducer,
transacciones:trasaccionReducer

});

export default reducer;

