import React, { Component } from 'react'
import { Link } from 'react-router'

export default class AuthorizedProjects extends Component {
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
                <div className="authorized-project-item-margin">
                  {/* TODO: correct summary url */}
                  <Link to={`/projects/${projectName}`}>
                  <div className="pr-thumbnail">
  								  <div className="ex-centered">  
                      <img className="home-exhibition-image" src={imgSrc} alt=""/>
                    </div>
                  </div>
                  </Link>
                  <div className="present-project-list-item-caption">
                    <Link to={`/projects/${projectName}`}>
                      <h4>{shortTitle}</h4>
                    </Link>
                    <Link to={`/projects/${projectName}/detail`}>
                      <button className="my-project-detail-button">후원자명단</button>
                    </Link>
                    <Link to={`/projects/${projectName}/edit`}>
                      <button className="my-project-edit-button">수정하기</button>
                    </Link>
                    {/* <span>시작일: {dateFrom}</span>
                      <span>종료일: {dateTo}</span>
                      <span>상태: {state}</span>
                      <span>카테고리: {category}</span> */}
                  </div>
                </div>
              </div>
            ))
            : ''
        }
      </div>
    )
  }
}
