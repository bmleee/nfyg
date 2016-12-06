import React from 'react'
import Select from 'react-select'

import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

import { SelectOptions } from '~/src/react/constants'
import { value2label } from '~/src/react/lib/utils'

// Recommended Exhibition
const ExhibitionWrapper = ({value, handlers}) => {
	const {
		deleteExhibition
	} = handlers

	let items = value && value.recommends && value.recommends.length > 0
		? value.recommends.map( ({
			title,
			description,
			imgSrc,
			link
		}, index) => (
			<div className="recommends-wrapper-item">
				<span>제목: {title}</span>
				<span>설명: {description}</span>
				<span>링크: {link}</span>
				<img src={imgSrc} alt=""/>
				<button onClick={() => deleteExhibition(index)}>삭제하기</button>
			</div>
		) )
		: '관련된 전시를 추가하세요.'

	return (
		<div className="recommends-wrapper-container">
			{ items }
		</div>
	)
}
const ExhibitionForm = ({value, handlers}) => {
	const {
		title,
		description,
		imgSrc,
		link
	} = value.newRecommend

	const {
		_onTitle,
		_onDescription,
		_onImgSrc,
		_onLink,
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
				<span>링크</span>
				<input type="text" value={link} onChange={_onLink}/>
			</div>
			<div>
				<span>이미지</span>
				<input type="file" value={imgSrc} onChange={_onImgSrc} accept="image/*" />
			</div>
		</div>
	)
}


// Recommended Magazine
const MagazineWrapper = ({value, handlers}) => {
	const {
		deleteMagazine
	} = handlers

	let items = value && value.recommends && value.recommends.length > 0
		? value.recommends.map( ({
			title,
			description,
			imgSrc,
			link
		}, index) => (
			<div className="recommends-wrapper-item">
				<span>제목: {title}</span>
				<span>설명: {description}</span>
				<span>링크: {link}</span>
				<img src={imgSrc} alt=""/>
				<button onClick={() => deleteMagazine(index)}>삭제하기</button>
			</div>
		) )
		: '관련된 매거진을 추가하세요.'

	return (
		<div className="recommends-wrapper-container">
			{ items }
		</div>
	)
}
const MagazineForm = ({value, handlers}) => {
	console.log('handlers', handlers)

	const {
		title,
		description,
		imgSrc,
		link,
	} = value.newRecommend

	const {
		_onTitle,
		_onDescription,
		_onImgSrc,
		_onLink,
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
				<span>링크</span>
				<input type="text" value={link} onChange={_onLink}/>
			</div>
			<div>
				<span>이미지</span>
				<input type="file" value={imgSrc} onChange={_onImgSrc} accept="image/*" />
			</div>
		</div>
	)
}

const Recommend = ({
	recommendedExhibitions,
	recommendedMagazines,

	_onExhibitionSubmit,
	_onMagazineSubmit,

	exhibitionHandlers,
	magazineHandlers,
}) => {
	return (
		<div className="recommend-container">
			<FormWrapper
				title="Recommended Exhibitions"
				valueType={VALUE_TYPE.RECOMMEND}
				alt="관련 전시를 추가하세요"
				initialValue={recommendedExhibitions}
				submitCaption="추가하기"
				onSubmit={_onExhibitionSubmit}
				handlers={exhibitionHandlers}
				Wrapper={ExhibitionWrapper}
				Form={ExhibitionForm}
			/>

			<FormWrapper
				title="Recommended Magazines"
				valueType={VALUE_TYPE.RECOMMEND}
				alt="관련 매거진을 추가하세요"
				initialValue={recommendedMagazines}
				submitCaption="추가하기"
				onSubmit={_onMagazineSubmit}
				handlers={magazineHandlers}
				Wrapper={MagazineWrapper}
				Form={MagazineForm}
			/>
		</div>
	)
}

export default Recommend
