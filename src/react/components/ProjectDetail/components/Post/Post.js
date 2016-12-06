import React, { Component, PropTypes } from 'react';
import {date2string} from '~/src/react/lib/utils'
import {
	PostComments,
} from './';

const borderStyle = { border: '1px solid gray' }

class Post extends Component {

	render() {
		const { post: { heading, creator, posts, comments, } } = this.props;

		const item = posts.map( ({
			opened,
			author,
			title,
			created_at,
			numSupporters,
			likes,
			post,
			comments,
		}, index) => (
			<div className="project-detail-post-item" key={index} style={borderStyle}>
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
			<div className="project-detail-post">
				<div className="project-detail-post-heading" style={borderStyle}>
					<img src={heading.iconSrc} alt=""/>
					<span>{heading.description}</span>
					<button>열람 신청하기</button>
				</div>
				<div className="project-detail-post-container">
					{ item }
				</div>
				<button>공유로 예술후원 (열람하기)​</button>
			</div>
			)
	}

}

export default Post;
