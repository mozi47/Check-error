import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import {postsReducer} from "./reducers/PostReducer"

const reducers = combineReducers({
    getposts: postsReducer
})
const initialState={}
const middleware = [thunk]
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store