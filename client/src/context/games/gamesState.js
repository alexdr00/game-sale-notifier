import React, { useEffect, useState } from 'react';
import GamesContext from './gamesContext';
import axiosFetch from '../../config/axios';


function getGames({ children }) {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [games, setGames] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {


  })

  return (
    <GamesContext.Provider
      value={{}}>{children}

    </GamesContext.Provider>

  )

}