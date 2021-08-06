import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "../../conponents/layout/Footer";
import Body from "./Body";
import Regester from "./Form/Regester";
import Header from "./Header";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Route path="/" exact component={Body} />
        <Route path="/regester" component={Regester} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
