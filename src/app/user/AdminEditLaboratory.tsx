import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Laboratory, ServiceRequest, mapLabDbToTs, mapServiceReqDbToTs } from "../../models";
import { supabase } from "../../utils/supabase";
// import "./AdminEditLaboratory.css";

function AdminEditLaboratory(): JSX.Element {
	const { id } = useParams<{ id: string }>();
	const [formData, setFormData] = useState<Laboratory | null>(null);
	const [error, setError] = useState("");
	const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchLab() {
			const { data: formData, error } = await supabase
				.from("laboratory")
				.select("*")
				.eq("id", id)
				.single();
			if (error) {
				console.error('Error fetching laboratory:', error);
			} else {
				setFormData(formData ? mapLabDbToTs(formData) : null);
			}
		}
		if (id) fetchLab();
	}, [id]);

	useEffect(() => {
		async function fetchRequests() {
			const { data, error } = await supabase
				.from("serviceRequest")
				.select("*")
				.eq("laboratory_id", formData!.id);
			if (error) {
				console.error('Error fetching service requests:', error);
			} else {
				setServiceRequests(data ? data.map(mapServiceReqDbToTs) : []);
			}
		}
		if (formData?.id) fetchRequests();
	}, [formData?.id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		if (formData) {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { error } = await supabase
				.from("laboratory")
				.update({
					name: formData!.name,
					full_name: formData!.fullName,
					description: formData!.description,
					offered_services: formData!.offeredServices,
					responsible_professor_id: formData!.responsibleProfessorId,
				})
				.eq("id", id);
			if (!error) {
				navigate("/administrador/laboratorios");
			} else {
				setError("Erro ao editar laboratório");
			}
		} catch (error) {
			console.error("Erro:", error);
			setError("Um erro ocorreu. Tente novamente.");
		}
	};

	const handleDelete = async () => {
		try {
			const { error } = await supabase
				.from("laboratory")
				.delete()
				.eq("id", id);
			if (!error) {
				navigate("/administrador/laboratorios");
			} else {
				setError("Erro ao deletar laboratório");
			}
		} catch (error) {
			console.error("Erro:", error);
			setError("Um erro ocorreu. Tente novamente.");
		}
	};

	if (!formData) {
		return <div>Carregando...</div>;
	}

	return (
		<div>
			<header>
				<h1>Editar Laboratório</h1>
			</header>
			<main className="Register">
				<h2>Editar</h2>
				<p>Atualize os dados do laboratório</p>
				<form onSubmit={handleSubmit}>
					<label htmlFor="lab-name">Sigla</label>
					<input
						type="text"
						name="name"
						id="lab-name"
						placeholder="LabVICIA"
						value={formData.name}
						onChange={handleChange}
					/>

					<label htmlFor="lab-full-name">Nome</label>
					<input
						type="text"
						name="fullName"
						id="lab-full-name"
						placeholder="Laboratório de Visão Computacional e Inteligência Artificial"
						value={formData.fullName}
						onChange={handleChange}
					/>

					<label htmlFor="lab-description">O que se faz lá?</label>
					<textarea
						name="description"
						id="lab-description"
						value={formData.description || ""}
						onChange={handleChange}
					/>

					<label htmlFor="lab-services">Serviços Oferecidos</label>
					<input
						type="text"
						name="offeredServices"
						id="lab-services"
						placeholder="Serviços (separados por vírgula)"
						value={formData.offeredServices?.join(", ") || ""}
						onChange={(e) => setFormData({ ...formData, offeredServices: e.target.value.split(", ") })}
					/>

					<label htmlFor="lab-responsible">Coordenador</label>
					<input
						type="number"
						name="responsibleProfessorId"
						placeholder="ID do Professor Responsável"
						value={formData.responsibleProfessorId || ""}
						onChange={handleChange}
					/>
					<button type="submit">Salvar</button>
				</form>

				<h2>Requisições de Serviço</h2>
				<ul>
					{
						serviceRequests.map(request => (
							<li key={request.id}>
								<RequestCard request={request} />
							</li>
						))
					}
				</ul>
				<button onClick={handleDelete} className="destructive-action">Deletar</button>
				{error && <p className="error">{error}</p>}
			</main>
		</div >
	);
}

function RequestCard(props: { request: ServiceRequest }) {
	const requestDate = new Date(props.request.date);
	const formattedDate = requestDate.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

	return (
		<NavLink to="">
			<div className="Card">
				<h3>{props.request.requesterCompany}</h3>
				<p><strong>Nome:</strong> {props.request.requesterName}</p>
				<p><strong>E-mail:</strong> {props.request.requesterEmail}</p>
				<p><strong>Telefone:</strong> {props.request.requesterPhoneNumber}</p>
				<p><strong>Descrição:</strong> {props.request.description}</p>
				<p><strong>Data da Requisição:</strong> {formattedDate}</p>
			</div>
		</NavLink>
	);
}

export default AdminEditLaboratory;
