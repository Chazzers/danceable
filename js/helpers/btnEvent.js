function btnEvent(event) {
	localStorage.removeItem('href')
	localStorage.removeItem('img')
	localStorage.removeItem('name')
	localStorage.removeItem('danceability_score')
	const href = event.currentTarget.dataset.href
	const name = event.currentTarget.dataset.name
	const img = event.currentTarget.dataset.img
	localStorage.setItem('href', href)
	localStorage.setItem('img', img)
	localStorage.setItem('name', name)
}

export default btnEvent