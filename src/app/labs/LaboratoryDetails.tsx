import { useEffect, useState } from "react";
import { Laboratory, Professor, LaboratoryCollaborator } from "../../models";
import { useParams } from "react-router-dom";
import Card from "../Card";
import './LaboratoryDetails.css';
// import Modal from "../Modal"; // Assuming you have a Modal component

function LaboratoryDetails(): JSX.Element {
	const { id } = useParams<{ id: string }>();
	const [laboratory, setLaboratory] = useState<Laboratory | null>(null);
	const [professor, setProfessor] = useState<Professor | null>(null);
	const [collaborators, setCollaborators] = useState<Professor[]>([]);
	const [isPresentingForm, setIsPresentingForm] = useState(false);
	const [requestDetails, setRequestDetails] = useState("");

	const handleRequestService = () => {
		setIsPresentingForm(true);
	};

	const handleSubmitRequest = () => {
		setIsPresentingForm(false);
	};

	const handleCancelRequest = () => {
		setIsPresentingForm(false);
	};

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
				<h2>O Que Se Faz Aqui</h2>
				<p>{laboratory?.description}</p>

				<h2>Serviços Ofertados</h2>
				<ul>
					{laboratory?.offeredServices.map((service, index) => (
						<li key={index}>{service}</li>
					))}
				</ul>
				{
					isPresentingForm
						? <div className="Form">
							<h2>Requisitar Serviço</h2>
							<form onSubmit={handleSubmitRequest} className="Form">
								<label htmlFor="textarea">Detalhes da requisição</label>
								<textarea
									id="textarea"
									value={requestDetails}
									placeholder="aaaaaa"
									onChange={(e) => setRequestDetails(e.target.value)}
								/>
								<div className="button-row">
									<button
										type="button"
										className="destructive-action"
										onClick={handleCancelRequest}
									>
										Cancelar
									</button>
									<button
										type="submit"
										className="suggested-action"
									>
										Enviar
									</button>
								</div>
							</form>
						</div>
						: <button onClick={handleRequestService}>Requesitar Serviço</button>
				}

				<h2>Coordenador</h2>
				{professor ? (
					<ProfessorCard
						name={professor.name}
						email={professor.email}
						areaOfExpertise={professor.areaOfExpertise}
					/>
				) : (
					<p>Carregando detalhes do professor...</p>
				)}

				<h2>Colaboradores</h2>
				<ul>
					{collaborators.map((collaborator) => (
						<li key={collaborator.id}>
							<ProfessorCard
								name={collaborator.name}
								email={collaborator.email}
								areaOfExpertise={collaborator.areaOfExpertise}
							/>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}

function ProfessorCard(props: { name: String, email: String, areaOfExpertise: String }): JSX.Element {
	return (
		<div className="ProfessorCard Card">
			<h3>{props.name} <span className="email">{props.email}</span></h3>
			<p>{props.areaOfExpertise}</p>
		</div>
	);
}

export default LaboratoryDetails;
