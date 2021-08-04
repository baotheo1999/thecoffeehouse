import React from "react";
import Button from "../../common/Button";
import Input from "../../common/SearchInput";

class FormPhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneText: "",
      textError: "",
      checkDisabled: true,
    };
  }
  blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  handlePhone = (e) => {
    if (e.target.value.length < 9 || e.target.value.length > 11) {
      this.setState({
        textError: "Giá trị nằm trong khoảng 9-11 số!",
        checkDisabled: true,
      });
    } else {
      this.setState({
        phoneText: e.target.value,
        textError: "",
        checkDisabled: false,
      });
    }
    if (e.target.value.length === 0) {
      this.setState({
        textError: "Không được để trống trường này",
        checkDisabled: true,
      });
    }

    if (this.props.name === "registrations") {
      this.props.getPhone(e.target.value);
    } else {
      this.props.getPhoneLogin(e.target.value);
    }
  };

  // handlePhoneSubmit = (e) => {
  //   e.preventDefault();
  //   if (this.state.phoneText.length === 0) {
  //     this.setState({
  //       textError: "Không được để trống trường này",
  //     });
  //   }
  // };

  render() {
    const { textError, checkDisabled } = this.state;

    return (
      <form className="login-form" onSubmit={this.props.handlePhoneSubmit}>
        <div className="login-form__phone">
          <select>
            <option value="84">+84</option>
          </select>
          <Input
            type="number"
            placeholder="Nhập sô điện thoại của bạn"
            onChange={this.handlePhone}
            onKeyDown={this.blockInvalidChar}
            min="0"
            name="phone"
          />
        </div>
        <p className="error">{textError}</p>

        <Button
          className="login-form__btnSubmit"
          text={this.props.textSubmit}
          disabled={checkDisabled}
          onClick={this.props.handlePhoneClick}
        />
      </form>
    );
  }
}

export default FormPhone;
