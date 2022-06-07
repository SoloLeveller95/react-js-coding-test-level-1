import React from "react";
import {
	Page,
	Text,
	Image,
	Document,
	StyleSheet,
	Font,
} from "@react-pdf/renderer";

Font.register({
	family: "Oswald",
	src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
	body: {
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35,
	},
	title: {
		fontSize: 24,
		textAlign: "center",
		fontFamily: "Oswald",
	},
	author: {
		fontSize: 24,
		textAlign: "center",
		marginTop: 40,
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 12,
		margin: 12,
		fontFamily: "Oswald",
		position: "absolute",
		bottom: 0,
		right: 0,
	},
	text: {
		margin: 12,
		fontSize: 14,
		textAlign: "justify",
		fontFamily: "Times-Roman",
		display: "flex",
		flexDirection: "column",
	},
	image: {
		marginTop: 0,
		marginBottom: 0,
		marginHorizontal: 100,
	},
	header: {
		fontSize: 12,
		marginBottom: 20,
		textAlign: "center",
		color: "grey",
	},
	pageNumber: {
		position: "absolute",
		fontSize: 12,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: "center",
		color: "grey",
	},
	flex: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});

const PDFFile = ({ prop, barImage }) => {
	return (
		<Document>
			<Page style={styles.body}>
				<Text style={styles.header} fixed>
					~ Created with react-pdf ~
				</Text>
				<Text style={styles.title}>{prop[0].name}</Text>
				<Image
					style={styles.image}
					src={prop[0].sprites.other.home.front_default}
				/>
				<Text style={styles.author}>Pokemon Stats</Text>

				<Text style={styles.text}>
					{prop[0].stats.map(
						(stat) => stat.stat.name + " => " + stat.base_stat + " || "
					)}
				</Text>
				<Image style={styles.image} src={barImage} />
				{/* <Text style={styles.text}>
						{prop[0].stats.map((stat) => stat.base_stat)}
					</Text> */}

				{/* Bawah ni code dia */}
				{/* <Svg
					style={styles.image}
					src={prop[0].sprites.other.dream_world.front_default}
				/> */}
				{/* Below direct Image URL from API pon x leh nak muncul dalam pdf tapi dekat homapage sume gambar tu load je */}
				{/* <BarChart prop={prop} /> */}

				<Text style={styles.subtitle}>Data collected from PokeAPI</Text>

				<Text
					style={styles.pageNumber}
					render={({ pageNumber, totalPages }) =>
						`${pageNumber} / ${totalPages}`
					}
					fixed
				/>
			</Page>
		</Document>
	);
};

export default PDFFile;
