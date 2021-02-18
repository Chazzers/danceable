function createBtnEventListeners({ eventFunction }) {
	const buttons = document.querySelectorAll('a')
	buttons.forEach(btn => btn.addEventListener('click', (event) => eventFunction(event)))
}

export default createBtnEventListeners