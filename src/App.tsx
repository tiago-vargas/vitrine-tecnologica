import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Laboratories from "./app/Laboratories";

function App() {
	return (
		<div className="App">
			<NavBar />
			<Router>
				<Routes>
					<Route index element={<Home />} />
					<Route path="laboratorios" element={<Laboratories />} />
				</Routes>
			</Router>
		</div>
	);
}

function NavBar() {
	return (
		<div className="Top-bar">
			<a className="logo link" href="/">Vitrine Tecnológica</a>
			<nav>
				<a className="item link" href="/">Início</a>
				<a className="item link" href="/laboratorios">Laboratórios</a>
				<a className="item link" href="#sobre">Sobre Nós</a>
				<a className="item link" href="#contato">Contato</a>
			</nav>
		</div>
	);
}

function Home() {
	return (
		<div>
			<header>
				<h1>Vitrine Tecnológica do IFCE</h1>
				<p>Veja nossos laboratórios disponíveis e requisite nossos serviços</p>
			</header>

			<main>
				<section id="laboratorios">
					<h2>Laboratórios</h2>
					<p>Conheça nossos laboratórios disponíveis</p>
					<a href="/laboratorios">Conferir</a>
				</section>
				<section id="sobre-nos">
					<h2>Sobre Nós</h2>
					<p>Conheça mais sobre a Vitrine Tecnológica</p>
				</section>
				<section id="contato">
					<h2>Contato</h2>
					<p>Entre em contato conosco</p>

					<label htmlFor="phone">Telefone</label>
					<p id="phone">(85) 3307-3665</p>

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
