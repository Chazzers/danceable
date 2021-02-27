// create btn eventlisteners
function createBtnEventListeners({ eventFunction, selector }) {
	const buttons = document.querySelectorAll(selector)
	return buttons.forEach(btn => btn.addEventListener('click', (event) => eventFunction(event)))
}

export default createBtnEventListeners