import React,{ useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axiosFetch from '../config/axios';
import tokenAuth from '../config/token';
import Swal from 'sweetalert2'


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
            await userAuthenticate();
        }catch (error) {
            const alert = await Swal.fire({
                text: error.response.data.error
            })
            dispatch({
                type: REGISTER_ERROR,
                payload: alert
            })
        }
    }

    const userAuthenticate = async () =>{
        const token = localStorage.getItem('token');
        if (token){
            tokenAuth(token)
        }
        try{
            const response = await axiosFetch.get('/auth/:userId');
            //console.log(response);
            dispatch({
                type: GET_USER,
                payload:response.data.user
            })
        }catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }

    }

   const login = async information => {
       try{
           const response = await axiosFetch.post('/auth/login', information);
           dispatch({
               type:SUCCESSFUL_LOGIN,
               payload: response.data
           });

           //await userAuthenticate();
       }catch (error) {
           const alert = await Swal.fire({
               text: error.response.data.error
           })
           dispatch({
               type: LOGIN_ERROR,
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
                signUp,
                login,
            }}
        >{children}

        </AuthContext.Provider>

    )



}

export default AuthState;

