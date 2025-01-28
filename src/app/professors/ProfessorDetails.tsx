import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Laboratory, Professor } from "../../models";
import Card from "../Card";

function ProfessorDetails(): JSX.Element {
	const { id } = useParams<{ id: string }>();
	const [professor, setProfessor] = useState<Professor | null>(null);
	const [coordinatorLabs, setCoordinatorLabs] = useState<Laboratory[]>([]);
	const [collaboratorLabs, setCollaboratorLabs] = useState<Laboratory[]>([]);

	useEffect(() => {
		fetch(`http://localhost:5000/professor/${id}`)
			.then(response => response.json())
			.then(data => setProfessor(data))
			.catch(error => console.error('Error fetching professor:', error));
	}, [id]);

	useEffect(() => {
		fetch(`http://localhost:5000/laboratory?responsibleProfessorId=${id}`)
			.then(response => response.json())
			.then(data => setCoordinatorLabs(data))
			.catch(error => console.error('Error fetching coordinator labs:', error));
	}, [id]);

	useEffect(() => {
		fetch(`http://localhost:5000/laboratoryCollaborator?professorId=${id}`)
			.then(response => response.json())
			.then(data => {
				const labPromises = data.map((collaborator: { laboratoryId: string }) =>
					fetch(`http://localhost:5000/laboratory/${collaborator.laboratoryId}`)
						.then(response => response.json())
				);
				Promise.all(labPromises)
					.then(labs => setCollaboratorLabs(labs))
					.catch(error => console.error('Error fetching collaborator labs:', error));
			})
			.catch(error => console.error('Error fetching collaborator data:', error));
	}, [id]);

	if (!professor) {
		return (
			<header>
				<h3>Carregando...</h3>
			</header>
		);
	}

	return (
		<div>
			<header>
				<h1>{professor.name}</h1>
				<p>{professor.email}</p>
				<p>{professor.areaOfExpertise}</p>
			</header>

			<main>
				<h2>Coordenador</h2>
				<ul>
					{coordinatorLabs.map((lab) => (
						<li key={lab.id}>
							<Card
								title={lab.name}
								subtitle={lab.fullName}
								link={`/laboratorios/${lab.id}`}
							/>
						</li>
					))}
				</ul>

				<h2>Colaborador</h2>
				<ul>
					{collaboratorLabs.map((lab) => (
						<li key={lab.id}>
							<Card
								title={lab.name}
								subtitle={lab.fullName}
								link={`/laboratorios/${lab.id}`}
							/>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}

export default ProfessorDetails;
