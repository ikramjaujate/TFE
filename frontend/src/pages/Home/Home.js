//import 'bootstrap/dist/css/bootstrap.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React from 'react';
import Button from '../../components/Button/Button';
import * as icon from 'react-icons/io5';
import * as BS from "react-bootstrap";
import './Home.css';
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";

const Home = () => {

    return (
        <div className="div">
            <div className="justify-content-center div">
                <div className="col mx-8 my-8 justify-content-center align-items-center" >
                    <Button icon={ <AiIcons.AiOutlineUser /> } text='Clients' bd_color='#ffffff' icon_color='#ffffff' destination='/clients' />
                    <Button icon={ <RiIcons.RiBook2Fill /> } text='Projects' bd_color='#ffffff' icon_color='#ffffff' destination='/projects' />
                    <Button icon={ <RiIcons.RiDraftLine /> } text='Invoices' bd_color='#ffffff' icon_color='#ffffff' destination='/invoices' />
                    <Button icon={ <AiIcons.AiOutlineUsergroupAdd /> } text='Employees' bd_color='#ffffff' icon_color='#ffffff' destination='/employees' />
                    <Button icon={ <RiIcons.RiShoppingBasket2Line /> } text='Material' bd_color='#ffffff' icon_color='#ffffff' destination='/material' />
                    <Button icon={ <RiIcons.RiShoppingBasket2Line /> } text='Devis' bd_color='#ffffff' icon_color='#ffffff' destination='/devis' />
                </div>

            </div>
           

        </div>
    );
};


export default Home;
