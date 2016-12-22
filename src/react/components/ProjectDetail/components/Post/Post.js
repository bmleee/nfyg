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
		
		let title = "포스트 제목 예시";
		let condition = "전체공개";
		let postnum = 4;

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
				<div className="post-item-title-summary">
					<h3 className="post-item-title">{title}</h3>
					<span className="post-item-title-detail">{postnum}번째 업데이트</span>
					<span className="post-item-title-detail">{date2string(created_at)}</span>
					<span className="post-item-title-detail">{condition}</span>
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
				<div className="project-detail-post-heading" style={borderStyle}>
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
