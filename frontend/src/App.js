import './App.css';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect}  from 'react-router-dom'
import Home from './pages/Home/Home'
import Clients from './pages/Clients/Clients'
import Projects from './pages/Projects/Projects'
import Invoices from './pages/Invoices/Invoices'
import Employees from './pages/Employees/Employees'
import Material from './pages/Material/Material'
import { isLoggedIn } from './components/Auth/auth';
import Login from './pages/Login/Login';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  


function App() {
  if(isLoggedIn()){
  return (
    <>
    <Router className="flex-container">
      <Navbar className="sideBar"/>

      <Switch className="content">
        <PrivateRoute exact isloggedin={isLoggedIn()}  path="/"  component={Home}/>
        <PrivateRoute exact isloggedin={isLoggedIn()} path="/clients" component={Clients}/>
        <PrivateRoute exact isloggedin={isLoggedIn()} path="/projects" component={Projects}/>
        <PrivateRoute exact isloggedin={isLoggedIn()} path="/invoices" component={Invoices}/>
        <PrivateRoute exact isloggedin={isLoggedIn()} path="/employees" component={Employees}/>
        <PrivateRoute exact isloggedin={isLoggedIn()} path="/material" component={Material}/>
      </Switch>
      
    </Router>
    </>
  );}else{
    return(
      <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route path='/login' exact component={Login}/>
            <Route >
               <Redirect to="/login" exact component={Login} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>

    )
  }
}

export default App;
