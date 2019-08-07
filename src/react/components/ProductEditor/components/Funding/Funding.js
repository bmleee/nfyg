import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import { Link } from 'react-router'

import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

import { SelectOptions } from '~/src/react/constants'
import { value2label, value2array } from '~/src/react/lib/utils'


const TargetMoneyWrapper = ({value}) => (
	<span className="form-wrapper-span">{value.toLocaleString()}원</span>
)
const TargetMoneyForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">목표 금액</span>
		<span className="form-wrapper-description">프로젝트를 진행하기 위한 최소한의 목표금액을 입력해주세요.</span>
		<input className="editor_input only-number" type="number" value={Number(value)} onChange={onChange} maxLength={15} min={0} />
		<div className="target-result-money">
			{value.toLocaleString()}원의 펀딩 성공 시, 카드수수료(3.5%)를 제외한 
			<span className="target-result-money-2">약 {Math.round(value * 0.965).toLocaleString()}원</span>
			이 지급됩니다.
		</div>
	</div>
)


var min_date = new Date().toISOString().slice(0,10); 
const DateToWrapper = ({value}) => (
	<span className="form-wrapper-span">{value}</span>
)
const DateToForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 마감일</span>
		<span className="form-wrapper-description">프로젝트 마감일을 설정해주세요. 평균 30일 정도로 펀딩을 진행합니다.</span>
		<input className="editor_input" type="date" value={value} onChange={onChange} min={min_date} />
	</div>
)

const ShippingFeeWrapper = ({value}) => (
	<span className="form-wrapper-span">{value.toLocaleString()}원</span>
)
const ShippingFeeForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">배송비<div className="editor-optional">선택항목</div></span>
		<span className="form-wrapper-description">리워드 전달을 위한 배송비를 입력해주세요. 한 후원자가 여러 리워드를 선택해도 배송비는 한 번만 부과됩니다.</span>
	<input className="editor_input only-number" type="number" value={Number(value)} onChange={onChange} maxLength={5} min={0} />
	</div>
)

const ShippingCompanyWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value2label(SelectOptions.ShippingCompanyList, value)}</span>
: <span className="form-wrapper-span"></span>
const ShippingCompanyForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">거래 배송사</span>
		<span className="form-wrapper-description">프로젝트가 성공적으로 마감되고 리워드를 발송할때 거래할 배송사를 선택해주세요. 후원내역에서 송장번호를 입력하게되면 후원자 분들에게 택배사와 송장번호를 안내해드립니다.</span>
		<Select
			value={value}
			onChange={onChange}
			options={SelectOptions.ShippingCompanyList}
		/>
	</div>
)

const MinBuyerWrapper = ({value}) => (
	<span className="form-wrapper-span">{value}</span>
)
const MinBuyerForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">최소 주문 수량</span>
	<input className="editor_input" type="number" value={value} onChange={onChange} />
	</div>
)
const MaxBuyerWrapper = ({value}) => (
	<span className="form-wrapper-span">{value}</span>
)
const MaxBuyerForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">최대 주문 수량</span>
	<input className="editor_input" type="number" value={value} onChange={onChange} />
	</div>
)

const EtcrewardActiveWrapper = ({value}) => (
	<span className="form-wrapper-span">{value2label(SelectOptions.EtcrewardActive, value)}</span>
)
const EtcrewardActiveForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">기타옵션 여부</span>
		<Select
			value={value}
			onChange={onChange}
			options={SelectOptions.EtcrewardActive}
		/>
	</div>
)

const MustrewardActiveWrapper = ({value}) => (
	<span className="form-wrapper-span">{value2label(SelectOptions.MustrewardActive, value)}</span>
)
const MustrewardActiveForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">무조건 리워드 여부</span>
		<span className="form-wrapper-description">목표금액에 달성하지 않아도 결제를 진행하고 리워드를 지급한다면 '무조건 리워드'를 선택해주세요.</span>
		<Select
			value={value}
			onChange={onChange}
			options={SelectOptions.MustrewardActive}
		/>
	</div>
)

