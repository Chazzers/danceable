import Router from './Router.js'
import clientId from './clientId.js'

const responseType = 'token'
const redirectUri = 'http://localhost:5500/#/callback/'
const scopes = 'user-read-private user-read-email playlist-read-private'
const urlAuthorize = 'https://accounts.spotify.com/authorize'

const router = new Router({
	mode: 'hash', 
	root: '/'
})

const localStorage = window.localStorage

const accessIsThere = window.location.hash.includes('access_token') && window.location.hash.includes('callback') === false

if(accessIsThere) {
	window.location.replace(redirectUri + window.location.hash)
}

const accessToken = localStorage.getItem('access_token')

router.add(/login/, () => {
	//Full flow
	/*
	window.location.replace(
		`${urlAuthorize}?response_type=${responseType}&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}&show_dialog=true`
	)
	*/
	//No accept flow
	window.location.replace(
		`${urlAuthorize}?response_type=${responseType}&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`
	)
	
})

router.add(/callback/, () => {
	const code = window.location.hash
	const accessToken = code.match(/access_token=(.*?)&/)[1]
	localStorage.setItem('access_token', accessToken)
	fetch("https://api.spotify.com/v1/me/playlists", {
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	}).then(res => res.json())
		.then(data => {
			const playlists = data.items
			console.log(playlists)
			render(`
				<h1>Select a playlist</h1>
				<h2>
					Measure the danceability of your playlist!
				</h2>
				<main>
				${playlists.map((playlist, index) => 
					`<button type="button" value="${playlist.href}">
						<article>
							<h3>${playlist.name}</h3>
							<img src="${playlist.images[0].url}" alt="">
						</article>
					</button>`
				).join('')}
				</main>
			`)
			createBtnEventListeners()
			
	}).then(() => {
		
	})
})

function render(html) {
	const rootDiv = document.getElementById('root')
	return rootDiv.innerHTML = html
}

function btnEvent(event) {
	const href = event.currentTarget.value
	fetch(href, {
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	}).then(res => res.json())
		.then(data => {
			const tracks = data.tracks.items
			console.log(tracks)
			// tracks.forEach(track => track)
		})
}

function createBtnEventListeners() {
	const buttons = document.querySelectorAll('button')
	buttons.forEach(btn => btn.addEventListener('click', btnEvent))
}

/*
fetch("https://api.spotify.com/v1/playlists/1lpfbEQILpZzficQNqJmvO/tracks", {
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	}).then(res => res.json())
		.then(data => console.log(data))
*/

/*
fetch("https://api.spotify.com/v1/playlists/1lpfbEQILpZzficQNqJmvO/tracks", {
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	}).then(res => res.json())
		.then(data => console.log(data))
*/

/*
fetch("https://api.spotify.com/v1/playlists/1lpfbEQILpZzficQNqJmvO/tracks", {
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	}).then(res => res.json())
		.then(data => console.log(data))
*/