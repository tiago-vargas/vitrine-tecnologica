import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Laboratory } from "../../models";
// import "./AdminEditLaboratory.css";

function AdminEditLaboratory(): JSX.Element {
	const { id } = useParams<{ id: string }>();
	const [formData, setFormData] = useState<Laboratory | null>(null);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`http://localhost:5000/laboratory/${id}`)
			.then(response => response.json())
			.then(data => setFormData(data))
			.catch(error => console.error('Error fetching laboratory:', error));
	}, [id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		if (formData) {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch(`http://localhost:5000/laboratory/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			if (response.ok) {
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
			const response = await fetch(`http://localhost:5000/laboratory/${id}`, {
				method: "DELETE",
			});
			if (response.ok) {
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
			<header className="Register">
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
					<button type="submit">Salvar</button>
				</form>
				<button onClick={handleDelete} className="destructive-action">Deletar</button>
				{error && <p className="error">{error}</p>}
			</main>
		</div>
	);
}

export default AdminEditLaboratory;
