import React, { Component, PropTypes } from 'react';

const borderStyle = {
	border: '1px solid gray'
}


class PostComments extends Component {

	constructor() {
		super(...arguments);

		this.state = {
			commentsOpend: false,
		};
	}

	_onClick() {
		this.setState({
			commentsOpend: !this.state.commentsOpend,
		});
	}

	render() {
		const { comments, likes } = this.props;
		const item = comments.map( ( {author: {name, iconSrc}, content}, index) => (
			<div className="project-detail-post-item-comments-item" key={index}>
				<div>
					<img src={iconSrc} alt=""/>
					{name}
				</div>
				{content}
			</div>
		))

		return (
			<div className="project-detail-post-item-comments-container" style={borderStyle}>
				<div>
				 	<button onClick={this._onClick.bind(this)}>댓글 {comments.length}개</button>
					<span>좋아요 {likes}개</span>
				</div>
				{ this.state.commentsOpend ? item : null }
			</div>
		)
	}
}

PostComments.propTypes = {
	comments: PropTypes.arrayOf(
		PropTypes.shape({
			author: PropTypes.shape({
				name: PropTypes.string.isRequired,
				iconSrc: PropTypes.string.isRequired,
			}).isRequired,
			content: PropTypes.string.isRequired,
		})
	).isRequired,
	likes: PropTypes.number.isRequired,
}

export default PostComments;
