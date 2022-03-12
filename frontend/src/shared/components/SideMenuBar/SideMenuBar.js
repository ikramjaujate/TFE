import './SideMenuBar.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SideMenuBar = ({menu}) => {

  return (
    <div className='menu-card'>
      {menu.map(item => {
        return (
          <NavLink
            key={item.label}
            aria-label={item.label}
            role="menuitem"
            className="router-link"
            activeClassName="router-link-active"
            to={item.to}
            exact
          >
            <FontAwesomeIcon className='icon' icon={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        )
      })}
    </div>
  );
}

export default SideMenuBar