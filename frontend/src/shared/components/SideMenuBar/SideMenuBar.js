import './SideMenuBar.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SideMenuBar = ({menu, setMenuVisible}) => {

    return (
        <div className='menu-card'>
            {menu.map(item => {
                return (
                    <>
                    {item.isLast? 
                    <hr className='menu-bottom'>
                    </hr>: 
                    <span></span>}
                    <NavLink
                        
                        aria-label={item.label}
                        role="menuitem"
                        className={item.isVisible? 'router-link' : 'router-link empty-side-link'}
                        activeClassName="router-link-active"
                        to={item.to}
                        onClick={setMenuVisible}
                        exact
                    >
                        <FontAwesomeIcon className='icon' icon={item.icon} />
                        <span>{item.label}</span>
                    </NavLink>
                    </>
                )
            })}
        </div>
    );
}

export default SideMenuBar