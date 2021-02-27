import { setLocalStorageItem } from './localStorage.js'
// set the access token in local storage
function setAccessToken() {
	const code = window.location.hash
	const accessTokenFromUrl = code.match(/access_token=(.*?)&/)[1]
	setLocalStorageItem('access_token', accessTokenFromUrl)
}


export default setAccessToken