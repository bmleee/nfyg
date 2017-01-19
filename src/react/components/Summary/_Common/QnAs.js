import React, { Component } from 'react'
import { Link } from 'react-router'

import renderComments from './lib/renderComments'

export default class QnAs extends Component {
  render() {
    const {
      qnas
    } = this.props

    return (
      <div className="post-container">
        {
          qnas.map(({
            _id,
            abstract:{
              likes,
              created_at,
            },
            comments,
            numComments,
            text,
          }, index) => {

            return (
              <div>
                <span>내용: {text}</span>
                <span>댓글 수: {comments.length}</span>
                <div>
                  <h3>댓글 시작</h3>
                  { renderComments(comments) }
                  <h3>댓글 끝</h3>
                </div>
                <button onClick={this.editQnAs(_id)}>수정</button>
                <button onClick={this.deleteQnAs(_id)}>삭제</button>
              </div>
            )
          })
        }
      </div>
    )
  }

  // TODO:
  deleteQnAs = (_id) => {
    return async () => {

    }
  }

  // TODO: open modal and ..
  editQnAs = (_id) => {
    return async () => {

    }
  }
}
