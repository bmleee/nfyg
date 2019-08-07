import React, { Component, PropTypes } from 'react';
// import { Viewer } from '~/src/react/components/DraftEditor/SevenEditor';

import Collapsible from 'react-collapsible';

import {
	ProductReward,
} from './';



class Overview extends Component {

	state = {
		seeMore: false,
	}

	_onClick() {
		this.setState({
			seeMore: true,
		})
	}

	render() {
		let {
			abstract: {
				productName
			},
			overview: {
				intro,
				part1,
				part2
			},
			funding,
			creator,
			overview_new
		} = this.props;
		
		let new_overview = !overview_new ? part1 : overview_new
		//console.log('creator', creator)
		//console.log('funding', funding)
		
		// 동영상 iframe 태그 변경(동영상 갯수 더 필요할 시 행추가)
		new_overview = new_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
		new_overview = new_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
		new_overview = new_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
		new_overview = new_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
		new_overview = new_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
		new_overview = new_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
		new_overview = new_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
		new_overview = new_overview.replace(`<img src="../uploads/`, `<img src="/uploads/`)
		new_overview = new_overview.replace(`<img src="../uploads/`, `<img src="/uploads/`)
		new_overview = new_overview.replace(`<img src="../uploads/`, `<img src="/uploads/`)
		new_overview = new_overview.replace(`<img src="../uploads/`, `<img src="/uploads/`)
		new_overview = new_overview.replace(`<img src="../uploads/`, `<img src="/uploads/`)
		new_overview = new_overview.replace(`<img src="../uploads/`, `<img src="/uploads/`)
		new_overview = new_overview.replace(`<img src="../uploads/`, `<img src="/uploads/`)

		return (
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
					<div className="project-notice-element">
						<div className="project-notice-strong-2">결제 취소 안내</div>
						결제 예약취소는 펀딩 마감일 까지 우측 상단의 '내 페이지'에서 언제든지 가능합니다. 마감일 이후에는 제작이 시작되어 결제 취소가 불가합니다.
					</div>
					{ !funding.cancellation ? null :
					<div className="project-notice-element-3">
						<div className="project-notice-strong-2">환불 및 교환</div>
						교환 및 환불 규정은 창작자마다 상이하며 소개 하단에 기재되어 있습니다.
					</div>
					}
				</div>
				
				<div className="project-detail-overview-info">
					<div dangerouslySetInnerHTML={{ __html: new_overview}} />
				</div>
				
				
				<div className="project-notice">
					{ !funding.cancellation ? null :
					<div className="project-notice-element-2">
						<div className="project-notice-strong-2">환불 및 교환 정책</div>
						{funding.cancellation}
					</div>
					}
					<div className="project-notice-element-2">
						<div className="project-notice-strong-2">결제 예약 취소</div>
						우측 상단의 '내 페이지'에서 해당 프로젝트의 상세내역 보기에서 '결제 예약 취소'버튼을 클릭하시면 됩니다. 
					</div>
					<div className="project-notice-element">
						<div className="project-notice-strong-2">배송지/결제 카드 변경</div>
						우측 상단의 '내 페이지'에서 해당 프로젝트의 상세내역 보기에서 '배송지 변경' 또는 '결제 카드 변경'버튼을 누르고 원하시는 배송지나 결제 카드로 변경하시면 됩니다. (원하시는 '배송지/결제 카드'가 없을 경우, '프로필 설정'에서 추가하신 후 변경해주세요!)
					</div>
				</div>
				
			</div>
		)
	}

}

export default Overview;
