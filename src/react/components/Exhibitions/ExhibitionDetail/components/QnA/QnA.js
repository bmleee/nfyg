'use strict'

import React, { Component, PropTypes } from 'react'
import Select from 'react-select'

import { PostComments } from '../Post/';

const borderStyle = { border: '1px solid gray' }


// TODO: 입력 폼. 글만 올릴거 아닌데...
class QnA extends Component {

	constructor() {
		super(...arguments);

		this.state = {
			form: {
				text: '', // value from textarea
				target: '', // to-all 모두에게, to-creator 창작자에게만
			}
		}
		this.handleTextChange			= this.handleTextChange.bind(this);
		this.handleSelectChange		= this.handleSelectChange.bind(this);
	}

	handleTextChange(e) {
		this.setState({
			form: {
				text: e.target.value,
			}
		})
	}

	handleSelectChange( {value, label} ) {
		this.setState({
			form: {
				target: value,
			}
		})
	}

	render() {
		console.log('QnA.context', this.context);
		let { qna: { selectOptions, posts } } = this.context;


		const items = posts.map( ({
			opened,
			author,
			title,
			created_at,
			numSupporters,
			likes,
			post,
			comments,
		}, index) => (
			<div className="project-detail-qna-item" key={index} style={borderStyle}>
				<div>
					<img src={author.iconSrc} alt=""/>
					<span>{author.name}</span>
					<button>후원자 접근</button>
				</div>
				<div>
					<span>함께하고 있는 후원자: {numSupporters}명</span>
					<span>작성일: {created_at}</span>
				</div>
				<div>
					{ post.map( ({type, content}, index) => (
						<div key={index}>
							{type}
							{content}
						</div>
					))}
				</div>
				<PostComments comments={comments} likes={likes} />
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

				{ items}

				<button>공유로 예술후원(열람하기)</button>
			</div>
		)
	}

}

QnA.contextTypes = {
	qna: PropTypes.shape({
		selectOptions: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})).isRequired,
		posts: PropTypes.arrayOf(PropTypes.shape({
			opened: PropTypes.bool.isRequired,
			author: PropTypes.shape({
				name: PropTypes.string.isRequired,
				iconSrc: PropTypes.string.isRequired,
			}).isRequired,
			title: PropTypes.string.isRequired,
			created_at: PropTypes.string.isRequired, // TODO: date type!
			numSupporters: PropTypes.number.isRequired,
			likes: PropTypes.number.isRequired,
			post: PropTypes.arrayOf(PropTypes.shape({
				type: PropTypes.string.isRequired,
				content: PropTypes.string.isRequired,
			})).isRequired,
			comments: PropTypes.arrayOf(PropTypes.shape({
				author: PropTypes.shape({
					name: PropTypes.string.isRequired,
					iconSrc: PropTypes.string.isRequired,
				}).isRequired,
				content: PropTypes.string.isRequired,
			})).isRequired,
		})).isRequired,

	}).isRequired,
}
export default QnA;
