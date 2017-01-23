
export function unauthorizedUser(user, canEdit = false) {
	return {
		isLoggedIn: !!user,
		isAuthorized: false,
		canEdit: canEdit,
		displayName: user && user.display_name,
		image: user && user.image,
		fb_id: user && (user.fb_id || ''),
		fb_access_token: user && (user.fb_access_token || ''),
	}
}

export function authorizedUser(user, canEdit = false) {
	return {
		isLoggedIn: !!user,
		isAuthorized: true,
		canEdit: canEdit,
		displayName: user && user.display_name,
		image: user && user.image,
		fb_id: user && (user.fb_id || ''),
		fb_access_token: user && (user.fb_access_token || ''),
	}
}
