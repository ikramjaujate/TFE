import './DashboardButton.scss'
import React from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DashboardButton = ({ item }) => {

  return (
    <NavLink
      aria-label={item.label}
      role="menuitem"
      className="dashboard-card"
      to={item.to}
      exact
    >
      <FontAwesomeIcon className='icon' icon={item.icon} />
      <span>{item.label}</span>
    </NavLink>
  );
};

export default DashboardButton;