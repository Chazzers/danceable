function btnEvent(event) {
	const href = event.currentTarget.dataset.href
	const name = event.currentTarget.dataset.name
	const img = event.currentTarget.dataset.img
	localStorage.setItem('href', href)
	localStorage.setItem('img', img)
	localStorage.setItem('name', name)
}

export default btnEvent