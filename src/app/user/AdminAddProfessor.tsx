import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./AdminAddProfessor.css";

function AdminAddProfessor(): JSX.Element {
	const [formData, setFormData] = useState<CreateProfessor>({
		name: "",
		email: "",
		areaOfExpertise: "",
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
			const response = await fetch("http://localhost:5000/professor", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			if (response.ok) {
				navigate("/administrador/professores");
			} else {
				setError("Erro ao cadastrar professor");
			}
		} catch (error) {
			console.error("Erro:", error);
			setError("Um erro ocorreu. Tente novamente.");
		}
	};

	return (
		<div>
			<header className="Register">
				<h1>Cadastrar Professor</h1>
			</header>
			<main className="Register">
				<h2>Cadastro</h2>
				<p>Informe os dados do professor a ser cadastrado</p>
				<form onSubmit={handleSubmit}>
					<label htmlFor="prof-name">Nome</label>
					<input
						type="text"
						name="name"
						id="prof-name"
						placeholder="Nome"
						value={formData.name}
						onChange={handleChange}
					/>

					<label htmlFor="prof-email">E-mail</label>
					<input
						type="email"
						name="email"
						id="prof-email"
						placeholder="E-mail"
						value={formData.email}
						onChange={handleChange}
					/>

					<label htmlFor="prof-area">Área de Expertise</label>
					<textarea
						name="areaOfExpertise"
						id="prof-area"
						placeholder="Área de Expertise"
						value={formData.areaOfExpertise}
						onChange={handleChange}
					/>
					<button type="submit">Cadastrar</button>
				</form>
				{error && <p className="error">{error}</p>}
			</main>
		</div>
	);
}

interface CreateProfessor {
	name: string;
	email: string;
	areaOfExpertise: string;
}

export default AdminAddProfessor;
