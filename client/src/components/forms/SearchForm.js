import React, { useEffect, useState } from 'react';
import useDebounce from '../../utils/useDebounce';
import axiosFetch from "../../config/axios";
import tokenAuth from "../../config/token";


function SearchForm({ saveSearch }) {

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
      if (debouncedSearchTerm) {
        setIsSearching(true)
        searchCharacters(debouncedSearchTerm).then(results => {
          setIsSearching(false)
          setResults(results)
        });

      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm]
  );
  saveSearch(searchTerm)

  function searchCharacters(data) {
    const tokenAuth = localStorage.getItem('token');
    return axiosFetch.post(`/game/search`, data,  { headers: {'Authorization': tokenAuth } })
      .then(r => r.json())
      .then(r => r.data.results)
      .catch(error => {
        console.log(error);
        return [];
      })
  }

  return (
    <form className="col-12">
      <fieldset className="text-center">
        <legend>Search games</legend>
      </fieldset>
      <div className="row mt-4">
        <div className="col-md-4">
          <input
            name="name"
            className="form-control"
            type="text"
            placeholder="Insert the name of the game"
            onChange={e => setSearchTerm(e.target.value)}
          />
          {isSearching && <div>Searching ...</div>}
          {results.map(result => (
            <div key={result.game_id}>
              <h4>{result.game_name}</h4>
              <img alt>{result.cover_url}</img>
            </div>
          ))}
        </div>
      </div>
    </form>
  )

}

export default SearchForm;