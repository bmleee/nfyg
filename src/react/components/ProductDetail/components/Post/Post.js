import React, { Component, PropTypes } from 'react';
import { Viewer } from '~/src/react/components/DraftEditor/SevenEditor'
import {
	PostComments,
} from './';

import {date2string} from '~/src/react/lib/utils'
import Collapsible from 'react-collapsible';

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
				<div className="product-faq-container">
				<Collapsible trigger="제품 구매 이력은 어디서 확인할 수 있나요?" transitionTime="0" open="true">
    			 <p>-This is the collapsible content. It can be any element or React component you like.</p>
    			 <p>-This is the collapsible content. It can be any element or React component you like.</p>
    			</Collapsible>
    			<Collapsible trigger="배송지를 변경하고 싶습니다." transitionTime="0">
    			 <p>#This is the collapsible content. It can be any element or React component you like.</p>
    			 <p>#This is the collapsible content. It can be any element or React component you like.</p>
    			 <p>#This is the collapsible content. It can be any element or React component you like.</p>
    			</Collapsible>
    			<Collapsible trigger="언제 배송되나요?" transitionTime="0">
    			 <p>&This is the collapsible content. It can be any element or React component you like.</p>
    			 <p>&This is the collapsible content. It can be any element or React component you like.</p>
    			 <p>&This is the collapsible content. It can be any element or React component you like.</p>
    			 <p>&This is the collapsible content. It can be any element or React component you like.</p>
    			</Collapsible>
    			<Collapsible trigger="결제 취소가 가능한가요?" transitionTime="0">
    			 <p>&This is the collapsible content. It can be any element or React component you like.</p>
    			 <p>&This is the collapsible content. It can be any element or React component you like.</p>
    			 <p>&This is the collapsible content. It can be any element or React component you like.</p>
    			 <p>&This is the collapsible content. It can be any element or React component you like.</p>
    			</Collapsible>
    			<Collapsible trigger="옵션을 변경하고 싶습니다. 가능한가요?" transitionTime="0">
    			 <p>&This is the collapsible content. It can be any element or React component you like.</p>
    			 <p>&This is the collapsible content. It can be any element or React component you like.</p>
    			 <p>&This is the collapsible content. It can be any element or React component you like.</p>
    			 <p>&This is the collapsible content. It can be any element or React component you like.</p>
    			</Collapsible>
    			<Collapsible trigger="교환이나 반품/환불이 가능한가요?" transitionTime="0">
    			 <p>&This is the collapsible content. It can be any element or React component you like.</p>
    			 <p>&This is the collapsible content. It can be any element or React component you like.</p>
    			 <p>&This is the collapsible content. It can be any element or React component you like.</p>
    			 <p>&This is the collapsible content. It can be any element or React component you like.</p>
    			</Collapsible>
				</div>
			</div>
			)
	}

}

export default Post;
