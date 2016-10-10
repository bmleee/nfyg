import {
	REQUEST_TODOS,
	RECEIVE_TODOS,
	REQUEST_CREATE_TODO,
	RECEIVE_CREATE_TODO,
	REQUEST_TOGGLE_TODO,
 	RECEIVE_TOGGLE_TODO,
} from '../constants';

import TodoAPI from '../api/TodoAPI';

export default {
	fetchTodos() {
		return (dispatch) => {
			dispatch({ type: REQUEST_TODOS });

			return TodoAPI.fetchTodos()
				.then( todos => dispatch({ type: RECEIVE_TODOS, success: true, todos, }) )
				.catch( error => dispatch({ type: RECEIVE_TODOS, success: false, error }) )
		}
	},

	addTodo(todo) {
		return (dispatch) => {
			dispatch({ type: REQUEST_CREATE_TODO, todo, });

			return TodoAPI.addTodo(todo)
				.then( todo => dispatch({ type: RECEIVE_CREATE_TODO, success: true, todo }) )
				.catch( error => dispatch({ type: RECEIVE_CREATE_TODO, success: false, todo, error }) )
		}
	},

	toggleTodo(todo) {
		return (dispatch) => {
			dispatch({ type: REQUEST_TOGGLE_TODO, todo, });

			return TodoAPI.toggleTodo(todo)
				.then( todo => dispatch({ type: RECEIVE_TOGGLE_TODO, success: true, todo, }) )
				.catch( error => dispatch({ type: RECEIVE_TOGGLE_TODO, success: false, todo, error, }))
		}
	},
}
