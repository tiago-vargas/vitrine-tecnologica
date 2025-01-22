import { useEffect, useState } from "react";
import { Laboratory } from "../../models";
import { useParams } from "react-router-dom";

function LaboratoryDetails(props: { laboratory?: Laboratory }) {
	const { id } = useParams<{ id: string }>();
	const [laboratory, setLaboratory] = useState<Laboratory | null>(null);

	useEffect(() => {
		fetch(`http://localhost:5000/laboratory/${id}`)
			.then(response => response.json())
			.then(data => setLaboratory(data))
			.catch(error => console.error('Error fetching laboratory:', error));
	}, [id]);

	if (!laboratory) {
		return (
			<header>
				<h3>Carregando...</h3>
			</header>
		);
	}

	return (
		<div>
			<header>
				<h1>{laboratory?.name}</h1>
				<p>{laboratory?.fullName}</p>
			</header>

			<main>
				<h2>Resumo (O que se faz aqui)</h2>
				<p>{laboratory?.description}</p>

				<h2>Serviços Ofertados</h2>
				<ul>
					{laboratory?.offeredServices.map((service, index) => (
						<li key={index}>{service}</li>
					))}
				</ul>

				<h2>Coordenador</h2>
				<p>Responsible Professor ID: {laboratory?.responsibleProfessorId}</p>

				<h2>Colaboradores</h2>
				<ul>
					{laboratory?.offeredServices.map((service, index) => (
						<li key={index}>{service}</li>
					))}
				</ul>
			</main>
		</div>
	);
}

export default LaboratoryDetails;
