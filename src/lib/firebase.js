import firebase from 'firebase'
import config from '../../firebase.config'

export default firebase

export const app = firebase.initializeApp({
	apiKey: config.apiKey,
	authDomain: config.authDomain,
	databaseURL: config.databaseURL,
	storageBucket: config.storageBucket
})

export const auth 		= firebase.auth()
export const database = firebase.database()

// authentication
export const Providers = {
	Facebook: new firebase.auth.FacebookAuthProvider(),
	Email: new firebase.auth.EmailAuthProvider(),
}

export async function facebook_login() {
	try {
		const result = await auth.signInWithPopup(Providers.Facebook)
		var token = result.credential.accessToken;
		var user = result.user;
		// ...
		console.log(`success: ${JSON.stringify(result, undefined, 4)}`);
	} catch (error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
		console.log(`error: ${JSON.stringify(error, undefined, 4)}`);
	}
}

export async function logout() {
	try {
		const result = firebase.auth().signOut()
		console.log('logout successed');
		console.log(result)
	} catch (error) {
		console.log(`error: ${JSON.stringify(error, undefined, 4)}`)
	}
}
