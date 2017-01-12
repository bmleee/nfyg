import React, { Component, PropTypes } from 'react'
import Select from 'react-select'

import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

import { SelectOptions } from '~/src/react/constants'
import { value2label } from '~/src/react/lib/utils'


const TargetMoneyWrapper = ({value}) => !!value
? (
	<span>{value.toLocaleString()}원</span>
)
: (
	<span></span>
)
const TargetMoneyForm = ({value, onChange}) => (
	<input type="number" value={Number(value)} onChange={onChange} />
)
const DateToWrapper = ({value}) => (
	<span>{value}</span>
)
const DateToForm = ({value, onChange}) => (
	<input type="date" value={value} onChange={onChange} />
)
const ShippingFeeWrapper = ({value}) => (
	<span>{value}</span>
)
const ShippingFeeForm = ({value, onChange}) => (
	<input type="number" value={Number(value)} onChange={onChange} />
)

const RewardWrapper = ({value, handlers}) => {
	const {
		deleteReward
	} = handlers

	const items = !!value && !!value.rewards && value.rewards.length > 0
		? value.rewards.map(({
			title,
			description,
			isDirectSupport,
			thresholdMoney
		}, index) => (
			<div className="editor-item-detail-wrapper">
				<span className="item-deatail-small-title-saved">제 목 : {title}</span>
				<span className="item-deatail-small-title-saved">설 명 : {description}</span>
				<span className="item-deatail-small-title-saved">구 분 : {value2label(SelectOptions.Reward, isDirectSupport)}</span>
				<span className="item-deatail-small-title-saved">가 격 : {thresholdMoney.toLocaleString()}원</span>
				<button className="item-deatail-delete" onClick={() => deleteReward(index)}>삭제하기</button>
			</div>
		))
		: <span></span>

	return (
		<div className="reward-wrapper-container">
			{items}
		</div>
	)

}
const RewardForm = ({value, handlers, ...otherProps}) => {
	console.log('RewardForm.value', value);
	const {
		title,
		description,
		isDirectSupport,
		thresholdMoney
	} = value.newReward
	const {
		_onTitle,
		_onDescription,
		_onIsDirectSupport,
		_onThresholdMoney,
	} = handlers


	return (
		<div className="fuding-reward-form-container">
			<div>
				<span className="item-deatail-small-title">리워드 제목</span>
				<input type="text" value={title} onChange={_onTitle} />
			</div>

			<div>
				<span className="item-deatail-small-title">리워드 설명</span>
				<input type="text" value={description} onChange={_onDescription} />
			</div>

			<div>
				<span className="item-deatail-small-title">직/간접 후원 여부</span>
				<Select
					value={isDirectSupport} onChange={_onIsDirectSupport}
					options={SelectOptions.Reward}
				/>
			</div>

			<div>
				<span className="item-deatail-small-title">{isDirectSupport ? '직접' : '간접'} 후원 최소 금액</span>
				<input type="number" value={thresholdMoney} onChange={_onThresholdMoney} step="1000" />
			</div>

		</div>
	)
}

const Funding = ({
	funding: {
		currentMoney,
		targetMoney,
		dateFrom,
		dateTo,
		shippingFee,
		reward,
	},

	// onSubmit callbacks
	_onTargetMoneySubmit,
	_onDateToSubmit,
	_onShippingFeeSubmit,
	_onRewardSubmit,

	// onChange callbacks
	rewardHandlers,
}) => {

	return (
		<div className="abstract-container">

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
				className ="exhibition-long-title"
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="배송료"
				valueType={VALUE_TYPE.MONEY}
				alt="배송료를 입력하세요"
				initialValue={shippingFee}
				submitCaption={'배송료를 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onShippingFeeSubmit}
				Wrapper={ShippingFeeWrapper}
				Form={ShippingFeeForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="프로젝트 종료일"
				valueType={VALUE_TYPE.DATE}
				alt="프로젝트 종료일을 입력하세요"
				initialValue={dateTo}
				submitCaption={'프로젝트 종료일을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onDateToSubmit}
				Wrapper={DateToWrapper}
				Form={DateToForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="프로젝트 리워드"
				valueType={VALUE_TYPE.REWARD}
				alt="리워드으"
				initialValue={reward}
				submitCaption={'리워드를 추가하세요'}
				submitCaptionsub={'추가하기'}
				onSubmit={_onRewardSubmit}
				handlers={rewardHandlers}
				Wrapper={RewardWrapper}
				Form={RewardForm}
				className ="exhibition-eng-title"
				classNameopen ="editor-open-container"
			/>
		</div>
	)
}

export default Funding
