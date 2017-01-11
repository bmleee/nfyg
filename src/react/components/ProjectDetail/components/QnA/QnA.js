import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

import { createQnA, createCommentOnQnA } from '~/src/react/api/AppAPI'

import { PostComments } from '../Post/';

import { SelectOptions } from '../../../../constants'
import {date2string} from '~/src/react/lib/utils'
import Collapsible from 'react-collapsible';

const selectOptions = SelectOptions.QnA


// TODO: 입력 폼. 글만 올릴거 아닌데...
class QnA extends Component {

	state = {
		numProjects: 0,
		count: 5,
		windowSize: 5,
	}

	expandList = () => {
		this.setState({
			count: this.state.count + this.state.windowSize,
		})
	}

	_onClickAddQnA = async () => {
		let text = document.getElementById("qna_text").value
		let projectName = this.props.abstract.projectName
		await createQnA({text, projectName})
	}

	_onClickAddQnAComment = (index, _id) => {
		return async () => {
			let text = document.getElementById(`qna_${index}_comment`).value
			await createCommentOnQnA({text, qna_id: _id})
		}
	}

	componentDidMount() {
		this.setState({
			numProjects: this.props.qna.posts.length
		})
	}

	render() {
		console.log(this);
		let { qna: { posts } } = this.props;


		const item = posts.map( ({
			_id,
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
					<div className="qna-item-container">
					<p className="sharing-fb-icon-list">
					<img className="qna-form-user-icon" src={author.iconSrc} alt="" width={80} height={80}/>
					</p>
					<p className="sharing-summary">
					<span><p className="sharing-name">{author.name}</p>{date2string(created_at)}</span>
					<span className="qna-detail-text">{text}</span>

					{/* 대댓글 */}
						<div className="qna-item-container">
							{
								comments.map(({
									author,
									title,
									text,
									created_at,
								}, index) => (
									// div 로 한번 더 감쌌어요!
									<div>
										<p className="sharing-fb-icon-list">
											<img className="qna-form-user-icon" src={author.iconSrc} alt="" width={80} height={80}/>
										</p>
										<p className="sharing-summary">
											<span><p className="sharing-name">{author.name}</p>{date2string(created_at)}</span>
											<span>{text}</span>
										</p>
									</div>
								))
							}

						</div>

					<Collapsible trigger="댓글 남기기" transitionTime="0">
					<div className="project-detail-qna-form">
						<div className="qna-form-textarea-container">
						{/* <img className="qna-form-user-icon" src="/assets/images/user_default.png" alt="" width={80} height={80} /> */}
							<textarea className="qna-form-textarea" cols="30" rows="4" id={`qna_${index}_comment`} placeholder=""></textarea>
						</div>
						<div className="qna-form-submit-container">
							<button className="qna-form-submit" onClick={this._onClickAddQnAComment(index, _id)}>댓글 남기기</button>
						</div>
					</div>
					</Collapsible>
					{/* 대댓글 */}

					</p>
					</div>
			</div>
		))

		return (
			<div className="project-detail-qna">
				<div className="project-detail-qna-form">
					<div className="qna-form-textarea-container">
					<img className="qna-form-user-icon" src="/assets/images/user_default.png" alt="" width={80} height={80} />
					<textarea className="qna-form-textarea" name="" id="qna_text" cols="30" rows="4" placeholder="후원자 분들만 댓글을 남길 수 있습니다."></textarea>
					</div>
					<div className="qna-form-submit-container">
					<p className="qna-form-submit-empty"/>
					<button className="qna-form-submit" onClick={this._onClickAddQnA}>댓글 남기기</button>
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
