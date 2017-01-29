import React, { Component } from 'react'
import { Link } from 'react-router'

export default class UserSummary extends Component {
  render() {
    const {
      authorizedProjects // raw project model
    } = this.props

    return (
      <div className="authorized-project-container">
        {
          !!authorizedProjects
            ? authorizedProjects.map(({
              category,
              created_at,
              dateFrom,
              dateTo,
              imgSrc,
              shortTitle,
              projectName,
              state,
            }, index) => (
              <div className="authorized-project-item" key={index}>
                {/* TODO: correct summary url */}
                <Link to={`/projects/${projectName}`}>
                  <h4>{shortTitle}</h4>
                  <img src={imgSrc} alt=""/>
                  <span>시작일: {dateFrom}</span>
                  <span>종료일: {dateTo}</span>
                  <span>상태: {state}</span>
                  <span>카테고리: {category}</span>
                </Link>
              </div>
            ))
            : ''
        }
      </div>
    )
  }
}
