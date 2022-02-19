import './App.css';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route}  from 'react-router-dom'
import Home from './pages/Home'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Invoices from './pages/Invoices'
import Employees from './pages/Employees'
import Material from './pages/Material'

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
