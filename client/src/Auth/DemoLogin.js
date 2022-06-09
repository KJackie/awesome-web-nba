import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";
import "./AuthForm.scss";
import "./AuthPages.scss"
import domain from '../../util/domain'
import {BsArrowRight} from 'react-icons/bs'
import './DemoLogin.scss'
function Login() {
  const [demoFormEmail, setDemoFormEmail] = useState("");
  const [demoFormPassword, setDemoFormPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { getUser } = useContext(UserContext);

  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    const loginData = {
      email: 'demoaccount@gmail.com',
      password: 'demopassword',
    };

    try {
      await axios.post(`${domain}/auth/login`, loginData);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }

    await getUser();
    history.push("/");
  }

  function signInAsGuest() {
    setDemoFormEmail('demoaccount@gmail.com')
    setDemoFormPassword('demopassword')
  }

  return (
    <div className="demo-login-page">
      <div className="demo-auth-form-login">
        {errorMessage && (
          <ErrorMessage
            message={errorMessage}
            clear={() => setErrorMessage(null)}
          />
        )}
        <form className="form" onSubmit={login}>
          <button className="demo-submit-btn" onClick={signInAsGuest}>
            Continue as Guest <BsArrowRight className="right-arrow" />
          </button>
        </form>
       
      </div>
    </div>
  );
}

export default Login;