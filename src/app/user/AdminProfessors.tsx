import { useEffect, useState } from "react";
import { Professor } from "../../models";
import ProfessorCard from "../ProfessorCard";
// import "./AdminProfessors.css";

function AdminProfessors(): JSX.Element {
	const [professors, setProfessors] = useState<Professor[]>([]);

	useEffect(() => {
		fetch("http://localhost:5000/professor")
			.then(response => response.json())
			.then(data => setProfessors(data))
			.catch(error => console.error('Error fetching professors:', error));
	}, []);

	return (
		<div>
			<header>
				<h1>Professores</h1>
				<p>Veja nossos professores e suas áreas de expertise</p>
			</header>

			<main>
				<h2>Professores Cadastrados</h2>
				<p>Selecione um professor para editar seus detalhes</p>
				<ul>
					{
						professors.map((prof) => (
							<li key={prof.id}>
								<ProfessorCard professor={prof} linkPrefix="/administrador/professores" />
							</li>
						))
					}
				</ul>
			</main>
		</div>
	);
}

export default AdminProfessors;
