import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

import { PostComments } from '../Post/';

import { SelectOptions } from '../../../../constants'
import {date2string} from '~/src/react/lib/utils'

const selectOptions = SelectOptions.QnA


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
	
	constructor() {
		super(...arguments);

		this.state = {
			numProjects: 0,
			count: 5,
			windowSize: 5,
		}
	}
	
	expandList() {
		this.setState({
			count: this.state.count + this.state.windowSize,
		})
	}
	
	componentDidMount() {
		this.setState({
			numProjects: this.props.qna.posts.length
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
			<div className="project-detail-qna-item" key={index}>
					<p className="sharing-fb-icon-list">
					<img className="qna-form-user-icon" src={author.iconSrc} alt="" width={80} height={80}/>
					</p>
					<p className="sharing-summary">
					<span><p className="sharing-name">{author.name}</p>{date2string(created_at)}</span>
					<span>{text}</span>
					</p>
			</div>
		))

		return (
			<div className="project-detail-qna">
				<div className="project-detail-qna-form">
					<div className="qna-form-textarea-container">
					<img className="qna-form-user-icon" src="/assets/images/user_default.png" alt="" width={80} height={80} />
					<textarea className="qna-form-textarea" name="" id="" cols="30" rows="4" placeholder="후원자 분들만 댓글을 남길 수 있습니다."></textarea>
					</div>
					<div className="qna-form-submit-container">
					<p className="qna-form-submit-empty"/>
					<button className="qna-form-submit">댓글 남기기</button>
					</div>
				</div>
				<div>
					{ item.slice(0, this.state.count) }
				</div>
				<div>
					{
						this.state.numProjects > 5 && this.state.numProjects > this.state.count
							? <button className="post-more-button" onClick={this.expandList.bind(this)}>댓글 더보기(00개)</button>
							: null
					}	
				 </div>
			</div>
		)
	}

}



export default QnA;
