import {SUCCESSFUL_REGISTER, REGISTER_ERROR, GET_USER, SUCCESSFUL_LOGIN, LOGIN_ERROR, SIGN_OUT} from '../types/index'

export default (state, action)=>{
    switch (action.type) {
        case SUCCESSFUL_REGISTER:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticate: true,
                message:null
            }
        case GET_USER:
            return {
                ...state,
                user:action.payload
            }


        case LOGIN_ERROR:
        case REGISTER_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                message: action.payload
            }

        default:
            return state;

    }
}