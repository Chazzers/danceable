import accessToken from '../helpers/accessToken.js'
import getData from './getData.js'
import recursiveFetch from './recursiveFetch.js'



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

async function getTracks(url) {
	const getTrackData = await fetch(url, {
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	})
		.then(res => res.json())
		.then((data, containerArray = [data.items]) =>  
			recursiveFetch({ 
				url: data.next,
				array: containerArray
			})
		)
		.then(trackData => {
			return {
				audioFeaturesData: trackData.map(array => array.map(item => item.track.id)),
				trackData: trackData
			}
		})
		.then(({ trackData, audioFeaturesData }) => {
			return {
				audioFeaturesData: audioFeaturesData.map(item => item.join()),
				trackData: trackData
			}
		}).then(async({ trackData, audioFeaturesData }) => {
			return {
				audioFeaturesData: await Promise.all(createPromises(audioFeaturesData, getData, {
					baseUrl: 'https://api.spotify.com/v1/audio-features',
					query: 'ids',
				})).then(res => res),
				trackData: trackData
			}
		})
	return getTrackData
}

export default getTracks
