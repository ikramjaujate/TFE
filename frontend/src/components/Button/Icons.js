import React from 'react';
import { IconContext } from 'react-icons/lib';

const Icon = ({ color, icon}) => {
    const style = {
        color: 'color',
        size: '90px',
    };

    return (
        <IconContext.Provider value={ style }>
            {icon}
        </IconContext.Provider>
    );
};

export default Icon;