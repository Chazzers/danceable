import Router from './router/Router.js'

// fetch
import getTracks from './fetch/getTracks.js'


// config
import { url } from './config/api.js'
import accessIsThere from './config/accessIsThere.js'
import accessToken from './config/accessToken.js'
import setAccessToken from './config/setAccessToken.js'
import { setLocalStorageItem } from './config/localStorage.js'

// render
import renderPlaylists from './render/renderPlaylists.js'
import renderHome from './render/renderHome.js'
import renderLoading from './render/renderLoading.js'
import renderScore from './render/renderScore.js'

// helper
import createBtnEventListeners from './helpers/createBtnEventListeners.js'
import btnEvent from './helpers/btnEvent.js'
import cleanData from './helpers/cleanData.js'
import calcScore from './helpers/calcScore.js'

function init() {
	const router = new Router({
		mode: 'hash', 
		root: '/'
	})

	renderHome()

	if(accessIsThere) {
		setAccessToken()
		router.navigate('/callback')
	}

	router.add(/login/, () => {
		window.location.replace(url)
	})
	
	router.add(/callback/, () => {
		fetch('https://api.spotify.com/v1/me/playlists', {
			headers: {
				'Authorization': 'Bearer ' + accessToken
			}
		}).then(res => res.json())
			.then(data => {
				const playlists = data.items
				renderPlaylists(playlists)
				createBtnEventListeners({ eventFunction: btnEvent })
			})
	})
	router.add(/loading/, async() => {
		renderLoading()
		const tracks = await getTracks()
		const cleanTracks = cleanData(tracks.trackData, tracks.audioFeaturesData)
		const score = calcScore(cleanTracks, 'danceability')
		setLocalStorageItem('danceability_score', score)
		setTimeout(() => router.navigate('/score'), 1000)
	})
	router.add(/score/, () => {
		renderScore()
	})
}

init()