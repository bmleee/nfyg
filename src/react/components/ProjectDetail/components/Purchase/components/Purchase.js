import React, { Component, PropTypes } from 'react';
import { fetchPurchaseInfo } from '~/src/react/api/AppAPI'


export default class C extends Component {
	render() {

		console.log('Purcase/components/Purchase', this);
		const {
			reward,
			payment,
			address,
			
			goToPreviousStage,

			purchase
		} = this.props

		return (
			<div>
				결제 정보를 확인 해 주세요

				<div>
					Reward: { JSON.stringify(reward, undefined, 4) }
				</div>
				<div>
					payment: { JSON.stringify(payment, undefined, 4) }
				</div>
				<div>
					Address: { JSON.stringify(address, undefined, 4) }
				</div>

				<div className="purchase-stage-move-container">
					<button className="purchase-stage-prev-button" onClick={goToPreviousStage}>이전 단계</button>
					<button className="purchase-stage-next-button" onClick={purchase}>결제 하기</button>
				</div>
			</div>
		)
	}
}
