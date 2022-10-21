import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/Context";
import "./Signup.css";

const Signup = () => {
  let { user } = useContext(AuthContext);

  let { createUser } = useContext(AuthContext);

  let handleSubmit = (event) => {
    event.preventDefault();
    let form = event.target;
    let name = form.name.value;
    let email = form.email.value;
    let password = form.password.value;
    let confirmPassword = form.confirm.value;
    console.log(name, email, password, confirmPassword);

    if (password.length < 6) {
      alert("password should be more than 6 charecters");
    }

    if (password !== confirmPassword) {
      alert("password did not match");
    }

    createUser(email, password)
      .then((result) => {
        const uer = result.user;
        form.reset();
        alert("sign in success");
      })

      .catch((error) => {
        console.error("login error hoise mama", error);
      });
  };

  return (
    <div className="login-container">
      <div className="title">
        <h1>Signup</h1>
      </div>
      <form onSubmit={handleSubmit} className="form" action="">
        <div className="user-input">
          <label htmlFor="email">Your Name</label>
          <input type="text" name="name" />
        </div>
        <div className="user-input">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="user-input">
          <label htmlFor="password">Password</label>
          <input name="password" type="password" required />
        </div>
        <div className="user-input">
          <label htmlFor="confirm">Confirm Password</label>
          <input name="confirm" type="password" required />
        </div>
        <div className="submit-btn">
          <button type="submit">Login</button>
          <p>
            Already have an account{" "}
            <span>
              {" "}
              <Link to="/login">login</Link>{" "}
            </span>
          </p>
        </div>
        {user?.uid && <p>Success registration</p>}
      </form>
    </div>
  );
};

export default Signup;
