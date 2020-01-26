import React,{useReducer} from 'react'

const AuthState = props=>{
    const initialState = {
        token:localStorage.getItem('token'),
        authenticate: null,
        user:null,
        message:null
    }
    const [state, dispatch] = useReducer()



}


