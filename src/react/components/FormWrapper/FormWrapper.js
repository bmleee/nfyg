import React, { Component, PropTypes, Children } from 'react'
import cx from 'classnames'

import { VALUE_TYPE } from './constants'

// when window object is undeclared...
import { canUseDOM } from '~/src/lib/utils'
if(canUseDOM) {
	const rte = require('~/src/react/components/react-rte/src/RichTextEditor')
	const SevenEditor = require('~/src/react/components/react-rte/src/SevenEditor')
	console.log('rte', rte);
	window.RichTextEditor = rte.default
	window.RichTextEditor.createEmptyValue = rte.createEmptyValue
	window.RichTextEditor.createValueFromString = rte.createValueFromString
	window.SevenEditor = SevenEditor.default
} else {
	global.RichTextEditor = {
		createEmptyValue() {},
		createValueFromString() {}
	}
	global.Editor = {}
	global.SevenEditor = {}
}



/**
 * children
 * 	[0] : wrapper to show when !open
 * 	[1] : form to show when open
 */
export default class FormWrapper extends Component {
	state = {
		open: false,
		value: null
	}
	static propTypes = {
		title: PropTypes.string.isRequired,

		valueType: PropTypes.any.isRequired,
		alt: PropTypes.any.isRequired, // text to show when value is empty
		initialValue: PropTypes.any.isRequired, // value from parent component
		submitCaption: PropTypes.any.isRequired, // text to guide user to submit
		onSubmit: PropTypes.any.isRequired, // callback when user want to save new value
		handlers: PropTypes.func, // callback when user want to save new value

		form: PropTypes.node.isRequired,
		wrapper: PropTypes.node.isRequired,
	}
	static defaultProps = {
		submitCaption: '제출하세요'
	}

	constructor(props) {
		super(props)

		const {
			initialValue,
			valueType,
			handlers
		} = this.props

		let value = this._defaultValue(valueType, initialValue)

		if (!!handlers) this.handlers = this._bindHandlers(handlers)

		this.setState({ value })
	}

	componentWillReceiveProps(nextProps) {
		const { initialValue, valueType } = nextProps
		switch (valueType) {
			case VALUE_TYPE.RICH_TEXT:
				let value = this._defaultValue(valueType, initialValue)
				console.log('componentWillReceiveProps.value', value);
				console.log('componentWillReceiveProps.value.toString()', value.toString('html'));
				console.log('componentWillReceiveProps.value.getEditorState()', value.getEditorState);
				this.setState({ value })
				break;
			default:
				this.setState({value: initialValue})
		}
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
			children,
			Form,
			Wrapper
		} = this.props

		if (valueType === VALUE_TYPE.RICH_TEXT) {
			if (!value) value = RichTextEditor.createEmptyValue()
			else if (typeof value === 'string') value = this._defaultValue(valueType, value)
		}

		console.log('FormWrapper.value', value);

		className = cx('form-wrapper', className)

		let wrapper = (
			<div className={className}>
				<span className="form-wrapper-title">{title}</span>
				<div className="form-wrapper-value">
					<Wrapper value={value} handlers={this.handlers} />
				</div>
				<button onClick={this._onClose}>{submitCaption}</button>
			</div>
		)
		let content = (
			<div className={className}>
				<Form value={value} onChange={this._onChange} handlers={this.handlers} />
				<button onClick={this._onClose}>취소하기</button>
				<button onClick={this._onSubmit}>저장하기</button>
			</div>
		)

		return !open ? wrapper : content
	}

	// TODO: target value 에 따라 e.target...​
	// value 가 object일 경우, this.handlers에서 처리한다!
	_onChange = (e) => {
		let value

		switch(this.props.valueType) {
			case VALUE_TYPE.SELECT : // {value, label}
				value = e.value
				break
			case VALUE_TYPE.REWARD:
				console.log('REWARD CHANGED');
				console.log('VALUE', this.state.value);
				return;
				break;
			case VALUE_TYPE.RICH_TEXT:
				value = e;
				break;
			default : // input[type="text"] ...
				value = e.target.value
				break;
		}

		console.log('FormWrapper._onChange.value', value);

		this.setState({value})
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

	_defaultValue = (valueType, initialValue) => {
		switch (valueType) {
			case VALUE_TYPE.RICH_TEXT:
				let v = !!initialValue ? RichTextEditor.createValueFromString(initialValue, 'html') : RichTextEditor.createEmptyValue()
				console.log('_defaultValue.value', v);
				return v;
			default:
				return ''
		}

	}

	_bindHandlers = (handlers) => {
		let _handlers = {}
		for(let k of Object.keys(handlers)) {
			_handlers[k] = handlers[k].bind(this)
		}
		return _handlers
	}
}
