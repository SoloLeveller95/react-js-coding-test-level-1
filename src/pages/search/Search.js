import React from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ProgressBar from "react-bootstrap/ProgressBar";

// styles
import "./Search.css";
import Navbar from "../../components/Navbar";

// components
// import RecipeList from "../../components/RecipeList";

export default function Search() {
	const queryString = useLocation().search;
	const queryParams = new URLSearchParams(queryString);
	console.log(queryParams);
	const query = queryParams.get("q");

	const url = "https://pokeapi.co/api/v2/pokemon/" + query;
	const { error, isLoading, data: pokemon } = useFetch(url);
	console.log(url);
	console.log(pokemon);

	return (
		<div>
			<Navbar />
			{error && (
				<div className="error">
					<h1>{error}</h1>
					<h2>( Try to check the spelling of the pokemon's name )</h2>
				</div>
			)}
			{isLoading && (
				<div className="loading">
					<h1>Loading...</h1>
				</div>
			)}
			{pokemon && (
				<div className="search__container">
					<div class="search__media">
						<img src={pokemon.sprites.other.dream_world.front_default} alt="" />
					</div>
					<div class="search__content">
						<div className="search__baseStats">
							<h4>Base stats</h4>
							{pokemon.stats.map((stat, key) => (
								<div key={key}>
									<strong>{stat.stat.name}</strong>
									<ProgressBar
										animated
										now={stat.base_stat}
										max={255}
										label={stat.base_stat}
									/>
								</div>
							))}
						</div>
						<div className="search__abilities__types">
							<div className="search__abilities">
								<h4>Abilities</h4>
								{pokemon.abilities.map((ability, key) => (
									<div key={key}>
										<span> - {ability.ability.name}</span>
									</div>
								))}
							</div>
							<div className="search__types">
								<h4>Types</h4>
								{pokemon.types.map((type, key) => (
									<div key={key}>
										<span> - {type.type.name}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
