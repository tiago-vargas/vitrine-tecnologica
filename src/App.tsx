import "./App.css";

function App() {
	return (
		<div className="App">
			<div className="Top-bar">
				<a className="logo link" href="#home">Vitrine Tecnológica</a>
				<nav>
						<a className="item link" href="#home">Início</a>
						<a className="item link" href="#laboratories">Laboratórios</a>
						<a className="item link" href="#about">Sobre</a>
						<a className="item link" href="#contact">Contato</a>
				</nav>
			</div>

			<header className="App-header">
				<h1>Vitrine Tecnológica do IFCE</h1>
				<p>Veja nossos laboratórios disponíveis e requisite nossos serviços</p>
			</header>

			<main>
				<section>
					<h2>Laboratórios</h2>
					<p>Conheça nossos laboratórios disponíveis</p>
					<a href="/labs">Conferir</a>
				</section>
				<section>
					<h2>Sobre</h2>
					<p>Conheça mais sobre a Vitrine Tecnológica</p>
				</section>
				<section>
					<h2>Contato</h2>
					<p>Entre em contato conosco</p>

					<label htmlFor="telephone">Telefone</label>
					<p id="telephone">(85) 3307-3665</p>

					<label htmlFor="email">Email</label>
					<p id="email">blablabla@exemplo.com.br</p>

					<label htmlFor="address">Endereço</label>
					<address id="address">IFCE - Bloco 3 (Ciência da Computação)<br />
						Av. Parque Central, 1315<br />
						Distrito Industrial I<br />
						Maracanaú - CE, 61939-140
					</address>
				</section>
			</main>
		</div>
	);
}

export default App;
