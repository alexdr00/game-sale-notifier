import React, { useEffect, useState } from 'react';
import GameCard from '../cards/GameCard';
import SearchForm from '../forms/SearchForm';
import axiosFetch from "../../config/axios";

function Games() {
  const [search, saveSearch] = useState('');

  useEffect(()=>{
    const getAllGames = async () => {


    }


  }, [search])
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <SearchForm
            saveSearch={saveSearch}
          />
        </div>
      </div>
      <GameCard/>
    </>

  )
};

export default Games;