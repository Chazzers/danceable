import accessToken from '../helpers/accessToken.js'
import pushToArray from '../helpers/pushToArray.js'
// loop over the fetches if data.next is not null
async function recursiveFetch({ url, array }) {
	if(url) {
		const tracks = await fetch(url, {
			headers: {
				'Authorization': 'Bearer ' + accessToken
			}
		})
			.then(res => res.json())
			.then(data => {
				pushToArray(array, data.items)
				if(data.next) {
					return recursiveFetch({ url: data.next, array: array })
				}
				return array
			})
		return tracks
	}
	return array
}

export default recursiveFetch