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
              <div key={index}>
                <span>제목: {title}</span>
                <span>후원금: {thresholdMoney}</span>
                <div dangerouslySetInnerHTML={{ __html: content.html }}></div>
                <span>댓글 수: {comments.length}</span>
                <div>
                  <h3>댓글 시작</h3>
                  { renderComments(comments) }
                  <h3>댓글 끝</h3>
                </div>
                <button onClick={this.editPost(_id)}>수정</button>
                <button onClick={this.deletePost(_id)}>삭제</button>
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
