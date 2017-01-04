import React, { Component } from 'react'
import NotificationSystem from 'react-notification-system'

import {
	Unauthorized
} from './Modals'



/**
 * 여기서 팝업, Flash 를 띄운다.
 */
export default class Header extends Component {

	componentDidMount() {
		this._renderFlash(this.props)
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.flashs.length > 0) this._renderFlash(nextProps)
	}

	render() {
		const {
			modal,
			user,

			setModal,
			unsetModal,
		} = this.props


		return (
			<div className="header">
				{ modal ? this._renderModal(modal, user) : null }
				<NotificationSystem ref="notificationSystem" />
			</div>
		)
	}

	_renderModal = (modal, user) => {
		if (!user.isAuthorized) return <Unauthorized message="해당 페이지를 볼 수 있는 권한이 없습니다." />

		if (!modal.isOpen) return null;

		switch (modal.type) {
			case 'Unauthorized':
				return <Unauthorized {...modal} />
			default:
				return null
		}
	}

	_renderFlash = (props) => {
		let {
			flashs,

			clearFlash,
		} = props

		for (let flash of flashs) {
			// switch (flash.type) {
			// 	case 'LoginFailure':
			//
			// }
			this.refs.notificationSystem.addNotification({
				...flash
			})
		}

		clearFlash()
	}
}
