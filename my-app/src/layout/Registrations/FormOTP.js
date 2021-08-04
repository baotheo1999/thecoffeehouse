import React from "react";

import Button from "../../common/Button";
import Input from "../../common/SearchInput";

import { Link } from "react-router-dom";

import firebase from "./FireBase";

import "./login.scss";

class FormOTP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      age: null,
      address: null,
    };
  }

  handleGetValueChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormUserClick = () => {
    const { name, age, address } = this.state;

    const db = firebase.firestore();
    db.collection("User").add({
      name: name,
      age: age,
      address: address,
      phone: this.props.phone,
    });

    this.setState({
      name: null,
      age: null,
      address: null,
    });
  };

  render() {
    const { handleFormOtp, hendleOtp, phone, openFormUser } = this.props;

    if (openFormUser) {
      return (
        <form className="form-otp">
          <p>Nhập thông tin cá nhân</p>
          <Input
            className="cover-input"
            type="text"
            name="name"
            placeholder="Nhập họ tên"
            onChange={this.handleGetValueChange}
          />
          <Input
            className="cover-input"
            type="number"
            name="age"
            placeholder="Nhập tuổi"
            onChange={this.handleGetValueChange}
          />
          <Input
            className="cover-input"
            type="text"
            name="address"
            placeholder="Nhập địa chỉ"
            onChange={this.handleGetValueChange}
          />
          <Link to="/login">
            <Button text="Gửi" onClick={this.handleFormUserClick} />
          </Link>
        </form>
      );
    } else {
      return (
        <form className="form-otp" onSubmit={handleFormOtp}>
          <p>
            {` Nhập mã xác thực gồm 6 số đã được gửi đến số điện thoại ${phone} để tiếp tục`}
          </p>
          <Input
            type="number"
            onChange={hendleOtp}
            placeholder="Nhập mã OPT"
            name="otp"
          />
          <Button text="Gửi" />
        </form>
      );
    }
  }
}

export default FormOTP;
