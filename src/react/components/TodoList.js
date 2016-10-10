import React, { Component, PropTypes } from 'react';
import Todo from './Todo';

class TodoList extends Component {

	render() {
		let todos = this.props.todos.map(todo =>
			<li key={todo._id} >
				<Todo todo={todo} key={todo._id}
					todoCallbacks={this.props.todoCallbacks} />
			</li>
		);

		return (
			<ol>
				{todos}
			</ol>
		)
	}

}

TodoList.PropTypes = {
	todos: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TodoList;
