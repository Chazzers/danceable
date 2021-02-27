import render from './render.js'
import { getLocalStorageItem } from '../helpers/localStorage.js'
// render score
function renderScore() {
	const playlist = {
		name: getLocalStorageItem('name'),
		img: getLocalStorageItem('img'),
		score: getLocalStorageItem('danceability_score')
	}
	render(`
		<main class="loading">
			<a class="playlist">
				<article>
					<h3>${playlist.name}</h3>
					<img src="${playlist.img}" alt="">
				</article>
			</a>
			<div class="loading-animation">
				<h2>The danceability of your playlist is: </h2>
				<div class="score">
					<h1>${playlist.score}<span>/100</span></h1>
				</div>
			</div>
		</main>
		<a class="btn" href="${window.location.pathname}#/playlists">Measure another playlist</a>
	`)
}

export default renderScore