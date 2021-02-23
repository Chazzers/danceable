import render from './render.js'
import { getLocalStorageItem } from '../helpers/localStorage.js'

function renderLoading() {
	const playlist = {
		name: getLocalStorageItem('name'),
		img: getLocalStorageItem('img'),
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
				<h1>Loading...</h1>
				<div class="loading-music">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</main>
	`)
}

export default renderLoading