const RewardWrapper = ({value, handlers}) => {
	const {
		deleteReward,
		RewardUp,
		RewardDown
	} = handlers

	const items = !!value && !!value.rewards && value.rewards.length > 0
		? value.rewards.map(({
			title,
			description,
			isDirectSupport,
			imgSrc,
			maxPurchaseVolume,
			shippingDay,
			thresholdMoney
		}, index) => (
			<div className="editor-reward-item-container">
				{ maxPurchaseVolume == 0 ? null : <p className="purchase-reward-limit-ing">한정수량 {maxPurchaseVolume}개</p> }
				<p className="purchase-reward-title">{title}</p>
				{value2array(description).map(({
				}, index) => (
				<div className="purchase-reward-detail-option">{value2array(description)[index]}</div>
				))}
				<p className="purchase-reward-money">{thresholdMoney.toLocaleString()}원</p>
				{ !shippingDay ? <p className="purchase-reward-shippingday">펀딩 마감 후 3주 이내 배송 예정</p> : <p className="purchase-reward-shippingday">{shippingDay} 배송 예정</p> }
				<button className="item-deatail-up" onClick={() => RewardUp(index)}></button>
				<button className="item-deatail-down" onClick={() => RewardDown(index)}></button>
				<button className="item-deatail-delete" onClick={() => deleteReward(index)}>삭제하기</button>
			</div>
		))
		: <span className="form-wrapper-span"></span>

	return (
		<div className="reward-wrapper-container">
			{items}
		</div>
	)

}
const RewardForm = ({value, handlers, ...otherProps}) => {
	const {
		title,
		description,
		isDirectSupport,
		rewardComment,
		thresholdMoney,
		imgSrc,
		shippingDay,
		maxPurchaseVolume,
	} = value.newReward
	const {
		_onTitle,
		_onDescription,
		_onIsDirectSupport,
		_onIsRewardComment,
		_onThresholdMoney,
		_onImgSrc,
		_onShippingDay,
		_onMaxPurcahseVolum,
	} = handlers
	
	var min_date2 = new Date().toISOString().slice(0,10); 
	
	return (
		<div className="fuding-reward-form-container">
			<div>
				<span className="item-deatail-small-title">리워드 제목</span>
				<input className="editor_input" type="text" value={title} onChange={_onTitle} maxLength={32}/>
				<span className="editor-remain-char2">{32 - title.length}자 남았습니다.</span>
			</div>

			<div>
				<span className="item-deatail-small-title">리워드 옵션(쉼표[,]로 구분)</span>
				<span className="form-wrapper-description2">예를들어, 같은 가격의 리워드가 레드, 브라운, 블랙 색상이 있다면 '레드, 브라운, 블랙'을 입력해주세요.</span>
				<input className="editor_input" type="text" value={description} onChange={_onDescription} />
			</div>
			
			<div>
				<span className="item-deatail-small-title">리워드 가격</span>
				<input className="editor_input only-number" type="number" value={thresholdMoney} onChange={_onThresholdMoney} min={0} />
			</div>
			
			<div>
				<span className="item-deatail-small-title">리워드 남기실 말 활성화 <div className="editor-optional">선택항목</div></span>
				<span className="form-wrapper-description2">폰케이스, 의류사이즈와 같이 옵션을 구분하기가 많은 경우, 후원자가 원하는 옵션을 직접 입력할 수 있도록 '활성화'를 선택해주세요.</span>
				<Select
					value={rewardComment} onChange={_onIsRewardComment}
					options={SelectOptions.EtcrewardActive}
				/>
			</div>
			
			<div>
				<span className="item-deatail-small-title2">리워드 한정수량(0은 한정수량 없음) <div className="editor-optional">선택항목</div></span>
				<span className="form-wrapper-description2">얼리버드 특가와 같이 한정 수량으로 리워드를 구성하실 때 설정해주세요. 한정 수량 리워드가 아닐 경우, 0으로 입력해주세요.</span>
				<input className="editor_input" type="number" value={maxPurchaseVolume} onChange={_onMaxPurcahseVolum} min={0}/>
			</div>
			

			<div>
				<span className="item-deatail-small-title">리워드 예상 배송일</span>
				<span className="form-wrapper-description2">리워드가 후원자에게 전달되는 날입니다. 제작기간을 고려하여 예상되는 일자를 입력해주세요.</span>
				<input className="editor_input" type="date" value={shippingDay} onChange={_onShippingDay} min={min_date2}/>
			</div>
			
			<div>
				<span className="item-deatail-small-title">이미지</span>
				<input className="editor_input" type="file" onChange={_onImgSrc} accept="image/*" />
				{ imgSrc && <img src={imgSrc} alt="제품 이미지를 입력하세요." accept="image/*"/> }
			</div>

		</div>
	)
}


