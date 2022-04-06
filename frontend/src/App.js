import './App.scss';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import "react-big-calendar/lib/css/react-big-calendar.css";

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, NavLink } from 'react-router-dom';
import { faTools, faAddressBook, faCalendar,faHome, faBook, faFileContract, faHardHat, faFileSignature } from "@fortawesome/free-solid-svg-icons";

import PrivateRoute from './shared/components/PrivateRoute';
import { isLoggedIn } from './core/auth';

import TopMenuBar from './shared/components/TopMenuBar/TopMenuBar'
import SideMenuBar from './shared/components/SideMenuBar/SideMenuBar';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Clients from './pages/Clients/Clients';
import Details from './pages/Details/Clients/Details';
import Projects from './pages/Projects/Projects';
import Invoices from './pages/Invoices/Invoices';
import Employees from './pages/Employees/Employees';
import Material from './pages/Material/Material';
import Quotation from './pages/Quotation/Quotation';
import DetailsProjects from './pages/Details/Projects/Details';
import CalendarClient from './pages/Calendar/Calendar';
import MaterialInformation from './pages/Details/Material/Details';
const App = () => {

    const [menuIsVisible, setMenuIsVisible] = useState(false);

    const menu = [
        { label: 'Dashboard', icon: faHome, to: '/' },
        { label: 'Clients', icon: faAddressBook, to: '/clients' },
        { label: 'Projects', icon: faBook, to: '/projects' },
        { label: 'Invoices', icon: faFileContract, to: '/invoices' },
        { label: 'Employees', icon: faHardHat, to: '/employees' },
        { label: 'Material', icon: faTools, to: '/material' },
        { label: 'Quotations', icon: faFileSignature, to: '/quotation' },
        { label: 'Calendar', icon: faCalendar, to: '/calendar' }
    ];

    const onToggleMenu = () => {
        setMenuIsVisible(!menuIsVisible);
    }
    const forcedCloseMenu = () => {
        setMenuIsVisible(false)
    }

    if (isLoggedIn()) {
        return (<Router>
            <div className="main-window">

                <TopMenuBar onToggleMenu={onToggleMenu}></TopMenuBar>

                <div className='main-section'>
                    <div className={`side-menu ${menuIsVisible ? "menu-is-visible" : "menu-is-hidden"}`}>
                        <SideMenuBar menu={menu} setMenuVisible={forcedCloseMenu}></SideMenuBar>
                    </div>
                    <div className={`main-content ${menuIsVisible ? "" : "menu-is-hidden-content"}`}>
                        <PrivateRoute exact path="/" component={Home} menu={menu.slice(1)} />
                        <PrivateRoute exact path="/clients" component={Clients} />
                        <PrivateRoute exact path='/clients/person/:id/detail' component={() => Details('p')} />
                        <PrivateRoute exact path='/clients/company/:id/detail' component={() => Details('c')} />
                        <PrivateRoute exact path="/projects" component={Projects} />
                        <PrivateRoute exact path="/projects/:id/detail" component={DetailsProjects} />
                        <PrivateRoute exact path="/invoices" component={Invoices} />
                        <PrivateRoute exact path="/employees" component={Employees} />
                        <PrivateRoute exact path="/material" component={Material} />
                        <PrivateRoute exact path="/material/:id/detail" component={MaterialInformation} />
                        <PrivateRoute exact path="/quotation" component={Quotation} />
                        <PrivateRoute exact path="/calendar" component={CalendarClient} />
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
