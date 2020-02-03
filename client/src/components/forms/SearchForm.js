import React, { useEffect, useState } from 'react';
import useDebounce from '../../utils/useDebounce';
import axiosFetch from "../../config/axios";

function SearchForm({ saveSearch }) {

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);


  async function searchCharacters() {
    try {
      const query = {}
      const tokenAuth = localStorage.getItem('token');
      const results = await axiosFetch.post(`/game/search`, { query }, { headers: { 'Authorization': tokenAuth } })
      console.log(results.data.data)

      return results.data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
      try {
        if (debouncedSearchTerm) {
          setIsSearching(true)
          searchCharacters(debouncedSearchTerm).then(results => {
            console.log(results)
            setIsSearching(false)
            setResults(results.data)
          });
        } else {
          setResults([]);
        }
      } catch (error) {
        console.log(error)
      }
    },
    [debouncedSearchTerm]
  );
  saveSearch(searchTerm)

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
            <div key={result.igdbKey}>
              <h4>{result.name}</h4>
              <img alt="Games">{result.cover_url}</img>
            </div>
          ))}
        </div>
      </div>
    </form>
  )


}


export default SearchForm;