const AccountWrapper = ({value, handlers, onChange}) => {
	return (
		!value.accountBank || !value.accountNumber ? 
		<span className="form-wrapper-span"></span> 
		:
		<span className="form-wrapper-span">
			<div>{value.accountBank} {value.accountName} <div className="account-number-last4">끝자리 {value.accountNumber.substring(value.accountNumber.length - 4, value.accountNumber.length)}</div></div>
		</span>
	)
}

const AccountForm = ({value, handlers, ...otherProps, onChange}) => {
	const {
		_onAccountBank,
		_onAccountNumber,
		_onAccountName
	} = handlers

	return (
		<div className="fuding-reward-form-container">
			<div>
				<span className="item-deatail-small-title">거래은행</span>
				<Select value={value.accountBank} onChange={_onAccountBank} options={SelectOptions.BankList} />
			</div>

			<div>
				<span className="item-deatail-small-title2">예금주명</span>
				<input className="editor_input" type="text" value={value.accountName} onChange={_onAccountName} />
			</div>
			
			<div>
				<span className="item-deatail-small-title">계좌번호(숫자만 입력)</span>
				<input className="editor_input only-number" type="number" value={value.accountNumber} onChange={_onAccountNumber} />
			</div>
			
		</div>
	)
}


const Funding = ({
	abstract: {
		state
	},
	
	funding: {
		currentMoney,
		targetMoney,
		dateFrom,
		dateTo,
		shippingFee,
		shippingCompany,
		minPurchaseVolume,
		maxPurchaseVolume,
		
		etcrewardActive,
		mustrewardActive,

		reward,
		faq,
	},
	
	reward_add_check,

	// onSubmit callbacks
	_onTargetMoneySubmit,
	_onDateToSubmit,
	_onShippingFeeSubmit,
	_onShippingCompanySubmit,
	_onMinBuyerSubmit,
	_onMaxBuyerSubmit,
	
	_onEtcrewardActiveSubmit,
	_onMustrewardActiveSubmit,

	_onRewardSubmit,
	_onFaqSubmit,

	// onChange callbacks
	rewardHandlers,
	faqHandlers,
	
	account,
	_onAccountSubmit,
	AccountHandlers,
	
	tabLinkBase
}) => {
	
	let d1 = new Date(dateTo);
	let d2 = new Date(d1.setDate(d1.getDate() + 7));
	d2 = d2.getFullYear() + "-" + ("0" + (d2.getMonth() + 1)).substring(("0" + (d2.getMonth() + 1)).length - 2) + "-" + ("0" + d2.getDate()).substring(("0" + d2.getDate()).length - 2)
	
	return (
		<div className="abstract-container">
			<FormWrapper
				title="배송비"
				valueType={VALUE_TYPE.MONEY}
				alt="배송비를 입력하세요"
				initialValue={shippingFee}
				submitCaption={'배송비를 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onShippingFeeSubmit}
				Wrapper={ShippingFeeWrapper}
				Form={ShippingFeeForm}
				className ="exhibition-long-title"
				classNameopen ="editor-open-container"
				required_dot = {true}
			/>
			
			<FormWrapper
				title="거래 배송사"
				valueType={VALUE_TYPE.SELECT}
				alt="거래 배송사를 선택하세요"
				initialValue={shippingCompany}
				submitCaption={'거래 배송사를 선택하세요'}
				submitCaptionsub={'선택하기'}
				onSubmit={_onShippingCompanySubmit}
				Wrapper={ShippingCompanyWrapper}
				Form={ShippingCompanyForm}
				classNameopen ="editor-open-container"
				required_dot = {true}
			/>

			{/* <FormWrapper
				title="최소 주문 수량"
				valueType={VALUE_TYPE.NUMBER}
				alt="최소 주문 수량을 입력하세요"
				initialValue={minPurchaseVolume}
				submitCaption={'최소 주문 수량을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onMinBuyerSubmit}
				Wrapper={MinBuyerWrapper}
				Form={MinBuyerForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="최대 주문 수량"
				valueType={VALUE_TYPE.NUMBER}
				alt="최대 주문 수량을 입력하세요"
				initialValue={maxPurchaseVolume}
				submitCaption={'최대 주문 수량을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onMaxBuyerSubmit}
				Wrapper={MaxBuyerWrapper}
				Form={MaxBuyerForm}
				classNameopen ="editor-open-container"
			/> */}

			<FormWrapper
				title="목표 금액"
				valueType={VALUE_TYPE.MONEY}
				alt="목표 금액을 입력하세요"
				initialValue={targetMoney}
				submitCaption={'목표 금액을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onTargetMoneySubmit}
				Wrapper={TargetMoneyWrapper}
				Form={TargetMoneyForm}
				classNameopen ="editor-open-container"
			/>
			
			
			<FormWrapper
				title="무조건 리워드 여부"
				valueType={VALUE_TYPE.SELECT}
				alt="무조건 리워드 여부를 선택하세요"
				initialValue={mustrewardActive}
				submitCaption={'무조건 리워드/달성시 리워드'}
				submitCaptionsub={'선택하기'}
				onSubmit={_onMustrewardActiveSubmit}
				Wrapper={MustrewardActiveWrapper}
				Form={MustrewardActiveForm}
				classNameopen ="editor-open-container"
			/>

			{ state == 'in-progress' ? 
			<div className="form-wrapper">
				<span className="form-wrapper-title">프로젝트 종료일</span>
				<div className="form-wrapper-value">
					<span className="form-wrapper-span">{dateTo}</span>
				</div>
			</div>
			:
			<FormWrapper
				title="프로젝트 마감일"
				valueType={VALUE_TYPE.DATE}
				alt="프로젝트 마감일을 설정하세요"
				initialValue={dateTo}
				submitCaption={'프로젝트 마감일을 설정하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onDateToSubmit}
				Wrapper={DateToWrapper}
				Form={DateToForm}
				classNameopen ="editor-open-container"
			/> }
			
			<div className="funding-give-date-container">
				<div className="funding-give-date-title">모금액 지급예정일</div>
				<div className="funding-give-date">{d2}</div>
			</div>
			
			
			<span className="editor-small-title2">정산 계좌 정보</span>
			
			<FormWrapper
				title="정산 계좌 정보"
				valueType={VALUE_TYPE.ACCOUNT}
				alt="정산 받으실 계좌 정보를 입력해주세요"
				initialValue={account}
				submitCaption={'정산 받으실 계좌 정보를 입력해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onAccountSubmit}
				handlers={AccountHandlers}
				Wrapper={AccountWrapper}
				Form={AccountForm}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container-middle"
			/>
			
			<span className="editor-small-title2">프로젝트 리워드</span>
			
			<FormWrapper
				title="프로젝트 리워드"
				valueType={VALUE_TYPE.REWARD}
				alt="리워드으"
				initialValue={reward}
				submitCaption={'프로젝트 리워드 옵션을 추가하세요'}
				submitCaptionsub={'추가하기'}
				onSubmit={_onRewardSubmit}
				handlers={rewardHandlers}
				Wrapper={RewardWrapper}
				Form={RewardForm}
				check={reward_add_check}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container-middle"
			/>
			
			<div className="editor-bottom-button-container">
				<div className="editor-bottom-button-left-container">
					<Link to={`${tabLinkBase}/overview`}><button className="editor-bottom-button-left">이 전</button></Link>
				</div>
				<div className="editor-bottom-button-right-container">
				
				</div>
			</div>
			

		</div>
	)
}

export default Funding
