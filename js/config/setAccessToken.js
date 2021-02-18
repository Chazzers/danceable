import { setLocalStorageItem } from './localStorage.js'

function setAccessToken() {
	const code = window.location.hash
	const accessTokenFromUrl = code.match(/access_token=(.*?)&/)[1]
	setLocalStorageItem('access_token', accessTokenFromUrl)
}


export default setAccessToken