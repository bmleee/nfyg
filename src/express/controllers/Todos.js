import express from 'express';
import TodoModel from '../models/TodoModel';

const router = express.Router();

// list todos
router.get('/', (req, res) => {
	TodoModel.find( (error, Todos) => {
		if (error) res.status(500).json({
			message: 'Error when getting Todos',
			error,
		});
		else res.json(Todos);
	})
});

// show todo
router.get('/:id', (req, res) => {
	TodoModel.findOne({ _id: req.params.id }, (error, Todo) => {
		if (error) res.status(500).json({
			message: 'Error when creating Todos',
			error,
		});
		else res.json(Todo);
	})
});

// create todo
router.post('/', (req, res) => {
	let { title, description, completed } = req.body;

	let todo = new TodoModel({
		title,
		description,
		completed,
	});

	todo.save( (error, Todo) => {
		if (error) res.status(500).json({
			message: 'Error when creating Todos',
			error,
			body: req.body,
		});
		else res.json(Todo);
	})
});

// edit todos
router.put('/:id', (req, res) => {
	let { title, description, completed } = req.body;

	completed = String(completed).toLowerCase();

	if (completed === 'true') completed = true;
	else if (completed === 'false') completed = false;
	else {
		return res.status(500).json({
			message: 'completed is not boolean',
		})
	}

	return TodoModel.findOne({ _id: req.params.id })
		.exec()
		.then( todo => {
			todo.completed = completed;
			return todo.save();
		})
		.then ( todo => res.json(todo))
		.catch ( error =>
			res.status(500).json({
				message: 'Error when toggle todo',
				error,
			}));
});

export default router;
