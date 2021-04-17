import axios from "axios"

export const signup = (formData, history)=>async(dispatch)=>{
    try {
        const { data } = await axios.post("/api/user/signup",formData)
        dispatch({type:"AUTH", data})
        history.push("/")
    } catch (error) {
        console.error(error)
    }
}

export const signin = (formData, history)=>async(dispatch)=>{
    try {
        const {data} = await axios.post("/api/user/signin",formData)
        dispatch({type:"AUTH", data})       
        history.push("/")
    } catch (error) {
        console.error(error)
    }
}