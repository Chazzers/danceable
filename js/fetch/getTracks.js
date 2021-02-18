import accessToken from '../config/accessToken.js'
import { getLocalStorageItem } from '../config/localStorage.js'

async function recursiveFetch({ url, currentTracks }) {
	let tracksArray = []
	tracksArray.push(currentTracks)
	if(url) {
		const tracks = await fetch(url, {
			headers: {
				'Authorization': 'Bearer ' + accessToken
			}
		})
			.then(res => res.json())
			.then(data => {
				if(data.next) {
					return recursiveFetch(data.next)
				}
				return data
			})
		tracksArray.push(tracks.items)
		return tracksArray
	}
	return tracksArray
}

async function fetchTracksAnalysis(item) {
	const url = `https://api.spotify.com/v1/audio-features?ids=${item}`
	const getTracksAnalysis = await fetch(url, {
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	})
		.then(res => res.json())
		.then(data => {
			return data
		}
		)
	return getTracksAnalysis
}

async function getTracks() {
	const getHref = getLocalStorageItem('href')
	const tracksHref = `${getHref}/tracks?offset=0&limit=100`

	const getData = await fetch(tracksHref, {
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	})
		.then(res => res.json())
		.then(data => 
			recursiveFetch({ 
				url: data.next,
				currentTracks: data.items
			})
		)
		.then(async data => {
			const idArray = data.map(array => array.map(item => item.track.id))
			const urlArray = idArray.map(item => item.join())
			const promiseArray = []

			urlArray.forEach(item => {
				promiseArray.push(fetchTracksAnalysis(item))
			})

			const newData = await Promise.all(promiseArray).then(res => res)
			
			return {
				audioFeaturesData: newData,
				trackData: data
			}
		})
	return getData
}

export default getTracks
