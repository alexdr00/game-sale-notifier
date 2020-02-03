import React, { useEffect, useState } from 'react';
import SearchForm from '../forms/SearchForm';


function Games() {
  const [search, saveSearch] = useState('');

  useEffect(()=>{
    if(Object.keys(search).length === 0) return;
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

    </>

  )
};

export default Games;