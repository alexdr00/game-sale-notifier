import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const hamburguerIcon = <FontAwesomeIcon icon={faBars} />;
  const closeIcon = <FontAwesomeIcon icon={faTimes} />;
  const navIcon = isNavOpen ? closeIcon : hamburguerIcon;

  return (
    <div className="nav">
      <button type="button" className="nav-icon" onClick={toggleNav}>
        {navIcon}
      </button>
    </div>
  );
};

export default Navbar;
