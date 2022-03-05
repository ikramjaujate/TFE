import React  from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const AppTopbar = (props) => {
    const deconnexion = () => {
        localStorage.removeItem('access_token') ;
        window.location.reload();
    }
    return (
        <div className="layout-topbar">

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

                <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <Link className="navbar__link" to="#" onClick={deconnexion}>
                            <i className="pi pi-sign-out"/>
                            <span>Logout</span>
                        </Link>
                        </button>
                    </li>
                </ul>
        </div>
    );
}
