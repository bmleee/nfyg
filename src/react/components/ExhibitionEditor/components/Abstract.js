import React from 'react'

import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

import { value2label, date2string } from '~/src/react/lib/utils'

// ----
const LongTitleWrapper = ({value}) => value
	? <span>{value}</span>
	: <span></span>
const LongTitleForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange} />

// ----
const ShortTitleWrapper = ({value}) => value
	? <span>{value}</span>
	: <span></span>
const ShortTitleForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange} />

// ----
const ImgSrcWrapper = ({value}) => value
	? <img src={value} alt=""/>
	: <span></span>
const ImgSrcForm = ({value, onChange}) =>
	<input type="file" value={value} onChange={onChange} accept="Image/*" />

// ----
const LocationWrapper = ({value}) => value
	? <span>{value}</span>
	: <span></span>
const LocationForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange} />

// ----
const DateFromWrapper = ({value}) => value
	? <span>{date2string(value)}</span>
	: <span></span>
const DateFromForm = ({value, onChange}) =>
	<input type="date" value={value} onChange={onChange} />

// ----
const DateToWrapper = ({value}) => value
	? <span>{date2string(value)}</span>
	: <span></span>
const DateToForm = ({value, onChange}) =>
	<input type="date" value={value} onChange={onChange} />

// ----
const ExhibitionNameWrapper = ({value}) => value
	? <span>{value}</span>
	: <span></span>
const ExhibitionNameForm = ({value, onChange}) =>
	<input type="textarea" value={value} onChange={onChange} />


// ----
const CreatorNameWrapper = ({value}) => value
	? <span>{value}</span>
	: <span></span>
const CreatorNameForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange} />

// ----
const CreatorImgSrcWrapper = ({value}) => value
	? <img src={value} alt=""/>
	: <span></span>
const CreatorImgSrcForm = ({value, onChange}) =>
	<input type="file" value={value} onChange={onChange} accept="Image/*" />

// ----
const CreatorLocationWrapper = ({value}) => value
	? <span>{value}</span>
	: <span></span>
const CreatorLocationForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange} />

// ----
const CreatorDescriptionWrapper	 = ({value}) => value
	? <span>{value}</span>
	: <span></span>
const CreatorDescriptionForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange} />


const Abstract = ({
	abstract: {
		longTitle,
		shortTitle,
		imgSrc,
		location,
		dateFrom,
		dateTo,
		exhibitionName,
	},

	creator: {
		creatorName,
		creatorImgSrc,
		creatorLocation,
		creatorDescription,
	},

	_onLongTitleSubmit,
	_onShortTitleSubmit,
	_onImgSrcSubmit,
	_onLocationSubmit,
	_onDateFromSubmit,
	_onDateToSubmit,
	_onExhibitionNameSubmit,

	_onCreatorNameSubmit,
	_onCreatorImgSrcSubmit,
	_onCreatorLocationSubmit,
	_onCreatorDescriptionSubmit,

}) => {
	return (
		<div className="abstract-container">
			<span className="editor-small-title">전시 개요</span>
			
			<FormWrapper
				title="전시 제목"
				valueType={VALUE_TYPE.TEXT}
				alt="제목을 입력하세요"
				initialValue={longTitle}
				submitCaption={'전시 제목을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onLongTitleSubmit}
				Wrapper={LongTitleWrapper}
				Form={LongTitleForm}
				className ="exhibition-long-title"
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="전시 장르"
				valueType={VALUE_TYPE.TEXT}
				alt="전시 장르를 입력하세요"
				initialValue={shortTitle}
				submitCaption="전시 장르를 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onShortTitleSubmit}
				Wrapper={ShortTitleWrapper}
				Form={ShortTitleForm}
				className ="exhibition-short-title"
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="전시 대표이미지"
				valueType={VALUE_TYPE.IMAGE}
				alt=""
				initialValue={imgSrc}
				submitCaption="전시 대표이미지를 등록하세요"
				submitCaptionsub={'등록하기'}
				onSubmit={_onImgSrcSubmit}
				Wrapper={ImgSrcWrapper}
				Form={ImgSrcForm}
				className ="exhibition-abstract-img"
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="전시 장소"
				valueType={VALUE_TYPE.TEXT}
				alt=""
				initialValue={location}
				submitCaption="전시 장소를 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onLocationSubmit}
				Wrapper={LocationWrapper}
				Form={LocationForm}
				className ="exhibition-abstract-location"
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="전시 시작일"
				valueType={VALUE_TYPE.DATE}
				alt=""
				initialValue={dateFrom}
				submitCaption="전시 시작일을 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onDateFromSubmit}
				Wrapper={DateFromWrapper}
				Form={DateFromForm}
				className ="exhibition-abstract-start"
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="전시 종료일"
				valueType={VALUE_TYPE.DATE}
				alt=""
				initialValue={dateTo}
				submitCaption="전시 종료일을 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onDateToSubmit}
				Wrapper={DateToWrapper}
				Form={DateToForm}
				className ="exhibition-abstract-end"
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="전시 영문 제목"
				valueType={VALUE_TYPE.TEXT}
				alt=""
				initialValue={exhibitionName}
				submitCaption="전시 영문 제목을 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onExhibitionNameSubmit}
				Wrapper={ExhibitionNameWrapper}
				Form={ExhibitionNameForm}
				className ="exhibition-eng-title"
				classNameopen ="editor-open-container"
			/>

			<span className="editor-small-title">작가 정보</span>

			<FormWrapper
				title="작가 이름"
				valueType={VALUE_TYPE.TEXT}
				alt=""
				initialValue={creatorName}
				submitCaption="작가의 이름을 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onCreatorNameSubmit}
				Wrapper={CreatorNameWrapper}
				Form={CreatorNameForm}
				className ="exhibition-creater-name"
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="프로필 이미지"
				valueType={VALUE_TYPE.IMAGE}
				alt=""
				initialValue={creatorImgSrc}
				submitCaption="작가의 이미지를 등록하세요"
				submitCaptionsub={'등록하기'}
				onSubmit={_onCreatorImgSrcSubmit}
				Wrapper={CreatorImgSrcWrapper}
				Form={CreatorImgSrcForm}
				classNameopen ="editor-open-container"
			/> 


			<FormWrapper
				title="작가 활동 지역"
				valueType={VALUE_TYPE.TEXT}
				alt=""
				initialValue={creatorLocation}
				submitCaption="작가의 활동지역 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onCreatorLocationSubmit}
				Wrapper={CreatorLocationWrapper}
				Form={CreatorLocationForm}
				classNameopen ="editor-open-container"
			/> 

			<FormWrapper
				title="작가 소개"
				valueType={VALUE_TYPE.TEXT}
				alt=""
				initialValue={creatorDescription}
				submitCaption="작가를 간략히 설명해주세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onCreatorDescriptionSubmit}
				Wrapper={CreatorDescriptionWrapper}
				Form={CreatorDescriptionForm}
				className ="exhibition-creater-info"
				classNameopen ="editor-open-container"
			/>

		</div>
	)
}

export default Abstract
