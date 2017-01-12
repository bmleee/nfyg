import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';

import uploadImageCallBack from '~/src/react/components/react-draft-wysiwyg/docs/src/util/uploadImageCallBack';
import bold from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/bold.gif';
import italic from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/italic.gif';
import underline from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/underline.gif';
import strikethrough from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/strikethrough.gif';
import subscript from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/subscript.gif';
import superscript from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/superscript.gif';
import eraser from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/erase.gif';
import left from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/left-align.gif';
import right from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/right-align.gif';
import center from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/center-align.gif';
import justify from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/justify.gif';
import ordered from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/ordered.gif';
import unordered from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/unordered.gif';
import indent from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/indent.gif';
import outdent from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/outdent.gif';
import link from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/link.gif';
import unlink from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/unlink.gif';
import image from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/image.gif';
import undo from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/undo.gif';
import redo from '~/src/react/components/react-draft-wysiwyg/docs/images/demo/redo.gif';

import editorStyles from './editorStyles.css'

export default class SevenEditor extends Component {
	state = {
		editorState: EditorState.createEmpty(),
	}

	onChange = (editorState) => {
		this.setState({
			editorState,
		});

		// prop to FormWrapper, ...
		// avoid editorState === null
		if(editorState && this.props.onChangeToRaw) {
			this.props.onChangeToRaw(convertToRaw(editorState.getCurrentContent()))
		}

		if(editorState && this.props.onChangeToHtml) {
			this.props.onChangeToHtml(draftToHtml(editorState.getCurrentContent()))
		}
	};

	focus = () => {
		this.editor.focus();
	};

	componentDidMount() {
		// console.log('SevenEditor.componentDidMount', this);
		// console.log('typeof this.props.raw', typeof this.props.raw);
		// console.log('this.props.raw', this.props.raw);

		// init empty raw content
		let raw = typeof this.props.raw === 'string' ? JSON.parse(this.props.raw || `{"entityMap":{},"blocks":[]}`) : this.props.raw
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
						uploadCallback={uploadImageCallBack}
						editorState={this.state.editorState}
						onEditorStateChange={this.onChange}
						placeholder="입력하세요."
						ref={(node) => this.editor = node}
					/>
				</div>
			</div>
		);
	}
}

export class Viewer extends Component {
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
}
