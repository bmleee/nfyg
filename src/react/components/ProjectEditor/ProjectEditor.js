// ContentViewr에서는 contentType=='text'이면 content.toString('html') && dangerouslyInsertHtml? 이용~
/**
 * Todos
 *  1. overview.partN.content[contentType == 'text']의 툴바 : not focus 일때 보여주지 않기
 *  2. overview.partN.content 에 onMoved, onDeleted 적용하기 : Drag and Drop / Delete Button
 */

import { ProjectEditorConstants as CONSTANTS } from '../../constants'

import React, { Component, PropType } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import update from 'react-addons-update'

import { sign_request, image_upload, upload_file } from '../../lib/utils'
import * as actionCreators from '../../actions/ProjectEditorActionCreators'
// import { Map, fromJS } from 'immutable'

import { canUseDOM, throttle } from '../../../lib/utils'

import _ from 'lodash' // use throttle or debounce

// when window object is undeclared...
if(canUseDOM) {
	window.RichTextEditor = require('react-rte').default
} else {
	global.RichTextEditor = {}
}

// content style
const H1Style = {
	fontSize: '24px',
	fontWeight: '400'
}
const H2Style = {
	fontSize: '20px',
	fontWeight: '400'
}

const textStyle = {
	fontSize: '10px',
}

const imageStyle = {
	width: '30%'
}


const SideBar = ({onClick,...props}) => (
	<div className="editor-sidebar" {...props} >
		<button onClick={ () => onClick('h1') }>H1</button>
		<button onClick={ () => onClick('h2') }>H2</button>
		<button onClick={ () => onClick('quote') }>Quote</button>
		<button onClick={ () => onClick('text', RichTextEditor.createEmptyValue() ) }>Text</button>
		<button onClick={ () => onClick('image') }>Image</button>
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
			<textarea name="creator-description"
								rows="4" cols="50" onChange={(e) => onChangeHandlers.description(e.target.value)} />
		</div>
	</div>
)

