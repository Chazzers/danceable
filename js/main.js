import Router from './router/Router.js'

// fetch
import getTracks from './fetch/getTracks.js'

// config
import { url, redirectUri } from './config/api.js'
import accessIsThere from './config/accessIsThere.js'
import accessToken from './config/accessToken.js'
import setAccessToken from './config/setAccessToken.js'

// render
import renderPlaylists from './render/renderPlaylists.js'
import renderHome from './render/renderHome.js'

// helper
import createBtnEventListeners from './helpers/createBtnEventListeners.js'

function init() {
	const router = new Router({
		mode: 'hash', 
		root: '/'
	})

	renderHome()

	if(accessIsThere) {
		setAccessToken()
		window.location.replace(redirectUri)
	}

	router.add(/login/, () => {
		//Full flow
		/*
		window.location.replace(
			`${urlAuthorize}?response_type=${responseType}&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}&show_dialog=true`
		)
		*/
		// No accept flow
		window.location.replace(url)
	})
	
	router.add(/callback/, () => {
		fetch("https://api.spotify.com/v1/me/playlists", {
			headers: {
				'Authorization': 'Bearer ' + accessToken
			}
		}).then(res => res.json())
			.then(data => {
				const playlists = data.items
				console.log(playlists)
				renderPlaylists(playlists)
				createBtnEventListeners({ eventFunction: getTracks, accessToken: accessToken })
		})
	})
}

init()