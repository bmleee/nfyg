import React, { Component } from 'react';
import Editor, { EditorState } from 'draft-js'

// import AddImageEditor from './DraftEditor/AddImageEditor'
// const t = () => <AddImageEditor />

// import DraftEditor from './DraftEditor'
// const t = () => <DraftEditor />

import SevenEditor from './DraftEditor/SevenEditor'

// const t = () => <DraftEditor />
//
// // const t = () => <div>Loading.2...</div>
//
// export default t

export default class T extends Component {
	state = {
		editorState: EditorState.createEmpty()
	}

	_onEditorChange = (editorState) => this.setState({ editorState })

	render() {
		console.log('this.state.editorState', this.state.editorState);
		return (
			<div>
				<SevenEditor onChange={this._onEditorChange} />

				<h3>Read Only</h3>
				<Editor
					editorState={this.state.editorState}
					readOnly={true}
				/>
			</div>
		)
	}
}
