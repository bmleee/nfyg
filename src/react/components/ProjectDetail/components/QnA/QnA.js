import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

import { PostComments } from '../Post/';

import { SelectOptions } from '../../../../constants'
import {date2string} from '~/src/react/lib/utils'

const selectOptions = SelectOptions.QnA
const borderStyle = { border: '1px solid gray' }


// TODO: 입력 폼. 글만 올릴거 아닌데...
class QnA extends Component {

	state = {
		form: {
			text: '', // value from textarea
			target: '', // to-all 모두에게, to-creator 창작자에게만
		}
	}

	handleTextChange = (e) => {
		this.setState({
			form: {
				text: e.target.value,
			}
		})
	}

	handleSelectChange = ({value, label}) => {
		this.setState({
			form: {
				target: value,
			}
		})
	}

	render() {
		let { qna: { posts } } = this.props;


		const item = posts.map( ({
			opened,
			author,
			title,
			created_at,
			numSupporters,
			likes,
			text,
			comments,
			content
		}, index) => (
			<div className="project-detail-qna-item" key={index} style={borderStyle}>
				<div>
					<img src={author.iconSrc} alt=""/>
					<span>{author.name}</span>
					<button>후원자 접근</button>
				</div>
				<div>
					<span>함께하고 있는 후원자: {numSupporters}명</span>
					<span>작성일: {date2string(created_at)}</span>
				</div>
				<div>
					{
						opened
							? <span>{text}</span>
							: <span>해당 글을 열람할 권한이 없습니다.</span>
					}
				</div>
				{ opened ? <PostComments comments={comments} postLikes={likes} /> : null }
			</div>
		))

		return (
			<div className="project-detail-qna">

				<div className="project-detail-qna-form">
					<textarea name="" id="" cols="30" rows="4" placeholder="공유를 하거나 직접 후원하고 글을 작성할 수 있습니다."></textarea>
					<div>
						<Select options={selectOptions} value={this.state.form.target} onChange={this.handleSelectChange} />
						<button>Post</button>
					</div>

				</div>

				{ item }

				<button>공유로 예술후원(열람하기)</button>
			</div>
		)
	}

}



export default QnA;
