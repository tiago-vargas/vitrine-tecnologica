import { useEffect, useState } from "react";
import "./Laboratories.css";
import { Laboratory } from "../models";

function Laboratories() {
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
									description={lab.description}
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

function Card(props: { title: string; description: string; link: string; }) {
	return (
		<a href={props.link}>
			<div className="Card">
				<h3>{props.title}</h3>
				<p>{props.description}</p>
			</div>
		</a>
	);
}

export default Laboratories;
