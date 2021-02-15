function getTracks(event, { accessToken }) {
	const href = event.currentTarget.value
	fetch(href, {
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	}).then(res => res.json())
		.then(data => {
			const tracks = data.tracks.items

			// fetch(href, {
			// 	headers: {
			// 		'Authorization': 'Bearer ' + accessToken
			// 	}
			// })
			console.log(tracks)
		})
}

export default getTracks