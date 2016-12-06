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
	<span>목표 금액을 입력하세요</span>
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
			<div className="reward-wrapper-item">
				<span>{title}</span>
				<span>{description}</span>
				{value2label(SelectOptions.Reward, isDirectSupport)}
				<span>{thresholdMoney.toLocaleString()}원</span>
				<button onClick={() => deleteReward(index)}>삭제하기</button>
			</div>
		))
		: '리워드를 추가하세요'

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
				<span>리워드 제목</span>
				<input type="text" value={title} onChange={_onTitle} />
			</div>

			<div>
				<span>리워드 설명</span>
				<input type="text" value={description} onChange={_onDescription} />
			</div>

			<div>
				<span>직 / 간접 후원 여부</span>
				<Select
					value={isDirectSupport} onChange={_onIsDirectSupport}
					options={SelectOptions.Reward}
				/>
			</div>

			<div>
				<span>{isDirectSupport ? '직접' : '간접'} 후원 최소 금액</span>
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
		reward,
	},

	// onSubmit callbacks
	_onTargetMoneySubmit,
	_onDateToSubmit,
	_onRewardSubmit,

	// onChange callbacks
	rewardHandlers,
}) => {

	return (
		<div className="funding-container">

			<FormWrapper
				title="Funding Target Money"
				valueType={VALUE_TYPE.MONEY}
				alt="목표 금액을 입력하세요"
				initialValue={targetMoney}
				submitCaption="입력하기"
				onSubmit={_onTargetMoneySubmit}
				Wrapper={TargetMoneyWrapper}
				Form={TargetMoneyForm}
			/>

			<FormWrapper
				title="Funding Date to"
				valueType={VALUE_TYPE.DATE}
				alt="프로젝트 종료일을 입력하세요"
				initialValue={dateTo}
				submitCaption="입력하기"
				onSubmit={_onDateToSubmit}
				Wrapper={DateToWrapper}
				Form={DateToForm}
			/>

			<FormWrapper
				title="Funding Reward"
				valueType={VALUE_TYPE.REWARD}
				alt="리워드으"
				initialValue={reward}
				submitCaption="입력하기"
				onSubmit={_onRewardSubmit}
				handlers={rewardHandlers}
				Wrapper={RewardWrapper}
				Form={RewardForm}
			/>
		</div>
	)
}

export default Funding
