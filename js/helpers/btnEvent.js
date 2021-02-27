import { setLocalStorageItem } from '../helpers/localStorage.js'
// btn events for the playlist where the data attributes of the anchor tag are stored in local storage
function btnEvent(event) {
	const href = event.currentTarget.dataset.href
	const name = event.currentTarget.dataset.name
	const img = event.currentTarget.dataset.img
	setLocalStorageItem('href', href)
	setLocalStorageItem('img', img)
	setLocalStorageItem('name', name)
}

export default btnEvent