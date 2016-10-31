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

import { facebook_login } from '../../lib/firebase'

const  Test = ({}) => (
	<div>
		<button onClick={facebook_login}>Facebook Login</button>
	</div>
	)
export default Test
