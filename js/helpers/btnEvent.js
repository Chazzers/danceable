import { setLocalStorageItem } from '../helpers/localStorage.js'

function btnEvent(event) {
	const href = event.currentTarget.dataset.href
	const name = event.currentTarget.dataset.name
	const img = event.currentTarget.dataset.img
	setLocalStorageItem('href', href)
	setLocalStorageItem('img', img)
	setLocalStorageItem('name', name)
}

export default btnEvent