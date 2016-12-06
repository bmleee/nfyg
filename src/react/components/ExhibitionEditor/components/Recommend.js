import React from 'react'
import Select from 'react-select'

import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

import { SelectOptions } from '~/src/react/constants'
import { value2label } from '~/src/react/lib/utils'

const RecommendWrapper = ({value, handlers}) => {

	let {
		deleteRecommend
	} = handlers

	let items = !!value.recommends && value.recommends.length > 0
		? value.artworks.map( ({
			title,
			description,
			price,
			imgSrc,
			soldOut,
		}, index) => {
			<div className="recommends-wrapper-item">
				<span>{title}</span>
				<span>{description}</span>
				<img src={imgSrc} alt=""/>
				<button onClick={() => deleteRecommend(index)}>삭제하기</button>
			</div>
		} )
		: '관련된 다른 전시들을 입력하세요.'

	return (
		<div className="recommends-wrapper-container">
			{ items }
		</div>
	)
}

const RecommendForm = ({value, handlers}) => {
	console.log('handlers', handlers)

	const {
		title,
		description,
		imgSrc,
		soldOut
	} = value.newArtwork

	const {
		_onTitle,
		_onDescription,
		_onImgSrc,
		_onSoldOut,
	} = handlers

	return (
		<div className="recommends-form-container">
			<div>
				<span>제목</span>
				<input type="text" value={title} onChange={_onTitle}/>
			</div>
			<div>
				<span>설명</span>
				<input type="text" value={description} onChange={_onDescription}/>
			</div>
			<div>
				<span>이미지</span>
				<input type="file" value={imgSrc} onChange={_onImgSrc} accept="image/*" />
			</div>
		</div>
	)
}

const Recommend = ({
	recommend,

	_onRecommendSubmit,

	// onChange callbacks
	recommendHandlers,
}) => {
	return (
		<div className="artwork-container">
			<FormWrapper
				title="Artworks"
				valueType={VALUE_TYPE.RECOMMEND}
				alt="제목을 입력하세요"
				initialValue={recommend}
				submitCaption="입력하기"
				onSubmit={_onRecommendSubmit}
				handlers={recommendHandlers}
				Wrapper={RecommendWrapper}
				Form={RecommendForm}
			/>
		</div>
	)
}

export default Recommend
