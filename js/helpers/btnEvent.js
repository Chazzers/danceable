import { setLocalStorageItem, removeLocalStorageItem } from '../config/localStorage.js'

function btnEvent(event) {
	removeLocalStorageItem('href')
	removeLocalStorageItem('img')
	removeLocalStorageItem('name')
	removeLocalStorageItem('danceability_score')
	const href = event.currentTarget.dataset.href
	const name = event.currentTarget.dataset.name
	const img = event.currentTarget.dataset.img
	setLocalStorageItem('href', href)
	setLocalStorageItem('img', img)
	setLocalStorageItem('name', name)
}

export default btnEvent