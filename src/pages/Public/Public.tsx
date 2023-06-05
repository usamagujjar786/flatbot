import { useContext, useState } from "react";
import Login from "./login";
import Register from "./Register";
import { PublicContext } from "../../useContext/PublicContext";
import Forgot from "./Forgot";

const Public = () => {
    const { active } = useContext<{ active: number }>(PublicContext)
    return (
        <>
            {active === 1 && <Login />}
            {active === 2 && <Register />}
            {active === 3 && <Forgot />}
        </>
    );
}

export default Public;