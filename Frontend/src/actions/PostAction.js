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

export const createPostAction = (postData) => async (dispatch) =>{
    try {
        /*const config={
            headers:{
                "Content-Type":"application/json"
            }
        }*/
        const {data} = await axios.post('/api/post',postData)
        dispatch({
            type:"CREATE_POST",
            payload: data
        })
    } catch (error) {
        console.log(error.message)       
    }
}