import React, { Component, PropTypes } from 'react'
import Select from 'react-select';
import Progress from 'react-progressbar';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const Preview = ({
	authorizedUser,
	abstract,
	creator,
	funding,
	overview,
	overview_new,
	userType
}) => {
	window.scrollTo(0, 0);
	
	let infoBackground = {
		backgroundImage: `url("${abstract.imgSrc}")`,
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat'
	}
	let remainingDays = ((new Date(funding.dateTo).getTime() + 86400000) - new Date().getTime() ) / 1000 / 60 / 60 / 24
	let new_overview = overview_new
	new_overview = new_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
	new_overview = new_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
	new_overview = new_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
	new_overview = new_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
	new_overview = new_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
	new_overview = new_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
	new_overview = new_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
	
	return (
		<div className="project-detail">
			
			<div className="project-detail-heading">
					<div className="project-detail-info" style={infoBackground}>
						<div className="product-info">
							<div className="project-sponsor-name"><p>{Math.ceil(remainingDays)}일</p> 남음</div>
							
							<h1 className="project-title">{abstract.longTitle}</h1>
							<div className="product-info-bottom">
							</div>
							<div className="project-heading-summary-money">
							</div>
							<Progress completed={0} />
							
							<div className="project-heading-summary-money">
							<div className="project-heading-summary-percent">{0}<span className="heading-summary-status">%</span></div>
						
							<div className="project-heading-summary-dday">0명 주문중</div>
							
							<span className="heading-summary-status">0원</span>
							</div>
							
							<div className="project-likes-container">
								<button className="project-likes-button">0명</button>
							</div>
	
					</div>
				</div>
			</div>
			
			<Tabs>
				<TabList>
					<Tab>소 개</Tab>
					<Tab>소 식</Tab>
					<Tab>댓 글</Tab>
				</TabList>
				
				<TabPanel>
					<div className="project-detail-overview">
						<div className="project-notice">
							<div className="project-notice-element-1">
								<div className="project-notice-strong">목표 금액</div>{funding.targetMoney.toLocaleString()}원
								<div className="project-notice-strong-sub">펀딩 마감일</div>{funding.dateTo}
							</div>
							{ funding.mustrewardActive == true ?
							<div className="project-notice-element">
								<div className="project-notice-strong-2">무조건 리워드</div>
								펀딩 마감일 까지 목표 금액에 달성하지 않더라도 결제가 진행되고 리워드가 제공됩니다.
							</div>
							:
							<div className="project-notice-element">
								<div className="project-notice-strong-2">달성시 리워드</div>
								펀딩 마감일 까지 목표 금액에 달성해야만 결제가 진행되고 리워드가 제공됩니다.
							</div>
							}
						</div>
						<div className="project-notice">
							<div className="project-notice-element-2">
								<div className="project-notice-strong-2">펀딩 결제 안내</div>
								펀딩 결제는 바로 진행되지 않고, 펀딩 마감일({funding.dateTo}) 또는 마감일 다음 영업일에 일괄 진행됩니다.
							</div>
							<div className="project-notice-element-2">
								<div className="project-notice-strong-2">결제 취소 안내</div>
								결제 예약취소는 펀딩 마감일 까지 우측 상단의 '내 페이지'에서 언제든지 가능합니다. 마감일 이후에는 제작이 시작되어 결제 취소가 불가합니다.
							</div>
							{ !funding.cancellation ? null :
							<div className="project-notice-element-3">
								<div className="project-notice-strong-2">환불 및 교환</div>
								교환 및 환불 규정은 창작자마다 상이하며 하단에 기재되어 있습니다.
							</div>
							}
						</div>
						<div className="project-detail-overview-info">
							<div dangerouslySetInnerHTML={{ __html: new_overview}}/>
						</div>
					</div>
				</TabPanel>
					
				<TabPanel>
					
				</TabPanel>
					
				<TabPanel>
					<div className="project-detail-qna">
						<div className="project-creator">
							<div className="project-creator-img-container">
								{ creator.creatorImgSrc == "" ? 
								<img className="project-creator-img" src="/assets/images/user_default.png" />
								:
								<img className="project-creator-img" src={creator.creatorImgSrc} />
								}
							</div>
							<div className="project-creator-info-container">
								<div className="project-creator-name">
									{creator.creatorName}
								</div>
								<div className="project-creator-description">
									{creator.creatorDescription}
								</div>
								<div className="project-creator-email">
									{creator.creatorEmail}
								</div>
							</div>
						</div>
						<div className="project-detail-qna-form">
							<div className="qna-form-textarea-container">
								<img className="qna-form-user-icon" src="/assets/images/user_default.png" alt="" width={80} height={80} />
								<textarea className="qna-form-textarea" name="" id="qna_text" cols="30" rows="4" placeholder="궁금하신 점을 댓글로 남겨주세요."></textarea>
							</div>
							<div className="qna-form-submit-container">
								<p className="qna-form-submit-empty"/>
								<button className="qna-form-submit">댓글 남기기</button>
							</div>
						</div>
					</div>
				</TabPanel>
			</Tabs>
		</div>
	)
}

export default Preview
