import { NavLink } from "react-router-dom";
import { Professor } from "../models";

function ProfessorCard(props: { professor: Professor, linkPrefix: string }): JSX.Element {
	return (
		<NavLink to={`${props.linkPrefix}/${props.professor.id}`}>
			<div className="ProfessorCard Card">
				<h3>{props.professor.name} <span className="email">{props.professor.email}</span></h3>
				<p>{props.professor.areaOfExpertise}</p>
			</div>
		</NavLink>
	);
}


export default ProfessorCard;
