import React from "react";

import logo from "../assets/img/logo.png";
import Button from "../common/Button";
import Image from "../common/Image";
import SearchAddress from "../common/SearchAddress/index";
import ShipNow from "../common/ShipNow/index";

import { Link } from "react-router-dom";


import UserContext from "../page/UserContext";
class Header extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.closeShipNow = React.createRef();
        this.state = {
            textButton: "Giao ngay",
            open: false,
            timeOrder: false,
        };
    }

    handleOnOffShipNow = () => {
        this.setState({
            open: !this.state.open,
        });
    };
    handleTimer = () => {
        let date = document.getElementById("date").value;
        let time = document.getElementById("time").value;

        if (time !== "Trong 15-30 phút") {
            this.setState({
                textButton: date.concat(`-${time}`),
            });
        } else {
            this.setState({
                textButton: "Giao ngay",
                timeOrder: false,
            });
        }
    };

    handleShipNow = () => {
        this.setState({
            textButton: "Giao ngay",
            open: false,
            timeOrder: false,
        });
    };

    handleTimeOrder = () => {
        this.setState({
            timeOrder: true,
        });
    };

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (!this.closeShipNow.current.contains(event.target)) {
            this.setState({
                open: false,
            });
        }
    };

    render() {
        const { open, textButton, timeOrder } = this.state;
        const { amount } = this.props;
        console.log(this.context);
        return (
            <header className="header">
                <div className="header-container">
                    <div className="header-left">
                        <Link to="/">
                            <Image
                                className="header-left__img"
                                src={logo}
                                alt="logo the coffee fouse"
                                width="200"
                            />
                        </Link>
                    </div>

                    <div className="header-center">
                        <div
                            className="header-center__call"
                            ref={this.closeShipNow}
                        >
                            <Button
                                onClick={this.handleOnOffShipNow}
                                text={textButton}

                            />
                            <ShipNow
                                open={open}
                                handleTimer={this.handleTimer}
                                handleShipNow={this.handleShipNow}
                                handleTimeOrder={this.handleTimeOrder}
                                timeOrder={timeOrder}
                            />
                        </div>

                        <div className="header-center__form">
                            <SearchAddress />
                        </div>
                    </div>

                    <div className="header-right">
                        <Link to="/login">
                            <Button text="Đăng nhập" />
                        </Link>

                        {amount > 0 && (
                            <div className="cart">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {" "}
                                    <circle
                                        cx="7.3"
                                        cy="17.3"
                                        r="1.4"
                                    ></circle>{" "}
                                    <circle
                                        cx="13.3"
                                        cy="17.3"
                                        r="1.4"
                                    ></circle>{" "}
                                    <polyline
                                        fill="none"
                                        stroke="#000"
                                        points="0 2 3.2 4 5.3 12.5 16 12.5 18 6.5 8 6.5"
                                    ></polyline>
                                </svg>
                                <div className="amount">
                                    <span>{amount}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
