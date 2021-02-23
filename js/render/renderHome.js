import render from './render.js'

function renderHome() {
	render(`
		<main>
			<h1>Welcome to danceable!</h1>
			<p>
				The web application where you can measure the danceability of your spotify playlist! To make use of this app, you will have to login with spotify through the button down below. 
			</p>
			<a class="btn" href="${window.location.pathname}#/login/" id="login">login</a>
		</main>
	`)
}

export default renderHome