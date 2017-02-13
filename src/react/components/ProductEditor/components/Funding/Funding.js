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
const MinBuyerWrapper = ({value}) => (
	<span>{value}</span>
)
const MinBuyerForm = ({value, onChange}) => (
	<input type="number" value={value} onChange={onChange} />
)
const MaxBuyerWrapper = ({value}) => (
	<span>{value}</span>
)
const MaxBuyerForm = ({value, onChange}) => (
	<input type="number" value={value} onChange={onChange} />
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
			<div className="editor-item-detail-wrapper">
				<img src={imgSrc} alt=""/>
				<span className="item-deatail-small-title-saved">제 목 : {title}</span>
				<span className="item-deatail-small-title-saved">설 명 : {description}</span>
				<span className="item-deatail-small-title-saved">구 분 : {value2label(SelectOptions.Reward, isDirectSupport)}</span>
				<span className="item-deatail-small-title-saved">가 격 : {thresholdMoney.toLocaleString()}원</span>
				{/* <span className="item-deatail-small-title-saved">최대구매수량 : {maxPurchaseVolume}</span> */}
				<span className="item-deatail-small-title-saved">배송일 : {shippingDay}</span>
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
				<span className="item-deatail-small-title">옵션 제목</span>
				<input type="text" value={title} onChange={_onTitle} />
			</div>

			<div>
				<span className="item-deatail-small-title">옵션 설명</span>
				<input type="text" value={description} onChange={_onDescription} />
			</div>

			<div>
				<span className="item-deatail-small-title">직/간접 후원 여부</span>
				<Select
					value={isDirectSupport} onChange={_onIsDirectSupport}
					options={SelectOptions.Reward}
				/>
			</div>
			{/*
			<div>
				<span className="item-deatail-small-title">최대 구매 수량</span>
				<input type="number" value={maxPurchaseVolume} onChange={_onMaxPurcahseVolum}/>
			</div>
			*/}

			<div>
				<span className="item-deatail-small-title">배송일</span>
				<input type="date" value={shippingDay} onChange={_onShippingDay}/>
			</div>

			<div>
				<span className="item-deatail-small-title">제품 금액</span>
				<input type="number" value={thresholdMoney} onChange={_onThresholdMoney} step="1000" />
			</div>

			<div>
				<span className="item-deatail-small-title">이미지</span>
				<input type="file" onChange={_onImgSrc} accept="image/*" />
				{ imgSrc && <img src={imgSrc} alt="제품 이미지를 입력하세요." accept="image/*"/> }
			</div>

		</div>
	)
}

const FaqWrapper = ({value, handlers}) => {
	const {
		deleteFAQ
	} = handlers

	const items = !!value && !!value.faqs && value.faqs.length > 0
		? value.faqs.map(({
			question,
			answer
		}, index) => (
			<div className="editor-item-detail-wrapper">
				<span className="item-deatail-small-title-saved">질 문 : {question}</span>
				<span className="item-deatail-small-title-saved">답 변 : {answer}</span>
				<button className="item-deatail-delete" onClick={() => deleteFAQ(index)}>삭제하기</button>
			</div>
		))
		: <span></span>

	return (
		<div className="reward-wrapper-container">
			{items}
		</div>
	)
}
const FaqForm = ({value, handlers}) => {
	const {
		question,
		answer
	} = value.newFaq
	const {
		_onQuestion,
		_onAnswer
	} = handlers

	return (
		<div className="funding-reward-form-container">
			<div>
				<span className="item-deatail-small-title">질 문</span>
				<input type="text" value={question} onChange={_onQuestion} />
			</div>

			<div>
				<span className="item-deatail-small-title">답 변</span>
				<input type="text" value={answer} onChange={_onAnswer} />
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
		minPurchaseVolume,
		maxPurchaseVolume,

		reward,
		faq,
	},

	// onSubmit callbacks
	_onTargetMoneySubmit,
	_onDateToSubmit,
	_onShippingFeeSubmit,
	_onMinBuyerSubmit,
	_onMaxBuyerSubmit,

	_onRewardSubmit,
	_onFaqSubmit,

	// onChange callbacks
	rewardHandlers,
	faqHandlers,
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
				title="미술소품 종료일"
				valueType={VALUE_TYPE.DATE}
				alt="프로젝트 종료일을 입력하세요"
				initialValue={dateTo}
				submitCaption={'미술소품 종료일을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onDateToSubmit}
				Wrapper={DateToWrapper}
				Form={DateToForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="미술소품 옵션"
				valueType={VALUE_TYPE.REWARD}
				alt="리워드으"
				initialValue={reward}
				submitCaption={'미술소품을 추가하세요'}
				submitCaptionsub={'추가하기'}
				onSubmit={_onRewardSubmit}
				handlers={rewardHandlers}
				Wrapper={RewardWrapper}
				Form={RewardForm}
				className ="exhibition-eng-title"
				classNameopen ="editor-open-container"
			/>
			
			<span className="editor-small-title">자주묻는 질문</span>

			<FormWrapper
				title="자주묻는 질문"
				valueType={VALUE_TYPE.FAQ}
				alt="FAQ"
				initialValue={faq}
				submitCaption={'자주묻는 질문을 추가하세요'}
				submitCaptionsub={'추가하기'}
				onSubmit={_onFaqSubmit}
				handlers={faqHandlers}
				Wrapper={FaqWrapper}
				Form={FaqForm}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container"
			/>


		</div>
	)
}

export default Funding
