import { useContext } from "react";
import { ProtectedContext } from "../../useContext/ProtectedContext";
import Nav from "./comp/nav";
import Profile from "./Profile";
import Home from "./Home";
const Protected = () => {
    const { active } = useContext<{ active: number }>(ProtectedContext)
    return (
        <>
            <Nav />
            {active === 1 &&
                <Home />
            }
            {
                active === 2 &&
                <Profile />
            }
        </>
    );
}

export default Protected;