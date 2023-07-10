import { useContext } from 'react';
import './styles/header.css'
import { PublicContext } from '../../../useContext/PublicContext';
const Header = () => {
	const { active, setActive } = useContext<{ active: number, setActive: any }>(PublicContext)

	return (
		<>
			<div className="nav">
				<img className="logo" src="img/header.png" />
				{active === 2 &&
					<div className='route'>
						<div className='installed_div'>
							<p className='installed'>Installed</p>
							<img src='img/vector.png' className='vector' />
						</div>
						<img src='img/arrow.png' className='arrow' />
						{active === 2 && <p>Signup</p>}
					</div>
				}
				{active === 1 &&
					<div className='route' onClick={() => setActive(2)}>
						<img src='img/arrow-back.png' />
						<p>Signup</p>
					</div>
				}
				{active === 3 &&
					<div className='route' onClick={() => setActive(1)}>
						<img src='img/arrow-back.png' />
						<p>Login</p>
					</div>
				}
			</div>
		</>
	);
}

export default Header;