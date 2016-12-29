
export function unauthorizedUser(user) {
	return {
		isLoggedIn: !!user,
		isAuthorized: false
	}
}

export function authorizedUser(user) {
	return {
		isLoggedIn: !!user,
		isAuthorized: true
	}
}
