import { useContext } from "react";
import { ProtectedContext } from "../../../useContext/ProtectedContext";
import './styles/nav.css'
const Nav = () => {
    const { setActive } = useContext<{ setActive: any }>(ProtectedContext)
    return (
        <>
            <div className="nav">
                <p className="logo" onClick={() => setActive(1)}>Flatbot</p>
                <p className="profile" onClick={() => setActive(2)}>Profile</p>
            </div>
        </>
    );
}

export default Nav;