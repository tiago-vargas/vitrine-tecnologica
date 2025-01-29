import { useEffect, useState } from "react";
import { Laboratory } from "../../models";
import Card from "../Card";

function AdminLaboratories(): JSX.Element {
	const [laboratories, setLaboratories] = useState<Laboratory[]>([]);

	useEffect(() => {
		fetch("http://localhost:5000/laboratory")
			.then(response => response.json())
			.then(data => setLaboratories(data))
			.catch(error => console.error('Error fetching laboratories:', error));
	});

	return (
		<div>
			<header>
				<h1>Editar Laboratórios</h1>
				<p>Edite ou remova laboratórios existentes ou cadastre novos</p>
			</header>

			<main>
				<h2>Laboratórios Cadastrados</h2>
				<p>Selecione um laboratório para ver mais detalhes</p>
				<a href="/administrador/laboratorios/cadastrar">Adicionar Laboratório</a>
				<ul>
					{
						laboratories.map((lab) => (
							<li key={lab.id}>
								<Card
									title={lab.name}
									subtitle={lab.fullName}
									link={`/administrador/laboratorios/${lab.id}`}
								/>
							</li>
						))
					}
				</ul>
			</main>
		</div>
	);
}

export default AdminLaboratories;
