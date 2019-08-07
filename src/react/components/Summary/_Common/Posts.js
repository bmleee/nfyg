import React, { Component } from 'react'
import update from 'immutability-helper'
import { Link } from 'react-router'

import Modal from '~/src/react/components/react-awesome-modal';

import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import Editor from '~/src/react/components/DraftEditor/SevenEditor'

import renderComments from './lib/renderComments'

import {date2string} from '~/src/react/lib/utils'
import { createPost, fetchPost, updatePost, deletePost } from '~/src/react/api/AppAPI'

export default class Posts extends Component {
  state = {
			visible: false,
      post: {
        loaded: false,
        _id: '',
        title: '',
        content: {
          raw: {},
          html: ''
        },
        thresholdMoney: 0,
      },
		}

  openModal = () => {
	  this.setState({
			visible : true
		});
  }

  closeModal = () => {
		this.setState(update(this.state, {
			visible: { $set: false },
      post: {
        loaded: { $set: false },
        content: {
          raw: { $set: convertToRaw(EditorState.createEmpty().getCurrentContent()) }
        },
      }
		}));
  }

  render() {
    const {
      posts
    } = this.props

    // console.log(this);

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
                
                <div dangerouslySetInnerHTML={{ __html: content.html }}></div>
                {/*<span>댓글 수: {comments.length}</span>
                  <div>
                  <h3>댓글 시작</h3>
                  { renderComments(comments) }
                  <h3>댓글 끝</h3>
                </div> */}
                <div className="summary-post-button-container">
                <button className="summary-post-list-edit" onClick={this._onClickShowModal(_id)}>수정하기</button>
                <button className="summary-post-list-delete" onClick={this.deletePost(_id)}>삭제하기</button>
                </div>
              </div>
            )
          })
        }

        {
          this.state.post.loaded && (
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
                  </div>
                  <Editor
                    onChangeToRaw={this._onEditorChange}
                    raw={this.state.post.content.raw || convertToRaw(EditorState.createEmpty().getCurrentContent())}
                  />
                  <div className="modal-card-add-container">
                    <button className="modal-card-add" onClick={this._onClickEditPost}>수정하기</button>
                  </div>
                </div>

              </div>
            </Modal>
          )
        }
      </div>
    )
  }

  _onClickShowModal(post_id) {
    return async () => {
      try {
        let { post } = await fetchPost(post_id)



        this.setState(update(this.state, {
          visible: { $set: true },
          post: {
            loaded: { $set: true },
            _id: { $set: post._id },
            content: {
              raw: { $set: JSON.parse(post.contentRaw) }
            }
          },
        }))

        document.getElementById('post-title').value = post.title
        document.getElementById('post-threshold-money').value = post.thresholdMoney

        // console.log('fetched post', post);
        // console.log('state', this.state);



      } catch (e) {
        // console.error(e);
        alert(e.message)
      }
    }
  }

  client2server() {
    return {
      abstract: {
        title: document.getElementById('post-title').value,
        thresholdMoney: Number(document.getElementById('post-threshold-money').value),
      },
      content: {
        raw: JSON.stringify(this.state.post.content.raw),
        html: draftToHtml(this.state.post.content.raw),
      }
    }
  }

  _onEditorChange = (raw) => {
    this.setState(update(this.state, {
      post: {
        content: {
          raw: { $set: raw }
        }
      }
    }))
  }


  // TODO:
  deletePost = (post_id) => {
    return async () => {
      if(confirm('삭제하시겠습니까?')) {
        try {
          const { response } = await deletePost({ post_id })
          // console.log(response);
          alert('삭제했습니다.')
          this.props.reflashState()
        } catch (e) {
          // console.error(e);
          alert(e.message)
        }

      }
    }
  }

  _onClickEditPost = async () => {
    let post_id = this.state.post._id
    let body = this.client2server()

    try {
      let r = await updatePost({ post_id, body })
      this.props.reflashState()
      this.setState(update(this.state, {
        visible: { $set: false }
      }))
      // console.log(r);
    } catch (e) {
      // console.error(e);
    }

  }
}
