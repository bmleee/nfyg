import React, { Component } from 'react';

import SevenEditor from './DraftEditor/SevenEditor'



export default class test3 extends Component {
	// state = {
	// 	editorContent: EditorState.createEmpty(),
	// 	html: ''
	// }
	//
	// onChange = (editorContent) => this.setState({
	// 	editorContent,
	// 	html: draftToHtml(convertToRaw(this.state.editorContent.getCurrentContent()))
	// })

	render() {
		// console.log(this.state.html);
		return (
			<div className="demo-root">
				<SevenEditor />
			</div>
		)
	}
}


// import SevenEditor, { Viewer } from './DraftEditor/SevenEditor'
//
// import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
// import {stateToHTML} from 'draft-js-export-html';

// export default class T extends Component {
// 	state = {
// 		raw: {},
// 		html: ''
// 	}
//
// 	onChangeToHtml = (html) => {
// 		console.log('_onEditorChange.html', html);
// 		if(html) {
// 			this.setState({html})
// 		}
// 	}
//
// 	onChangeToRaw = (raw) => {
// 		console.log('_onEditorChange.raw', raw);
// 		console.log(JSON.stringify(raw, undefined, 4));
// 		if(raw) {
// 			this.setState({raw})
// 		}
// 	}
//
// 	render() {
// 		let {
// 			raw
// 		} = this.state;
//
// 		return (
// 			<div>
// 				<SevenEditor
// 					onChangeToRaw={this.onChangeToRaw}
// 					onChangeToHtml={this.onChangeToHtml}
// 				/>
//
// 				{/* <h3>Read Only</h3>
// 				<Viewer
// 					raw={raw}
// 				/> */}
//
// 				<h3>HTML</h3>
// 				<div dangerouslySetInnerHTML={{__html: this.state.html}}/>
// 			</div>
// 		)
// 	}
// }
