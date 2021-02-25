function cleanData(trackData, audioFeatureData) {
	trackData = mergeNestedArray(trackData)
	audioFeatureData = mergeNestedArray(audioFeatureData)
	const mergedData = mergeData(trackData, audioFeatureData)
	const transformedData = mergedData.map(item => transformData(item))
	const cleanedData = tidyData(transformedData)
	return cleanedData
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
	return data.map(({ id, duration, name, danceability, tempo }) => ({ id, duration, name, danceability, tempo }))
}


function mergeData(trackData, audioFeatureData) {
	trackData.forEach((item, index) => item.audio_features = audioFeatureData[index])
	return trackData
}

export { cleanData, mergeNestedArray }