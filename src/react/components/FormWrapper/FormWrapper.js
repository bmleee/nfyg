import React, { Component, PropTypes, Children } from 'react'
import Editor from '~/src/react/components/DraftEditor/SevenEditor'
import Dropzone from 'react-dropzone'

import {upload_file} from '~/src/react/api/AppAPI'

import cx from 'classnames'

import { VALUE_TYPE } from './constants'

export default class FormWrapper extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,

		valueType: PropTypes.any.isRequired,
		alt: PropTypes.any.isRequired, // text to show when value is empty
		initialValue: PropTypes.any.isRequired, // value from parent component
		submitCaption: PropTypes.any.isRequired, // text to guide user to submit
		onSubmit: PropTypes.any.isRequired, // callback when user want to save new value
		handlers: PropTypes.any, // callback when user want to save new value

		form: PropTypes.node.isRequired,
		wrapper: PropTypes.node.isRequired,
	}
	static defaultProps = {
		submitCaption: '제출하세요'
	}

	state = {
		open: false,
		value: null
	}

	constructor(props) {
		super(props)
		const {
			initialValue,
			valueType,
			handlers
		} = this.props


		if (!!handlers) this.handlers = this._bindHandlers(handlers)

		this.state = {
			open: false,
			value: this._defaultValue(this.props.valueType, this.props.initialValue),
		}
	}

	componentWillReceiveProps(nextProps) {
		const { initialValue, valueType } = nextProps
		switch (valueType) {
			case VALUE_TYPE.RICH_TEXT:
				let value = this._defaultValue(valueType, initialValue)
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
			submitCaptionsub,
			className,
			classNameopen,
			Form,
			Wrapper,
			initialValue,
		} = this.props

		let imageDropzone = valueType === VALUE_TYPE.IMAGE ? this._renderDropzone() : null

		console.log('FormWrapper.value', value);
		console.log('FormWrapper.valueType', valueType);

		className = cx('form-wrapper', className)
		classNameopen = cx('form-wrapper', classNameopen)

		let wrapper = (
			<div className={className}>
				<span className="form-wrapper-title">{title}</span>
				<div className="form-wrapper-value">
					<Wrapper value={initialValue} handlers={this.handlers} />
				</div>
				<div className="editor-open-button1-container">
				<button className="editor-open-button1" onClick={this._onClose}> {submitCaption}</button>
				</div>
				<div className="editor-open-button2-container">
				<button className="editor-open-button2" onClick={this._onClose}> {submitCaptionsub}</button>
				</div>
			</div>
		)
		let content = (
			<div className={classNameopen}>
				<Form value={value} onChange={async (e) => await this._onChange(e)} handlers={this.handlers} />
				{imageDropzone}
				<div className="editor-open-cancel-container-sub">
				<button className="editor-open-button3" onClick={this._onClose}> {submitCaption}</button>
				</div>
				<div className="editor-open-cancel-container">
				<button className="editor-cancel-button" onClick={this._onClose}> 취소하기</button>
				<button className="editor-save-button" onClick={this._onSubmit}> 저장하기</button>
				</div>
			</div>
		)

		return !open ? wrapper : content
	}

	// TODO: target value 에 따라 e.target...​
	// value 가 object일 경우, this.handlers에서 처리한다!
	_onChange = async (e) => {
		let value

		switch(this.props.valueType) {
			case VALUE_TYPE.SELECT : // {value, label}
				value = e.value
				break
			case VALUE_TYPE.REWARD:
			case VALUE_TYPE.ARTWORK:
			case VALUE_TYPE.RECOMMEND:
			case VALUE_TYPE.FAQ:
				return;
			case VALUE_TYPE.RICH_TEXT:
				value = e;
				break;
			case VALUE_TYPE.IMAGE: // _renderDropzone.onDrop
				break;
			case VALUE_TYPE.MONEY:
			case VALUE_TYPE.NUMBER:
				value = Number(e.target.value)
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
		console.log('FormWrapper._onSubmit', this.state.value);
		this.props.onSubmit(this.state.value)
		this.setState({
			open: false,
		})
	}

	_defaultValue = (valueType, initialValue) => {
		switch (valueType) {
			case VALUE_TYPE.MONEY:
			case VALUE_TYPE.NUMBER:
				return 0

			case VALUE_TYPE.RICH_TEXT:
				return initialValue || '';

			case VALUE_TYPE.REWARD:
			case VALUE_TYPE.ARTWORK:
			case VALUE_TYPE.RECOMMEND:
			default:
				return ''
		}

	}

	_bindHandlers = (handlers) => {
		let _handlers = {}
		console.log('handlers catched', handlers)
		for(let k of Object.keys(handlers)) {
			_handlers[k] = handlers[k].bind(this)
		}
		return _handlers
	}

	_renderDropzone = () => {
		const onDrop = async (acceptedFiles, rejectedFiles) => {
			let {sourceURL} = await upload_file(acceptedFiles[0])
			this.setState({value: sourceURL})
		}

		return <Dropzone onDrop={onDrop} accept="image/*" >
		<div className="dropzone-container">
			<div className="dropzone-text">이미지 등록</div>
		</div>
		</Dropzone>
	}
}
