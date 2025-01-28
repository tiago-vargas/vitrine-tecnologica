import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Laboratories.css";
import { Laboratory } from "../models";
import Card from "./Card";

function Laboratories(): JSX.Element {
	const [laboratories, setLaboratories] = useState<Laboratory[]>([]);

	useEffect(() => {
		fetch("http://localhost:5000/laboratory")
			.then(response => response.json())
			.then(data => setLaboratories(data))
			.catch(error => console.error('Error fetching laboratories:', error));
	});

	return (
		<div>
			<header>
				<h1>Laboratórios</h1>
				<p>Veja nossos laboratórios e requisite nossos serviços</p>
			</header>

			<main>
				<h2>Nossos Laboratórios</h2>
				<p>Selecione um laboratório para ver mais detalhes:</p>
				<ul>
					{
						laboratories.map((lab) => (
							<li key={lab.id}>
								<Card
									title={lab.name}
									subtitle={lab.fullName}
									link={`/laboratorios/${lab.id}`}
								/>
							</li>
						))
					}
				</ul>
			</main>
		</div>
	);
}

export default Laboratories;
