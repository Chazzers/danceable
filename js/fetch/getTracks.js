import accessToken from '../config/accessToken.js'

async function recursiveFetch({ url, currentTracks }) {
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
		return currentTracks.concat(tracks.items)
	}
	return currentTracks
}

const delayLoop = (fn, array, delay, limit) => {
	return (x, i) => {
	  	setTimeout(() => {
			fn(x, array, limit)
		}, i * delay)
	}
}

function getStandardDeviation (array) {
	const n = array.length
	const mean = array.reduce((a, b) => a + b) / n
	return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
  }

function calcScore(array) {
	const average = array.reduce((a, b) => a + b, 0) / array.length
	const standardDeviation = getStandardDeviation(array)
	const percentageOfAverage = (standardDeviation / average)
	const reversePercentage = 1 - percentageOfAverage
	const scale = 0.5
	const reversePercentageMinusScale = reversePercentage - scale
	const createScoreFromPercentage = reversePercentageMinusScale / 10
	const finalScore = createScoreFromPercentage
	return finalScore
}

async function fetchTracksAnalysis(item, array, limit = Number.MAX_VALUE) {
	const url = `https://api.spotify.com/v1/audio-features/${item.track.id}`
	const getTracksAnalysis = await fetch(url, {
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	})
	.then(res => {
		if(res.status !== 200 && --limit) {
			return fetchTracksAnalysis(item, array, limit)
		}
		return res.json()
	})
	.then(data => array.push(data))
	return getTracksAnalysis
}
async function getTracks(event) {
	const href = event.currentTarget.value
	const tracksHref = `${href}/tracks?offset=0&limit=100`
	let allTracks = []
	let danceabilityArray = []
	let tempoArray = []
	const delay = 100

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
			await data.forEach(delayLoop(fetchTracksAnalysis, allTracks, delay, 10))
			return data
		})
		.then(tracks => {
			setTimeout(() => allTracks.forEach((item, index) => {
				danceabilityArray.push(item.danceability)
				tempoArray.push(item.tempo)
				
				if(index === allTracks.length - 1) {
					const danceabilityAverage = danceabilityArray.reduce((a, b) => a + b, 0) / danceabilityArray.length
					
					const danceabilityScore = danceabilityAverage + calcScore(danceabilityArray) + calcScore(tempoArray)
					return danceabilityScore
				}
			}), tracks.length * delay)
		})
	return getData
}

export default getTracks