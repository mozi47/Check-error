export const postsReducer = (state={posts:[]}, action) =>{
    const {payload, type} = action
    
    switch (type) {
        case "FETCH_ALL_POSTS":
            return {
                ...state,
                posts:payload
            }
        default:
            return state;
    }
}

export const createPostReducer = (state={post:[]}, action) =>{
    const {payload,type} = action
    switch (type) {
        case "CREATE_POST":
            return {
                ...state,
                post: payload
            }
        default:
            return state;
    }
}