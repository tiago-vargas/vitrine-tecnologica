import { useEffect, useState } from "react";
import { Laboratory, Professor, LaboratoryCollaborator } from "../../models";
import { useParams } from "react-router-dom";
import Card from "../Card";

function LaboratoryDetails(props: { laboratory?: Laboratory }) {
	const { id } = useParams<{ id: string }>();
	const [laboratory, setLaboratory] = useState<Laboratory | null>(null);
	const [professor, setProfessor] = useState<Professor | null>(null);
	const [collaborators, setCollaborators] = useState<Professor[]>([]);

	useEffect(() => {
		fetch(`http://localhost:5000/laboratory/${id}`)
			.then(response => response.json())
			.then(data => setLaboratory(data))
			.catch(error => console.error('Error fetching laboratory:', error));
	}, [id]);

	useEffect(() => {
		if (laboratory?.responsibleProfessorId) {
			fetch(`http://localhost:5000/professor/${laboratory.responsibleProfessorId}`)
				.then(response => response.json())
				.then(data => setProfessor(data))
				.catch(error => console.error('Error fetching professor:', error));
		}
	}, [laboratory?.responsibleProfessorId]);

	useEffect(() => {
		if (laboratory?.id) {
			fetch(`http://localhost:5000/laboratoryCollaborator?laboratoryId=${laboratory.id}`)
				.then(response => response.json())
				.then(data => {
					const collaboratorPromises = data.map((collaborator: LaboratoryCollaborator) =>
						fetch(`http://localhost:5000/professor/${collaborator.professorId}`)
							.then(response => response.json())
					);
					Promise.all(collaboratorPromises)
						.then(professors => setCollaborators(professors))
						.catch(error => console.error('Error fetching professors:', error));
				})
				.catch(error => console.error('Error fetching collaborators:', error));
		}
	}, [laboratory?.id]);

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
				{professor ? (
					<Card
						title={professor.name}
						subtitle={`\n${professor.email}`}
						link={"a"}
					/>
					// <p>Área de Expertise: {professor.areaOfExpertise}</p>
				) : (
					<p>Carregando detalhes do professor...</p>
				)}

				<h2>Colaboradores</h2>
				<ul>
					{collaborators.map((collaborator) => (
						<li key={collaborator.id}>
							<Card
								title={collaborator.name}
								subtitle={`\n${collaborator.email}`}
								link={"a"}
							/>
							{/* <p>Área de Expertise: {collaborator.areaOfExpertise}</p> */}
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}

export default LaboratoryDetails;
