import React from 'react';
import { Link } from 'react-router-dom';
import './TopMenuBar.scss'

const TopMenuBar = ({onToggleMenu}) => {

  const logOut = () => {
    localStorage.removeItem('access_token');
    window.location.reload();
  }

  return (
    <div className="top-menu-bar">

      <button type="button" className="menu-burger" onClick={onToggleMenu}>
        <i className="pi pi-bars" />
      </button>

      <Link className="menu-sign-out" to="#" onClick={logOut}>
        <i className="pi pi-sign-out" />
      </Link>

    </div>
  );
}

export default TopMenuBar