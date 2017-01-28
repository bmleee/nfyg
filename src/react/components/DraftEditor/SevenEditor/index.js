import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from '~/src/react/components/react-draft-wysiwyg';
import '~/src/react/components/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';

import { upload_file } from '~/src/react/api/AppAPI';
import editorStyles from './editorStyles.css'

const uploadCallback = async (file) => {
	const {
		sourceURL
	} = await upload_file(file)

	return {
		data: {
			link: sourceURL
		}
	}
}

export default class SevenEditor extends Component {
	state = {
		editorState: EditorState.createEmpty(),
	}

	onChange = (editorState) => {
		this.setState({
			editorState,
		});

		const {
			onChangeToRaw,
			onChangeToHtml
		} = this.props


		let raw
		if (onChangeToRaw || onChangeToHtml) {
			raw = convertToRaw(editorState.getCurrentContent())
		}

		// prop to FormWrapper, ...
		// avoid editorState === null
		if(editorState && onChangeToRaw) {
			onChangeToRaw(raw)
		}

		if(editorState && onChangeToHtml) {
			onChangeToHtml(draftToHtml(raw))
		}
	};

	focus = () => {
		// this.editor.focus();
	};

	componentDidMount() {
		console.log('SevenEditor.componentDidMount', this);
		console.log('typeof this.props.raw', typeof this.props.raw);
		console.log('this.props.raw', this.props.raw);

		// init empty raw content
		let raw = this.props.raw;
		try {
			 raw = JSON.parse(this.props.raw)
		} catch (e) {}

		let editorState;

		if (!this.props.raw) editorState = EditorState.createEmpty()
		else editorState = EditorState.createWithContent(convertFromRaw(raw))

		this.setState({
			editorState
		})
	}

	render() {
		let editorState = this.state.editorState;

		return (
			<div className={editorStyles.wrapper}>
				<div className={editorStyles.editor} onClick={this.focus}>
					<Editor
						// toolbarClassName="home-toolbar"
						// wrapperClassName="home-wrapper"
						// editorClassName="home-editor"
						ref={i => this.editor = i}
						uploadCallback={uploadCallback}
						editorState={this.state.editorState}
						onEditorStateChange={this.onChange}
						placeholder="내용을 입력해주세요."
						ref={(node) => this.editor = node}
					/>
				</div>
			</div>
		);
	}
}

export class Viewer extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		let preRaw = this.props.raw
		let nextRaw = nextProps.raw

		return JSON.stringify(preRaw) !== JSON.stringify(nextRaw)
	}


	render() {
		let {
			raw
		} = this.props;

		console.log('SevenViewer', this);
		//
		// console.log('raw', raw);
		// console.log('typeof raw', typeof raw);
		// console.log('JSON.parse( raw)', JSON.parse(raw));



		if (typeof raw === 'string') raw = JSON.parse(raw);

		// console.log('parsed raw', raw);
		// console.log('parsed typeof raw', typeof raw);
		let editorState;

		try {
			editorState = EditorState.createWithContent(convertFromRaw(raw));
		} catch (e) {
			console.error(e)
			editorState = EditorState.createEmpty()
		}

		return (
			<div className={editorStyles.viewerWrapper}>
				<div className={editorStyles.viewer}>
					<Editor
						toolbarClassName={editorStyles.viwerToolbar}
						editorState={editorState}
						onChange={() => {}}
						readOnly={true}
					/>
				</div>
			</div>
		);
	}

	getState = () => this.state.editorState
	getRaw = () => convertToRaw(this.state.editorState.getCurrentContent())
}
