import React, { Component } from 'react'
import { Link } from 'react-router'

import Modal from '~/src/react/components/react-awesome-modal';

import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import Editor, { Viewer } from '~/src/react/components/DraftEditor/SevenEditor'

import renderComments from './lib/renderComments'

import {date2string} from '~/src/react/lib/utils'
import { createPost } from '~/src/react/api/AppAPI'

export default class Posts extends Component {
  state = {
			visible: false
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
  
  render() {
    const {
      posts
    } = this.props

    return (
      <div className="post-container">
        {
          posts.map(({
            _id,
            abstract:{
              thresholdMoney,
              title,
              likes,
              created_at,
            },
            comments,
            content,
          }, index) => {

            return (
              <div className="summary-post-container" key={index}>
                <h3 className="summary-post-list-title">{title}</h3>
                <span className="summary-post-list-money">최소열람금액 : {thresholdMoney.toLocaleString()}원</span>
                <div dangerouslySetInnerHTML={{ __html: content.html }}></div>
                {/*<span>댓글 수: {comments.length}</span>
                  <div>
                  <h3>댓글 시작</h3>
                  { renderComments(comments) }
                  <h3>댓글 끝</h3>
                </div> */}
                <div className="summary-post-button-container">
                <button className="summary-post-list-edit" onClick={() => this.openModal()}>수정하기</button>
                <button className="summary-post-list-delete" onClick={this.deletePost(_id)}>삭제하기</button>
                </div>
                
                <Modal className="card-add-modal" visible={this.state.visible} width="700" height="460px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
        					<div className="card-add-modal-container">
        						<button className="share-modal-close" onClick={() => this.closeModal()}/>
        						<div>
        							<div className="post-input-container">
        								<div className="post-input-title-container">
        								<p className="profile-small-title">제 목</p><input className="post-input-title" type="text" name="post-title" id="post-title"/>
        								</div>
        								<div className="post-input-number-container">
        								<p className="profile-small-title">열람 가능 금액(0 또는 공란은 전체공개)</p><input className="post-input-number" type="number" name="post-threshold-money" id="post-threshold-money"/>
        								</div>
        								{/* 직접 후원자에게만 보여주는 Post...? */}
        								{/* <span>직접 후원 전용</span><input type="checkbox" name="post-is-direct-support" id="post-is-direct-support" placeholder="직접 후원 전용"/> */}
        							</div>
        							{/* <Editor
        								onChangeToRaw={this._onEditorChange}
        								raw={this.state.postEditorRaw}
        								ref="editor"
        							/> */}
        							<div className="modal-card-add-container">
        								<button className="modal-card-add" onClick={() => this.closeModal()}>수정하기</button>
        							</div>
        						</div>
        
        					</div>
        				</Modal>
        				
              </div>
            )
          })
        }
      </div>
    )
  }

  // TODO:
  deletePost = (_id) => {
    return async () => {

    }
  }

  // TODO: open modal and ..
  editPost = (_id) => {
    return async () => {

    }
  }
}
