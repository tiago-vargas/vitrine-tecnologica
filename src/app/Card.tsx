import { NavLink } from "react-router-dom";

function Card(props: { title: string; subtitle: string; link: string }): JSX.Element {
	return (
		<NavLink to={props.link}>
			<div className="Card">
				<h3>{props.title}</h3>
				<p>{props.subtitle}</p>
			</div>
		</NavLink>
	);
}

export default Card;
