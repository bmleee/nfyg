import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Abstract extends Component {
  render() {
    const {
      abstract: {
        category,
        created_at,
        imgSrc,
        longTitle,
        shortTitle,
        state,
        updated_at
      },
    } = this.props
    return (
      <div>
        <img src={imgSrc} alt=""/>
        <span>{longTitle}</span>
        <span>{shortTitle}</span>
        <span>상태: {state}</span>
        <span>카테고리: {category}</span>
      </div>
    )
  }
}
