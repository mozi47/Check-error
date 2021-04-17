import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import {postsReducer,updatePostReducer,singlepostReducer, deletePostReducer, likePostReducer} from "./reducers/PostReducer"
import {authReducer} from "./reducers/AuthReducer"

const reducers = combineReducers({
    getposts: postsReducer,
    updatePost: updatePostReducer,
    singlepost: singlepostReducer,
    deletePost: deletePostReducer,
    likePost: likePostReducer,
    auth: authReducer,
})
const initialState={}
const middleware = [thunk]
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store