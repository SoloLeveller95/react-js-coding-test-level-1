import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
	const history = useHistory();
	const [value, setValue] = useState("");
	const handleSearch = (e) => {
		e.preventDefault();
		history.push(`/search?q=${value}`);
	};

	return (
		<div className="navbar__container">
			<Link to="/pokedex" className="navbar__logo">
				<h1 className="navbar__logo">Welcome to pokedex !</h1>
			</Link>
			<form className="form" onSubmit={handleSearch}>
				<input
					type="text"
					className="form__input"
					placeholder="Search pokemon : gengar etc "
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<FcSearch size={30} />
			</form>
		</div>
	);
};

export default Navbar;
