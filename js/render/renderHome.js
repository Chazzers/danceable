import render from './render.js'

function renderHome() {
	render(`
		<main>
			<h1>Hello wurld</h1>
			<a href="${window.location.pathname}#/login/" id="login">login</a>
		</main>
	`)
}

export default renderHome