import React, { Component, PropTypes } from 'react';
import Progress from 'react-progressbar';
import { Link } from 'react-router'

import Modal from '~/src/react/components/react-awesome-modal';
import FontAwesome from 'react-fontawesome'
import KakaoImage from '~/src/assets/images/kakaotalk.svg'

import update from 'immutability-helper'
import SweetAlert from 'sweetalert-react';

import { TwitterButton, FacebookButton, FacebookCount } from "react-social";
import CopyToClipboard from 'react-copy-to-clipboard';

import { format, resolve } from 'url'

import { getFullUrl } from '~/src/react/lib/utils'

import { fetchCotentSummary, fetchSummary, processPurchase, likeProjectProduct, Deletelike, fetchlike } from '~/src/react/api/AppAPI'

import { FB_SHARER_URL } from '~/env'

import {
  Abstract,
  AuthorizedUsers,
  Creator,
  Funding,
  Posts,
  QnAs,
  SharingInfo,
  PurchaseInfo,
  Sponsor
} from '../../Summary/_Common'

import { shareProject } from '../../../api/AppAPI'
export default class ProjectHeading extends Component {
 state = {
 	visible: false,
 	show: false,
    project_summary: {
      abstract: null,
      authorizedUsers: null,
      creator: null,
      funding: null,
      posts: null,
      qnas: null,
      sharing_info: null,
      project_purchase_info: null,
      sponsor: null,
    },
    project : [],
    like_error : ''
  }
  
	like = async () => {
	    try {
	    	let r = await likeProjectProduct({
	    		like_state : 'like'
	    	})
	    	this.setState({
	        	like_error : ''
	    	});
	    	await this._reflashLikes()
	    }
	    catch (e) {
	    	this.setState({
	        	like_error : '로그인 후 좋아요를 눌러주세요!',
	        	show: true,
	    	});
	    }
	  }
	  
	  unlike = (like_id) => {
	  	return async () => {
		    try {
				const r = await Deletelike(like_id)
				//console.log('delete like response', r);
				await this._reflashLikes()
			} catch (e) {
				//console.error('delete like error', e);
			} finally {

			}
		}
	  }
  
		openModal() {
	    this.setState({
	        visible : true
	    });
	  }

	  closeModal = () => {
		this.setState(update(this.state, {
			visible: { $set: false },
			show: { $set: false }
		}))
	}

	  onCopy() {
		this.setState({
			visible : false,
			copied: true,
	    });
	  }
  
  async componentDidMount() {
    try {
      const {
        data: {
          project_summary
        }
      } = await fetchCotentSummary({ projectName: this.props.abstract.projectName })

      this.setState({ project_summary })
      
      await this._reflashLikes()
    } catch (e) {
    	// console.error('projectheading-purchasedinfo-error');
      // console.error(e);
    }
    
    const {
				abstract: {
					imgSrc,
					shortTitle
				},
			} = this.props;
	
	
			const imgSrcUrl = `${window.location.protocol}//${window.location.host}${imgSrc}`
			const imgSrcUrl2 = encodeURI(imgSrcUrl)
			
			const url = document.URL;
			
			Kakao.init('0aad64ae5f685fcf0be27e3e654f8ef6');
    
  }
	
	render() {
		// console.log('ProjectHeading', this);
		
		let {
			isLoggedIn,
			displayName,
			image,
			fb_id,
		} = appUtils.getUser()
		
		 const {
	      project_summary: {
	        abstract,
	        authorizedUsers,
	        creator,
	        funding,
	        posts,
	        qnas,
	        sharing_info,
	        project_purchase_info,
	        sponsor
	      },
	      project,
	      like_error,
	    } = this.state
	    
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
			subValidPurchases,
			
			numIndirectSupports,
		} = this.props;
		
		console.log('currentMoney', currentMoney);
		
		// console.log('user.fb_id', this.props.user.fb_id)
		
