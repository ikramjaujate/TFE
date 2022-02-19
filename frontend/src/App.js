import './App.css';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route}  from 'react-router-dom'
import Home from './pages/Home'
import Clientes from './pages/Clientes'
import Vehiculos from './pages/Vehiculos'
import Remisiones from './pages/Remisiones'
import Facturas from './pages/Facturas'
import Historiales from './pages/Historiales'
function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/clients" component={Clientes}/>
          <Route path="/projects" component={Vehiculos}/>
          <Route path="/invoices" component={Remisiones}/>
          <Route path="/employees" component={Facturas}/>
          <Route path="/material" component={Historiales}/>
        </Switch>
    </Router>
    </>
  );
}

export default App;
