import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { isLoggedIn } from './components/Auth/auth';
import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { BrowserRouter as Router, Switch,  Redirect}  from 'react-router-dom'
import { PrivateRoute } from './components/Auth/PrivateRoute';
import Dashboard from './components/Dashboard';
import TableDemo from './components/TableDemo';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home'
import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import Clients from './pages/Clients/Clients';
import Projects from './pages/Projects/Projects';
import Invoices from './pages/Invoices/Invoices';
import Employees from './pages/Employees/Employees';
import Material from './pages/Material/Material';

import './App.css'
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.scss';



const App = () => {
    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);


    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);






    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const menu = [
        {
            items: [{
                label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/',
                
            },
            { label: 'Clients', icon: 'pi pi-fw pi-id-card', to: '/clients' },
            { label: 'Project', icon: 'pi pi-fw pi-table', to: '/projects' },
            { label: 'Invoices', icon: 'pi pi-fw pi-id-card', to: '/invoices' },
            { label: 'Employees', icon: 'pi pi-fw pi-id-card', to: '/employees' },
            { label: 'Material', icon: 'pi pi-fw pi-id-card', to: '/material' }
        ]
        }
    ];

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });

    if(isLoggedIn()){
        return (
          <>
          <Router>
          <div className={wrapperClass} onClick={onWrapperClick}>

            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <PrivateRoute path="/" exact isloggedin={isLoggedIn()} component={Home} />
                    <PrivateRoute path="/clients" exact isloggedin={isLoggedIn()} component={Clients} />
                    <PrivateRoute path="/table" isloggedin={isLoggedIn()}  component={TableDemo} />
                    <PrivateRoute exact isloggedin={isLoggedIn()} path="/projects" component={Projects}/>
                    <PrivateRoute exact isloggedin={isLoggedIn()} path="/invoices" component={Invoices}/>
                    <PrivateRoute exact isloggedin={isLoggedIn()} path="/employees" component={Employees}/>
                    <PrivateRoute exact isloggedin={isLoggedIn()} path="/material" component={Material}/>                    

                </div>

            </div>

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>

        </div>
        </Router>

          </>
        );}else{
          return(
            <Router>
            <div className="App">
              <div className="content">
                <Switch>
                  <Route path='/login' exact component={Login}/>
                  <Route>
                     <Redirect to="/login" exact component={Login} />
                  </Route>
                </Switch>
              </div>
            </div>
          </Router>
      
          )
        }

}

export default App;
