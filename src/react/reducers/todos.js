import {
	REQUEST_TODOS,
	RECEIVE_TODOS,
	REQUEST_CREATE_TODO,
	RECEIVE_CREATE_TODO,
	REQUEST_TOGGLE_TODO,
 	RECEIVE_TOGGLE_TODO,
} from '../constants';

import update from 'react-addons-update';

import 'babel-polyfill';

const defaultDraftTodo = () => {
	return {
		_id: Date.now(),
		title: 'default title',
		description: 'default description',
		completed: false,
	}
}

let todoIndex, todo;
const todos = (state = [defaultDraftTodo()], action) => {
	switch (action.type) {
		/**
		 * Fetch Todos
		 */
		case RECEIVE_TODOS:
			return action.success ? action.todos : [];

		/**
		 * Create Todo
		 */
		case REQUEST_CREATE_TODO :
			return update(state, { $push: action.todo });

		case RECEIVE_CREATE_TODO :
			todoIndex = state.findIndex( t => t._id === action.todo._id );

			return action.success ?
				udpate(state, { $splice: [ [todoIndex, 1, action.todo], ], }) :
				update(state, { $splice: [ [todoIndex, 1, ], ], });

		/**
		 * Toggle Todos
		 */
		case REQUEST_TOGGLE_TODO :
			todoIndex = getTodoIndex(state, action.todo._id);

			return update(state, {
				[todoIndex]: {
					completed: {
						$apply: v => !v
					}
				}
			 });

		case RECEIVE_TOGGLE_TODO :
			todoIndex = state.findIndex( t => t._id === action.todo._id );
			return action.success ?
				update(state, { $splice: [ [todoIndex, 1, action.todo, ], ], }) :
				update(state, { $splice: [ [todoIndex, 1, ] ] });

		default:
			return state;
	}
}

export default todos;

export const getTodo = (state, _id) => state.find( todo => todo._id === _id );
export const getTodoIndex = (state, _id) => state.findIndex( todo => todo._id === _id );
