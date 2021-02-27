import accessToken from '../helpers/accessToken.js'
// function that takes url and uses that url in fetch
async function getData(url) {
	const data = await fetch(url, {
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	})
		.then(res => res.json())
	
	return data
}

export default getData