function createBtnEventListeners({ eventFunction, accessToken }) {
	console.log('accessToken', eventFunction)
	const buttons = document.querySelectorAll('button')
	buttons.forEach(btn => btn.addEventListener('click', () => eventFunction({ accessToken: accessToken })))
}

export default createBtnEventListeners