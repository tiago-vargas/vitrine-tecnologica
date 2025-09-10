import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import "./Laboratories.css";
import { Laboratory, mapLabDbToTs } from "../models";
import Card from "./Card";

function Laboratories(): JSX.Element {
	const [laboratories, setLaboratories] = useState<Laboratory[]>([]);

	useEffect(() => {
		async function getLaboratories() {
			const { data: laboratories, error } = await supabase
				.from("laboratory")
				.select("*");

			if (error) {
				console.error("Supabase error:", error.message);
			} else if (laboratories) {
				let labs = laboratories.map(mapLabDbToTs)
				console.log(labs);
				setLaboratories(labs);
			}
		}

		getLaboratories();
	}, []);

	return (
		<div>
			<header>
				<h1>Laboratórios</h1>
				<p>Veja nossos laboratórios e requisite nossos serviços</p>
			</header>

			<main>
				<h2>Nossos Laboratórios</h2>
				<p>Selecione um laboratório para ver mais detalhes:</p>
				<ul>
					{
						laboratories.map((lab) => (
							<li key={lab.id}>
								<Card
									title={lab.name}
									subtitle={lab.fullName}
									link={`/laboratorios/${lab.id}`}
								/>
							</li>
						))
					}
				</ul>
			</main>
		</div>
	);
}

export default Laboratories;
