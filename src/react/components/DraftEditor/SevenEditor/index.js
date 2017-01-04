import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';

import {
	linkifyPlugin,
	sideToolbarPlugin,
	inlineToolbarPlugin,
	undoPlugin,

	imagePlugin,
	focusPlugin,
	resizeablePlugin,
	dndPlugin,
	alignmentPlugin,
} from './Plugins'

import ImageAdd from './ImageAdd';

import editorStyles from './editorStyles.css'

const plugins = [
	linkifyPlugin,
	sideToolbarPlugin,
	inlineToolbarPlugin,
	undoPlugin,

	imagePlugin,
	focusPlugin,
	resizeablePlugin,
	dndPlugin,
	alignmentPlugin,
];

const { SideToolbar } = sideToolbarPlugin;
const { InlineToolbar } = inlineToolbarPlugin;
const { UndoButton, RedoButton } = undoPlugin;
const { AlignmentTool } = alignmentPlugin;

export default class SevenEditor extends Component {
	state = {
		editorState: EditorState.createEmpty()
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
			this.props.onChangeToHtml(stateToHTML(editorState.getCurrentContent()))
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
						editorState={editorState}
						onChange={this.onChange}
						plugins={plugins}
						ref={(node) => this.editor = node}
					/>
				</div>

				<div className={editorStyles.options}>
					<SideToolbar />
					<InlineToolbar />
					<AlignmentTool />
					<ImageAdd
						editorState={this.state.editorState}
						onChange={this.onChange}
						modifier={imagePlugin.addImage}
					/>
					<UndoButton />
					<RedoButton />
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

		// console.log('SevenViewer', this);
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
			editorState = createEditorStateWithText('');
		}



		return (
			<div className={editorStyles.viewerWrapper}>
				<div className={editorStyles.viewer}>
					<Editor
						editorState={editorState}
						onChange={() => {}}
						readOnly={true}
						plugins={plugins}
					/>
				</div>
			</div>
		);
	}
}
