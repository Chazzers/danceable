import { baseUrl } from '../config/api.js'

function btnEvent(event, { router }) {
	const href = event.currentTarget.dataset.href
	const name = event.currentTarget.dataset.name
	const img = event.currentTarget.dataset.img
	localStorage.setItem('href', href)
	localStorage.setItem('img', img)
	localStorage.setItem('name', name)
	router.navigate('/loading')
}

export default btnEvent