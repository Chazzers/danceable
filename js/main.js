import Router from './Router.js'

const clientId = '40efee3a942045f68e1020b92e7cda45'
const responseType = 'code'
const redirectUri = 'http://localhost:5500/#/callback/'
const scopes = 'user-read-private user-read-email'
const clientSecret = 'bfa917d118d741ba9d71e2cf18c2119c'
const authorization = `
	${clientId}:${clientSecret}
`
const newAuthorization = btoa(authorization)

console.log(newAuthorization)

// const home = `
// 	<h1>I am homepage</h1>
// `
// const login = `
// 	<h1>I am login page</h1>
// `
// const callback = `
// 	<h1>I am callback page</h1>
// `
// const routes = {
// 	'/': home,
// 	'/login': login,
// 	'/callback': callback
// }

const router = new Router({
	mode: 'hash', 
	root: '/'
})

const localStorage = window.localStorage

const accessToken = localStorage.getItem('acces_token')
const url = 'https://accounts.spotify.com/api/token'

const data = {
	form: {
		code: accessToken,
		redirect_uri: redirectUri,
		grant_type: 'authorization_code',
	},
}

router.add(/login/, () => {
	const url = 'https://accounts.spotify.com/authorize'
	
	window.location.replace(
		`${url}?response_type=${responseType}&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`
	)
})

router.add(/callback/, () => {
	const code = window.location.search.split('?code=')
	localStorage.setItem('acces_token', code[1])
})



async function postData(url = '', data = {}) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic ' + (newAuthorization)
		},
		body: JSON.stringify(data)
	})
	return response.json()
}

postData(url, data)

