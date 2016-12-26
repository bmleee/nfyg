import React, { Component, PropTypes } from 'react';
import { Viewer } from '~/src/react/components/DraftEditor/SevenEditor'
import {
	PostComments,
} from './';

import {date2string} from '~/src/react/lib/utils'

class Post extends Component {

	render() {
		const {
			post: {
				heading: {iconSrc, description, intro},
				posts
			},
		} = this.props;

		console.log('Post', this);

		const item = posts.map( ({
			opened,
			author,
			title,
			created_at,
			numSupporters,
			likes,
			post,
			comments,
			content
		}, index) => (
			<div className="project-detail-post-item" key={index}>
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
							? <Viewer raw={content}/>
							: <span>해당 소식을 열람할 권한이 없습니다.</span>
					}
				</div>
				{ opened ? <PostComments comments={comments} postLikes={likes} /> : null }
			</div>
		))

		return (
			<div className="project-detail-post">
				
				{/* 
				<div className="project-detail-post-heading">
					<img src={iconSrc} alt=""/>
					<span>{description}</span>
					<span>{intro}</span>
					<button>열람 신청하기</button>
				</div>
				*/}
				<div className="project-detail-post-container">
					{ item }
				</div>
			</div>
			)
	}

}

export default Post;
