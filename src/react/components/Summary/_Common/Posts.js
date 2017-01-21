import React, { Component } from 'react'
import { Link } from 'react-router'

import renderComments from './lib/renderComments'

export default class Posts extends Component {
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
                <span className="summary-post-list-money">최소열람금액 : {thresholdMoney}</span>
                <div dangerouslySetInnerHTML={{ __html: content.html }}></div>
                {/*<span>댓글 수: {comments.length}</span>
                  <div>
                  <h3>댓글 시작</h3>
                  { renderComments(comments) }
                  <h3>댓글 끝</h3>
                </div> */}
                <div className="summary-post-button-container">
                <button className="summary-post-list-edit" onClick={this.editPost(_id)}>수정하기</button>
                <button className="summary-post-list-delete" onClick={this.deletePost(_id)}>삭제하기</button>
                </div>
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
