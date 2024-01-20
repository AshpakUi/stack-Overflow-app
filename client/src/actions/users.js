import *as api from "../api"

export const fetchAllUsers =()=> async (dispatch)=>{
try {
    const {data}=await api.fetchAllUser()
    dispatch({type:"FETCH_USERS",payload:data})
} catch (error) {
    console.log(error.message);
}
}

export const updateProfile=(id,updateData)=>async(dispatch)=>{
try {
    const {data}= await api.updateProfile(id,updateData)
    dispatch({type:"UPDATE_CURRENT_USER",payload:data})
    dispatch(fetchAllUsers())
} catch (error) {
    console.log(error);
}
}