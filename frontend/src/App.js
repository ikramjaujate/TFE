import './App.css';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route}  from 'react-router-dom'
import Home from './pages/Home/Home'
import Clients from './pages/Clients/Clients'
import Projects from './pages/Projects/Projects'
import Invoices from './pages/Invoices/Invoices'
import Employees from './pages/Employees/Employees'
import Material from './pages/Material/Material'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/clients" component={Clients}/>
          <Route path="/projects" component={Projects}/>
          <Route path="/invoices" component={Invoices}/>
          <Route path="/employees" component={Employees}/>
          <Route path="/material" component={Material}/>
        </Switch>
    </Router>
    </>
  );
}

export default App;
