import React, { Component, PropTypes } from 'react';
// import { Viewer } from '~/src/react/components/DraftEditor/SevenEditor';

import {
	ProjectReward,
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
				projectName
			},
			overview: {
				intro,
				part1,
				part2
			},
			funding: {
				rewards,
				dateTo,
				dateFrom,
				mustrewardActive,
				targetMoney,
			}
		} = this.props;
		
		// console.log('mustrewardActive', mustrewardActive)
		
		// 동영상 iframe 태그 변경(동영상 갯수 더 필요할 시 행추가)
		part1 = part1.replace("allowFullScreen />", "allowFullScreen></iframe>")
		part1 = part1.replace("allowFullScreen />", "allowFullScreen></iframe>")
		part1 = part1.replace("allowFullScreen />", "allowFullScreen></iframe>")
		part1 = part1.replace("allowFullScreen />", "allowFullScreen></iframe>")
		part1 = part1.replace("allowFullScreen />", "allowFullScreen></iframe>")
		part1 = part1.replace("allowFullScreen />", "allowFullScreen></iframe>")
		part1 = part1.replace("allowFullScreen />", "allowFullScreen></iframe>")
		
		const today = new Date();
		
		let remainingDays = ( new Date(dateTo).getTime() - today.getTime() ) / 1000 / 60 / 60 / 24

		return (
			<div className="project-detail-overview">
				<div className="project-notice">
					<div className="project-notice-element-1">
						<div className="project-notice-strong">목표 금액</div>{targetMoney.toLocaleString()}원
						<div className="project-notice-strong-sub">펀딩 마감일</div>{dateTo}
					</div>
					{ mustrewardActive == true ?
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
						펀딩 결제는 바로 진행되지 않고, 펀딩 마감일({dateTo}) 또는 마감일 다음 영업일에 일괄 진행됩니다.
					</div>
					<div className="project-notice-element">
						<div className="project-notice-strong-2">결제 취소 안내</div>
						결제 예약취소는 펀딩 마감일 까지 우측 상단의 '내 페이지'에서 언제든지 가능합니다. 마감일 이후에는 제작이 시작되어 결제 취소가 불가합니다.
					</div>
				</div>
				<div className="project-detail-overview-info">
					<div dangerouslySetInnerHTML={{ __html: part1}} />
				</div>
				{	Math.ceil(remainingDays) > 0
					?
					<ProjectReward projectName={projectName} rewards={rewards} />
					:
					null
				}

				<div className="project-detail-overview-info">
					<div dangerouslySetInnerHTML={{ __html: part2}} />
				</div>
			</div>
		)
	}

}

export default Overview;
