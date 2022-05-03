import '../Styles/Navbar.css';
import { Link } from 'react-router-dom';
import { FaBars, IoIosArrowForward } from 'react-icons/all';
const Navbar = () => {
	let navLinksMenu;

	if (localStorage.getItem('userRole') === 'User') {
		navLinksMenu = (
			<nav className='navbar'>
				<button className='btn-bars'>
					<FaBars className='ic-bars'></FaBars>
				</button>
				<ul>
					<li>
						<Link to={'/'}>Strona Główna</Link>
					</li>
					<li>
						<Link to={'/obibliotece'}>O Bibliotece</Link>
					</li>
					<li>
						<Link to={'/książki'}>Książki</Link>
					</li>
					<li>
						<Link to={'/kontakt'}>Kontakt</Link>
					</li>
					<li>
						<Link to={'/logowanie'}>Logowanie</Link>
					</li>
				</ul>
			</nav>
		);
	} else if (localStorage.getItem('userRole') === 'Employee') {
		navLinksMenu = (
			<nav className='navbar'>
				<button className='btn-bars'>
					<FaBars className='ic-bars'></FaBars>
				</button>
				<ul>
					<li>
						<Link to={'/'}>Strona Główna</Link>
					</li>
					<li>
						<Link to={'/obibliotece'}>O Bibliotece</Link>
					</li>
					<li>
						<Link to={'/książki'}>Książki</Link>
					</li>
					<li>
						<Link to={'/kontakt'}>Kontakt</Link>
					</li>
					<li>
						<Link to={'/pracownikpanel'}>Panel Pracownika</Link>
					</li>
					<li>
						<Link to={'/konto'}>Moje konto</Link>
					</li>
				</ul>
			</nav>
		);
	} else if (localStorage.getItem('userRole') === 'Admin') {
		navLinksMenu = (
			<nav className='navbar'>
				<button className='btn-bars'>
					<FaBars className='ic-bars'></FaBars>
				</button>
				<ul>
					<li>
						<Link to={'/'}>Strona Główna</Link>
					</li>
					<li>
						<Link to={'/obibliotece'}>O Bibliotece</Link>
					</li>
					<li>
						<Link to={'/książki'}>Książki</Link>
					</li>
					<li>
						<Link to={'/kontakt'}>Kontakt</Link>
					</li>
					<li>
						<Link to={'/adminpanel'}>Panel Admina</Link>
					</li>
					<li>
						<Link to={'/konto'}>Moje konto</Link>
					</li>
				</ul>
			</nav>
		);
	} else {
		navLinksMenu = (
			<nav className='navbar'>
				<button className='btn-bars'>
					<FaBars className='ic-bars'></FaBars>
				</button>
				<ul>
					<li>
						<Link to={'/'}>Strona Główna</Link>
					</li>
					<li>
						<Link to={'/obibliotece'}>O Bibliotece</Link>
					</li>
					<li>
						<Link to={'/książki'}>Książki</Link>
					</li>
					<li>
						<Link to={'/kontakt'}>Kontakt</Link>
					</li>
					<li>
						<Link to={'/logowanie'}>Logowanie</Link>
					</li>
				</ul>
			</nav>
		);
	}
	return <div className='navbar-component'>{navLinksMenu}</div>;
};

export default Navbar;
