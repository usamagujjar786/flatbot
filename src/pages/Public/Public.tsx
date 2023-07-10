import { useContext, useState } from "react";
import Login from "./login";
import Register from "./Register";
import { PublicContext } from "../../useContext/PublicContext";
import Forgot from "./Forgot";
import Header from "./comp/header";

const Public = () => {
  const { active } = useContext<{ active: number }>(PublicContext)
  return (
    <>
      <Header />
      {active === 1 && <Login />}
      {active === 2 && <Register />}
      {active === 3 && <Forgot />}
    </>
  );
}

export default Public;