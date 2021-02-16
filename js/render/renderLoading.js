import render from './render.js'
import localStorage from '../config/localStorage.js'

function renderLoading() {
	const playlist = {
		name: localStorage.getItem('name'),
		img: localStorage.getItem('img'),
	}
	render(`
		<main>
			<a class="playlist">
				<article>
					<h3>${playlist.name}</h3>
					<img src="${playlist.img}" alt="">
				</article>
			</a>
			<h1>Loading...</h1>
		</main>
	`)
}

export default renderLoading