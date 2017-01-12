import * as user from './renderUser'
import * as error from './renderError'

export function unauthorizedUser(user, message, canEdit = false) {
	return {
		user: user.unauthorizedUser(user, canEdit),
		error: error.unauthorizedUser(message)
	}
}
