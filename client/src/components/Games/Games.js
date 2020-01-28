import React, {useContext, useEffect} from 'react';
import AuthContext from '../../context/authContext';


function Games() {
    const  authContext = useContext(AuthContext);
    const {  userAuthenticate } = authContext;

    useEffect(()=>{
        //userAuthenticate();
    })
    return(
        <h1>Hi, Im the game component</h1>

    )

}

export default Games