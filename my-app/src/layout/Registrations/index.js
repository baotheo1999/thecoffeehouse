import React from "react";
import { Link } from "react-router-dom";
import firebase from "./FireBase";
import FormOTP from "./FormOTP";
import FormPhone from "./FormPhone";
import "./login.scss";

class Registrations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: null,
      flag: false,
      phone: null,
      openFormUser: false,
    };
  }

  getPhone = (data) => {
    let phoneFormat = `+84${data.charAt(0) === "0" ? data.slice(1) : data}`;

    this.setState({
      phone: phoneFormat,
    });
  };

  hendleOtp = (e) => {
    this.setState({
      otp: e.target.value,
    });
  };

  handleFormOtp = (e) => {
    e.preventDefault();
    const code = this.state.otp;

    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;

        this.setState({
          openFormUser: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          this.onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };

  handlePhoneClick = (e) => {
    const { phone } = this.state;

    e.preventDefault();
    this.configureCaptcha();
    const phoneNumber = phone;

    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent", phoneNumber);
      })
      .catch((error) => {
        console.log("SMS not sent");
      });

    this.setState({
      flag: true,
    });
  };

  render() {
    const { phone, flag, openFormUser } = this.state;
    return (
      <>
        <div className="login">
          <div id="recaptcha"></div>
          {flag ? (
            <FormOTP
              handleFormOtp={this.handleFormOtp}
              hendleOtp={this.hendleOtp}
              phone={phone}
              openFormUser={openFormUser}
            />
          ) : (
            <>
              <h2 className="login-name">Chào bạn</h2>
              <p className="registrations-desc">
                Nhập số điện thoại để tiếp tục
              </p>

              <FormPhone
                textSubmit="tiếp tục"
                handlePhoneClick={this.handlePhoneClick}
                getPhone={this.getPhone}
              />

              <Link to="/login" className="registrations registrations-cover">
                Quay về
              </Link>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Registrations;
