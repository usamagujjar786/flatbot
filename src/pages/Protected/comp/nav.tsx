import { useContext, useEffect, useState } from "react";
import { ProtectedContext } from "../../../useContext/ProtectedContext";
import './styles/nav.css'
import { AuthContext } from "../../../useContext/AuthContext";
const Nav = () => {
	const { setActive, active, user } = useContext<{ active: any, setActive: any, user: any }>(ProtectedContext)
	const { logout } = useContext<{ logout: any }>(AuthContext)
	const [activeTab, setActiveTab] = useState<boolean>()
	var queryInfo: any = {
		active: true,
		currentWindow: true
	};
	// const Logout = () => {
	// 	localStorage.removeItem('flatbot_access-token')
	// 	localStorage.removeItem('flatbot_client')
	// 	localStorage.removeItem('flatbot_uid')
	// 	logout()
	// }
	useEffect(() => {
		chrome.tabs.query(queryInfo, (tabs: any) => {
			var tab = tabs[0];
			// setUrl(tab.url)
			let regex = new RegExp(/https:\/\/www.wg-gesucht.de\/((\w*)(-))*(\w*)\.(\d*)\.html/g)
			setActiveTab(regex.test(tab.url))
		})
	}, [])
	return (
		<>
			{user &&
				<div className="nav">

					<div className="upper_header">
						<div className="logo_div">
							<img className="logo" src="img/header.png" onClick={() => { active === 1 ? window.location.reload() : setActive(1) }} />
							{
								activeTab &&
								<img src='img/green.png' className='green_dot' />
							}
						</div>
						<div className="upper_right">
							{!user.unlimited ?
								<p className="limit"><span>{user.limit}</span>/20 messages</p>
								:
								<p className="limit"><span><img src="img/infinit.png" /></span>/20 messages</p>
							}
							<img src="img/profile.png" onClick={() => setActive(2)} />
						</div>
					</div>
					{active != 1 &&
						<div className="lower_nav">
							<div className='route'>
								<div className='installed_div'>
									<p className='installed' onClick={() => setActive(1)}>Home</p>
								</div>
								<img src='img/arrow.png' className='arrow' />

								{active === 2 && <p>Profile</p>}
								{active === 3 && <p>Upgrade</p>}
							</div>
							<div className="logout" onClick={() => {
								localStorage.removeItem('flatbot');
								logout()
							}}>
								<p>Logout</p>
								<img src="img/logout.png" />
							</div>
						</div>
					}
				</div>
			}
		</>
	);
}

export default Nav;