import React, { useContext } from "react";
import logo from "../../images/Logo.svg";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/Context";

const Header = () => {
  let { user } = useContext(AuthContext);
  let { logOut } = useContext(AuthContext);
  let navigate = useNavigate();

  let logoutUser = () => {
    logOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <div>
      <div className="container">
        <nav className="menu-bar">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="bar">
            <ul className="mybar">
              <li>
                <Link to="/">Shop</Link>
              </li>
              <li>
                <Link to="/inventory">Inventory</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>

              {user?.email ? (
                <div className="d-flex">
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                  <li>
                    <Link to="/login">{user?.email && user.email}</Link>
                  </li>
                  <li>
                    <Link onClick={logoutUser}>Logout</Link>
                  </li>
                </div>
              ) : (
                <div className="d-flex">
                  {" "}
                  <li>
                    <Link to="/signup">Signup</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>{" "}
                </div>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
