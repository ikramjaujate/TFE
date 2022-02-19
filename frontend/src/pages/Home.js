import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Button from '../components/Button/Button';
import * as icon from 'react-icons/io5';
import * as BS from "react-bootstrap";
import './Home.css';
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";

const Home = () => {

    return (
        <BS.Container fluid className="div pt-3">
            <div className="d-flex justify-content-center div">
                <BS.Col lg="2"></BS.Col>
                <BS.Col md="auto" className="div">
                    <Button icon={ <AiIcons.AiOutlineUser /> } text='Clients' bd_color='#940000' icon_color='#ef3420' destination='/clients' />
                    <Button icon={ <RiIcons.RiBook2Fill /> } text='Projects' bd_color='#947e00' icon_color='#ef3420' destination='/projects' />
                    <Button icon={ <RiIcons.RiDraftLine /> } text='Invoices' bd_color='#002147' icon_color='#ef3420' destination='/invoices' />
                </BS.Col>
                <BS.Col lg="2"></BS.Col>
            </div>
            <div className="d-flex justify-content-center">
                <BS.Col lg="2"></BS.Col>
                <BS.Col md="auto" className="div">
                    <Button icon={ <AiIcons.AiOutlineUsergroupAdd /> } text='Employees' bd_color='#004d00' icon_color='#ef3420' destination='/employees' />
                    <Button icon={ <RiIcons.RiShoppingBasket2Line /> } text='Material' bd_color='#002147' icon_color='#ef3420' destination='/material' />
                    <Button icon={ <icon.IoCreate /> } text='Rgie' bd_color='#66023c' icon_color='#ef3420' destination='/projets_rgie' />
                </BS.Col>
                <BS.Col lg="2"></BS.Col>
            </div>

        </BS.Container>
    );
};


export default Home;
