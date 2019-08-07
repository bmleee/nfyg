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
                    <div className="present-project-list-item-caption-top">
                      <Link to={`/projects/${projectName}`}>
                        <h4>{shortTitle}</h4>
                      </Link>
                    </div>
                    <div className="present-project-list-item-caption-bottom">
                      <Link to={`/projects/${projectName}/summary`}>
                        <button className="my-project-detail-button">상세내역</button>
                      </Link>
                    </div>
                    {/*<Link to={`/projects/${projectName}/edit`}>
                      <button className="my-project-edit-button">수정하기</button>
                    </Link> */}
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
