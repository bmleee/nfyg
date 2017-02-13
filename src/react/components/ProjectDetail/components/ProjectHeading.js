import React, { Component, PropTypes } from 'react';
import Progress from 'react-progressbar';
import { Link } from 'react-router'

import { format, resolve } from 'url'

import { getFullUrl } from '~/src/react/lib/utils'

import { FB_SHARER_URL } from '~/env'

import { TwitterButton, FacebookButton, FacebookCount } from "react-social";
import { shareProject } from '../../../api/AppAPI'
export default class ProjectHeading extends Component {

	render() {
		console.log('ProjectHeading', this);
		
		let {
			isLoggedIn,
			displayName,
			image,
		} = appUtils.getUser()
		
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
			numValidPurchases,
		} = this.props;
		
		const today = new Date();

		let remainingDays = ( new Date(dateTo).getTime() - today.getTime() ) / 1000 / 60 / 60 / 24

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
						<div className="project-supporters-num">공유후원 {indirectSupporters.length}명 | 리워드후원 {numValidPurchases}명</div>
						<Progress completed={Math.round(currentMoney / targetMoney * 100)} />
						<div className="project-heading-summary-money">
						<div className="project-heading-summary-percent">{Math.round(currentMoney / targetMoney * 100)}<span className="heading-summary-status">%</span></div>
						{
							Math.ceil(remainingDays) > 0
							?
							<div className="project-heading-summary-dday">D-{Math.ceil(remainingDays)}</div>
							:
							<div className="project-heading-summary-dday">마감</div>
						}
						{(currentMoney || 0).toLocaleString()}<span className="heading-summary-status">원</span></div>
					</div>
				</div>
				
				{	Math.ceil(remainingDays) > 0
					?
							isLoggedIn && (
							<button className="share-button" onClick={this.onClickShareFB}>페이스북 공유로 후원하기</button>
						)
					:
						<div></div>
				}
				{	Math.ceil(remainingDays) > 0
						?
							!isLoggedIn && (
						<Link to={`/login`}>			
						<button className="share-button">페이스북 공유로 후원하기</button>
						</Link>
						)
						:
						<div></div>
				}
			</div>

			)
	}

	onClickShareFB = async () => {
		const projectName = this.props.abstract.projectName
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
		},  async function(response) {
    	if (response && !response.error_message) {
	      try {
	      	const r = await shareProject(projectName, url)
	      	console.log('shareProject result', r)
	      } catch (e) {
	      	console.error(e)
	      }
	    } else {
	    	
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
