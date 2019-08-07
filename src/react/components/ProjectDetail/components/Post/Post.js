import React, { Component, PropTypes } from 'react';
import update from 'immutability-helper'

import Modal from '~/src/react/components/react-awesome-modal';

import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import Editor, { Viewer } from '~/src/react/components/DraftEditor/SevenEditor'

import {
	PostComments,
} from './';

import {date2string} from '~/src/react/lib/utils'
import { createPost, deletePost, } from '~/src/react/api/AppAPI'


class Post extends Component {

	state = {
		visible : false,
		postEditorRaw: convertToRaw(EditorState.createEmpty().getCurrentContent()),
	}

	constructor(props) {
    super(props);
  }

  openModal = () => {
	  this.setState({
			visible : true
		});
  }

  closeModal = () => {
		this.setState({
			visible : false,
			postEditorRaw: convertToRaw(EditorState.createEmpty().getCurrentContent()),
		});
  }

	_onClickAddPost = async () => {
		// await add new post
		try {
			let { abstract: { projectName } } = this.props
			let title = document.querySelector("#post-title").value
			let thresholdMoney = document.querySelector("#post-threshold-money").value
			let isDirectSupport = false // document.querySelector("#post-is-direct-support").checked
			let raw = convertToRaw(this.refs.editor.state.editorState.getCurrentContent())
			let content = {
				raw: JSON.stringify(raw),
				html: draftToHtml(raw),
			}

			if (!title) {
				alert('소식 제목을 입력하세요.')
				return
			} else if (content.length < 150) { // empty content...
				alert('소식 내용을 더 채워주세요.')
				return
			}

			let { response } = await createPost({projectName, title, content, thresholdMoney, isDirectSupport})
			this.props._newPost(response)
			this.setState({
				visible : false
			});
		} catch (e) {
			// console.error(e);
		}
	}

	_onClickDeletePost = (post_id) => {
		return async () => {
			try {
				const r = await deletePost({ post_id })
				// console.log('delete post ', r);
				this.props._deletePost(post_id)
			} catch (e) {
				// console.error(e);
			}
		}
	}

	render() {
		const {
			post: {
				heading: {iconSrc, description, intro},
				posts
			},
			user,
		} = this.props;
		
		const postgetuser = appUtils.getUser()
		const canEdit = appUtils.getUser().canEdit

		let condition1 = "전체공개";
		let condition2 = "후원자공개";
		
		console.log('posts', posts)
		
		const item = posts.map( ({
			_id,
			opened,
			author,
			title,
			created_at,
			created_at_new=date2string(created_at),
			numSupporters,
			likes,
			post,
			comments,
			content,
			thresholdMoney
		}, index) => (
			<div className="project-detail-post-item" key={index}>
				<div className="post-item-title-summary">
					<h3 className="post-item-title">{title}</h3>
					<span className="post-item-title-detail">{posts.length - index}번째 소식</span>
					<span className="post-item-title-detail">{created_at_new}</span>
					{
						thresholdMoney === 0
							? <span className="post-item-title-condition1">{condition1}</span>
							: <span className="post-item-title-condition2">{condition2}</span>
					}
				</div>
				<div className="post-item-content-summary">
					{
						opened || thresholdMoney === 0
							? <div dangerouslySetInnerHTML={{ __html: content }} ></div>
							: <div className="post-block">
									<div className="post-block-icon"></div>
									<p>프로젝트 공유 또는 리워드 구매를 통해</p>
									<p>후원해주신 분들만 열람 가능합니다.</p>
							  </div>
					}
				</div>
				{
					opened || thresholdMoney === 0
						? <PostComments
						 		comments={comments}
								postLikes={likes}
								user={user}
								post_id={_id}
								_newCommentOnPost={this.props._newCommentOnPost}
								_deleteCommentOnPost={this.props._deleteCommentOnPost}
							/>
						: null
				}
			</div>
		))

		return (
			<div className="project-detail-post">

				{ canEdit && <button className="update-post-modal-button" onClick={() => this.openModal()}>소식 작성하기</button> }
				<Modal className="card-add-modal" visible={this.state.visible} width="700" height="460px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
					<div className="card-add-modal-container">
						<button className="share-modal-close" onClick={() => this.closeModal()}/>
						<div>
							<div className="post-input-container">
								<div className="post-input-title-container">
									<p className="profile-small-title">제 목</p><input className="post-input-title" type="text" name="post-title" id="post-title"/>
								</div>
								<div className="post-input-number-container">
								<p className="profile-small-title">열람 가능 금액(0은 전체공개)</p><input className="post-input-number" type="number" name="post-threshold-money" id="post-threshold-money"/>
								</div>
								{/* 직접 후원자에게만 보여주는 Post...? */}
								{/* <span>직접 후원 전용</span><input type="checkbox" name="post-is-direct-support" id="post-is-direct-support" placeholder="직접 후원 전용"/> */}
							</div>
							<Editor
								onChangeToRaw={this._onEditorChange}
								raw={this.state.postEditorRaw}
								ref="editor"
							/>
							<div className="modal-card-add-container">
								<button className="modal-card-add" onClick={() => this._onClickAddPost()}>새소식 등록</button>
							</div>
						</div>

					</div>
				</Modal>

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
