import render from './render.js'

function renderHome() {
	render(`
		<h1>Hello wurld</h1>
		<a href="${window.location.href}#/login/" id="login">login</a>
	`)
}

export default renderHome