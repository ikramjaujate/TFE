import './Home.scss';
import React from 'react';

import DashboardButton from '../../shared/components/DashboardButton/DashboardButton';

const Home = ({ props, data }) => {

  return (
    <div className='home'>
      {data.menu.map(item => {
        return (
          <div key={item.label} className='card-container'>
            <DashboardButton item={item}></DashboardButton>
          </div>
        )
      })}
    </div>
  );
};


export default Home;