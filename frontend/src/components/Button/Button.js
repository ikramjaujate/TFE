//import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Icon from './Icons';
import { NavLink } from 'react-router-dom';
import './Button.css';
import * as BS from "react-bootstrap";

const Button = ({bd_color, text, icon, destination, icon_color}) => {
    const style = {
        borderColor: bd_color,
        borderWidth: 3,
    }

    return (
        <NavLink to={{ pathname: destination }} className="home_btn" style={ style } >
            <BS.Button className='home_btn' variant='light' size="lg">
                <p>
                    <Icon icon={ icon } color={ icon_color } /> <br />
                    {text}
                </p>
            </BS.Button>
        </NavLink>
    );
};

Button.defaultProps = {
    color: 'black',
    text: 'no_text'
};


export default Button;