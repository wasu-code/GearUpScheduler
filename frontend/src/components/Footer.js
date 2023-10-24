function Footer() {
	return (
		<footer className="footer">
			<nav>
				<ul className="footer__nav">
					<li className="footer__nav-item">O nas</li>
					<li className="footer__nav-item">FAQ</li>
					<li className="footer__nav-item">Profil</li>
					<li className="footer__nav-item">Zarezerwuj wizytę</li>
				</ul>
			</nav>
			<hr />
			<div className="footer__logo">
				<p className="footer__logo-name">GearUpScheduler</p>
				<p className="footer__logo-copy">&copy; 2023 GearUpScheduler. Wszystkie prawa zastrzeżone</p>
			</div>
		</footer>
	);
}

export default Footer;
