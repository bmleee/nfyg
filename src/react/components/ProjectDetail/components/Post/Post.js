import React, { Component, PropTypes } from 'react';
import { Viewer } from '~/src/react/components/DraftEditor/SevenEditor'
import {
	PostComments,
} from './';

import {date2string} from '~/src/react/lib/utils'

import Modal from '~/src/react/components/react-awesome-modal';

class Post extends Component {
	
	constructor(props) {
    super(props);
    this.state = {
        visible : false
    	}
    }

    openModal() {
    this.setState({
        visible : true
    	});
    }

    closeModal() {
     this.setState({
        visible : false
    	});
    }
	
	render() {
		const {
			post: {
				heading: {iconSrc, description, intro},
				posts
			},
		} = this.props;
		
		let title = "포스트 제목 예시";
		let condition1 = "전체공개";
		let condition2 = "후원자공개";
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
					<span className="post-item-title-detail">{postnum}번째 소식</span>
					<span className="post-item-title-detail">{date2string(created_at)}</span>
					<span className="post-item-title-condition1">{condition1}</span> 
					{/* <span className="post-item-title-condition2">{condition2}</span> */}
				</div>
				<div className="post-item-content-summary">
					{
						opened
							? <Viewer raw={content}/>
							: <div className="post-block">
								<div className="post-block-icon"></div>
								<p>프로젝트 공유 또는 리워드 구매를 통해</p>
								<p>후원해주신 분들만 열람 가능합니다.</p>
							  </div>
					}
				</div>
				{ opened ? <PostComments comments={comments} postLikes={likes} /> : null }
			</div>
		))

		return (
			<div className="project-detail-post">
				
				{/* 권한이 있는 유저만 보이는 소식 작성 버튼/모달
				
				<button className="update-post-modal-button" onClick={() => this.openModal()}>소식 작성하기</button>
				
				<Modal className="card-add-modal" visible={this.state.visible} width="420" height="460px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
					<div className="card-add-modal-container">
						<button className="share-modal-close" onClick={() => this.closeModal()}/>
						<div>
							<p className="profile-small-title">소식 작성하기</p>
							<textarea className="upate-post-textarea"/>
						</div>
						<div className="modal-card-add-container">
							<button className="modal-card-add" onClick={() => this.closeModal()}>새소식 등록</button>
						</div>
					</div>
				</Modal>
				
				권한이 있는 유저만 보이는 소식 작성 버튼/모달 */}
			
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