		var already_indirect = new Array;
	    for(var i in indirectSupporters) {
	    	already_indirect.push(Number(indirectSupporters[i].fbId))
	    }
	    // console.log('already_indirect', already_indirect);
	    
	    var currentUser_fbid = Number(this.props.user.fb_id);
		var match_indirect_support = already_indirect.indexOf( currentUser_fbid )
		// console.log('match_indirect_support', match_indirect_support);
		
		 var DirectMoneySum = 0;
		 for(var idx in project_purchase_info && project_purchase_info.purchases){
			DirectMoneySum += Number(project_purchase_info && project_purchase_info.purchases[idx].purchase_info.amount);
		} 
		
		// console.log('DirectMoneySum', DirectMoneySum);
		
		const today = new Date();

		let remainingDays = ((new Date(dateTo).getTime() + 86400000) - today.getTime() ) / 1000 / 60 / 60 / 24

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
		
		let project_like_user = this.state.project.like
		let project_like_num = this.state.project.like_num

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
						<div className="project-supporters-num">공유후원 {numIndirectSupports}명 | 리워드후원 {numValidPurchases + subValidPurchases}명</div>
						<Progress completed={Math.ceil((currentMoney+DirectMoneySum) / targetMoney * 100)} />
						<div className="project-heading-summary-money">
						<div className="project-heading-summary-percent">{Math.ceil((currentMoney+DirectMoneySum) / targetMoney * 100)}<span className="heading-summary-status">%</span></div>
						{
							Math.ceil(remainingDays) > 0
							?
							<div className="project-heading-summary-dday">D-{Math.ceil(remainingDays)}</div>
							:
							<div className="project-heading-summary-dday">마감</div>
						}
						{((currentMoney+DirectMoneySum) || 0).toLocaleString()}<span className="heading-summary-status">원</span></div>
						
						{ !project_like_user  ?
						<div className="project-likes-container">
							<button className="project-likes-button" onClick={() => this.like()}>{project_like_num && project_like_num.length}명</button>
						</div>
						:
						<div className="project-likes-container">
							<button className="project-unlikes-button" onClick={this.unlike(project_like_user._id)}>{project_like_num && project_like_num.length}명</button>
						</div>
						}
						
						<SweetAlert
				          show={this.state.show}
				          title=""
				          text={like_error}
				          onConfirm={this.closeModal}
				          confirmButtonText="확 인"
				        />
						
					</div>
				</div>
				
