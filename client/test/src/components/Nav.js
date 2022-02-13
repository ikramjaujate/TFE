import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import "./Navbar.css";
import Button from "./Button";
import { navItems } from "./NavItems.js";

function Navbar() {
    const [sidebar, setSidebar] = useState(true);
    
  
    return (
      <>
        
  
        <div className={sidebar ? "sidebar active" : "sidebar"}>
        < div className="sidebar-toggle">
              {sidebar ?  (
                <Icons.FaBars
                  className="sidebar-toggle-logo"
                  onClick={() => setSidebar(!sidebar)}
                />
              ) :
              (
                <Icons.FaTimes
                  className="sidebar-toggle-logo"
                  onClick={() => setSidebar(!sidebar)}
                />
              )
              }
            </div>
          <ul className="sidebar-items">
            {navItems.map((item) => {
              return (
                <li
                  key={item.id}
                  className={item.sName}
                  onClick={() => setSidebar(false)}
                >
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button onClick={() => setSidebar(true)} />
        </div>
      </>
    );
  }
  
  export default Navbar;