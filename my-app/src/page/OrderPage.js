import React from "react";
import "../assets/style.scss";

import Header from "../layout/Header";
import Main from "../layout/Main";
import Footer from "../layout/Footer";

import Login from "../layout/Login";
import Registrations from "../layout/Registrations/index";

import { BrowserRouter as Router, Route } from "react-router-dom";

import {UserProvider} from "./UserContext"

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      user: {
        name: "bao",
        age: 22
      }
    };
  }
  getAmount = (data) => {
    let totalAmount = 0;
    if (data !== undefined) {
      data.map((item) => (totalAmount += item.amount));
    }
    this.setState({
      amount: totalAmount,
    });
  };

  componentDidMount() {
    let listOrder = JSON.parse(localStorage.getItem("listOrder"));
    let totalAmount = 0;
    if (listOrder && listOrder.length > 0) {
      listOrder.map((item) => (totalAmount += item.amount));
    }
    this.setState({
      amount: totalAmount,
    });
  }
    
  render() {
    return (
      <UserProvider value={this.state.user}>
        <Router>
          <div className="home-page">
            <Header amount={this.state.amount} />

            <Route
              path="/"
              exact
              render={(props) => <Main getAmount={this.getAmount} />}
            />

            <Route path="/login" component={Login} />
            <Route path="/registrations" component={Registrations} />
            <Footer />
          </div>
        </Router>
      </UserProvider>
    );
  }
}

export default HomePage;
