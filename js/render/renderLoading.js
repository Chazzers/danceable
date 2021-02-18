import render from './render.js'
import { getLocalStorageItem } from '../config/localStorage.js'

function renderLoading() {
	const playlist = {
		name: getLocalStorageItem('name'),
		img: getLocalStorageItem('img'),
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