import React, { Component, PropType } from 'react'
import update from 'react-addons-update'

import { sign_request, image_upload } from '../../../lib/utils'

// import { Map, fromJS } from 'immutable'

const SideBar = (props) => (
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
		<div>
			<span>Name</span>
			<input type="text" name="creator-name" value={name}
				onChange={ (e) => onChangeHandlers.name(e.target.value) } />
		</div>
		<div>
			<span>Icon</span>
			<input type="file" name="creator-icon-src" ref={(c) => parent._creator_icon_src = c}
				onChange={ (e) => onChangeHandlers.iconSrc(e.target.value) } />
		</div>
		<div>
			<span>description</span>
			<input type="textarea" name="creator-description"
				onChange={ (e) => onChangeHandlers.description(e.target.value) } />
		</div>
	</div>
)

class ProjectEditor extends Component {

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
			dayFrom: null,
			dateTo: null,
			currentMoney: -1,
			targetMoney: -1,
		},
		overview: {
			part1: [], // { type, content }
			part2: [], // { type, content }
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

											let { signed_request, url } = await sign_request(file)

											if (!signed_request) {
												console.error(Error('Cannot get signed request'))
												return
											}

											console.log(`signed request: `, signed_request)

											let res = await image_upload(file, signed_request, url)
											console.log(res);

										},
			description: 	(v) => { this.setState(update(this.state, { creator: { description: { $set: v } } } )) },
		},
		heading: {
			imgSrc: 			(v) => { this.setState(update(this.state, { heading: { imgSrc: { $set: v } } } )) },
			logoSrc:			(v) => { this.setState(update(this.state, { heading: { logoSrc: { $set: v } } } )) },
			title: 				(v) => { this.setState(update(this.state, { heading: { title: { $set: v } } } )) },
			dayFrom: 			(v) => { this.setState(update(this.state, { heading: { dayFrom: { $set: v } } } )) },
			dateTo:				(v) => { this.setState(update(this.state, { heading: { dateTo: { $set: v } } } )) },
			currentMoney: (v) => { this.setState(update(this.state, { heading: { currentMoney: { $set: v } } } )) },
			targetMoney: 	(v) => { this.setState(update(this.state, { heading: { targetMoney: { $set: v } } } )) },
		},
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

				</EditorBody>

				<SideBar />

			</div>
		)
	}
}

export default ProjectEditor
