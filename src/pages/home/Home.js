import "./Home.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Home() {
	const [text, setText] = useState("");
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		if (text === "Ready" || text === "ready") {
			setIsReady(true);
		} else {
			setIsReady(null);
		}
	}, [text]);

	return (
		<div className="home">
			<header className="home__header">
				<NavLink exact to="/pokedex">
					<img
						hidden={!isReady}
						src="https://www.freeiconspng.com/uploads/file-pokeball-png-0.png"
						className="home__logo"
						alt="logo"
						style={{ padding: "10px" }}
					/>
				</NavLink>

				<p>Are you ready to be a pokemon master?</p>
				<input
					type="text"
					name="name"
					onChange={(e) => setText(e.target.value)}
					value={text}
					style={{ marginBottom: 20 }}
				/>
				<span
					hidden={text === "Ready" || text === "ready"}
					style={{ color: "red", marginTop: 30 }}
				>
					I am not ready yet!
				</span>
				<p style={{ fontSize: 14 }}>
					(Please type "Ready" in the input above & click on the pokeball )
				</p>
			</header>
		</div>
	);
}

export default Home;
