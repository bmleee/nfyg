import * as user from './renderUser'
import * as error from './renderError'

export function unauthorizedUser(user, message) {
	return {
		user: user.unauthorizedUser(user),
		error: error.unauthorizedUser(message)
	}
}
