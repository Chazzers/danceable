import render from './render.js'

function renderPlaylists(playlists) {
	render(`
		<h1>Select a playlist</h1>
		<h2>
			Measure the danceability of your playlist!
		</h2>
		<main>
		${playlists.map(playlist => 
			`<button type="button" value="${playlist.href}">
				<article>
					<h3>${playlist.name}</h3>
					<img src="${playlist.images[0].url}" alt="">
				</article>
			</button>`
		).join('')}
		</main>
	`)
}

export default renderPlaylists