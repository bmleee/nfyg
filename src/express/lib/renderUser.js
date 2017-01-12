
export function unauthorizedUser(user, canEdit = false) {
	return {
		isLoggedIn: !!user,
		isAuthorized: false,
		canEdit: canEdit,
	}
}

export function authorizedUser(user, canEdit = false) {
	return {
		isLoggedIn: !!user,
		isAuthorized: true,
		canEdit: canEdit,
	}
}
