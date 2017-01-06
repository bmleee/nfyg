import React, { Component, PropTypes } from 'react';
import { fetchPurchaseInfo } from '~/src/react/api/AppAPI'


export default class C extends Component {
	state = {
		payments: []
	}

	async componentDidMount() {
		try {
			const {
				user,
				data: { payments }
			} = await fetchPurchaseInfo('payments')

			this.setState({ payments })
		} catch (e) {
			console.error(e);
		}

	}

	render() {
		const {
			payments
		} = this.state

		const {
			goToNextStage,
			goToPreviousStage,
			setReward,
			setAddress,
			setPayment,
		} = this.props

		return (<div>{JSON.stringify(payments, undefined, 4)}</div>)
	}
}
