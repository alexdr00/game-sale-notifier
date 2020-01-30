import React, { useContext } from 'react';
import Navigation from './Navigation';
import AuthContext from '../../context/auth/authContext';

function Header() {
  const authContext = useContext(AuthContext);
  const { signOut, token } = authContext
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">Game Sale Notifier</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
              aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>


      <div className="collapse navbar-collapse" id="navbarColor02">
        <Navigation/>
        <ul className="nav navbar-nav navbar-right">
        {token ?(
          <li className="nav-item">
            <a className="nav-link" href="/SignOut" onClick={() => signOut()}>SignOut</a>
          </li>
        ) : (
          <li className="nav-item">
            <a className="nav-link" href="/Login">Login</a>
          </li>
        )}
          </ul>
      </div>
    </nav>
  )
}

export default Header;