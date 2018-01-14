const charBucket = 'abcdefghijklmnopqrstuvwxyz0123456789-_ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function randomizeString(charBucket) {
	const timestampString = new Date().getTime().toString()
	const segments = timestampString.match(/.{1,2}/g)
	let result = ''
	let remainingValue = 0
	segments.forEach((string, index) => {
		let charIndex = parseInt(string)
		if (index === segments.length - 1) {
			charIndex += remainingValue
			remainingValue = 0
		}
		if (charIndex < charBucket.length) result += charBucket[charIndex]
		else {
			remainingValue += charIndex % charBucket.length
			result += charBucket[charBucket.length - 1]
		}
	})

	while (remainingValue > 0) {
		if (remainingValue < charBucket.length) {
			result += charBucket[remainingValue]
			remainingValue = 0
		} else { 
			result += charBucket[charBucket.length - 1]
			remainingValue += charBucket.length
		}
	}
	
	return result
}

function randomizeUrl() {
	return randomizeString(charBucket)
}

module.exports = randomizeUrl
