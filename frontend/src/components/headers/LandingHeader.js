import React from 'react';
import { Link } from "react-router-dom";

import logo from '../../static/img/logo.png';

const LandingHeader = () => {
	return (
		<header className="landing-header">
			<div className="landing-header__section">
				<img className="landing-header__logo" src={logo} />
			</div>

			<div className="landing-header__section">
				<ul className="landing-header__list">
					<li className="landing-header__li">
						<a>
							Doing
						</a>
					</li>
					<li className="landing-header__li">
						<a>
							Enterprise
						</a>
					</li>
					<li className="landing-header__li">
						<a>
							Practices
						</a>
					</li>
				</ul>
			</div>

			<div className="landing-header__section">
				<ul className="landing-header__list">
					<li className="landing-header__li">
						<Link to="/login">
							Login
						</Link>
					</li>
					<li className="landing-header__li">
						<Link to="/register" className="btn">
							Sign Up
						</Link>
					</li>
				</ul>
			</div>
		</header>
	);
}

export default LandingHeader;
