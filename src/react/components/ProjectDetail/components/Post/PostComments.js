import React, { Component, PropTypes } from 'react';
import update from 'immutability-helper'

import { createCommentOnPost } from '~/src/react/api/AppAPI'
import { date2string, newLinedString, } from '~/src/react/lib/utils'

class PostComments extends Component {

	state = {
		commentsOpend: false,
		numProjects: 0,
		count: 4,
		windowSize: 4,
	}

	expandList = () => {
		this.setState({
			count: this.state.count + this.state.windowSize,
		})
	}

	_onClickAddComment = async () => {
		try {
			const post_id = this.props.post_id
			const text = document.querySelector(`#post-${post_id}-text`).value

			if (!text) {
				alert('댓글을 입력해 주세요')
				return
			}

			const { response } = await createCommentOnPost({text, post_id})
			this.props._newCommentOnPost(post_id, response)
			document.querySelector(`#post-${post_id}-text`).value = ''
		} catch (e) {
			console.error(e);
		}
	}


	shouldComponentUpdate(nextProps, nextState) {
		let preComments = this.props.comments
		let nextComments = nextProps.comments

		return JSON.stringify(preComments) !== JSON.stringify(nextComments)
	}


	componentDidMount() {
		this.setState(update(this.state, {
			numProjects: { $set: this.props.comments.length },
		}))
	}

	render() {
		const {
			post_id,
			comments,
			postLikes,
			user: {
				isLoggedIn,
				isAuthorized,
				canEdit,
				displayName,
				image
			}
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
					<span>
						<p className="sharing-name">{name}</p>
						{/* to do 자기가 쓴 댓글만 삭제하기 */}
						<button className="comment-delete-button"/>
					</span>
					<span>{newLinedString(text)}</span>
					</p>
				</div>
			</div>
		))


		return (
			<div className="project-detail-post-item-comments-container">
				<div className="project-detail-qna-form">
					<div className="qna-form-textarea-container">
						<img className="qna-form-user-icon" src={image || '/assets/images/user_default.png'} alt="" width={80} height={80} />
						<textarea className="qna-form-textarea" name="" id={`post-${post_id}-text`} cols="30" rows="4" placeholder={isLoggedIn ? '댓글을 남겨주세요.' : '로그인 하시면 댓글을 남기실 수 있습니다.'} readonly={isLoggedIn} />
					</div>
					<div className="qna-form-submit-container">
					<p className="qna-form-submit-empty"/>
						<button className="qna-form-submit" disabled={!isLoggedIn} onClick={this._onClickAddComment}>댓글 남기기</button>
					</div>
				</div>
				<div>
					{ item }
				</div>
			</div>
		)
	}

	_showComments = () => {
		this.setState({
			commentsOpend: !this.state.commentsOpend,
		});
	}

}

export default PostComments;
