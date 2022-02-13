import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
//import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contactus from "./pages/Contactus";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Signup from "./pages/Signup";
import Navbar from "./components/Nav";

function App() {
  return (
    <>
      <Router>
      <div className="App">
        <Navbar />
        <div className="content">
        <Routes>
          <Route path="/" exact component={Home}></Route>
          <Route path="/contactus" component={Contactus}></Route>
          <Route path="/products" component={Products}></Route>
          <Route path="/services" component={Services}></Route>
          <Route path="/signup" component={Signup}></Route>
        </Routes>
        </div>
        </div>
      </Router>
    </>
  );
}

export default App;
