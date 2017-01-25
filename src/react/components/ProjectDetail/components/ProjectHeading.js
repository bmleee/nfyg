import React, { Component, PropTypes } from 'react';
import Progress from 'react-progressbar';

import { format, resolve } from 'url'

import { getFullUrl } from '~/src/react/lib/utils'

import { FB_SHARER_URL } from '~/env'

import { TwitterButton, FacebookButton, FacebookCount } from "react-social";

export default class ProjectHeading extends Component {

	render() {
		console.log('ProjectHeading', this);
		const {
			abstract: {
				longTitle,
				shortTitle,
				imgSrc,
				category,
				postIntro,
			},

			creator: {
				creatorName,
				creatorImgSrc,
			},

			sponsor: {
				sponsorDisplayName,
				sponsorLogoSrc,
			},

			funding: {
				currentMoney,
				targetMoney,
				dateFrom,
				dateTo,
			},

			summary: {
				likes,
				shares,
				comments,
				recent3Users,
			},

			directSupporters,
			indirectSupporters,

			relatedContents,
		} = this.props;


		let remainingDays = ( new Date(dateTo).getTime() - new Date(dateFrom).getTime() ) / 1000 / 60 / 60 / 24

		const sharingInfo = (recent3Users || []).map( (fbId, index) => (
			<img className="sharing-fb-icon" key={index} width={32} height={32} src={`https://graph.facebook.com/${fbId}/picture`} scale="0"/>
		) )

		let infoBackground = {
			backgroundImage: `url("${imgSrc}")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
		
		const url = document.URL;
		const url2 = 'http://jwchoi85.tistory.com/165'

		/**
		 * Issue
		 * 	- 사진을 background image 혹은 img 태그로 삽입...
		 */
		return (
			<div className="project-detail-heading">
				<div className="project-detail-info" style={infoBackground}>
					<div className="project-info">
						<div className="project-sponsor-name">
							{/* <img src={sponsorLogoSrc} width={32} height={32} alt=""/>  */}
							{sponsorDisplayName}
						</div>
						<h1 className="project-title">{longTitle}</h1>
						<div className="project-info-bottom">
							{/* <div className="project-sharing-icon">
								<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/likes.png" scale="0" />
								{ likes }
								<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/comment.png" scale="0" />
								{ comments }
								<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/share.png" scale="0" />
								{ shares }
							</div>
							<div className="project-sharing-info">
								{sharingInfo} 외 {numIndirectSupports}명이 공유로 후원함
							</div> */}
							<p>
								<div className="project-current-money">
								</div>
							</p>
						</div>
						<div className="project-supporters-num">공유후원 {indirectSupporters.length}명 | 리워드후원 {directSupporters.length}명</div>
						<Progress completed={Math.round(currentMoney / targetMoney * 100)} />
						<div className="project-heading-summary-money">
						<div className="project-heading-summary-percent">{Math.round(currentMoney / targetMoney * 100)}<span className="heading-summary-status">%</span></div>
						<div className="project-heading-summary-dday">D-{remainingDays}<span className="heading-summary-status"></span></div>
						{(currentMoney || 0).toLocaleString()}<span className="heading-summary-status">원</span></div>
					</div>
				</div>
				
				{/*
				<FacebookButton sharer='true' media={`http://52.78.180.103:8080${imgSrc}`} appId='361812380855194' message={postIntro} url={url} className="share-button">
				
				페이스북 공유로 후원하기
				<FacebookCount url={url}/> 
				
				</FacebookButton> */}
				
				<button className="share-button" onClick={this.onClickShareFB}>페이스북 공유로 후원하기</button>
			</div>

			)
	}

	async onClickShareFB() {
		// let share_url = window.location.host + window.location.pathname
		// let share_url = '7pictures.co.kr/campaigns/m-art/'
		// let url = format({ host: FB_SHARER_URL, query: {u: share_url} })
		//
		// window.open(url, '_blank', 'width=500, height=300')


		 let url = getFullUrl()
		// let url2 = 'http://7pictures.co.kr'

		// console.log('url', url2);
		
		FB.ui({
			method: 'share',
			display: 'popup',
			href: url,
			quote: 'quotequotequote',
		},  function(response) {
    	if (response && !response.error_message) {
	      alert('Posting completed.');
	    } else {
	      alert('Error while posting.');
			}
		})
	}

// 	FB.ui(
//  {
//   method: 'share',
//   href: 'https://developers.facebook.com/docs/'
// }, function(response){
// console.log(response)
// });



}
