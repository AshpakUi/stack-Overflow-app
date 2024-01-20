
const ErrorhandleReducer=(state=null,action)=>{
switch(action.type){
    case "UserLoginError":return action.payload;
    default :return state
}
}

export default ErrorhandleReducer;