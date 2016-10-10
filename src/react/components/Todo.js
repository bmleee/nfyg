import React, { Component, PropTypes } from 'react';

import 'babel-polyfill';

class Todo extends Component {

	_onClickButton(todo) {
		todo.completed = !todo.completed;
		this.props.todoCallbacks.toggle(todo);
	}

	render() {

		return (
			<div>
				{this.props.todo.title} - {this.props.todo.description} - {this.props.todo.completed ? 'completed' : 'in progress'}{'\t'}
				<button onClick={this._onClickButton.bind(this, this.props.todo)}>toggle</button>
			</div>
		)
	}

}

Todo.PropTypes = {
	todo: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired,
	}).isRequired
}

export default Todo;
