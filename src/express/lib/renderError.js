
export function unauthorizedUser(message) {
	return {
		type: 'unauthorized',
		message: message || 'unauthorized access'
	}
}
