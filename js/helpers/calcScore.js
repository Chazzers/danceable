function calcScore(array, averageProperty) {
	const average = calcAverage(array, averageProperty)
	const decimalScore = average + calcStandardDeviationInfluence(array, 'danceability') + calcStandardDeviationInfluence(array, 'tempo')
	return Math.round(decimalScore * 100)
}

function calcStandardDeviationInfluence(array, property) {
	const average = calcAverage(array, property)
	const standardDeviation = calcStandardDeviation(array, property)
	const percentageOfAverage = (standardDeviation / average)
	const reversePercentage = 1 - percentageOfAverage
	const scale = 0.5
	const reversePercentageMinusScale = reversePercentage - scale
	const finalScore = reversePercentageMinusScale / 10
	return finalScore
}

function calcAverage(array, property) {
	return array.reduce((a, b) => a + b[property], 0) / array.length
}

function calcStandardDeviation(array, property) {
	const n = array.length
	const mean = array.reduce((a, b) => a + b[property], 0) / n
	return Math.sqrt(array.map(x => Math.pow(x[property] - mean, 2)).reduce((a, b) => a + b) / n)
}


export default calcScore