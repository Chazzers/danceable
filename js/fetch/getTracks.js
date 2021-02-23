import accessToken from '../helpers/accessToken.js'
import { getLocalStorageItem } from '../helpers/localStorage.js'
import pushToArray from '../helpers/pushToArray.js'
import getData from './getData.js'

async function recursiveFetch({ url, array }) {
	if(url) {
		const tracks = await fetch(url, {
			headers: {
				'Authorization': 'Bearer ' + accessToken
			}
		})
			.then(res => res.json())
			.then(data => {
				if(data.next) {
					pushToArray(array, data.items)
					return recursiveFetch({ url: data.next, array: array })
				}
				return array
			})
		return tracks
	}
	return array
}

function createUrl({ baseUrl, query, value }) {
	const url = `${baseUrl}${query ? `?${query}=` : ''}${value ? value : ''}`
	return url
}

function createPromises(array, promise, { baseUrl, query, promiseArray = [] }) {
	array.forEach(item => promiseArray.push(promise(createUrl({
		baseUrl: baseUrl,
		query: query,
		value: item,
	}))))
	return promiseArray
}

async function getTracks() {
	const getHref = getLocalStorageItem('href')
	const tracksHref = `${getHref}/tracks?offset=0&limit=100`

	const getTrackData = await fetch(tracksHref, {
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	})
		.then(res => res.json())
		.then(data => { 
			const dataArray = []
			pushToArray(dataArray, data.items)
			return recursiveFetch({ 
				url: data.next,
				array: dataArray
			})
		})
		.then(async data => {
			const idArray = data.map(array => array.map(item => item.track.id))
			const urlArray = idArray.map(item => item.join())

			const newData = await Promise.all(createPromises(urlArray, getData, {
				baseUrl: 'https://api.spotify.com/v1/audio-features',
				query: 'ids',
			})).then(res => res)
			
			return {
				audioFeaturesData: newData,
				trackData: data
			}
		})
	return getTrackData
}

export default getTracks
