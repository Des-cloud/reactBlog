import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light'>
      <div className='container'>
        <div className='navbar-header'>
          <p className='navbar-brand'>DAILY JOURNAL</p>
        </div>
        <ul className='navbar-nav navbar-right'>
          <li className='list-inline-item nav-item' id='home'>
            <Link to='/'>
              <span className='nav-link'>Home</span>
            </Link>
          </li>
          <li className='list-inline-item nav-item' id='about'>
            <Link to='/compose'>
              <span className='nav-link'>Compose</span>
            </Link>
          </li>
          <li className='list-inline-item nav-item' id='settings'>
            <Link to='/settings'>
              <span className='nav-link'>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
