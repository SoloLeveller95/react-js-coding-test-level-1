import "./App.css";
import Home from "./pages/home/Home";
import { Route, HashRouter } from "react-router-dom";
import PokeDex from "./pages/pokedex/PokeDex";
import Search from "./pages/search/Search";

function App() {
	return (
		<>
			<HashRouter>
				<div>
					<Route exact path="/" component={Home} />
					<Route path="/pokedex" component={PokeDex} />
					<Route path="/search" component={Search} />
				</div>
			</HashRouter>
		</>
	);
}

export default App;
