// router
import Router from './router/Router.js'

// fetch
import getTracks from './fetch/getTracks.js'
import getData from './fetch/getData.js'

// config
import { url } from './config/api.js'
import accessIsThere from './helpers/accessIsThere.js'
import setAccessToken from './helpers/setAccessToken.js'
import { setLocalStorageItem, removeLocalStorageItem } from './helpers/localStorage.js'

// render
import renderPlaylists from './render/renderPlaylists.js'
import renderHome from './render/renderHome.js'
import renderLoading from './render/renderLoading.js'
import renderScore from './render/renderScore.js'

// helper
import createBtnEventListeners from './helpers/createBtnEventListeners.js'
import btnEvent from './helpers/btnEvent.js'
import { cleanData, mergeNestedArray } from './helpers/cleanData.js'
import calcScore from './helpers/calcScore.js'
import recursiveFetch from './fetch/recursiveFetch.js'
import pushToArray from './helpers/pushToArray.js'

function init() {
	// initialize router
	const router = new Router({
		mode: 'hash', 
		root: '/'
	})

	// check if access is there ie if there is an access token in the url
	if(accessIsThere) {
		setAccessToken()
		router.navigate('/playlists')
	}

	router
		.add(/login/, () => {
			// replace the url with the api url for logging in
			window.location.replace(url)
		})
		.add(/playlists/, async() => {
			// get playlists
			const playlists = await getData('https://api.spotify.com/v1/me/playlists').then(data => {
				const dataArray = []
				pushToArray(dataArray, data.items)
				return recursiveFetch({ 
					url: data.next,
					array: dataArray
				})
			}).then(data => mergeNestedArray(data))
			console.log(playlists)

			removeLocalStorageItem('href')
			removeLocalStorageItem('img')
			removeLocalStorageItem('name')
			removeLocalStorageItem('danceability_score')

			// render the playlists
			renderPlaylists(playlists)

			// create eventlisteners for the playlists
			createBtnEventListeners({
				eventFunction: btnEvent,
				selector: 'a'
			})
		})
		.add(/loading/, async() => {
			// render loading page
			renderLoading()
			
			// get tracks
			const tracks = await getTracks()

			// clean the track data
			const cleanTracks = cleanData(tracks.trackData, tracks.audioFeaturesData)

			// calc the score from cleaned data
			const score = calcScore(cleanTracks, 'danceability')

			// save score in local storage
			setLocalStorageItem('danceability_score', score)

			// navigate to /score
			router.navigate('/score')
		})
		.add(/score/, () => {
			// render the result
			renderScore()
		})
		.add('', () => {
			// if no path is present, renderhome
			renderHome()
		})
}

init()