				{	Math.ceil(remainingDays) > 0
					?
						isLoggedIn && (
							match_indirect_support == -1 ?
							<button className="share-button" onClick={this.onClickShareFB}>페이스북 공유로 후원하기</button>
							:
							<button className="share-button-already">이미 공유한 프로젝트 입니다</button>
						)
					:	<div className="share-button">
					<button className="end-date-share-modal" onClick={() => this.openModal()} />
					<Modal className="share-modal" visible={this.state.visible} width="355" height="130px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
					<div className="share-modal-close-container">
					<button className="share-modal-close" onClick={() => this.closeModal()}/>
					</div>
					<div className="share-modal-button-container">
						
						{/*
						<FacebookButton sharer='true' media={`http://52.78.133.247:8080${imgSrc}`} appId='244902342546199' message={shortTitle} url={url} className="ma-share-button-facebook">
						<FontAwesome name='facebook' size='lg' />
						</FacebookButton>
						*/}
						
						<button className="ma-share-button-facebook" onClick={this.onClickShareFB}>
						<FontAwesome name='facebook' size='lg' />
						</button>

						<TwitterButton message={shortTitle} url={url} className="ma-share-button-twitter">
						<FontAwesome name='twitter' size='lg' />
						</TwitterButton>

						<button id="kakao-link-btn" onClick={() => this.sendkakaolink()} className="ma-share-button-kakao"><KakaoImage className="ma-kakao-icon" width={36} height={36} /></button>

						<CopyToClipboard text={url} onCopy={() => {
							this.setState({copied: true, visible:false});
							appUtils.setFlash({title: '', message: '클립보드에 복사되었습니다.', level: 'success', autoDismiss: 2, dismissible: true})
						}}>
						<button className="ma-share-button-url"><FontAwesome name='link' size='lg' /></button>
						</CopyToClipboard>

					</div>
					</Modal>
				  </div>
				}
				{	Math.ceil(remainingDays) > 0
						?
							!isLoggedIn && (
						<Link to={`/login`}>			
						<button className="share-button">페이스북 공유로 후원하기</button>
						</Link>
						)
						:	<div className="share-button">
					<button className="end-date-share-modal" onClick={() => this.openModal()} />
					<Modal className="share-modal" visible={this.state.visible} width="355" height="130px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
					<div className="share-modal-close-container">
					<button className="share-modal-close" onClick={() => this.closeModal()}/>
					</div>
					<div className="share-modal-button-container">
						
						{/*
						<FacebookButton sharer='true' media={`http://52.78.133.247:8080${imgSrc}`} appId='244902342546199' message={shortTitle} url={url} className="ma-share-button-facebook">
						<FontAwesome name='facebook' size='lg' />
						</FacebookButton>
						*/}
						
						<button className="ma-share-button-facebook" onClick={this.onClickShareFB}>
						<FontAwesome name='facebook' size='lg' />
						</button>

						<TwitterButton message={shortTitle} url={url} className="ma-share-button-twitter">
						<FontAwesome name='twitter' size='lg' />
						</TwitterButton>

						<button id="kakao-link-btn" onClick={() => this.sendkakaolink()} className="ma-share-button-kakao"><KakaoImage className="ma-kakao-icon" width={36} height={36} /></button>

						<CopyToClipboard text={url} onCopy={() => {
							this.setState({copied: true, visible:false});
							appUtils.setFlash({title: '', message: '클립보드에 복사되었습니다.', level: 'success', autoDismiss: 2, dismissible: true})
						}}>
						<button className="ma-share-button-url"><FontAwesome name='link' size='lg' /></button>
						</CopyToClipboard>

					</div>
					</Modal>
				  </div>
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

		// // console.log('url', url2);

		FB.ui({
			method: 'share',
			display: 'popup',
			href: url,
		},  async function(response) {
    	if (response && !response.error_message) {
	      try {
	      	const r = await shareProject(projectName, url)
	      	// console.log('shareProject result', r)
	      } catch (e) {
	      	// console.error(e)
	      }
	    } else {
	    	
			}
		})
	}
	
	sendkakaolink() {
		const {
				abstract: {
					imgSrc,
					shortTitle,
					postIntro
				},
			} = this.props;
	
	
			const imgSrcUrl = `${window.location.protocol}//${window.location.host}${imgSrc}`
			const imgSrcUrl2 = encodeURI(imgSrcUrl)
			
			const url = document.URL;
		
		Kakao.Link.sendDefault({
		  // container : '#kakao-link-btn',
		  objectType: 'feed',
		  content: {
	        title: shortTitle,
	        description: postIntro,
	        imageUrl: imgSrcUrl2,
	        link: {
	          mobileWebUrl: url,
	          webUrl: url
	        }
	      },
	      buttons: [
	        {
	          title: '자세히 보기',
	          link: {
	            mobileWebUrl: url,
	            webUrl: url
	          }
	        }
		  ]
		});
	}
	
	_reflashLikes = async () => {
		try {
			const {
				data: { project }
			} = await fetchlike()
			
			console.log('fetched likes project', project);
			// console.log('fetched likes', product);

			this.setState({ project })
		} catch (e) {
			console.error(e);
		}
	}

// 	FB.ui(
//  {
//   method: 'share',
//   href: 'https://developers.facebook.com/docs/'
// }, function(response){
// // console.log(response)
// });



}
