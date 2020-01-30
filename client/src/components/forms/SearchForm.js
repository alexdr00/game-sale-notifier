import React, { useState } from 'react';


function SearchForm({ saveSearch }) {

  const [game, saveGame] = useState('');

  saveSearch(game)

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
            onChange={e => saveGame(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Search game "
          />
        </div>

      </div>
    </form>
  )

}

export default SearchForm;