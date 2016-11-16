'use strict';

import React, { Component, PropTypes } from 'react';

import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';

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


// import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
//
// const TestChildren = ({onChange, value}) => (
// 	<input type="text" onChange={onChange} value={value}/>
// )
//
// class Test2 extends Component {
// 	state = {
// 		value: ''
// 	}
//
// 	_onSubmit = (value) => {
// 		console.log('New value: ', value);
// 		this.setState({value})
// 	}
//
// 	render() {
// 		let {
// 			value
// 		} = this.state
//
// 		return (
// 			<FormWrapper
// 				title="Test wrapper title"
//
// 				// value type
// 				valueType="number"
//
// 				alt="대제목을 입력하세요"
// 				initialValue={value}
// 				submitCaption="입력"
// 				onSubmit={this._onSubmit}
// 			>
// 				<TestChildren />
// 			</FormWrapper>
// 		)
// 	}
//
// }
//




// import Abstract from './ProjectEditor/components/Abstract/Abstract'
//
// class Test2 extends Component {
// 	state = {
// 		longTitle: '',     //
// 		shortTitle: '',    //
// 		imgSrc: '',         //
// 		category: '',       // 건강, 라이프, ...
// 		projectName: '',   // projects/:project_name
// 	}
//
// 	render() {
//
// 		return (
// 			<Abstract
// 				{...this.state}
// 				_onLongTitleSubmit={this._onLongTitleSubmit}
// 				_onShortTitleSubmit={this._onShortTitleSubmit}
// 				_onImgSrcSubmit={this._onImgSrcSubmit}
// 				_onCategorySubmit={this._onCategorySubmit}
// 				_onProjectNameSubmit={this._onProjectNameSubmit}
// 			 />
// 		)
// 	}
//
// 	_onLongTitleSubmit = (longTitle) => this.setState({longTitle})
// 	_onShortTitleSubmit = (shortTitle) => this.setState({shortTitle})
// 	_onImgSrcSubmit = (imgSrc) => this.setState({imgSrc})
// 	_onCategorySubmit = (category) => this.setState({category})
// 	_onProjectNameSubmit = (projectName) => this.setState({projectName})
// }





// import Funding from './ProjectEditor/components/Funding/Funding'
// import update from 'immutability-helper'
//
// class Test2 extends Component {
// 	state = {
// 		currentMonoey: 0,   // 직접 / 간접 후원에 의해 추가됨
// 		targetMoney: 0,
// 		dateFrom: new Date().toISOString().substring(0, 10),     							// 작성 시작 일
// 		dateTo: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().substring(0, 10),	// 바로 다음날
// 		reward: {
// 			rewards: [],
// 			newReward: {
// 				title: '',
// 				description: '',
// 				isDirectSupport: false,
// 				thresholdMoney: 0
// 			}
// 		}         // { title, description, isDirectSupport: T/F, threshold: 직접 후원 금액 또는 좋아요, 리공유 수, 전달일 }
// 	}
//
//
// 	render() {
// 		return (
// 			<Funding
// 			{...this.state}
// 			_onTargetMoneySubmit={this._onTargetMoneySubmit}
// 			_onDateToSubmit={this._onDateToSubmit}
// 			_onRewardSubmit={this._onRewardSubmit}
// 			rewardHandlers={this.rewardHandlers}
// 			/>
// 		)
// 	}
//
// 	_onTargetMoneySubmit = (targetMoney) => this.setState({targetMoney})
// 	_onDateToSubmit = (dateTo) => this.setState({dateTo})
// 	_onRewardSubmit = ({newReward}) => {
// 		const {
// 			title,
// 			description,
// 			isDirectSupport,
// 			thresholdMoney
// 		} = newReward
//
// 		this.setState(update(this.state, {
// 			reward: {
// 				rewards: {
// 					$push: [{...newReward}]
// 				}
// 			}
// 		}))
// 	}
//
// 	// bound to FormWrapper except one
// 	rewardHandlers = {
// 		_onTitle: function(e) {
// 			this.setState({
// 				value: update(this.state.value, {
// 					newReward: {
// 						title: { $set: e.target.value }
// 					}
// 				})
// 			})
// 		},
// 		_onDescription: function(e) {
// 			this.setState({
// 				value: update(this.state.value, {
// 					newReward: {
// 						description: { $set: e.target.value }
// 					}
// 				})
// 			})
// 		},
// 		_onIsDirectSupport: function(e) {
// 			this.setState({
// 				value: update(this.state.value, {
// 					newReward: {
// 						isDirectSupport: { $set: e.value }
// 					}
// 				})
// 			})
// 		},
// 		_onThresholdMoney: function(e) {
// 			this.setState({
// 				value: update(this.state.value, {
// 					newReward: {
// 						thresholdMoney: { $set: Number(e.target.value) }
// 					}
// 				})
// 			})
// 		},
//
// 		// not bound to FormWrapper
// 		deleteReward: (index) => {
// 			console.log('deleteReward.this', this);
// 			console.log('deleteReward.this.setState', this.setState);
// 			console.log('deleteReward.index', index);
// 			this.setState(update(this.state, {
// 				reward: {
// 					rewards: {
// 						$splice: [
// 							[index, 1]
// 						]
// 					}
// 				}
// 			}))
// 		}
// 	}
// }




// import Overview from './ProjectEditor/components/Overview/Overview'
// import update from 'immutability-helper'
//
// class Test2 extends Component {
// 	state = {
// 		intro:'',
// 		part1: '',
// 		part2: ''
// 	}
//
// 	render() {
//
// 		console.log('Test2.rendering...');
// 		console.log('Test2.part1', this.state.part1);
//
// 		return (
// 			<Overview
// 				{...this.state}
// 				_onIntroSubmit={this._onIntroSubmit}
// 				_onPart1Submit={this._onPart1Submit}
// 				_onPart2Submit={this._onPart2Submit}
// 				parent={this}
// 			/>
// 		)
// 	}
//
// 	_onIntroSubmit = (intro) => this.setState({intro})
// 	_onPart1Submit = (value) => this.setState({part1: value.toString('html')})
// 	_onPart2Submit = (value) => this.setState({part2: value.toString('html')})
//
// }

import ProjectEditor from './ProjectEditor/ProjectEditor'

class Test2 extends Component {
	render() {
		return (
			<ProjectEditor>

			</ProjectEditor>
		)
	}
}

export { Test1, Test2 }
