import React from "react";
import { Link } from "react-router-dom";
import FormPhone from "./Registrations/FormPhone";
import Button from "../common/Button";
import "./Registrations/login.scss";

import firebase from "./Registrations/FireBase";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      phone: null,
      loading: true,
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.collection("User")
      .get()
      .then((result) => {
        const users = [];
        result.forEach((item) => {
          const data = item.data();
          users.push(data);
        });
        this.setState({
          user: users,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPhoneLogin = (phone) => {
    this.setState({
      phone: phone,
    });
  };

  handlePhoneClick = () => {
    const { user, phone } = this.state;
    let formatPhone = "";
    if (phone.charAt(0) === "0") {
      formatPhone = `+84${phone.slice(1)}`;
    } else {
      formatPhone = `+84${phone}`;
    }

    if (user) {
      let newUser = user.filter((item) => {
        return item.phone === formatPhone;
      });

      if (newUser.length !== 0) {
        alert("dang nhap thanh cong");
      } else {
        alert("tai khoan ko ton tai");
      }
    }
  };

  render() {
    if (this.state.loading) return <div>loading</div>;
    return (
      <div className="login">
        <h2 className="login-name">Đăng nhập</h2>

        <FormPhone
          textSubmit="Đăng nhập"
          getPhoneLogin={this.getPhoneLogin}
          name="login"
          handlePhoneSubmit={this.handlePhoneClick}
        />

        <Link to="/registrations" className="registrations">
          Đăng kí thành viên mới ?
        </Link>

        <p className="or">hoặc đăng nhập bằng</p>
        <div className="login-fb">
          <Button text="facebook" />
          <Button text="email" />
        </div>
      </div>
    );
  }
}

export default Login;
