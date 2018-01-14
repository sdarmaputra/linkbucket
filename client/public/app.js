function processLinkInput(event) {
	if (event.target.value.length > 0) openTitleInput() 
	else closeTitleInput() 
	validate()
}

function openTitleInput() {
	const titleInput = document.getElementById('title')
	title.className = title.className.replace('input-form__input--hidden', '')
}

function closeTitleInput() {
	const titleInput = document.getElementById('title')
	title.value = ''
	title.className = title.className + ' input-form__input--hidden'
}

function handleSubmit() {
	const valid = validate()
	if (valid) {
		showLoading()
		const payload = {
			'original_link': document.getElementById('link').value,
			'title': document.getElementById('title').value
		}
		axios.post('/api/links', payload)
			.then((response) => {
				const shortenLink = window.location + response.data.shorten_link
				const result = document.getElementById('result')
				document.getElementById('result-title').innerHTML = 'Congratulations!'
				document.getElementById('result-content').innerHTML = "<div>Here's your link:</div><strong><a href='" + shortenLink	+ "' target='blank''>" + shortenLink + "</a></strong>"
				result.className = result.className.replace('panel--hidden', '')
				clearInputs() 
				hideLoading()
			})
			.catch((error) => {
				const result = document.getElementById('result')
				document.getElementById('result-title').innerHTML = 'Oops!'
				document.getElementById('result-content').innerHTML = "Something went wrong :(<br>Please try again"
				result.className = result.className.replace('panel--hidden', '')
				hideLoading()
			})
	}
}

function validate() {
	const linkElement = document.getElementById('link')
	const titleElement = document.getElementById('title')
	
	let valid = true
	if (linkElement.value.length === 0) {
		valid = valid && false
		closeTitleInput() 
	} else {
		openTitleInput() 
		valid = valid && true
	}
	if (titleElement.value.length === 0) {
		setInputDanger(titleElement)
		valid = valid && false
	} else {
		unsetInputDanger(titleElement)
		valid = valid && true
	}

	return valid
}

function setInputDanger(inputElement) {
	inputElement.className = inputElement.className + ' input-form__input--danger'
}

function unsetInputDanger(inputElement) {
	inputElement.className = inputElement.className.replace('input-form__input--danger', '')
}

function clearInputs() {
	document.getElementById('link').value = ''
	document.getElementById('title').value = ''
}

function showLoading() {
	const loadingElement = document.getElementById('loading')
	loadingElement.className = loadingElement.className.replace('loading--hidden','')
}

function hideLoading() {
	const loadingElement = document.getElementById('loading')
	loadingElement.className = loadingElement.className + ' loading--hidden'
}

function setupInitialApp() {
	clearInputs() 
}

document.getElementById('link').addEventListener('keyup', processLinkInput)
document.getElementById('link').addEventListener('change', processLinkInput)
document.getElementById('link').addEventListener('click', processLinkInput)
document.getElementById('link').addEventListener('input', processLinkInput)
document.getElementById('title').addEventListener('keyup', validate)
document.getElementById('submit-button').addEventListener('click', (event) => {
	event.preventDefault()
	handleSubmit()
})
document.getElementById('input-form').addEventListener('submit', (event) => {
	event.preventDefault()
	handleSubmit()
})	

window.onload = setupInitialApp

