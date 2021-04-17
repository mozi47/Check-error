import axios from "axios"

//FETCH SEARCH OR ALL POST WITH PAGINATION
export const allPosts = (search="", page=1) => async (dispatch) =>{
    try {
        const {data} = await axios.get(`/api/post?search=${search}&page=${page}`)
        dispatch({
            type: "FETCH_ALL_POSTS",
            payload:data
        })
        //console.log(data)
    } catch (error) {
        console.log(error)
    }
}

export const singlePost = (id) => async (dispatch) =>{
    try {
        const token = JSON.parse(localStorage.getItem("profile")).token
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        const {data} = await axios.get(`/api/post/single/${id}`,config)
        dispatch({
            type: "FETCH_SINGLE_POST",
            payload:data
        })
    } catch (error) {
        console.log(error)
    }
}

//front end react post blog
export const createPostAction = (postData) => async (dispatch) =>{
    try {
        //console.log(postData)
        const token = JSON.parse(localStorage.getItem("profile")).token
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        const {data} = await axios.post('/api/post',postData,config)
        dispatch({
            type:"CREATE_POST",
            payload: data
        })
    } catch (error) {
        console.log(error.message)       
    }
}

//update blog post
export const updatePostAction = (id,postData) => async (dispatch) =>{
    try {
        const token = JSON.parse(localStorage.getItem("profile")).token
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        const {data} = await axios.put(`/api/post/${id}`,postData,config)
        dispatch({
            type:"UPDATE_POST",
            payload: data
        })
    } catch (error) {
        console.log(error.message)       
    }
}

//delete blog post
export const deletePostAction = (id) => async (dispatch) =>{
    try {
        const token = JSON.parse(localStorage.getItem("profile")).token
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        const {data} = await axios.delete(`/api/post/single/${id}/delete`,config)
        dispatch({
            type:"DELETE_POST",
            payload: data
        })
    } catch (error) {
        console.log(error.message)       
    }
}

//like blog post
export const likePostAction = (id) => async (dispatch) =>{
    try {
        const token = JSON.parse(localStorage.getItem("profile")).token
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        //console.log(config)
        const {data} = await axios.put(`/api/post/single/${id}/like`,"",config)
        dispatch({
            type:"LIKE_POST",
            payload: data
        })
    } catch (error) {
        console.log(error)       
    }
}

//send email action
export const sendEmailAction = (postData) => async (dispatch) =>{
    try {
        const {data} = await axios.post("/api/post/contactus",postData)
        dispatch({
            type:"SEND_EMAIL",
        })
    } catch (error) {
        console.log(error)       
    }
}