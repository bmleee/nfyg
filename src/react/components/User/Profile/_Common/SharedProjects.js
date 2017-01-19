import React, { Component } from 'react'
import { Link } from 'react-router'

export default class SharedProjects extends Component {
  render() {
    const {
      sharedProjects // raw project model
    } = this.props

    return (
      <div className="authorized-project-container">
        {
          !!sharedProjects
            ? sharedProjects.map(({
              category,
              created_at,
              dateFrom,
              dateTo,
              imgSrc,
              shortTitle,
              projectName,
              state,
            }, index) => (
              <div className="purchase-list-item" key={index}>
                <div className="purchase-list-item-margin">
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
                    </div>
                     
                      {/* <span>시작일: {dateFrom}</span>
                      <span>종료일: {dateTo}</span>
                      <span>상태: {state}</span>
                      <span>카테고리: {category}</span> */}
              
                  </div>
              </div>
            ))
            : ''
        }
      </div>
    )
  }
}
