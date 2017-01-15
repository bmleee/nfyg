
export function unauthorizedUser(user, canEdit = false) {
	return {
		isLoggedIn: !!user,
		isAuthorized: false,
		canEdit: canEdit,
		displayName: user && user.display_name,
		image: user && user.image
	}
}

export function authorizedUser(user, canEdit = false) {
	return {
		isLoggedIn: !!user,
		isAuthorized: true,
		canEdit: canEdit,
		displayName: user && user.display_name,
		image: user && user.image
	}
}
