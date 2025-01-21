import React from "react";
import logo from "./logo.svg";
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
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
