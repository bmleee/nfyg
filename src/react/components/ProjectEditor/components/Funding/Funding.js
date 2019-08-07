import React, { Component, PropTypes } from 'react'
import Select from 'react-select'

import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

import { SelectOptions } from '~/src/react/constants'
import { value2label } from '~/src/react/lib/utils'


const TargetMoneyWrapper = ({value}) => !!value
? (
	<span className="form-wrapper-span">{value.toLocaleString()}원</span>
)
: (
	<span className="form-wrapper-span"></span>
)
const TargetMoneyForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">목표 금액</span>
		<input className="editor_input" type="number" value={Number(value)} onChange={onChange} maxLength={15} />
	</div>
)
const DateToWrapper = ({value}) => (
	<span className="form-wrapper-span">{value}</span>
)
const DateToForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 종료일</span>
		<input className="editor_input" type="date" value={value} onChange={onChange} />
	</div>
)
const ShippingFeeWrapper = ({value}) => (
	<span className="form-wrapper-span">{value}</span>
)
const ShippingFeeForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">배송료</span>
		<input className="editor_input" type="number" value={Number(value)} onChange={onChange} maxLength={5} />
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
		<Select
			value={value}
			onChange={onChange}
			options={SelectOptions.MustrewardActive}
		/>
	</div>
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
			imgSrc,
			maxPurchaseVolume,
			shippingDay,
			thresholdMoney
		}, index) => (
			<div className="editor-reward-item-container">
				{/* <img src={imgSrc} alt=""/> */}
				{/* <span className="item-deatail-small-title-saved">구 분 : {value2label(SelectOptions.Reward, isDirectSupport)}</span> */}
				{ maxPurchaseVolume == 0 ? null : <p className="purchase-reward-limit-ing">한정수량 {maxPurchaseVolume}개</p> }
				<p className="purchase-reward-title">{title}</p>
				<p className="purchase-reward-description">{description}</p>
				<p className="purchase-reward-money">{thresholdMoney.toLocaleString()}원</p>
				{ shippingDay == "" || " " ? <p className="purchase-reward-shippingday">펀딩 마감 후 3주 이내 배송 예정</p> : <p className="purchase-reward-shippingday">{shippingDay} 배송 예정</p> }
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
	console.log('RewardForm.value', value);
	const {
		title,
		description,
		isDirectSupport,
		thresholdMoney,
		imgSrc,
		shippingDay,
		maxPurchaseVolume,
	} = value.newReward
	const {
		_onTitle,
		_onDescription,
		_onIsDirectSupport,
		_onThresholdMoney,
		_onImgSrc,
		_onShippingDay,
		_onMaxPurcahseVolum,
	} = handlers


	return (
		<div className="fuding-reward-form-container">
			<div>
				<span className="item-deatail-small-title">리워드 제목</span>
				<input className="editor_input" type="text" value={title} onChange={_onTitle} maxLength={32} />
			</div>

			<div>
				<span className="item-deatail-small-title">리워드 설명</span>
				<input className="editor_input" type="text" value={description} onChange={_onDescription} />
			</div>

			{/* <div>
				<span className="item-deatail-small-title">직/간접 후원 여부</span>
				<Select
					value={isDirectSupport} onChange={_onIsDirectSupport}
					options={SelectOptions.Reward}
				/>
			</div> */}
			
			<div>
				<span className="item-deatail-small-title">한정 수량(0은 한정수량 없음)</span>
				<input className="editor_input" type="number" value={maxPurchaseVolume} onChange={_onMaxPurcahseVolum}/>
			</div>
			

			<div>
				<span className="item-deatail-small-title">배송일</span>
				<input className="editor_input" type="date" value={shippingDay} onChange={_onShippingDay}/>
			</div>

			<div>
				<span className="item-deatail-small-title">리워드 금액</span>
				<input className="editor_input" type="number" value={thresholdMoney} onChange={_onThresholdMoney} step="1000" />
			</div>

			{/* <div>
				<span className="item-deatail-small-title">이미지</span>
				<input type="file" onChange={_onImgSrc} />
				{ imgSrc && <img src={imgSrc} alt="리워드 이미지를 입력하세요." accept="image/*"/> }
			</div> */}

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
		
		etcrewardActive,
		mustrewardActive,
		
		reward,
	},

	// onSubmit callbacks
	_onTargetMoneySubmit,
	_onDateToSubmit,
	_onShippingFeeSubmit,
	_onRewardSubmit,
	
	_onEtcrewardActiveSubmit,
	_onMustrewardActiveSubmit,

	// onChange callbacks
	rewardHandlers,
}) => {

	return (
		<div className="abstract-container">
			
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
				className ="exhibition-long-title"
				classNameopen ="editor-open-container"
			/>
			
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
				title="기타옵션 여부"
				valueType={VALUE_TYPE.SELECT}
				alt="기타옵션 여부를 선택하세요"
				initialValue={etcrewardActive}
				submitCaption={'활성화/비활성화'}
				submitCaptionsub={'선택하기'}
				onSubmit={_onEtcrewardActiveSubmit}
				Wrapper={EtcrewardActiveWrapper}
				Form={EtcrewardActiveForm}
				className ="exhibition-eng-title"
				classNameopen ="editor-open-container-last"
			/>
			
			<span className="editor-small-title2">프로젝트 옵션</span>

			<FormWrapper
				title="리워드 옵션"
				valueType={VALUE_TYPE.REWARD}
				alt="리워드으"
				initialValue={reward}
				submitCaption={'리워드를 추가하세요'}
				submitCaptionsub={'추가하기'}
				onSubmit={_onRewardSubmit}
				handlers={rewardHandlers}
				Wrapper={RewardWrapper}
				Form={RewardForm}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container-middle"
			/>
		</div>
	)
}

export default Funding
