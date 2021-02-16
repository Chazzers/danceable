function createBtnEventListeners({ eventFunction, accessToken, router }) {
	const buttons = document.querySelectorAll('a')
	buttons.forEach(btn => btn.addEventListener('click', (event) => eventFunction(event, { accessToken: accessToken, router: router })))
}

export default createBtnEventListeners