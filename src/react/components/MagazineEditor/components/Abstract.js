import React from 'react'

import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

import { value2label, date2string } from '~/src/react/lib/utils'

// ----
const LongTitleWrapper = ({value}) => value
	? <span>{value}</span>
	: <span>긴 제목을 입력하세요</span>
const LongTitleForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange} />

// ----
const ShortTitleWrapper = ({value}) => value
	? <span>{value}</span>
	: <span>짧은 제목을 입력하세요</span>
const ShortTitleForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange} />

// ----
const ImgSrcWrapper = ({value}) => value
	? <img src={value} alt=""/>
	: <span>전시 이미지를 입력하세요</span>
const ImgSrcForm = ({value, onChange}) =>
	<input type="file" value={value} onChange={onChange} accept="Image/*" />

// ----
const MagazineNameWrapper = ({value}) => value
	? <span>{value}</span>
	: <span>전시 영문 제목을 입력하세요</span>
const MagazineNameForm = ({value, onChange}) =>
	<input type="textarea" value={value} onChange={onChange} />


// ----
const CreatorNameWrapper = ({value}) => value
	? <span>{value}</span>
	: <span>작가의 이름을 입력하세요</span>
const CreatorNameForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange} />

// ----
const CreatorImgSrcWrapper = ({value}) => value
	? <img src={value} alt=""/>
	: <span>작가의 이미지를 추가하세요</span>
const CreatorImgSrcForm = ({value, onChange}) =>
	<input type="file" value={value} onChange={onChange} accept="Image/*" />

// ----
const CreatorLocationWrapper = ({value}) => value
	? <span>{value}</span>
	: <span>작가의 위치를 입력하세요</span>
const CreatorLocationForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange} />

// ----
const CreatorDescriptionWrapper	 = ({value}) => value
	? <span>{value}</span>
	: <span>작가를 간략하게 설명 해주세요</span>
const CreatorDescriptionForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange} />


const Abstract = ({
	abstract: {
		longTitle,
		shortTitle,
		imgSrc,
		magazineName,
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

}) => {
	return (
		<div className="abstract-container">
			<FormWrapper
				title="Abstract Long Title"
				valueType={VALUE_TYPE.TEXT}
				alt="제목을 입력하세요"
				initialValue={longTitle}
				submitCaption="입력하기"
				onSubmit={_onLongTitleSubmit}
				Wrapper={LongTitleWrapper}
				Form={LongTitleForm}
			/>

			<FormWrapper
				title="Abstract Short Title"
				valueType={VALUE_TYPE.TEXT}
				alt="짧은 제목을 입력하세요"
				initialValue={shortTitle}
				submitCaption="입력하기"
				onSubmit={_onShortTitleSubmit}
				Wrapper={ShortTitleWrapper}
				Form={ShortTitleForm}
			/>

			<FormWrapper
				title="Abstract Image"
				valueType={VALUE_TYPE.IMAGE}
				alt=""
				initialValue={imgSrc}
				submitCaption="추가하기"
				onSubmit={_onImgSrcSubmit}
				Wrapper={ImgSrcWrapper}
				Form={ImgSrcForm}
			/>

			<FormWrapper
				title="Abstract Magazine Name"
				valueType={VALUE_TYPE.TEXT}
				alt=""
				initialValue={magazineName}
				submitCaption="입력하기"
				onSubmit={_onMagazineNameSubmit}
				Wrapper={MagazineNameWrapper}
				Form={MagazineNameForm}
			/>

			<span>----</span>

			<FormWrapper
				title="Creator Name"
				valueType={VALUE_TYPE.TEXT}
				alt=""
				initialValue={creatorName}
				submitCaption="입력하기"
				onSubmit={_onCreatorNameSubmit}
				Wrapper={CreatorNameWrapper}
				Form={CreatorNameForm}
			/>

			<FormWrapper
				title="Creator Image"
				valueType={VALUE_TYPE.IMAGE}
				alt=""
				initialValue={creatorImgSrc}
				submitCaption="입력하기"
				onSubmit={_onCreatorImgSrcSubmit}
				Wrapper={CreatorImgSrcWrapper}
				Form={CreatorImgSrcForm}
			/>


			<FormWrapper
				title="Creator Location"
				valueType={VALUE_TYPE.TEXT}
				alt=""
				initialValue={creatorLocation}
				submitCaption="입력하기"
				onSubmit={_onCreatorLocationSubmit}
				Wrapper={CreatorLocationWrapper}
				Form={CreatorLocationForm}
			/>

			<FormWrapper
				title="Creator Description"
				valueType={VALUE_TYPE.TEXT}
				alt=""
				initialValue={creatorDescription}
				submitCaption="입력하기"
				onSubmit={_onCreatorDescriptionSubmit}
				Wrapper={CreatorDescriptionWrapper}
				Form={CreatorDescriptionForm}
			/>

		</div>
	)
}

export default Abstract
