import React, { Component } from 'react';
import SevenEditor, { Viewer } from './DraftEditor/SevenEditor'

// import AddImageEditor from './DraftEditor/AddImageEditor'
// const t = () => <AddImageEditor />

// import DraftEditor from './DraftEditor'
// const t = () => <DraftEditor />


// const t = () => <DraftEditor />
//
// // const t = () => <div>Loading.2...</div>
//
// export default t


const raw = JSON.parse('{"entityMap":{"0":{"type":"image","mutability":"IMMUTABLE","data":{"src":"/uploads/user_default.png"}},"1":{"type":"image","mutability":"IMMUTABLE","data":{"src":"/uploads/favicon.ico","alignment":"center"}}},"blocks":[{"key":"33h3v","text":"sadfsdf","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f9s8u","text":"asdfasfa","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bstai","text":"asdf","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"10hso","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"cor9t","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c26gs","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":1}],"data":{}},{"key":"d5hdp","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}')

export default class T extends Component {
	state = {
		raw: ''
	}

	_onEditorChange = (raw) => {
		if(raw) {
			console.log('Test3._onEditorChange.raw', raw);
			this.setState({ raw })
		}
	}

	render() {
		let {
			raw
		} = this.state;

		return (
			<div>
				<SevenEditor onChange={this._onEditorChange} />

				<h3>Read Only</h3>
				<Viewer
					raw={raw}
				/>
			</div>
		)
	}
}
