import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axiosFetch from '../../config/axios';
import Swal from 'sweetalert2';
import { SUCCESSFUL_REGISTER, REGISTER_ERROR, SUCCESSFUL_LOGIN, LOGIN_ERROR, SIGN_OUT } from '../../types';

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    authenticate: null,
    message: null,
    loading: true
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const signUp = async data => {
    try {
      const response = await axiosFetch.post('/auth/register', data);
      console.log(response.data);

      dispatch({
        type: SUCCESSFUL_REGISTER,
        payload: response.data
      })
    } catch (error) {
      const alert = await Swal.fire({
        text: error.response.data.error
      })
      dispatch({
        type: REGISTER_ERROR,
        payload: alert
      })
    }
  };

  const login = async information => {
    try {
      const response = await axiosFetch.post('/auth/login', information);

      dispatch({
        type: SUCCESSFUL_LOGIN,
        payload: response.data
      });

    } catch (error) {
      const alert = await Swal.fire({
        text: error.response.data.error
      })
      dispatch({
        type: LOGIN_ERROR,
        payload: alert
      })
    }
  };

  const signOut = () => {
    dispatch({
      type: SIGN_OUT
    })
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticate: state.authenticate,
        message: state.message,
        loading: state.loading,
        signUp,
        login,
        signOut,

      }}
    >{children}

    </AuthContext.Provider>
  )
};

export default AuthState;

