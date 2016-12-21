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
const MagazineNameWrapper = ({value}) => value
	? <span>{value}</span>
	: <span></span>
const MagazineNameForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange} />

// ----
const MagazineDescriptionWrapper = ({value}) => value
	? <span>{value}</span>
	: <span>전시를 10자 이내 3줄 이내로 설명해 주세요</span>
const MagazineDescriptionForm = ({value, onChange}) =>
	// <input type="textarea" value={value} onChange={onChange} />
	<textarea value={value} onChange={onChange} cols="30" rows="3"/>


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
		magazineName,
		description
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
	_onMagazineNameSubmit,

	_onCreatorNameSubmit,
	_onCreatorImgSrcSubmit,
	_onCreatorLocationSubmit,
	_onCreatorDescriptionSubmit,

	_onDescriptionSubmit

}) => {
	return (
		<div className="abstract-container">
			<FormWrapper
				title="매거진 제목"
				valueType={VALUE_TYPE.TEXT}
				alt="제목을 입력하세요"
				initialValue={longTitle}
				submitCaption="매거진 제목을 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onLongTitleSubmit}
				Wrapper={LongTitleWrapper}
				Form={LongTitleForm}
				className ="exhibition-long-title"
				classNameopen ="editor-open-container"
			/>

			{/* <FormWrapper
				title="Abstract Short Title"
				valueType={VALUE_TYPE.TEXT}
				alt="짧은 제목을 입력하세요"
				initialValue={shortTitle}
				submitCaption="작가를 간략히 설명해주세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onShortTitleSubmit}
				Wrapper={ShortTitleWrapper}
				Form={ShortTitleForm}
				classNameopen ="editor-open-container"
			/> */}

			<FormWrapper
				title="대표이미지"
				valueType={VALUE_TYPE.IMAGE}
				alt=""
				initialValue={imgSrc}
				submitCaption="대표이미지를 등록하세요"
				submitCaptionsub={'등록하기'}
				onSubmit={_onImgSrcSubmit}
				Wrapper={ImgSrcWrapper}
				Form={ImgSrcForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="매거진 영문 제목"
				valueType={VALUE_TYPE.TEXT}
				alt=""
				initialValue={magazineName}
				submitCaption="영문 제목을 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onMagazineNameSubmit}
				Wrapper={MagazineNameWrapper}
				Form={MagazineNameForm}
				className ="exhibition-eng-title"
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="Abstract Magazine Description"
				valueType={VALUE_TYPE.TEXT}
				alt=""
				initialValue={description}
				submitCaption="입력하기"
				onSubmit={_onDescriptionSubmit}
				Wrapper={MagazineDescriptionWrapper}
				Form={MagazineDescriptionForm}
			/>

			<span className="editor-small-title">작성자 정보</span>
			
			<FormWrapper
				title="이 름"
				valueType={VALUE_TYPE.TEXT}
				alt=""
				initialValue={creatorName}
				ssubmitCaption="이름을 입력하세요"
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
				submitCaption="이미지를 등록하세요"
				submitCaptionsub={'등록하기'}
				onSubmit={_onCreatorImgSrcSubmit}
				Wrapper={CreatorImgSrcWrapper}
				Form={CreatorImgSrcForm}
				classNameopen ="editor-open-container"
			/>

			{/*
			<FormWrapper
				title="Creator Location"
				valueType={VALUE_TYPE.TEXT}
				alt=""
				initialValue={creatorLocation}
				submitCaption="작가를 간략히 설명해주세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onCreatorLocationSubmit}
				Wrapper={CreatorLocationWrapper}
				Form={CreatorLocationForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="Creator Description"
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
			/> */}

		</div>
	)
}

export default Abstract
