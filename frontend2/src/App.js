import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'

import {Router, Route} from 'react-router-dom'
function App() {
  return (
    <Div>
        <Sidebar />
        <Dashboard />

    </Div>

  );
}

export default App;
const Div = styled.div `
position: relative;
`;
