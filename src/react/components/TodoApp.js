import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TodoActionCreators from '../actions/TodoActionCreators';

import TodoList from './TodoList';

class TodoApp extends Component {
	componentDidMount() {
		this.props.fetchTodos();
	}

	render() {
		let todoCallbacks = {
			fetch: this.props.fetchTodos,
			add: this.props.addTodo,
			toggle: this.props.toggleTodo,
		};

		return (
			<TodoList todos={this.props.todos ? this.props.todos : []} todoCallbacks={todoCallbacks} />
		)
	}

}

TodoApp.PropTypes = {
	todos: PropTypes.arrayOf(PropTypes.object),
}

const mapStateToProps = (state) => ({
	todos: state.todos,
})

const mapDispatchToProps = (dispatch) => ({
	fetchTodos: () => TodoActionCreators.fetchTodos()(dispatch),
	addTodo: (todo) => TodoActionCreators.addTodo(todo)(dispatch),
	toggleTodo: (_id) => TodoActionCreators.toggleTodo(_id)(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
