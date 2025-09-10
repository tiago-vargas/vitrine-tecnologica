import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Laboratory, Professor, mapLabDbToTs, mapProfDbToTs, mapLabCollabDbToTs, LaboratoryCollaborator } from "../../models";
import { supabase } from "../../utils/supabase";
import Card from "../Card";

function ProfessorDetails(): JSX.Element {
	const { id } = useParams<{ id: string }>();
	const [professor, setProfessor] = useState<Professor | null>(null);
	const [coordinatorLabs, setCoordinatorLabs] = useState<Laboratory[]>([]);
	const [collaboratorLabs, setCollaboratorLabs] = useState<Laboratory[]>([]);

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
				setProfessor(data ? mapProfDbToTs(data) : null);
			}
		}

		if (id) {
			fetchProfessor();
		}
	}, [id]);

	useEffect(() => {
		async function fetchCoordinatorLabs() {
			const { data, error } = await supabase
				.from("laboratory")
				.select("*")
				.eq("responsible_professor_id", id);
			if (error) {
				console.error('Error fetching coordinator labs:', error);
			} else {
				setCoordinatorLabs(data ? data.map(mapLabDbToTs) : []);
			}
		}

		if (id) {
			fetchCoordinatorLabs();
		}
	}, [id]);

	useEffect(() => {
		async function fetchCollaboratorLabs() {
			const { data: collabs, error } = await supabase
				.from("laboratory_collaborator")
				.select("*")
				.eq("professor_id", id);

			if (error) {
				console.error('Error fetching collaborator data:', error);
				return;
			}

			const mappedCollabs = collabs ? collabs.map(mapLabCollabDbToTs) : [];
			if (mappedCollabs.length > 0) {
				const labIds = mappedCollabs.map((c: LaboratoryCollaborator) => c.laboratoryId);
				const { data: labs, error: labsError } = await supabase
					.from("laboratory")
					.select("*")
					.in("id", labIds);

				if (labsError) {
					console.error('Error fetching collaborator labs:', labsError);
				} else {
					setCollaboratorLabs(labs ? labs.map(mapLabDbToTs) : []);
				}
			} else {
				setCollaboratorLabs([]);
			}
		}

		if (id) {
			fetchCollaboratorLabs();
		}
	}, [id]);

	if (!professor) {
		return (
			<header>
				<h3>Carregando...</h3>
			</header>
		);
	}

	return (
		<div>
			<header>
				<h1>{professor.name}</h1>
				<p>{professor.email}</p>
				<p>{professor.areaOfExpertise}</p>
			</header>

			<main>
				<h2>Coordenador</h2>
				<ul>
					{coordinatorLabs.map((lab) => (
						<li key={lab.id}>
							<Card
								title={lab.name}
								subtitle={lab.fullName}
								link={`/laboratorios/${lab.id}`}
							/>
						</li>
					))}
				</ul>

				<h2>Colaborador</h2>
				<ul>
					{collaboratorLabs.map((lab) => (
						<li key={lab.id}>
							<Card
								title={lab.name}
								subtitle={lab.fullName}
								link={`/laboratorios/${lab.id}`}
							/>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}

export default ProfessorDetails;
