import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../Contexts/Context";

const Login = () => {
  let { signIn } = useContext(AuthContext);
  let { user } = useContext(AuthContext);

  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  let handleSignin = (event) => {
    event.preventDefault();
    let form = event.target;
    let email = form.email.value;
    let password = form.password.value;
    signIn(email, password)
      .then((result) => {
        let user = result.user;
        navigate(from, { replace: true });
      })
      .then((error) => {
        console.log(error);
      });
    console.log(user);
  };

  return (
    <div className="login-container">
      <div className="title">
        <h1>Login</h1>
      </div>
      <form onSubmit={handleSignin} className="form" action="">
        <div className="user-input">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="user-input">
          <label htmlFor="password">Password</label>
          <input name="password" type="text" required />
        </div>
        <div className="submit-btn">
          <button type="submit">Login</button>
          <p>
            Don't have account please{" "}
            <span>
              {" "}
              <Link to="/signup">Signup</Link>{" "}
            </span>
          </p>
          {user?.email && <p>Log in successfully</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
