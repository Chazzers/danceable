import render from './render.js'
import { getLocalStorageItem } from '../config/localStorage.js'

function renderScore() {
	const playlist = {
		name: getLocalStorageItem('name'),
		img: getLocalStorageItem('img'),
		score: getLocalStorageItem('danceability_score')
	}
	render(`
		<main>
			<a class="playlist">
				<article>
					<h3>${playlist.name}</h3>
					<img src="${playlist.img}" alt="">
				</article>
			</a>
			<h2>The danceability of your playlist is: </h2>
			<h1>${playlist.score}<span>/100</span></h1>
		</main>
		<a href="${window.location.pathname}#/callback">Measure another playlist</a>
	`)
}

export default renderScore