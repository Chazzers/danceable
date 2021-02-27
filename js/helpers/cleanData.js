// clean data function that executes the rest of the functions
function cleanData(trackData, audioFeatureData) {
	const mergedTrackData = mergeNestedArray(trackData)
	const mergedAudioFeatureData = mergeNestedArray(audioFeatureData)
	const mergedData = mergeData(mergedTrackData, mergedAudioFeatureData)
	const transformedData = mergedData.map(item => transformData(item))
	const cleanedData = tidyData(transformedData)
	return cleanedData
}

// create one array of nested arrays
function mergeNestedArray(array) {
	if(array[0].audio_features) {
		const newArray = array.map(item => item.audio_features)
		return [].concat.apply([], newArray)
	}
	return [].concat.apply([], array)
}

// add clean data to the objects
function transformData(data) {
	return Object.assign({}, data, {
		id: data.track.id,
		duration: data.track.duration_ms,
		name: data.track.name,
		danceability: data.audio_features.danceability,
		tempo: data.audio_features.tempo
	})
}


// transform the object data to data im using in my app
function tidyData(data) {
	return data.map(({ id, duration, name, danceability, tempo }) => ({ id, duration, name, danceability, tempo }))
}

// merge two arrays
function mergeData(trackData, audioFeatureData) {
	trackData.forEach((item, index) => item.audio_features = audioFeatureData[index])
	return trackData
}

export { cleanData, mergeNestedArray }