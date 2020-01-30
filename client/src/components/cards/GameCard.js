import React from 'react';
import './GameCardStyle.css';


function GameCard() {
  return(
    <div className="card">
      <img className="card-img-top" src="https://media.wired.com/photos/5e1e646743940d0008009167/master/pass/Science_Cats-84873657.jpg" alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>

  )

};

export default GameCard;