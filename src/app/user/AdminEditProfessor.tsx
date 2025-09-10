import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Professor, mapProfDbToTs } from "../../models";
import { supabase } from "../../utils/supabase";
// import "./AdminEditProfessor.css";

function AdminEditProfessor(): JSX.Element {
	const { id } = useParams<{ id: string }>();
	const [formData, setFormData] = useState<Professor | null>(null);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchProfessor() {
			const { data, error } = await supabase
				.from("professor")
				.select("*")
				.eq("id", id)
				.single();
			if (error) {
				console.error('Error fetching professor:', error);
			} else {
				setFormData(data ? mapProfDbToTs(data) : null);
			}
		}
		if (id) fetchProfessor();
	}, [id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		if (formData) {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData) return;
		try {
			const { error } = await supabase
				.from("professor")
				.update({
					name: formData.name,
					email: formData.email,
					area_of_expertise: formData.areaOfExpertise,
				})
				.eq("id", id);
			if (!error) {
				navigate("/administrador/professores");
			} else {
				setError("Erro ao editar professor");
			}
		} catch (error) {
			console.error("Erro:", error);
			setError("Um erro ocorreu. Tente novamente.");
		}
	};

	const handleDelete = async () => {
		try {
			const { error } = await supabase
				.from("professor")
				.delete()
				.eq("id", id);
			if (!error) {
				navigate("/administrador/professores");
			} else {
				setError("Erro ao deletar professor");
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
				<h1>Editar Professor</h1>
			</header>
			<main className="Register">
				<h2>Editar</h2>
				<p>Atualize os dados do professor</p>
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
					<button type="submit">Salvar</button>
				</form>
				<button onClick={handleDelete} className="destructive-action">Deletar</button>
				{error && <p className="error">{error}</p>}
			</main>
		</div>
	);
}

export default AdminEditProfessor;
