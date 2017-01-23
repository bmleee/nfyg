import React, { Component } from 'react'

export default class Search extends Component {
    
    render() {
        return (
            <div className="search-container">
                <span className="search-for-keyword">00에 대한 검색결과...</span>
                <div className="search-item-container">
                    <div className="search-image-container">
                        <div className="search-image-centered">
                            <img className="search-image" src="http://52.78.180.103:8080/assets/images/present-project-list-thumbnail.jpg"/>
                        </div>
                    </div>
                    <div className="search-summary-container">
                        <h4 className="search-element-category">PROJECT</h4>
                        <h4 className="search-element-title">프로젝트 제목</h4>
                        <p className="search-element-description">프로젝트 설명</p>
                    </div>
                </div>
                <div className="search-item-container">
                    <div className="search-image-container">
                        <div className="search-image-centered">
                            <img className="search-image" src="http://52.78.180.103:8080/assets/images/present-project-list-thumbnail.jpg"/>
                        </div>
                    </div>
                    <div className="search-summary-container">
                        <h4 className="search-element-category">PRODUCT</h4>
                        <h4 className="search-element-title">미술소품 제목</h4>
                        <p className="search-element-description">미술소품 설명</p>
                    </div>
                </div>
                <div className="search-item-container">
                    <div className="search-image-container">
                        <div className="search-image-centered">
                            <img className="search-image" src="http://52.78.180.103:8080/assets/images/present-project-list-thumbnail.jpg"/>
                        </div>
                    </div>
                    <div className="search-summary-container">
                        <h4 className="search-element-category">MAGAZINE</h4>
                        <h4 className="search-element-title">매거진 제목</h4>
                        <p className="search-element-description">매거진 설명</p>
                    </div>
                </div>
                <div className="search-item-container">
                    <div className="search-image-container">
                        <div className="search-image-centered">
                            <img className="search-image" src="http://52.78.180.103:8080/assets/images/present-project-list-thumbnail.jpg"/>
                        </div>
                    </div>
                    <div className="search-summary-container">
                        <h4 className="search-element-category">PROJECT</h4>
                        <h4 className="search-element-title">프로젝트 제목</h4>
                        <p className="search-element-description">프로젝트 설명</p>
                    </div>
                </div>
            </div>
        )
    }
}