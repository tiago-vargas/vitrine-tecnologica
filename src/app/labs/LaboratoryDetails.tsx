import { useEffect, useState } from "react";
import { Laboratory } from "../../models";
import { useParams } from "react-router-dom";

function LaboratoryDetails(props: { laboratory?: Laboratory }) {
	const { id } = useParams<{ id: string }>();
	const [laboratory, setLaboratory] = useState<Laboratory | null>(null);

	useEffect(() => {
		fetch(`http://localhost:5000/laboratory/${id}`)
			.then(response => response.json())
			.then(data => setLaboratory(data))
			.catch(error => console.error('Error fetching laboratory:', error));
	}, [id]);

	if (!laboratory) {
		return (
			<header>
				<h3>Carregando...</h3>
			</header>
		);
	}

	return (
		<header>
			<h1>{laboratory?.name}</h1>
			<p>{laboratory?.description}</p>
			<p>Responsible Professor ID: {laboratory?.responsibleProfessorId}</p>
		</header>
	);
}

export default LaboratoryDetails;
