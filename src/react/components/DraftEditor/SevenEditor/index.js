import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

import Editor from 'draft-js-plugins-editor';
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
		this.setState({
			editorState,
		});

		if(this.props.onChange) this.props.onChange(editorState)
	};

	focus = () => {
		this.editor.focus();
	};

	render() {
		return (
			<div className={editorStyles.wrapper}>

				<div className={editorStyles.editor} onClick={this.focus}>
					<Editor
						editorState={this.state.editorState}
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
