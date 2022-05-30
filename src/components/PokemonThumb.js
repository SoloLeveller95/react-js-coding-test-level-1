const PokemonThumb = ({ getOnePokemon, id, image, name, type }) => {
	const style = type + " thumb__container";
	return (
		<div className={style} onClick={() => getOnePokemon(id)}>
			<div className="number">
				<small>#0{id}</small>
			</div>
			<img src={image} alt={name} />
			<div className="thumb__wrapper">
				<h3>{name}</h3>
				<small>Type: {type}</small>
			</div>
		</div>
	);
};

export default PokemonThumb;
