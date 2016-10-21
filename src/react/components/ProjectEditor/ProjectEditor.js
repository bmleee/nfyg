import React, { Component, PropType } from 'react'
import { connect } from 'react-redux'

import update from 'react-addons-update'

import { sign_request, image_upload, upload_file } from '../../lib/utils'

// import { Map, fromJS } from 'immutable'


const SideBar = ({onClick,...props}) => (
	<div className="editor-sidebar" {...props} >
		<button>H1</button>
		<button>H2</button>
		<button>Quote</button>
		<button>Plain Text</button>
		<button>Image</button>
		<button>Video</button>
	</div>
)


const EditorBody = ({ contents, ...props}) => (
	<div className="editor-body">
		{ props.children }
	</div>
)

const CreatorForm = ({ creator: { name, iconSrc, description }, onChangeHandlers, parent }) => (
	<div className="editor-creator-form">
		<h3>Creator Form</h3>
		<div>
			<span>Name</span>
			<input type="text" name="creator-name" value={name}
				onChange={ (e) => onChangeHandlers.name(e.target.value) } />
		</div>
		<div>
			<span>Icon</span>
			<input type="file" name="creator-icon-src" ref={(c) => parent._creator_icon_src = c}
				onChange={ (e) => onChangeHandlers.iconSrc(e.target.value) } />
			<img src={iconSrc} alt="Insert Creator's icon"/>
		</div>
		<div>
			<span>description</span>
			<input type="textarea" name="creator-description" rows="4" cols="50"
				onChange={ (e) => onChangeHandlers.description(e.target.value) } />
		</div>
	</div>
)

const HeadingForm = ({ heading: {imgSrc, logoSrc, title, dateFrom, dateTo, currentMoney, targetMoney }, onChangeHandlers, parent }) => (
	<div>
		<h3>Heading Form</h3>
		<div>
			<span>Image Source</span>
			<input type="file" ref={(c) => parent._heading_img_src = c} />
		</div>
		<div>
			<span>Logo Source</span>
			<input type="file" ref={(c) => parent._heading_logo_src = c} />
		</div>
		<div>
			<span>Title</span>
			<input type="text" onChange={ (e) => onChangeHandlers.title(e.target.value) } />
		</div>
		<div>
			<span>Date From</span>
			<input type="date" onChange={ (e) => onChangeHandlers.dateFrom(e.target.value) } />
		</div>
		<div>
			<span>Date To</span>
			<input type="date" onChange={ (e) => onChangeHandlers.dateTo(e.target.value) } />
		</div>
		<div>
			<span>Target Money</span>
			<input type="number" onChange={ (e) => onChangeHandlers.targetMoney(e.target.value) } />
		</div>
	</div>
)

const renderContents = (contents) => (
	<div className="contents-container">
		{
			contents.map( ({type, content, ...other}, index) => {

				switch (type) {
					case 'h1' :
						return <h1>{content}</h1>
					case 'h2' :
						return <h2>{content}</h2>
					case 'text' :
						return <span className="contents-item-text">{content}</span>
					case 'image' :
						return <img className="contents-item-image" src={content} style={{width: '77%'}} />
				}

			})
		}
	</div>
)

const OverviewForm = ({ overview: { part1, part2 }, onChangeHandlers, parent, ...props }) => {
	return (
		<div>
			<h3>Overview Form</h3>
			<div>
				<h4>Overview - part1</h4>
				<div>
					{ renderContents(part1) }
				</div>
				<Sidebar onClick={onChangeHandlers.part1.insert} />
			</div>

			<div>
				<h4>Overview - part2</h4>
				<div>
					{ renderContents(part2) }
				</div>
				<Sidebar />
			</div>
		</div>
	)
}

export class ProjectEditor extends Component {

	state = {
		creator: {
			name: '',
			iconSrc: '',
			description: '',
		},
		heading: {
			imgSrc: '',
			logoSrc: '',
			title: '',
			dateFrom: null,
			dateTo: null,
			currentMoney: -1,
			targetMoney: -1,
		},
		overview: {
			part1: [ {type: 'text', content: 'sample text content' } ], // { type, content }
			part2: [ {type: 'image', content: '/assets/images/sample-icon.svg'} ], // { type, content }
		},
		rewards: [], // { title, description }
		post: {
			heading: { // Post탭에 보일 아이콘, 설명
				iconSrc: '',
				description: '',
			}
		},
	}

	inputOnChangeHandlers = {
		creator: {
			name: 				(v) => { this.setState(update(this.state, { creator: { name: { $set: v } } } )) },
			// iconSrc: 			(v) => { this.setState(update(this.state, { creator: { iconSrc: { $set: v } } } )) },
			iconSrc: 			async (v) => {
				const file = this._creator_icon_src.files[0]
				if (!file) return

				const { imgSrc } = await upload_file(file)

				this.setState(update(this.state, { creator: { iconSrc: { $set: imgSrc } } }))
			},
			description: 	(v) => { this.setState(update(this.state, { creator: { description: { $set: v } } } )) },
		},
		heading: {
			imgSrc: 			async (v) => {
				const file = this._heading_img_src.files[0]
				if (!file) return

				const { imgSrc } = await upload_file(file)

				this.setState(update(this.state, { heading: { imgSrc: { $set: imgSrc } } } ))
			},
			logoSrc:			async (v) => {
				const file = this._heading_logo_src.files[0]
				if (!file) return

				const { imgSrc } = await upload_file(file)

				this.setState(update(this.state, { heading: { logoSrc: { $set: imgSrc } } } ))
			},
			title: 				(v) => { this.setState(update(this.state, { heading: { title: { $set: v } } } )) },
			dateFrom: 		(v) => { this.setState(update(this.state, { heading: { dayFrom: { $set: v } } } )) },
			dateTo:				(v) => { this.setState(update(this.state, { heading: { dateTo: { $set: v } } } )) },
			targetMoney: 	(v) => { this.setState(update(this.state, { heading: { targetMoney: { $set: v } } } )) },
		},
		overview: {
			part1: {
				insert: ({type, content}) => {
					this.setState(update(this.state, { overview: {part1: {$push: ({type, content}) } } } ))
				}
			}
		}
	}

	render() {
		console.log(this.state);
		return (
			<div className="editor">

				<EditorBody>
					<CreatorForm
						parent={this}
						creator={this.state.creator}
						onChangeHandlers={this.inputOnChangeHandlers.creator} />

					<HeadingForm
						parent={this}
						heading={this.state.heading}
						onChangeHandlers={this.inputOnChangeHandlers.heading}
						/>

					<OverviewForm
						parent={this}
						overview={this.state.overview}
						onChangeHandlers={this.inputOnChangeHandlers.overview} />
				</EditorBody>

				<SideBar />

			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	ProjectEditor: state.ProjectEditor
})

export const ProjectEditorContainer = connect(mapStateToProps)(ProjectEditor)
