export const authReducer = (state={authData:null}, action)=>{
    const {payload, type} = action
    switch(type) {
        case "AUTH":
            localStorage.setItem("profile",JSON.stringify({...action?.data}))    
            return {
                ... state,
                authData: action?.data
            }
        case "LOGOUT":
            localStorage.clear()
            return{
                ...state,
                authData:null
            }
        default:
            return state
    }
}