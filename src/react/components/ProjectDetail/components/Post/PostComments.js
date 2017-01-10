import React, { Component, PropTypes } from 'react';
import {date2string} from '~/src/react/lib/utils'

class PostComments extends Component {

	state = {
		commentsOpend: false,
	}
	
	constructor() {
		super(...arguments);

		this.state = {
			numProjects: 0,
			count: 4,
			windowSize: 4,
		}
	}
	
	expandList() {
		this.setState({
			count: this.state.count + this.state.windowSize,
		})
	}
	
	componentDidMount() {
		this.setState({
			numProjects: this.props.comments.length
		})
	}

	render() {
		const {
			comments,
			postLikes,
		} = this.props;

		const item = comments.map( ({
			author: { name, iconSrc },
			numLikes,
			text
		}, index) => (
			<div className="project-detail-post-item-comments-item" key={index}>
				<div className="project-ranking-th">
					<p className="sharing-fb-icon-list">
					<img className="qna-form-user-icon" src={iconSrc} alt="" width={80} height={80}/>
					</p>
					<p className="sharing-summary">
					<span><p className="sharing-name">{name}</p></span>
					<span>{text}</span>
					</p>
				</div>
			</div>
		))


		return (
			<div className="project-detail-post-item-comments-container">
				<div className="project-detail-qna-form">
					<div className="qna-form-textarea-container">
					<img className="qna-form-user-icon" src="/assets/images/user_default.png" alt="" width={80} height={80} />
					<textarea className="qna-form-textarea" name="" id="" cols="30" rows="4" placeholder=""></textarea>
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
						this.state.numProjects > 4 && this.state.numProjects > this.state.count
							? <button className="post-more-button" onClick={this.expandList.bind(this)}>댓글 더보기(00개)</button>
							: null
					}	
				 </div>
			</div>
		)
	}

	_onClick() {
		this.setState({
			commentsOpend: !this.state.commentsOpend,
		});
	}
}

export default PostComments;
