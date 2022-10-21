import React from "react";
import Header from "../Header/header";
import Shop from "../Shop/Shop";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
