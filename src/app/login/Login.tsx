import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { User } from "../../models";

function Login(): JSX.Element {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await fetch(`http://localhost:5000/user?username=${username}`);
			const data: User[] = await response.json();
			if (data.length > 0 && data[0].password === password) {
				localStorage.setItem("user", JSON.stringify(data[0]));
				navigate("/administrador");
			} else {
				setError("Usuário ou senha incorretos");
			}
		} catch (error) {
			console.error("Erro:", error);
			setError("Um erro ocorreu. Tente novamente.");
		}
	};

	return (
		<header className="Login">
			<form onSubmit={handleLogin}>
				<input
					type="text"
					placeholder="Usuário"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Senha"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" className="suggested-action">Entrar</button>
			</form>
			{error && <p className="error">{error}</p>}
		</header>
	);
}

export default Login;
