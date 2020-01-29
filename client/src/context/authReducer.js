import { SUCCESSFUL_REGISTER, REGISTER_ERROR, GET_USER, SUCCESSFUL_LOGIN, LOGIN_ERROR, SIGN_OUT } from '../types/index'

export default (state, action) => {
  switch (action.type) {
    case SUCCESSFUL_REGISTER:
    case SUCCESSFUL_LOGIN:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        authenticate: true,
        message: null,
        loading: false
      }
    case GET_USER:
      return {
        ...state,
        authenticate: true,
        user: action.payload,
        loading: false
      }
    case SIGN_OUT:
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        user: null,
        authenticate: null,
        message: action.payload,
        loading: false
      }

    default:
      return state;

  }
}