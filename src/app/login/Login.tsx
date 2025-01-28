import "./Login.css"

function Login(): JSX.Element {
	return (
		<header className="Login">
			<div>
				<input type="text" placeholder="Usuário" />
				<input type="password" placeholder="Senha" />
				<button type="submit" className="suggested-action">Login</button>
			</div>
		</header>
	)
}

export default Login;
