import React, {useContext} from 'react';
import AuthContext from '../../context/authContext';


function Games() {
    const  authContext = useContext(authContext)
    return(
        <h1>Hi, Im the game component</h1>

    )

}

export default Games