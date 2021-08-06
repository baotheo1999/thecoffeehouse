import React, { useEffect } from "react";
import firebaseConfig from "../../firebaseConfig";
import * as firebaseui from "firebaseui";
import firebase from "firebase";
import "firebaseui/dist/firebaseui.css";

function Register(props) {
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    const uiConfig = {
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            type: "image",
            size: "normal",
            badge: "bottomleft",
          },
          defaultCountry: "VN",
        },
      ],
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          alert("thanh cong");
          return true;
        },
      },
      signInSuccessUrl: "http://localhost:3000/",
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebase-auth-container", uiConfig);
  }, []);

  return (
    <div
      style={{ padding: "110px 0 450px" }}
      id="firebase-auth-container"
    ></div>
  );
}

export default Register;
