import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = `/api/todos`
const API_HEADERS = {
	'Content-Type': 'application/json',
}

export default {
	fetchTodos() {
		return fetch(API_URL)
			.then( res => res.json() );
	},

	addTodo(todo) {
		return fetch(API_URL, {
			method: 'post',
			headers: API_HEADERS,
			body: JSON.stringify(todo),
		})
			.then( res => res.json() );
	},

	toggleTodo(todo) {
		return fetch(`${API_URL}/${todo._id}`, {
			method: 'put',
			headers: API_HEADERS,
			body: JSON.stringify(todo),
		})
			.then( res => res.json() );
	},

}
