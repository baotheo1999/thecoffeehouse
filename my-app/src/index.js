import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./assets/reset.css";
import OrderPage from "./page/OrderPage.js";

ReactDOM.render(
    <React.StrictMode>
        <OrderPage />
    </React.StrictMode>,
    document.getElementById("root")
);
