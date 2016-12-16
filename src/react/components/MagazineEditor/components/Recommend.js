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
			<div className="editor-item-detail-wrapper">
				<span className="item-deatail-small-title-saved">제 목 : {title}</span>
				<span className="item-deatail-small-title-saved">설 명 : {description}</span>
				<span className="item-deatail-small-title-saved">링 크 : {link}</span>
				<img src={imgSrc} alt=""/>
				<button className="item-deatail-delete" onClick={() => deleteExhibition(index)}>삭제하기</button>
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
				<span className="item-deatail-small-title">제목</span>
				<input type="text" value={title} onChange={_onTitle}/>
			</div>
			<div>
				<span className="item-deatail-small-title">설명</span>
				<input type="text" value={description} onChange={_onDescription}/>
			</div>
			<div>
				<span className="item-deatail-small-title">링크</span>
				<input type="text" value={link} onChange={_onLink}/>
			</div>
			<div>
				<span className="item-deatail-small-title">이미지</span>
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
			<div className="editor-item-detail-wrapper">
				<span className="item-deatail-small-title-saved">제 목 : {title}</span>
				<span className="item-deatail-small-title-saved">설 명 : {description}</span>
				<span className="item-deatail-small-title-saved">링 크 : {link}</span>
				<img src={imgSrc} alt=""/>
				<button className="item-deatail-delete" onClick={() => deleteMagazine(index)}>삭제하기</button>
			</div>
		) )
		: <span></span>

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
				<span className="item-deatail-small-title">제목</span>
				<input type="text" value={title} onChange={_onTitle}/>
			</div>
			{/* <div>
				<span className="item-deatail-small-title">설명</span>
				<input type="text" value={description} onChange={_onDescription}/>
			</div> */}
			<div>
				<span className="item-deatail-small-title">링크</span>
				<input type="text" value={link} onChange={_onLink}/>
			</div>
			<div>
				<span className="item-deatail-small-title">이미지</span>
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
		<div className="abstract-container">
			{/* <FormWrapper
				title="Recommended Exhibitions"
				valueType={VALUE_TYPE.RECOMMEND}
				alt="관련 전시를 추가하세요"
				initialValue={recommendedExhibitions}
				submitCaption="추가하기"
				onSubmit={_onExhibitionSubmit}
				handlers={exhibitionHandlers}
				Wrapper={ExhibitionWrapper}
				Form={ExhibitionForm}
			/> */}

			<FormWrapper
				title="관련 콘텐츠"
				valueType={VALUE_TYPE.RECOMMEND}
				alt="관련 콘텐츠를 추가하세요"
				initialValue={recommendedMagazines}
				submitCaption="관련 콘텐츠를 추가하세요"
				submitCaptionsub={'추가하기'}
				onSubmit={_onMagazineSubmit}
				handlers={magazineHandlers}
				Wrapper={MagazineWrapper}
				Form={MagazineForm}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container"
			/>
		</div>
	)
}

export default Recommend
