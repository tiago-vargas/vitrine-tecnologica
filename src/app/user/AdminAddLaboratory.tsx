import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAddLaboratory.css";

function AdminAddLaboratory(): JSX.Element {
	const [formData, setFormData] = useState<CreateLaboratory>({
		name: "",
		fullName: "",
		description: "",
		offeredServices: [],
		responsibleProfessorId: 0,
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:5000/laboratory", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			if (response.ok) {
				navigate("/administrador/laboratorios");
			} else {
				setError("Erro ao cadastrar laboratório");
			}
		} catch (error) {
			console.error("Erro:", error);
			setError("Um erro ocorreu. Tente novamente.");
		}
	};

	return (
		<div>
			<header className="Register">
				<h1>Cadastrar Laboratório</h1>
			</header>
			<main className="Register">
				<h2>Cadastro</h2>
				<p>Informe os dados do laboratório a ser cadastrado</p>
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
						value={formData.description}
						onChange={handleChange}
					/>

					<label htmlFor="lab-services">Serviços Oferecidos</label>
					<input
						type="text"
						name="offeredServices"
						id="lab-services"
						placeholder="Serviços (separados por vírgula)"
						value={formData.offeredServices.join(", ")}
						onChange={(e) => setFormData({ ...formData, offeredServices: e.target.value.split(", ") })}
					/>

					<label htmlFor="lab-responsible">Coordenador</label>
					<input
						type="number"
						name="responsibleProfessorId"
						placeholder="ID do Professor Responsável"
						value={formData.responsibleProfessorId}
						onChange={handleChange}
					/>
					<button type="submit">Cadastrar</button>
				</form>
				{error && <p className="error">{error}</p>}
			</main>
		</div>
	);
}

interface CreateLaboratory {
	name: string;
	fullName: string;
	description: string;
	offeredServices: string[];
	responsibleProfessorId: number;
}

export default AdminAddLaboratory;
