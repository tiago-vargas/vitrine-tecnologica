import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Professor, mapProfDbToTs } from "../../models";
import { supabase } from "../../utils/supabase";
import "./AdminAddLaboratory.css";

function AdminAddLaboratory(): JSX.Element {
	const [formData, setFormData] = useState<CreateLaboratory>({
		name: "",
		fullName: "",
		description: "",
		offeredServices: [],
		responsibleProfessorId: 0,
	});
	const [professors, setProfessors] = useState<Professor[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		async function getProfessors() {
			const { data, error } = await supabase
				.from("professor")
				.select("*");
			if (error) {
				console.error('Error fetching professors:', error);
			} else {
				setProfessors(data ? data.map(mapProfDbToTs) : []);
			}
		}
		getProfessors();
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { error } = await supabase
				.from("laboratory")
				.insert([{
					name: formData.name,
					full_name: formData.fullName,
					description: formData.description,
					offered_services: formData.offeredServices,
					responsible_professor_id: formData.responsibleProfessorId,
				}]);
			if (!error) {
				navigate("/administrador/laboratorios");
			} else {
				setError("Erro ao cadastrar laboratório");
			}
		} catch (error) {
			console.error("Erro:", error);
			setError("Um erro ocorreu. Tente novamente.");
		}
	};

	const handleProfessorSelect = (professorId: number) => {
		setFormData({ ...formData, responsibleProfessorId: professorId });
		setSearchTerm("");
	};

	const filteredProfessors = professors.filter(prof =>
		prof.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<header>
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
						type="text"
						placeholder="Buscar professor pelo nome"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<ul>
						{filteredProfessors.map(prof => (
							<li key={prof.id} onClick={() => handleProfessorSelect(prof.id)}>
								{prof.name}
							</li>
						))}
					</ul>
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
