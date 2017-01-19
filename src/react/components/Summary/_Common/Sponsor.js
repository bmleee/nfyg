import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Sponsor extends Component {
  render() {
    const {
      sponsor: {
        description,
        displayName,
        imgSrc,
        money,
        sponsorName,
        contacts: {
          blog,
          facebook,
          homepage
        }
      },
      isAdmin,
    } = this.props
    
    return (
      <div className="sponsor-container">
        <div>
          <img src={imgSrc} alt=""/>
          <span>스폰서 이름: {displayName}</span>
          <span>스폰서 설명: {description}</span>
          <span>후원액: {money}</span>
        </div>

        <div>
          <h4>연락처</h4>
          <span>블로그: {blog}</span>
          <span>페이스북: {facebook}</span>
          <span>홈페이지: {homepage}</span>
        </div>
      </div>
    )
  }
}
