import React, { useEffect, useState } from 'react';
import useDebounce from '../../utils/useDebounce';
import axiosFetch from "../../config/axios";

function SearchForm({ saveSearch, saveResults }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  async function searchCharacters() {
    try {
      const query = {}
      const tokenAuth = localStorage.getItem('token');
      const results = await axiosFetch.post(`/game/search`, { query }, { headers: { 'Authorization': tokenAuth } })

      return results.data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
      try {
        if (debouncedSearchTerm && debouncedSearchTerm) {
          setIsSearching(true)
          searchCharacters(debouncedSearchTerm).then(results => {
            setIsSearching(false)
            setResults(results.data)
          })
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
  saveResults(results)

  return (
    <>
      <form className="col-12">
        <fieldset className="text-center">
          <legend>Search games</legend>
        </fieldset>
        <div className="container mt-5">
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
            </div>
          </div>
        </div>
      {results.map(result => (
        <div className="text-center">
          <div className="cover-container d-flex w-100 p-3 mx-auto flex-column">
            <div className="album py-5 ">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <br/>
                    <div className="card mb-4 shadow-sm">
                      <img className="img" src={result.cover} alt="Game"/>
                      <div className="card-body">
                        <h5 className="card-title">{result.name}</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to
                          additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      </form>
    </>
  )
};

export default SearchForm;