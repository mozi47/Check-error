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

export const singlepostReducer = (state={post:null}, action) =>{
    const {payload, type} = action
    
    switch (type) {
        case "FETCH_SINGLE_POST":
            return {
                ...state,
                post:payload
            }
        case "RESET_DATA":
            return {
                ...state,
                post:null
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

export const updatePostReducer = (state={post:[]}, action) =>{
    const {payload,type} = action
    switch (type) {
        case "UPDATE_POST":
            return {
                ...state,
                post: payload
            }
        default:
            return state;
    }
}

export const deletePostReducer = (state={loading:true}, action) =>{
    const {payload,type} = action
    switch (type) {
        case "DELETE_POST":
            return {
                loading: false
            }
        default:
            return state;
    }
}

export const likePostReducer = (state={like:[]}, action) =>{
    const {payload,type} = action
    console.log(payload)
    switch (type) {
        case "LIKE_POST":
            return {
                ...state,
                like: payload,
            }
        default:
            return state;
    }
}