import { Link } from "react-router-dom";
import { useState } from "react"
import * as userService from '../../../utilities/users-service'
import './NavBar.css'
import {
	MDBIcon,
  } from 'mdb-ui-kit'

export default function NavBar({ user, setUser }) {

	const [navMenu, setNavMenu] = useState(false)

	function handleLogOut() {
		// we should delgate the actual logging out to the users service
		userService.logOut()
		setUser(null)
	}

	return (
		<>
			<nav className="navbar bg-dark fluid py-1 d-flex">
				<div>
					<div className="nav-link " id="logo-name">ribbit</div>
					<i className="fas fa-frog"></i>
				</div>
				<span className="greeting text-white">Welcome, {user.name}</span>
				<div className="menu-container justify-content-end">
					<div className="navbar-menu">
						<button
							type="button"
							class="btn btn-secondary dropdown-toggle"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
							id="collapse"
							onClick={() => setNavMenu((prevState) => !prevState)}
						>
							<i className="bi bi-list"></i>
						</button>
					</div>
				</div>
			</nav>
			{navMenu ? (
				<div
					className="menuLink collaspe navbar-collaspe"
					id="bs-example-navbar-collaspe-1"
				>
					<ul className="nav navbar-nav">
						<li>
							<a>
								<Link className="nav-link text-black" to="/global">
									Global
								</Link>
							</a>
						</li>
						<li>
							<a>
								<Link
									className="nav-link text-black"
									to='/mythreads'
								>My Threads</Link>
							</a>
						</li>
						<li>
							<a>
								<Link
									className="nav-link text-black"
									to=""
									onClick={handleLogOut}
								>Log Out</Link>
							</a>
						</li>
					</ul>
				</div>
			) : (
				<></>
			)}
			<>
			</>
		</>
	)
}
