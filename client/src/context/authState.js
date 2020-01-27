import React,{ useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axiosFetch from '../config/axios';


import {SUCCESSFUL_REGISTER, REGISTER_ERROR, GET_USER, SUCCESSFUL_LOGIN, LOGIN_ERROR, SIGN_OUT} from '../types/index'

const AuthState = ({children}) =>{
    const initialState = {
        token:localStorage.getItem('token'),
        authenticate: null,
        user:null,
        message:null
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const signUp = async information => {
        try {
            const response = await axiosFetch.post('/auth/register', information);
            console.log(response.data);

            dispatch({
                type: SUCCESSFUL_REGISTER,
                payload: response.data
            })
        }catch (error) {
            console.log(error.response.data.error);
            const alert = {
                message: error.response.data.error
            }



            dispatch({
                type: REGISTER_ERROR,
                payload: alert
            })
        }

    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticate: state.authenticate,
                user: state.user,
                message: state.message,
                signUp
            }}
        >{children}

        </AuthContext.Provider>

    )



}

export default AuthState;

