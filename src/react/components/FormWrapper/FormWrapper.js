import React, { Component, PropTypes, Children } from 'react'
import Editor from '~/src/react/components/DraftEditor/SevenEditor'
import Dropzone from 'react-dropzone'

import {upload_file, checkEmail, checkEmailAuth, checkNumber, checkNumberAuth} from '~/src/react/api/AppAPI'

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
		contentwrapper : PropTypes.node,
		
		errMessage : PropTypes.any,
		required_dot : PropTypes.any,
		
		email : PropTypes.any,
		check : PropTypes.any,
		
		onSubmitSub : PropTypes.any,
		FormSub : PropTypes.any,
	}
	static defaultProps = {
		submitCaption: '제출하세요'
	}

	state = {
		open: false,
		value: null,
		
		check_value: null,
		
		mailcheck_open: false,
		checkEmail_err: '',
		
		numbercheck_open: false,
		checkNumber_err: ''
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
			mailcheck_open: false,
			numbercheck_open: false,
			check_value: null
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
			value,
			check_value,
			mailcheck_open,
			checkEmail_err,
			numbercheck_open,
			checkNumber_err
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
			errMessage,
			required_dot,
			
			email,
			check,
			onSubmitSub,
			FormSub
		} = this.props

		let imageDropzone = valueType === VALUE_TYPE.IMAGE ? this._renderDropzone() : null
		let profileDropzone = valueType === VALUE_TYPE.PROFILE ? this._profileDropzone() : null
		
		let related_length = valueType === VALUE_TYPE.RECOMMEND ? value && value.contents.length : null
		let category_length = valueType === VALUE_TYPE.CATEGORY ? value && value.length : null
		let reward_length = valueType === VALUE_TYPE.REWARD ? value && value.rewards.length : null
		let item_length = valueType === VALUE_TYPE.ITEM ? value && value.itemList.length : null
		let storeOverview_length = valueType === VALUE_TYPE.STOREOVERVIEW ? value && value.storeOverviewList.length : null
		let faq_length = valueType === VALUE_TYPE.FAQ ? value && value.faqs.length : null

		// console.log('FormWrapper.value', value);
		// console.log('FormWrapper.valueType', valueType);

		className = cx('form-wrapper', className)
		classNameopen = cx('form-wrapper', classNameopen)
		
		let contentwrapper = ( 
			related_length == 0 || reward_length == 0 || faq_length == 0 || item_length == 0 || category_length == 0 || storeOverview_length == 0 ? null
			: <div className="store-editor-item-add-container">
				<div className="store-editor-item-list">
					<Wrapper value={initialValue} handlers={this.handlers} />
				</div>
			  </div>
		)
		
		let contentwrappercategory = ( 
			related_length == 0 || reward_length == 0 || faq_length == 0 || item_length == 0 || category_length == 0 ? null
			: <div className="store-editor-category-add-container">
				<div className="store-editor-category-list">
					<Wrapper value={initialValue} handlers={this.handlers} />
				</div>
			  </div>
		)

		let wrapper = (
			<div className={className}>
				<span className="form-wrapper-title">{title}{required_dot==true ? <div className="editor-optional">선택항목</div> : null}</span>
				<div className="form-wrapper-value">
					{ !errMessage ? null : <div className="form-wrapper-errMessage">{errMessage}</div> }
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
		
		let item_add = (
			<div className="store-editor-item-add-container">
				<div className="store-editor-item-list">
					<Wrapper value={initialValue} handlers={this.handlers} />
				</div>
				<div className="store-editor-item-add-button-container">
					<button className="store-editor-item-add-button" onClick={this._onClose}> 버튼을 눌러 추가해주세요</button>
				</div>
			</div>
		)
		
		let content = (
			<div className={classNameopen}>
				<Form value={value} onChange={async (e) => await this._onChange(e)} handlers={this.handlers} />
				{imageDropzone}
				{profileDropzone}
				<div className="editor-open-cancel-container-sub">
				<button className="editor-open-button3" onClick={this._onClose}> {submitCaption}</button>
				</div>
				<div className="editor-open-cancel-container">
				<button className="editor-cancel-button" onClick={this._onClose}> 취소하기</button>
				<button className="editor-save-button" onClick={this._onSubmit}> 저장하기</button>
				</div>
			</div>
		)
		
		let rewardcontent = (
			<div className={classNameopen}>
				<Form value={value} onChange={async (e) => await this._onChange(e)} handlers={this.handlers} />
				{imageDropzone}
				{profileDropzone}
				<div className="editor-open-cancel-container-sub">
				<button className="editor-open-button3" onClick={this._onClose}> {submitCaption}</button>
				</div>
				<div className="editor-open-cancel-container">
				<button className="editor-cancel-button" onClick={this._onClose}> 취소하기</button>
				{check == true ? <button className="editor-save-button" onClick={this._onSubmit}> 저장하기</button>
				: <button className="editor-save-button-disabled"> 저장하기</button> }
				</div>
			</div>
		)
		
		let wrapper_mail = (
			<div className={className}>
				<span className="form-wrapper-title">{title}{check == true ? <div className="editor-checked">인증완료</div> : <div className="editor-unchecked">인증필요</div>}</span>
				<div className="form-wrapper-value">
					{/* !errMessage ? null : <div className="form-wrapper-errMessage">{errMessage}</div> */}
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
		
		let content_mail = (
			<div className={classNameopen}>
				<Form value={value} onChange={async (e) => await this._onChange(e)} />
				<div className="editor-open-cancel-container-sub">
					<button className="editor-open-button3" onClick={this._onEmailClose1}> {submitCaption}</button>
				</div>
				<div className="editor-open-cancel-container">
					<button className="editor-cancel-button" onClick={this._onEmailClose1}> 취소하기</button>
					<button className="editor-save-button" onClick={() => this._onEmailSubmit(email, value)}> 인증메일 받기</button>
				</div>
			</div>
		)
		
		let content_mailcheck = (
			<div className={classNameopen}>
				{ !checkEmail_err ? null : <div className="form-wrapper-errMessage">{checkEmail_err}</div> }
				<FormSub value={value} check_value={check_value} onChange={async (e) => await this._onCheckChange(e)} />
				<button className="check-reset" onClick={() => this._onEmailSubmit(email, value)}>재전송</button>
				<div className="editor-open-cancel-container-sub">
					<button className="editor-open-button3" onClick={this._onEmailClose2}> {submitCaption}</button>
				</div>
				<div className="editor-open-cancel-container">
					<button className="editor-cancel-button" onClick={this._onEmailClose2}> 취소하기</button>
					<button className="editor-save-button" onClick={() => this._onEmailCheckSubmit(email, check_value)}> 인증하기</button>
				</div>
			</div>
		)
		
		let wrapper_number = (
			<div className={className}>
				<span className="form-wrapper-title">{title}{check == true ? <div className="editor-checked">인증완료</div> : <div className="editor-unchecked">인증필요</div>}</span>
				<div className="form-wrapper-value">
					{/* !errMessage ? null : <div className="form-wrapper-errMessage">{errMessage}</div> */}
					<Wrapper value={initialValue} />
				</div>
				<div className="editor-open-button1-container">
					<button className="editor-open-button1" onClick={this._onClose}> {submitCaption}</button>
				</div>
				<div className="editor-open-button2-container">
					<button className="editor-open-button2" onClick={this._onClose}> {submitCaptionsub}</button>
				</div>
			</div>
		)
		
		let content_number = (
			<div className={classNameopen}>
				<Form value={value} onChange={async (e) => await this._onChange(e)} />
				<div className="editor-open-cancel-container-sub">
					<button className="editor-open-button3" onClick={this._onNumberClose1}> {submitCaption}</button>
				</div>
				<div className="editor-open-cancel-container">
					<button className="editor-cancel-button" onClick={this._onNumberClose1}> 취소하기</button>
					<button className="editor-save-button" onClick={() => this._onNumberSubmit(email, value)}> 인증번호 받기</button>
				</div>
			</div>
		)
		
		let content_numbercheck = (
			<div className={classNameopen}>
				{ !checkNumber_err ? null : <div className="form-wrapper-errMessage">{checkNumber_err}</div> }
				<FormSub value={value} check_value={check_value} onChange={async (e) => await this._onCheckChange(e)} />
				<button className="check-reset" onClick={() => this._onNumberSubmit(email, value)}>재전송</button>
				<div className="editor-open-cancel-container-sub">
					<button className="editor-open-button3" onClick={this._onNumberClose2}> {submitCaption}</button>
				</div>
				<div className="editor-open-cancel-container">
					<button className="editor-cancel-button" onClick={this._onNumberClose2}> 취소하기</button>
					<button className="editor-save-button" onClick={() => this._onNumberCheckSubmit(email, check_value)}> 인증하기</button>
				</div>
			</div>
		)
		
		let Categorycontent = (
			<div className={classNameopen}>
				{ category_length == 0 ? null : <Wrapper value={initialValue} handlers={this.handlers} /> }
				<Form value={value} onChange={async (e) => await this._onCategoryChange(e)} />
				<div className="editor-open-cancel-container-sub">
				<button className="editor-open-button3" onClick={this._onClose}> {submitCaption}</button>
				</div>
				<div className="editor-open-cancel-container">
				<button className="editor-cancel-button" onClick={this._onCategoryClose}> 취소하기</button>
				<button className="editor-save-button" onClick={this._onCategorySubmit}> 저장하기</button>
				</div>
			</div>
		)
		

		return (
		<div>
			{ !open 
				? valueType === VALUE_TYPE.RECOMMEND || valueType === VALUE_TYPE.REWARD || valueType === VALUE_TYPE.FAQ || valueType === VALUE_TYPE.ITEM || valueType === VALUE_TYPE.STOREOVERVIEW
					? item_add 
					: valueType === VALUE_TYPE.MAIL ? wrapper_mail 
					: valueType === VALUE_TYPE.PHONE ? wrapper_number :wrapper 
				: valueType === VALUE_TYPE.RECOMMEND || valueType === VALUE_TYPE.FAQ || valueType === VALUE_TYPE.ITEM || valueType === VALUE_TYPE.STOREOVERVIEW
					? <div>{contentwrapper}{content}</div> 
					: valueType === VALUE_TYPE.REWARD 
					? <div>{contentwrapper}{rewardcontent}</div>
					: valueType === VALUE_TYPE.CATEGORY
					? <div>{Categorycontent}</div>
					: valueType === VALUE_TYPE.MAIL 
					? <div>{!mailcheck_open ? content_mail : content_mailcheck}</div> 
					: valueType === VALUE_TYPE.PHONE 
					? <div>{!numbercheck_open ? content_number : content_numbercheck}</div>
					: <div>{content}</div>
			}
		</div> )
	}

	// TODO: target value 에 따라 e.target...
	// value 가 object일 경우, this.handlers에서 처리한다!
	
	_onChange = async (e) => {
		let value

		switch(this.props.valueType) {
			case VALUE_TYPE.SELECT: // {value, label}
			case VALUE_TYPE.CATEGORY:
				value = e.value
				break
			case VALUE_TYPE.REWARD:
			case VALUE_TYPE.ITEM:
			case VALUE_TYPE.STOREOVERVIEW:
			case VALUE_TYPE.STORESHIPPINGCYCLE:
			case VALUE_TYPE.ACCOUNT:
			case VALUE_TYPE.ARTWORK:
			case VALUE_TYPE.RECOMMEND:
			case VALUE_TYPE.FAQ:
				return;
			case VALUE_TYPE.RICH_TEXT:
				value = e.level.content || e.level.fragments.join("");
				value = value.replace(`<img src="uploads/`, `<img src="/uploads/`)
				value = value.replace(`<img src="uploads/`, `<img src="/uploads/`)
				value = value.replace(`<img src="uploads/`, `<img src="/uploads/`)
				value = value.replace(`<img src="uploads/`, `<img src="/uploads/`)
				value = value.replace(`<img src="uploads/`, `<img src="/uploads/`)
				value = value.replace(`<img src="uploads/`, `<img src="/uploads/`)
				value = value.replace(`<img src="uploads/`, `<img src="/uploads/`)
				value = value.replace(`<img src="uploads/`, `<img src="/uploads/`)
				value = value.replace(`<img src="uploads/`, `<img src="/uploads/`)
				value = value.replace(`<img src="../uploads/`, `<img src="/uploads/`)
				value = value.replace(`<img src="../uploads/`, `<img src="/uploads/`)
				value = value.replace(`<img src="../uploads/`, `<img src="/uploads/`)
				value = value.replace(`<img src="../uploads/`, `<img src="/uploads/`)
				value = value.replace(`<img src="../uploads/`, `<img src="/uploads/`)
				value = value.replace(`<img src="../uploads/`, `<img src="/uploads/`)
				value = value.replace(`<img src="../uploads/`, `<img src="/uploads/`)
				value = value.replace(`<img src="../uploads/`, `<img src="/uploads/`)
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

		// console.log('FormWrapper._onChange.value', value);

		this.setState({value})
	}

	_onClose = () => {
		this.setState({
			open: !this.state.open,
			value: this.props.initialValue
		})
	}
	_onSubmit = () => {
		// console.log('FormWrapper._onSubmit', this.state.value);
		this.props.onSubmit(this.state.value)
		this.setState({
			open: false,
		})
	}
	
	
	_onCheckChange = async (e) => {
		let check_value

		check_value = e.target.value

		this.setState({check_value})
	}
	
	_onEmailClose1 = () => {
		this.setState({
			open: !this.state.open,
			value: this.props.initialValue,
			mailcheck_open: false,
			check_value: null
		})
	}
	
	_onEmailClose2 = () => {
		this.setState({
			open: !this.state.open,
			value: this.props.initialValue,
			mailcheck_open: false,
			check_value: null
		})
		this.props.onSubmitSub(false)
	}
	
	_onEmailSubmit = async (email, checkemail) => {
		try {
			this.setState({
				mailcheck_open: true,
				checkEmail_err: ''
			})
			let r = await checkEmail(email, checkemail)
			
			this.props.onSubmit(this.state.value)
			
		} catch(e) {
			this.setState({
				mailcheck_open: false
			})
		}
	}
	
	_onEmailCheckSubmit = async (email, checknumber) => {
		try {
			let r = await checkEmailAuth(email, checknumber)
			
			console.log('asdkflnasdfldnsalfaw!!!!!', r.response)
			
			if(r.response == true) {
				this.props.onSubmitSub(r.response)
				this.setState({
					open: false,
					mailcheck_open: false,
					check_value: null
				})
			}
			else {
				this.props.onSubmitSub(r.response)
				this.setState({
					open: true,
					mailcheck_open: true,
					checkEmail_err: '인증 번호 다시 확인해주세요!'
				})
			}
			
		} catch(e) {
			this.setState({
				open: true,
				mailcheck_open: false
			})
		}
	}
	
	
	_onNumberClose1 = () => {
		this.setState({
			open: !this.state.open,
			value: this.props.initialValue,
			numbercheck_open: false,
			check_value: null
		})
	}
	
	_onNumberClose2 = () => {
		this.setState({
			open: !this.state.open,
			value: this.props.initialValue,
			numbercheck_open: false,
			check_value: null
		})
		this.props.onSubmitSub(false)
	}
	
	_onNumberSubmit = async (email, checknumber) => {
		try {
			this.setState({
				numbercheck_open: true,
				checkNumber_err: ''
			})
			let r = await checkNumber(email, checknumber)
			
			this.props.onSubmit(this.state.value)
			
		} catch(e) {
			this.setState({
				numbercheck_open: false
			})
		}
	}
	
	_onNumberCheckSubmit = async (email, checknumber) => {
		try {
			let r = await checkNumberAuth(email, checknumber)
	
			if(r.response == true) {
				this.props.onSubmitSub(r.response)
				this.setState({
					open: false,
					numbercheck_open: false,
					check_value: null
				})
			}
			else {
				this.props.onSubmitSub(r.response)
				this.setState({
					open: true,
					numbercheck_open: true,
					checkNumber_err: '인증 번호를 다시 확인해주세요!'
				})
			}
			
		} catch(e) {
			this.setState({
				open: true,
				numbercheck_open: false
			})
		}
	}
	
	_onCategoryChange = async (e) => {
		let value
		value = e.value
		
		this.props.onSubmit(value)
	}
	
	_onCategorySubmit = () => {
		this.setState({
			open: false,
		})
	}
	
	_onCategoryClose = () => {
		this.props.onSubmitSub()
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
			case VALUE_TYPE.ITEM:
			case VALUE_TYPE.STOREOVERVIEW:
			case VALUE_TYPE.STORESHIPPINGCYCLE:
			case VALUE_TYPE.ACCOUNT:
			case VALUE_TYPE.ARTWORK:
			case VALUE_TYPE.RECOMMEND:
			default:
				return ''
		}

	}

	_bindHandlers = (handlers) => {
		let _handlers = {}
		// console.log('handlers catched', handlers)
		for(let k of Object.keys(handlers)) {
			_handlers[k] = handlers[k].bind(this)
		}
		return _handlers
	}
	
	_profileDropzone = () => {
		const onDrop = async (acceptedFiles, rejectedFiles) => {
			let {sourceURL} = await upload_file(acceptedFiles[0])
			this.setState({value: sourceURL})
		}

		return <Dropzone onDrop={onDrop} accept="image/*" >
		<div className="dropzone-profile-container">
			<div className="dropzone-profile-text">프로필 등록</div>
			<div className="dropzone-text-sub">가로 200px, 세로 200px 이상으로 올려주세요.</div>
		</div>
		</Dropzone>
	}

	_renderDropzone = () => {
		const onDrop = async (acceptedFiles, rejectedFiles) => {
			let {sourceURL} = await upload_file(acceptedFiles[0])
			this.setState({value: sourceURL})
		}

		return <Dropzone onDrop={onDrop} accept="image/*" >
			<div className="dropzone-container">
				<div className="dropzone-text">이미지 등록</div>
				<div className="dropzone-text-sub">가로 1500px, 세로 1050px에 최적화 되어 있습니다.</div>
			</div>
			</Dropzone>
	}
}
