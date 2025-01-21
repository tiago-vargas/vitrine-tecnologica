import "./Laboratories.css";

interface CardProps {
	title: string;
	description: string;
	link: string;
}

function Laboratories() {
	const laboratories = [
		{ title: "LaTIM", description: "Laboratório de Tecnologias de Informação em Medicina", link: "/laboratorios/latim" },
		{ title: "LabVICIA", description: "Laboratório de Visão Computacional e Imagem Aplicada", link: "/laboratorios/labvicia" },
		{ title: "LASIC", description: "Laboratório de Sistemas Integráveis e Computação", link: "/laboratorios/lasic" },
		{ title: "LAESE", description: "Laboratório de Engenharia de Software e Sistemas", link: "/laboratorios/laese" }
	];

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
						laboratories.map((lab, index) => (
							<li key={index}>
								<Card
									title={lab.title}
									description={lab.description}
									link={lab.link}
								/>
							</li>
						))
					}
				</ul>
			</main>
		</div>
	);
}

function Card(props: { title: string; description: string; link: string;}) {
	return (
		<a href={props.link}>
			<div className="Card">
				<h3>{props.title}</h3>
				<p>{props.description}</p>
			</div>
		</a>
	);
}

export default Laboratories;
