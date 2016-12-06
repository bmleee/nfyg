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
		editorState: this.props.raw ?
			EditorState.createWithContent(convertFromRaw(this.props.raw)) :
			EditorState.createEmpty(),
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

		if (typeof raw === 'string') raw = JSON.parse(raw);

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
						readOnly={true}
						plugins={plugins}
					/>
				</div>
			</div>
		);
	}
}
