import { useContext } from "react";
import { ProtectedContext } from "../../../useContext/ProtectedContext";

const Footer = () => {
  const { setActive, user, setUser } = useContext<{ setActive: any, user: any, setUser: any }>(ProtectedContext)
  return (
    <>
      {user &&
        <div className='footer'>
          <div className='left'>
            <img src='img/infinit.png' />
            {!user.unlimited ?
              <p>Go Unlimited</p>
              :
              <p>You're on the unlimited plan</p>

            }
          </div>
          <div className='upgrade'>
            {user.unlimited
              ?
              <div className="manage">
                <p >Manage Subscription</p>
                <img src="img/arrow-back.png" />
              </div>
              :
              <>
                {user.limit >= 20 ?
                  <button className='active' onClick={() => setActive(3)}>
                    <p>Upgrade</p>
                    <img src='img/christmas-stars.png' />
                  </button>
                  :
                  <button className='disabled' onClick={() => setActive(3)}>
                    <p>Upgrade</p>
                    <img src='img/christmas-stars_disabled.png' />
                  </button>
                }
              </>
            }
          </div>
        </div>
      }
    </>
  );
}

export default Footer;