import { useContext, useEffect, useState } from "react";
import { ProtectedContext } from "../../useContext/ProtectedContext";
import Nav from "./comp/nav";
import Profile from "./Profile";
import Home from "./Home";
import Upgrade from "./Upgrade";
import { ProgressBar } from "react-bootstrap";
import axios from "axios";
import { url } from "../../utils/url";
const Protected = () => {
  const { active, setAvtive, user, setUser } = useContext<{ active: number, setAvtive: any, user: any, setUser: any }>(ProtectedContext)
  const [loading, setLoading] = useState<Boolean>(false)
  useEffect(() => {
    const loadUser = async () => {
      if (localStorage.getItem("flatbot")) {
        try {
          const res = await axios.get(`${url}/user/loaduser`, {
            headers: {
              token: localStorage.getItem('flatbot'),
            }
          })
          if (res.data.success) {
            setUser(res.data.data)
            setLoading(false)
          }
        } catch (error) {
          localStorage.removeItem('flatbot')
          setLoading(false)
        }
      } else {
        localStorage.removeItem('flatbot')
        setLoading(false)
      }
    }
    loadUser()
  }, [])
  return (
    <>
      {loading &&
        <ProgressBar animated now={100} />
      }
      {!loading && user &&
        <>
          <Nav />
          <>
            {active === 1 &&
              <Home />
            }
            {
              active === 2 &&
              <Profile />
            }
            {
              active === 3 &&
              <Upgrade />
            }
          </>
        </>
      }
    </>
  );
}

export default Protected;