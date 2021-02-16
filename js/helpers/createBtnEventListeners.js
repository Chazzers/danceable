function createBtnEventListeners({ eventFunction, accessToken }) {
	const buttons = document.querySelectorAll('a')
	buttons.forEach(btn => btn.addEventListener('click', (event) => eventFunction(event, { accessToken: accessToken })))
}

export default createBtnEventListeners