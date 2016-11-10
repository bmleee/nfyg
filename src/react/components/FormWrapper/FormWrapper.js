import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

export default class FormWrapper extends Component {
	state = {
		open: false,
		value: null
	}
	propTypes = {
		title: PropTypes.string.isRequired,

		// value type
		valueType: PropTypes.any.isRequired,

		alt: PropTypes.any.isRequired, // text to show when value is empty
		initialValue: PropTypes.any.isRequired, // value from parent component
		submitCaption: PropTypes.any.isRequired, // text to guide user to submit
		onSubmit: PropTypes.any.isRequired, // callback when user want to save new value
	}
	defaultProps = {
		submitCaption: '제출하세요'
	}

	constructor(props) {
		super(props)

		const {
			initialValue,
			valueType,
		} = this.props

		let defaultValue = '' // TODO: valueType에 따라 다른 defaultValue

		this.setState({
			value: initialValue && defaultValue
		})
	}

	componentWillReceiveProps(nextProps) {
		const { initialValue } = nextProps

		this.setState({value: initialValue})
	}

	render() {
		let {
			open,
			value
		} = this.state
		let {
			title,
			valueType,
			alt,
			submitCaption,
			className,
			children
		} = this.props

		className = cx('form-wrapper', className)
		children = React.cloneElement(children, {
			onChange: this._onChange,
			value
		})

		let wrapper = (
			<div className={className}>
				<span className="form-wrapper-title">{title}</span>
				<div className="form-wrapper-value">
					{
						// TODO: valueType에 따라 img, string, date...
						!!value
							? <span>{value}</span>
							: <span>{alt}</span>
					}
				</div>
				<button onClick={this._onClose}>{submitCaption}</button>
			</div>
		)
		let content = (
			<div className={className}>
				{children}
				<button onClick={this._onClose}>취소하기</button>
				<button onClick={this._onSubmit}>저장하기</button>
			</div>
		)

		return !open ? wrapper : content
	}

	// TODO: target value 에 따라 e.target...​
	_onChange = (e) => {
		this.setState({value: e.target.value})
	}

	_onClose = () => {
		this.setState({
			open: !this.state.open,
			value: this.props.initialValue
		})
	}
	_onSubmit = () => {
		this.props.onSubmit(this.state.value)
		this.setState({
			open: false,
		})
	}
}
