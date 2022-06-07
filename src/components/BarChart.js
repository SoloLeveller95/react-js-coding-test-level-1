import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ prop, getBarImage }) => {
	const ref = useRef();
	const statsArray = (prop) => {
		const result = prop.stats.map((stat) => stat.stat.name);
		return result;
	};
	const stats = statsArray(prop[0]);

	const statsNumber = (prop) => {
		const result = prop.stats.map((stat) => stat.base_stat);
		return result;
	};

	const number = statsNumber(prop[0]);

	return (
		<div>
			<Bar
				ref={ref}
				data={{
					labels: stats,
					datasets: [
						{
							label: "Pokemon stats",
							data: number,
							backgroundColor: [
								"rgba(255, 99, 132, 0.2)",
								"rgba(54, 162, 235, 0.2)",
								"rgba(255, 206, 86, 0.2)",
								"rgba(75, 192, 192, 0.2)",
								"rgba(153, 102, 255, 0.2)",
								"rgba(255, 159, 64, 0.2)",
							],
							borderColor: [
								"rgba(255, 99, 132, 1)",
								"rgba(54, 162, 235, 1)",
								"rgba(255, 206, 86, 1)",
								"rgba(75, 192, 192, 1)",
								"rgba(153, 102, 255, 1)",
								"rgba(255, 159, 64, 1)",
							],
							borderWidth: 1,
						},
					],
				}}
				height={200}
				width={600}
				options={{
					maintainAspectRatio: false,
					scales: {
						y: {
							suggestedMin: 0,
							suggestedMax: 255,
						},
					},
					legend: {
						labels: {
							fontSize: 25,
						},
					},
					animation: {
						onComplete: function () {
							const imageData = ref.current.toBase64Image();
							getBarImage(imageData);
						},
					},
				}}
			/>
		</div>
	);
};

export default BarChart;
