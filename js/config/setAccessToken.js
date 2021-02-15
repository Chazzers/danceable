import localStorage from './localStorage.js'

function setAccessToken() {
	const code = window.location.hash
	const accessTokenFromUrl = code.match(/access_token=(.*?)&/)[1]
	localStorage.setItem('access_token', accessTokenFromUrl)
}


export default setAccessToken