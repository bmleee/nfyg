import React, { Component, PropTypes } from 'react';

const borderStyle = {
	border: '1px solid gray'
}


class PostComments extends Component {

	state = {
		commentsOpend: false,
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
				<div>
					<img src={iconSrc} alt=""/>
					{name}
				</div>
				<span>{text}</span>
			</div>
		))


		return (
			<div className="project-detail-post-item-comments-container" style={borderStyle}>
				<div>
				 	<button onClick={this._onClick.bind(this)}>댓글 {comments.length}개</button>
					<span>좋아요 {postLikes}개</span>
				</div>
				{ this.state.commentsOpend ? item : null }
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
