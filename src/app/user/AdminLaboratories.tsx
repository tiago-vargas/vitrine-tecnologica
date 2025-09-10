import { useEffect, useState } from "react";
import { Laboratory, mapLabDbToTs } from "../../models";
import { supabase } from "../../utils/supabase";
import Card from "../Card";

function AdminLaboratories(): JSX.Element {
	const [laboratories, setLaboratories] = useState<Laboratory[]>([]);

	useEffect(() => {
		async function getLaboratories() {
			const { data: laboratories, error } = await supabase
				.from("laboratory")
				.select("*");
			if (error) {
				console.error('Error fetching laboratories:', error);
			} else {
				let labs = laboratories.map(mapLabDbToTs)
				setLaboratories(labs);
			}
		}
		getLaboratories();
	}, []);

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
