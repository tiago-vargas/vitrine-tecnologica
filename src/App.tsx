import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Laboratories from "./app/Laboratories";
import LaboratoryDetails from "./app/labs/LaboratoryDetails";
import ProfessorDetails from "./app/professors/ProfessorDetails";
import Login from "./app/login/Login";
import UserHome from "./app/user/UserHome";
import AdminProfessors from "./app/user/AdminProfessors";
import AdminLaboratories from "./app/user/AdminLaboratories";
import AdminAddLaboratory from "./app/user/AdminAddLaboratory";

function App(): JSX.Element {
	return (
		<Router>
			<Main />
		</Router>
	);
}

function Main(): JSX.Element {
	const location = useLocation();
	const isAdminRoute = location.pathname.startsWith("/administrador");

	return (
		<div className="App">
			{isAdminRoute ? <AdminNavBar /> : <NavBar />}
			<Routes>
				<Route index element={<Home />} />
				<Route path="/laboratorios" element={<Laboratories />} />
				<Route path="/laboratorios/:id" element={<LaboratoryDetails />} />
				<Route path="/professores/:id" element={<ProfessorDetails />} />
				<Route path="/login" element={<Login />} />
				<Route path="/administrador" element={<UserHome />} />
				<Route path="/administrador/professores" element={<AdminProfessors />} />
				<Route path="/administrador/laboratorios" element={<AdminLaboratories />} />
				<Route path="/administrador/laboratorios/cadastrar" element={<AdminAddLaboratory />} />
			</Routes>
		</div>
	);
}

function NavBar(): JSX.Element {
	return (
		<div className="Top-bar">
			<a className="logo link" href="/">Vitrine Tecnológica</a>
			<nav>
				<a className="item link" href="/">Início</a>
				<a className="item link" href="/laboratorios">Laboratórios</a>
				<a className="item link" href="/#sobre">Sobre Nós</a>
				<a className="item link" href="/#contato">Contato</a>
				<a className="item link" href="/login">Administrador</a>
			</nav>
		</div>
	);
}

function AdminNavBar(): JSX.Element {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("user");
		navigate("/login");
	};

	return (
		<div className="Top-bar">
			<a className="logo link" href="/administrador">Administrador</a>
			<nav>
				<a className="item link" href="/administrador">Início</a>
				<a className="item link" href="/administrador/professores">Professores</a>
				<a className="item link" href="/administrador/laboratorios">Laboratórios</a>
				<a className="item link" href="/login" onClick={handleLogout}>Sair</a>
			</nav>
		</div>
	);
}

function Home(): JSX.Element {
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
					<p id="phone">(85) 91234-5678</p>

					<label htmlFor="email">E-Mail</label>
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
