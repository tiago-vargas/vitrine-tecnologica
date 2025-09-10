import { useEffect, useState } from "react";
import { Laboratory, Professor, LaboratoryCollaborator, mapLabDbToTs, mapProfDbToTs, mapLabCollabDbToTs } from "../../models";
import { useParams } from "react-router-dom";
import './LaboratoryDetails.css';
import ProfessorCard from "../ProfessorCard";
import { supabase } from "../../utils/supabase";

function LaboratoryDetails(): JSX.Element {
	const { id } = useParams<{ id: string }>();
	const [laboratory, setLaboratory] = useState<Laboratory | null>(null);
	const [professor, setProfessor] = useState<Professor | null>(null);
	const [collaborators, setCollaborators] = useState<Professor[]>([]);
	const [isPresentingForm, setIsPresentingForm] = useState(false);
	const [requestDetails, setRequestDetails] = useState("");
	const [requesterName, setRequesterName] = useState("");
	const [requesterEmail, setRequesterEmail] = useState("");
	const [requesterCompany, setRequesterCompany] = useState("");
	const [requesterPhoneNumber, setRequesterPhoneNumber] = useState("");

	const handleRequestService = () => {
		setIsPresentingForm(true);
	};

	const handleSubmitRequest = async (e: React.FormEvent) => {
		e.preventDefault();
		const currentDate = new Date().toISOString();
		const requestData = {
			laboratoryId: laboratory?.id,
			requesterName,
			requesterEmail,
			requesterCompany,
			requesterPhoneNumber,
			description: requestDetails,
			requestDate: currentDate,
		};

		const { error } = await supabase
			.from("serviceRequest")
			.insert([requestData]);
		if (error) {
			console.error('Error submitting request:', error);
		} else {
			setIsPresentingForm(false);
			setRequesterName("");
			setRequesterEmail("");
			setRequesterCompany("");
			setRequesterPhoneNumber("");
			setRequestDetails("");
		}
	};

	const handleCancelRequest = () => {
		setIsPresentingForm(false);
	};

	useEffect(() => {
		async function fetchLaboratory() {
			const { data: laboratory, error } = await supabase
				.from("laboratory")
				.select("*")
				.eq("id", id)
				.single();
			if (error) {
				console.error("Error fetching laboratory:", error);
			} else if (laboratory) {
				let lab = mapLabDbToTs(laboratory);
				setLaboratory(lab);
			}
		}

		if (id) {
			fetchLaboratory();
		}
	}, [id]);

	useEffect(() => {
		async function fetchProfessor() {
			if (!laboratory || !laboratory.responsibleProfessorId) return;
			const { data: professor, error } = await supabase
				.from("professor")
				.select("*")
				.eq("id", laboratory.responsibleProfessorId)
				.single();
			if (error) {
				console.error('Error fetching professor:', error);
			} else if (professor) {
				let prof = mapProfDbToTs(professor);
				setProfessor(prof);
			}
		}
		fetchProfessor();
	}, [laboratory]);

	useEffect(() => {
		async function fetchCollaborators() {
			if (!laboratory || !laboratory.id) return;
			const { data: collaboratorsData, error } = await supabase
				.from("laboratory_collaborator")
				.select("*")
				.eq("laboratory_id", laboratory.id);

			if (error) {
				console.error('Error fetching collaborators:', error);
				return;
			}

			const mappedCollabs = collaboratorsData ? collaboratorsData.map(mapLabCollabDbToTs) : [];
			if (mappedCollabs.length > 0) {
				const professorIds = mappedCollabs.map((c: LaboratoryCollaborator) => c.professorId);
				const { data: professors, error: profError } = await supabase
					.from("professor")
					.select("*")
					.in("id", professorIds);

				if (profError) {
					console.error('Error fetching professors:', profError);
				} else if (professors) {
					let profs = professors.map(mapProfDbToTs);
					setCollaborators(profs);
				}
			} else {
				setCollaborators([]);
			}
		}

		if (laboratory?.id) {
			fetchCollaborators();
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
					{laboratory?.offeredServices?.map((service, index) => (
						<li key={index}>{service}</li>
					))}
				</ul>
				{
					isPresentingForm
						? <div className="Form">
							<h2>Requisitar Serviço</h2>
							<p>Preencha o formulário com os seus dados e com os detalhes do serviço</p>

							<form onSubmit={handleSubmitRequest} className="Form">
								<label htmlFor="requester-name">Nome</label>
								<input id="requester-name" type="text" value={requesterName} onChange={(e) => setRequesterName(e.target.value)} />

								<label htmlFor="requester-email">E-Mail</label>
								<input type="email" id="requester-email" value={requesterEmail} onChange={(e) => setRequesterEmail(e.target.value)} />

								<label htmlFor="requester-company">Empresa</label>
								<input id="requester-company" type="text" value={requesterCompany} onChange={(e) => setRequesterCompany(e.target.value)} />

								<label htmlFor="requester-phone">Telefone</label>
								<input id="requester-phone" type="text" value={requesterPhoneNumber} onChange={(e) => setRequesterPhoneNumber(e.target.value)} />

								<label htmlFor="textarea">Detalhes da requisição</label>
								<textarea
									id="textarea"
									value={requestDetails}
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
				{
					professor
						? <ProfessorCard professor={professor} linkPrefix="/professores" />
						: <p>Carregando...</p>
				}

				<h2>Colaboradores</h2>
				<ul>
					{
						collaborators.map((collaborator) => (
							<li key={collaborator.id}>
								<ProfessorCard professor={collaborator} linkPrefix="/professores" />
							</li>
						))
					}
				</ul>
			</main>
		</div>
	);
}

export default LaboratoryDetails;
