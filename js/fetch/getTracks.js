import accessToken from '../config/accessToken.js'
import localStorage from '../config/localStorage.js'

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

function getStandardDeviation (array, property) {
	const n = array.length
	const mean = array.reduce((a, b) => a + b[property], 0) / n
	return Math.sqrt(array.map(x => Math.pow(x[property] - mean, 2)).reduce((a, b) => a + b) / n)
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

function mergeNestedArray(array) {
	if(array[0].audio_features) {
		const newArray = array.map(item => item.audio_features)
		return [].concat.apply([], newArray)
	}
	return [].concat.apply([], array)
}

function transformData(data) {
	return Object.assign({}, data, {
		id: data.track.id,
		duration: data.track.duration_ms,
		name: data.track.name,
		danceability: data.audio_features.danceability,
		tempo: data.audio_features.tempo
	})
}

function tidyData(data) {
	return data.map(({id, duration, name, danceability, tempo}) => ({id, duration, name, danceability, tempo}))
}


function mergeData(trackData, audioFeatureData) {
	trackData.forEach((item, index) => item.audio_features = audioFeatureData[index])
	return trackData
}


function cleanData(trackData, audioFeatureData) {
	trackData = mergeNestedArray(trackData)
	audioFeatureData = mergeNestedArray(audioFeatureData)
	const mergedData = mergeData(trackData, audioFeatureData)
	const transformedData = mergedData.map(item => transformData(item))
	const cleanedData = tidyData(transformedData)
	return cleanedData
}

function calcScore(array, property) {
	const average = array.reduce((a, b) => a + b[property], 0) / array.length
	const standardDeviation = getStandardDeviation(array, property)
	const percentageOfAverage = (standardDeviation / average)
	const reversePercentage = 1 - percentageOfAverage
	const scale = 0.5
	const reversePercentageMinusScale = reversePercentage - scale
	const finalScore = reversePercentageMinusScale / 10
	return finalScore
}

async function getTracks() {
	const getHref = localStorage.getItem('href')
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
		.then(({ trackData, audioFeaturesData }) =>{
		 	return cleanData(trackData, audioFeaturesData)
		})
		.then(data =>{
			const danceabilityAverage = data.reduce((a, b) => a + b.danceability, 0) / data.length
			
			const danceabilityDecimalScore = danceabilityAverage + calcScore(data, 'danceability') + calcScore(data, 'tempo')
			const danceabilityFinalScore = Math.round(danceabilityDecimalScore * 100)
			
			return localStorage.setItem('danceability_score', danceabilityFinalScore)
	})
	return getData
}

export default getTracks
