
export function unauthorizedUser(user, canEdit = false) {
	return {
		isLoggedIn: !!user,
		isAuthorized: false,
		canEdit: canEdit,
		displayName: user && user.display_name,
		image: user && user.image,
		email: user && (user.fb_email || user.local_email),
		real_email: user && (user.sub_email || ''),
		mailCheck: user && (user.mail_check || ''),
		fb_id: user && (user.fb_id || ''),
		fb_access_token: user && (user.fb_access_token || ''),
		contact: user && (user.contact || ''),
		number_check: user && (user.number_check || ''),
		intro: user && (user.intro || '')
	}
}

export function authorizedUser(user, canEdit = false) {
	return {
		isLoggedIn: !!user,
		isAuthorized: true,
		canEdit: canEdit,
		displayName: user && user.display_name,
		image: user && user.image,
		email: user && (user.fb_email || user.local_email),
		real_email: user && (user.sub_email || ''),
		mailCheck: user && (user.mail_check || ''),
		fb_id: user && (user.fb_id || ''),
		fb_access_token: user && (user.fb_access_token || ''),
		contact: user && (user.contact || ''),
		number_check: user && (user.number_check || ''),
		intro: user && (user.intro || '')
	}
}