const HeadingForm = ({ heading: {imgSrc, logoSrc, title, dateFrom, dateTo, currentMoney, targetMoney }, onChangeHandlers, parent }) => (
	<div>
		<h3>Heading Form</h3>
		<div>
			<span>Image Source</span>
			<input type="file" ref={(c) => parent._heading_img_src = c}
				onChange={ (e) => onChangeHandlers.imgSrc() }/>
		</div>
		<div>
			<span>Logo Source</span>
			<input type="file" ref={(c) => parent._heading_logo_src = c}
				 onChange={ (e) => onChangeHandlers.logoSrc() }/>

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

const renderContents = (contents, onChangeHandlers) => (
	<div className="contents-container">
		{
			contents.map( ({contentType, content, ...other}, index) => {
				switch (contentType) {
					case 'h1' :
						return <input key={index} type="text" style={H1Style} value={content}
													onChange={ (e) => onChangeHandlers.contentChanged(index, e.target.value) } />
					case 'h2' :
						return <input key={index} type="text" style={H2Style} value={content}
													onChange={ (e) => onChangeHandlers.contentChanged(index, e.target.value) } />
					//case 'text' :
					//	return <textarea rows="5" cols="50" style={textStyle} value={content}
					//								onChange={ (e) => onChangeHandlers.contentChanged(index, e.target.value) } />
					case 'text' :
						return <RichTextEditor key={index} value={content} onChange={ (v) => onChangeHandlers.contentChanged(index, v) } />
          case 'image' : // TODO: change onChangeHandlers.overview.part1.contentChanged
						return (
                <div key={index}>
                  <input type="file" style={imageStyle} // ref={`part1_image${index}`}
                         onChange={ () => onChangeHandlers.contentChanged(index, undefined, contentType) } />
                  <img src={content} style={imageStyle} />
                </div>
              )
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
				<div ref={(c) => parent._overview_part1 = c}>
					{ renderContents(part1, onChangeHandlers.part1) }
				</div>
				<SideBar onClick={onChangeHandlers.part1.newContent} />
			</div>

			<div>
				<h4>Overview - part2</h4>
				<div ref={(c) => parent._overview_part2 = c}>
					{ renderContents(part2, onChangeHandlers.part2) }
				</div>
				<SideBar onClick={onChangeHandlers.part2.newContent} />
			</div>
		</div>
	)
}

export class ProjectEditor extends Component {

  inputOnChangeHandlers = {
		creator: {
			name: (v) => {this.props.updateCreatorName(v)},

			iconSrc: 			async () => {
				const file = this._creator_icon_src.files[0]
				if (!file) return

				const { imgSrc } = await upload_file(file)

				this.props.updateCreatorIconSrc(imgSrc)
			},
			description: 	(v) => {this.props.updateCreatorDescription(v)},
		},
		heading: {
			imgSrc: 			async (v) => {
				const file = this._heading_img_src.files[0]
				if (!file) return

				const { imgSrc } = await upload_file(file)

				this.props.updateHeadingImgSrc(imgSrc)
			},
			logoSrc:			async (v) => {
				const file = this._heading_logo_src.files[0]
				if (!file) return

				const { imgSrc } = await upload_file(file)

				this.props.updateHeadingLogoSrc(imgSrc)
			},
			title: 				(v) => {this.props.updateHeadingTitle(v)},
			dateFrom: 		(v) => {this.props.updateHeadingDateFrom(v)},
			dateTo:				(v) => {this.props.updateHeadingDateTo(v)},
			targetMoney: 	(v) => {this.props.updateHeadingTargetMoney(v)},
		},
		overview: {
			// TODO: refactor below
			part1: {
				newContent: (contentType, content) => {this.props.part1NewContent(contentType, content)},
				contentChanged: async (index, v, type) => {
					if (type === 'image') {
						const file = this._overview_part1
							.children[0] // div.contents-container
							.children[index] // index-th case-statement
							.children[0] // input[type="file"] && contentType === image
							.files[0] // uploaded file

						if(!file) return

						const { imgSrc } = await upload_file(file)
						this.props.part1ContentChanged(index, imgSrc)
					} else {
						this.props.part1ContentChanged(index, v)
					}
				},
				contentMoved: (preIndex, postIndex) => {this.props.part1ContentMoved(preIndex, postIndex)},
				contentDeleted: (index) => {this.props.part1ContentDeleted(index)}
			},
		part2: {
			// same as above
			newContent: (contentType, content) => {this.props.part2NewContent(contentType, content)},
			contentChanged: async (index, v, type) => {
				if (type === 'image') {
					const file = this._overview_part2
						.children[0] // div.contents-container
						.children[index] // index-th case-statement
						.children[0] // input[type="file"] && contentType === image
						.files[0] // uploaded file

					if(!file) return

					const { imgSrc } = await upload_file(file)
					this.props.part2ContentChanged(index, imgSrc)
				} else {
					this.props.part2ContentChanged(index, v)
				}
			},
			contentMoved: (preIndex, postIndex) => {this.props.part2ContentMoved(preIndex, postIndex)},
			contentDeleted: (index) => {this.props.part2ContentDeleted(index)}
			}
		}
	}



	render() {
		const { creator, heading, overview, rewards, post} = this.props.ProjectEditor

		return (
			<div className="editor">

				<EditorBody>
					<CreatorForm
						parent={this}
						creator={creator}
						onChangeHandlers={this.inputOnChangeHandlers.creator} />

					<HeadingForm
						parent={this}
						heading={heading}
						onChangeHandlers={this.inputOnChangeHandlers.heading}
						/>

					<OverviewForm
						parent={this}
						overview={overview}
						onChangeHandlers={this.inputOnChangeHandlers.overview} />
				</EditorBody>

				<h5>Dev Buton</h5>
        <button onClick={ () => console.log(this) }>Log this</button>
				<button onClick={ () => console.log(this.state) }>Log State</button>
				<button onClick={ () => console.log(this.props) }>Log Props</button>
				<button onClick={ () => {
					console.log('PART1')
					overview.part1
						.filter( ({contentType}) => contentType === 'text' )
						.forEach(({content}) => console.log(content.toString('html')))

					console.log('PART2')
					overview.part2
					.filter( ({contentType}) => contentType === 'text' )
					.forEach(({content}) => console.log(content.toString('html')))

				} }>Text to Html String</button>

			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	ProjectEditor: state.ProjectEditor
})

// attach dispatch to just simple actions (async actions cannot be detached). for optional bind refer https://github.com/reactjs/redux/issues/363
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export const ProjectEditorContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectEditor)
