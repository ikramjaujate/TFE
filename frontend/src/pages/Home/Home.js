import './Home.scss';
import React from 'react';

import DashboardButton from '../../shared/components/DashboardButton/DashboardButton';

const Home = ({ props, data }) => {

    return (
        <div className='home'>
            {data.menu.map(item => {
                return (
                    <div key={item.label} className={item.isVisible? 'card-container': (item.hasMenu ? 'card-container empty-card-link has-menu' : 'card-container empty-card-link')}>
                        <DashboardButton item={item}></DashboardButton>
                    </div>
                )
            })}
        </div>
    );
};


export default Home;