'use strict';

import React, { Component, PropTypes } from 'react';

import { Editor, EditorState } from 'draft-js';

// class TestDraftJS extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {editorState: EditorState.createEmpty()};
//
// 		this.focus = () => this.refs.editor.focus();
// 		this.onChange = (editorState) => this.setState({editorState});
// 		this.logState = () => console.log(this.state.editorState.toJS());
// 	}
//
// 	render() {
// 		return (
// 			<div style={styles.root}>
// 				<div style={styles.editor} onClick={this.focus}>
// 					<Editor
// 						editorState={this.state.editorState}
// 						onChange={this.onChange}
// 						placeholder="Enter some text..."
// 						ref="editor"
// 					/>
// 				</div>
// 				<input
// 					onClick={this.logState}
// 					style={styles.button}
// 					type="button"
// 					value="Log State"
// 				/>
// 			</div>
// 		);
// 	}
// }
//
// const styles = {
// 	root: {
// 		fontFamily: '\'Helvetica\', sans-serif',
// 		padding: 20,
// 		width: 600,
// 	},
// 	editor: {
// 		border: '1px solid #ccc',
// 		cursor: 'text',
// 		minHeight: 80,
// 		padding: 10,
// 	},
// 	button: {
// 		marginTop: 10,
// 		textAlign: 'center',
// 	},
// };
//
// export default TestDraftJS;


// import RichEditor from './RichEditor';
//
// export default (props) => <RichEditor {...props} />


// import Masonry from 'react-masonry-component'

// const masonryOptions = {
// 	transitionDuration: 0
// }

// export default class Test extends Component {
// 	render() {
// 		const childElements = [
// 			(<li className="grid-item">
// 				<img width={400} height={1000}
// 					src="https://i2.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/floating-sweet-pumpkins4_30x100cm_acrylic-on-koreanpaper_2016.jpg?zoom=2&fit=710%2C211&ssl=1" alt="" />
// 			</li>),
// 			(<li className="grid-item">
// 				<img width={600} height={200}
// 					src="https://i2.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/floating-sweet-pumpkins4_30x100cm_acrylic-on-koreanpaper_2016.jpg?zoom=2&fit=710%2C211&ssl=1" alt="" />
// 			</li>),
// 			(<li className="grid-item">
// 				<img  width={600} height={200}
// 					src="https://i2.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/floating-sweet-pumpkins4_30x100cm_acrylic-on-koreanpaper_2016.jpg?zoom=2&fit=710%2C211&ssl=1" alt="" />
// 			</li>)
// 		]
// 		return (
// 			<Masonry
// 				className={'grid'} // default ''
// 				elementType={'ul'} // default 'div'
// 				options={masonryOptions} // default {}
// 				disableImagesLoaded={false} // default false
// 				updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
// 				>
// 				{childElements}
// 			</Masonry>
// 		);

// 		// return ( <div> helo</div>)

// 	}
// }


// import { canUseDOM } from '../../lib/utils'
//
// if(canUseDOM) {
// 	window.MasonryMixin = require('react-masonry-mixin')(React)
// } else {
// 	global.MasonryMixin = () => () => ({})
// }
//
// const masonryOptions = {
//     transitionDuration: 0
// };
//
//
// export default class Test extends Component {
// 		mixins = [MasonryMixin(React)('grid', masonryOptions)]
//
// 		render() {
// 			const childElements = [
// 				(<li className="grid-item">
// 					<img width={400} height={1000}
// 						src="https://i2.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/floating-sweet-pumpkins4_30x100cm_acrylic-on-koreanpaper_2016.jpg?zoom=2&fit=710%2C211&ssl=1" alt="" />
// 				</li>),
// 				(<li className="grid-item">
// 					<img width={600} height={200}
// 						src="https://i2.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/floating-sweet-pumpkins4_30x100cm_acrylic-on-koreanpaper_2016.jpg?zoom=2&fit=710%2C211&ssl=1" alt="" />
// 				</li>),
// 				(<li className="grid-item">
// 					<img  width={600} height={200}
// 						src="https://i2.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/floating-sweet-pumpkins4_30x100cm_acrylic-on-koreanpaper_2016.jpg?zoom=2&fit=710%2C211&ssl=1" alt="" />
// 				</li>)
// 			]
//
// 			return (
// 				<div ref="grid" className="grid">
// 					{childElements}
// 				</div>
// 			)
// 		}
// }

// import { facebook_login } from '../../lib/firebase'
//
// const  Test = ({}) => (
// 	<div>
// 		<button onClick={facebook_login}>Facebook Login</button>
// 	</div>
// 	)

import { canUseDOM } from '../../lib/utils'
if(canUseDOM) {
	const _SevenEditor = require('./react-rte/src/SevenEditor')
	const _Editor = require('./react-rte/src/RichTextEditor')
	console.log('canUseDOM._SevenEditor', _SevenEditor);
	console.log('canUseDOM._Editor', _Editor);
	window._SevenEditor = _SevenEditor.default
	window._Editor = _Editor.default
	window._Editor.createEmptyValue = _Editor.createEmptyValue
	console.log('window._Editor', window._Editor);
} else {
	global._SevenEditor = () => (<div>Loading...</div>)
	global._Editor = () => (<div>Loading...</div>)
	global._Editor.createEmptyValue = () => '1'
}


class Test1 extends Component {
	state = {
		value: _Editor.createEmptyValue(),
		sevenValue: _Editor.createEmptyValue()
	}

	onChange = (value) => this.setState({value})
	sevenOnChange = (sevenValue) => this.setState({sevenValue})

	render() {
		return (
			<div>
				<h1>h1</h1>
				<h2>h2</h2>
				<h3>h3</h3>
				<h4>h4</h4>
				<_SevenEditor
				 	onChange={this.sevenOnChange}
				/>
				<h4>_SevenEditor.value.toString('html')</h4>
				<div>
					 {this.state.sevenValue.toString('html')}
				</div>
				<h4> html rendering result</h4>
				<div dangerouslySetInnerHTML={{__html: this.state.sevenValue.toString('html')}}>
				</div>

				<_Editor
					value={this.state.value}
					onChange={this.onChange}
					editorClassName="test-editor"
				 />
				 <h4>_Editor.value.toString('html')</h4>
				 <div>
					 	{this.state.value.toString('html')}
				 </div>
				 <h4> html rendering result</h4>
				 <div dangerouslySetInnerHTML={{__html: this.state.value.toString('html')}}>
				 </div>

			</div>
		)
	}

}


import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'

const TestChildren = ({onChange, value}) => (
	<input type="text" onChange={onChange} value={value}/>
)

class Test2 extends Component {
	state = {
		value: ''
	}

	_onSubmit = (value) => {
		console.log('New value: ', value);
		this.setState({value})
	}

	render() {
		let {
			value
		} = this.state
		
		return (
			<FormWrapper
				title="Test wrapper title"

				// value type
				valueType="number"

				alt="대제목을 입력하세요"
				initialValue={value}
				submitCaption="입력"
				onSubmit={this._onSubmit}
			>
				<TestChildren />
			</FormWrapper>
		)
	}

}

export { Test1, Test2 }
