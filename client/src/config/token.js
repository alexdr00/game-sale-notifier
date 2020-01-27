import axiosFetch from './axios';

const tokenAuth = token =>{
    if(token){
        axiosFetch.defaults.headers.common['Authorization'] = token;
    }else{
        delete axiosFetch.defaults.headers.common['Authorization'];
    }
}

export default tokenAuth();