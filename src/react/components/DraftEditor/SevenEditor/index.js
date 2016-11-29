import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

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
		editorState: EditorState.createEmpty(),
	};

	onChange = (editorState) => {
		console.log('arguments', arguments);
		this.setState({
			editorState,
		});

		// avoid editorState === null
		if(editorState && this.props.onChange) {
			this.props.onChange(convertToRaw(editorState.getCurrentContent()))
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
						onCompositionEnd={this.onChange}
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

		const editorState = raw ?
			EditorState.createWithContent(convertFromRaw(raw)) :
			createEditorStateWithText('')

		return (
			<div className={editorStyles.wrapper}>
				<div className={editorStyles.editor}>
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
