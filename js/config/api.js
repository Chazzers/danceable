const clientId = '40efee3a942045f68e1020b92e7cda45'
const responseType = 'token'
const redirectUri = 'http://localhost:5500/#/callback/'
const scopes = 'user-read-private user-read-email playlist-read-private'
const urlAuthorize = 'https://accounts.spotify.com/authorize'
const url = `${urlAuthorize}?response_type=${responseType}&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`

export {
	url,
	redirectUri
}