export default socket => store => next => action => {
	if (action.meta && action.meta.remote) socket.emit()
	next(action)
}
