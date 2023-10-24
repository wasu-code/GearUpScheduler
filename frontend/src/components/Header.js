import { useState, useEffect } from "react";

import { TfiUser } from "react-icons/tfi";

function Header() {
	const [isScrolled, setScrolled] = useState(false);

	const handleScroll = (event) => {
		const scrollY = window.scrollY;

		if (scrollY >= 50 && !isScrolled) {
			setScrolled(true);
		} else if (scrollY < 50 && isScrolled) {
			setScrolled(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [isScrolled]);

	return (
		<header className={`header${isScrolled ? " header--scrolled" : ""}`}>
			<nav className="header__nav">
				<div className="header__nav-logo">GearUpScheduler</div>
				<div className="header__nav-options">
					<div className="header__nav-login">
						<TfiUser />
						<p className="header__nav-login-text">Zaloguj się / Załóż konto</p>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default Header;
