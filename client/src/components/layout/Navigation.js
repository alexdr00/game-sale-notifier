import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

function Navigation() {
  const authContext = useContext(AuthContext);
  const { authenticate } = authContext

  return (
    <>
      {authenticate &&
      <ul className="navbar-nav mr-auto">
        <li className="nav-item ">
          <a className="nav-link" href="/Explore"> Explore </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Games">Games</a>
        </li>
      </ul>}
    </>

  )
}

export default Navigation;