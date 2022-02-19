import React, { useState } from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, NavLink} from "react-router-dom";
import { SidebarData } from './SidebarData'
import './Navbar.css'
import { IconContext } from 'react-icons'

const Navbar = () => {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar= () => setSidebar(!sidebar)
    return (
        <>
        <IconContext.Provider value={{color: 'black'}}>
            <div className="navbar">
              <NavLink to="#" className="menu-bars">
                <FaIcons.FaBars style={{color: '#c9392f'}} onClick={showSidebar}/>
             </NavLink>

                <div>
                    
                </div>

            </div>
            <nav className={ sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
                <li className='navbar-toggle'>
                    <NavLink to="#" className='menu-bars'>
                        <AiIcons.AiOutlineClose style={{color: 'white'}} />
                    </NavLink>
                </li>
                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <NavLink exact to={item.path} activeClassName="navbar__link--active" className="navbar__link">
                                {item.icon}
                                <span>{item.title}</span>
                            </NavLink>
                        </li>
                        )

                }
                  
                )}
            </ul>  
            
            </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
