function getTracks({ accessToken }) {
	console.log('event', event)
	console.log('accessToken', accessToken)
	const href = event.currentTarget.value
	fetch(href, {
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	}).then(res => res.json())
		.then(data => {
			const tracks = data.tracks.items
			console.log(tracks)
		})
}

export default getTracks