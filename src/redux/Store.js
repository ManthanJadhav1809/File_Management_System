import {applyMiddleware,combineReducers,createStore} from "redux";
import{composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk";
import AuthReducer from "./reducers/AuthReducer";
import fileFolderReducer from "./reducers/fileFolderReducer";

const rootReducer=combineReducers({auth:AuthReducer,filefolders:fileFolderReducer})

const Store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
); 
export default Store;