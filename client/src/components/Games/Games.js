import React, { useEffect, useState } from 'react';
import SearchForm from '../forms/SearchForm';

function Games() {
  const [search, saveSearch] = useState('');
  const [results, saveResults] = useState();


  useEffect(() => {
    if (Object.keys(search).length === 0) return;
  }, [search, results])

  return (
    <>

        <SearchForm
          saveSearch={saveSearch}
          saveResults={saveResults}>
        </SearchForm>

    </>
  )};

export default Games;