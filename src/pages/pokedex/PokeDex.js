import "./PokeDex.css";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PokemonThumb from "../../components/PokemonThumb";
import Navbar from "../../components/Navbar";
import BarChart from "../../components/BarChart";
import PDFFile from "../../components/PDFFile";

function PokeDex() {
	const url = "https://pokeapi.co/api/v2/pokemon?limit=250";
	const [pokemons, setPokemons] = useState([]);
	const [pokemonDetail, setPokemonDetail] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [pageNumber, setPageNumber] = useState(0);
	const pokemonPerPage = 30;
	const pagesVisited = pageNumber * pokemonPerPage;
	const pageCount = Math.ceil(pokemons.length / pokemonPerPage);

	// Get all of each pokemon data from the API and store it inside pokemon variable/state
	const getAllPokemons = () => {
		setTimeout(async () => {
			const response = await axios.get(url);
			const data = response.data;

			function createPokemonObject(results) {
				results.forEach(async (pokemon) => {
					const response = await axios.get(
						`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
					);
					const data = response.data;
					setPokemons((currentList) => [...currentList, data]);
				});
			}
			createPokemonObject(data.results);
			setIsLoading(false);
		}, 3000);
	};
	useEffect(() => {
		setIsLoading(true);
		getAllPokemons();
	}, []);

	// Sort the pokemon data that we get according to the ID (Ascending)
	pokemons.sort((a, b) => a.id - b.id);

	//Function to go into React paginate component as a prop (whether ascending or descending)
	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	// Get each pokemon specific detail when we click each pokemon card and thus, open the modal. The function will be passed down to the PokemonThumb component in order to get each specific ID and set it to the pokemonDetail variable/state.
	const getOnePokemon = (id) => {
		const onepokemon = pokemons.filter((pokemon) => pokemon.id === id);
		setPokemonDetail(onepokemon);
	};

	//Function to close the modal
	const closeModal = () => {
		setPokemonDetail(null);
	};

	return (
		<div>
			<header className="pokedex__header">
				{isLoading ? (
					<div className="pokedex__loader">
						<ReactLoading
							type="spinningBubbles"
							// type="bars"
							height={200}
							width={200}
							color="#282c34"
						/>
					</div>
				) : (
					<div className="pokedex__container">
						<Navbar />
						<div className="pokodex__allContainer">
							{pokemons
								.slice(pagesVisited, pagesVisited + pokemonPerPage)
								.map((pokemon, index) => (
									<PokemonThumb
										getOnePokemon={getOnePokemon}
										key={index}
										id={pokemon.id}
										image={pokemon.sprites.other.dream_world.front_default}
										name={pokemon.name}
										type={pokemon.types[0].type.name}
									/>
								))}
						</div>
						<ReactPaginate
							previousLabel={<HiArrowSmLeft />}
							nextLabel={<HiArrowSmRight />}
							pageCount={pageCount}
							onPageChange={changePage}
							containerClassName={"paginationBttns"}
							previousLinkClassName={"previousBttn"}
							nextLinkClassName={"nextBttn"}
							activeClassName={"paginationActive"}
							activeLinkClassName={"paginationLinkActive"}
						/>
					</div>
				)}
			</header>
			{pokemonDetail && (
				<div className="modal__overlay">
					<div className="modal__content">
						<div className="modal__upper">
							<img
								src={pokemonDetail[0].sprites.other.dream_world.front_default}
								alt=""
							/>
							<div className="modal__baseStats">
								<h4>Base stats</h4>
								{pokemonDetail[0].stats.map((stat, key) => (
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
							<button className="modal__closeButton" onClick={closeModal}>
								<FaTimes></FaTimes>
							</button>
						</div>
						<div className="modal__lower">
							<BarChart prop={pokemonDetail} />
							<div className="modal__button">
								<PDFDownloadLink
									document={<PDFFile prop={pokemonDetail} />}
									fileName="pokemonData.pdf"
									className="modal__link"
								>
									{({ loading }) =>
										loading ? "Loading document..." : "DOWNLOAD DATA"
									}
								</PDFDownloadLink>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default PokeDex;
