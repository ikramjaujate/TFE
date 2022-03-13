import './App.scss';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, NavLink } from 'react-router-dom';
import { faTools, faAddressBook, faHome, faBook, faFileContract, faHardHat, faFileSignature } from "@fortawesome/free-solid-svg-icons";

import PrivateRoute from './shared/components/PrivateRoute';
import { isLoggedIn } from './core/auth';

import TopMenuBar from './shared/components/TopMenuBar/TopMenuBar'
import SideMenuBar from './shared/components/SideMenuBar/SideMenuBar';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Clients from './pages/Clients/Clients';
import Details from './pages/Details/Details';
import Projects from './pages/Projects/Projects';
import Invoices from './pages/Invoices/Invoices';
import Employees from './pages/Employees/Employees';
import Material from './pages/Material/Material';
import Quotation from './pages/Quotation/Quotation';

const App = () => {

  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const menu = [
    { label: 'Dashboard', icon: faHome, to: '/' },
    { label: 'Clients', icon: faAddressBook, to: '/clients' },
    { label: 'Project', icon: faBook, to: '/projects' },
    { label: 'Invoices', icon: faFileContract, to: '/invoices' },
    { label: 'Employees', icon: faHardHat, to: '/employees' },
    { label: 'Material', icon: faTools, to: '/material' },
    { label: 'Devis', icon: faFileSignature, to: '/devis' }
  ];

  const onToggleMenu = () => {
    setMenuIsVisible(!menuIsVisible);
  }

  if (isLoggedIn()) {
    return (<Router>
      <div className="main-window">

        <TopMenuBar onToggleMenu={onToggleMenu}></TopMenuBar>

        <div className='main-section'>
          <div className={`side-menu ${menuIsVisible ? "" : "menu-is-hidden"}`}>
            <SideMenuBar menu={menu}></SideMenuBar>
          </div>
          <div className={`main-content ${menuIsVisible ? "" : "menu-is-hidden-content"}`}>
            <PrivateRoute exact path="/" component={Home} menu={menu.slice(1)} />
            <PrivateRoute exact path="/clients" component={Clients} />
            <PrivateRoute exact path='/clients/person/:id/detail' component={() => Details('p')} />
            <PrivateRoute exact path='/clients/company/:id/detail' component={() => Details('c')} />
            <PrivateRoute exact path="/projects" component={Projects} />
            <PrivateRoute exact path="/invoices" component={Invoices} />
            <PrivateRoute exact path="/employees" component={Employees} />
            <PrivateRoute exact path="/material" component={Material} />
            <PrivateRoute exact path="/devis" component={Quotation} />
          </div>
        </div>

      </div>
    </Router>);
  } else {
    return (
      <Router>
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route>
            <Redirect to="/login" exact component={Login} />
          </Route>
        </Switch>
      </Router>);
  }
}

export default App;
