import axios from "axios"

export const allPosts = () => async (dispatch) =>{
    try {
        const {data} = await axios.get("/api/post")
        dispatch({
            type: "FETCH_ALL_POSTS",
            payload:data
        })
    } catch (error) {
        console.log(error)
    }
}

export const singlePost = (id) => async (dispatch) =>{
    try {
        const {data} = await axios.get(`/api/post/single/${id}`)
        dispatch({
            type: "FETCH_SINGLE_POST",
            payload:data
        })
    } catch (error) {
        console.log(error)
    }
}

export const createPostAction = (postData) => async (dispatch) =>{
    try {
        const {data} = await axios.post('/api/post',postData)
        dispatch({
            type:"CREATE_POST",
            payload: data
        })
    } catch (error) {
        console.log(error.message)       
    }
}

export const updatePostAction = (id,postData) => async (dispatch) =>{
    try {
        const {data} = await axios.put(`/api/post/${id}`,postData)
        dispatch({
            type:"UPDATE_POST",
            payload: data
        })
    } catch (error) {
        console.log(error.message)       
    }
}