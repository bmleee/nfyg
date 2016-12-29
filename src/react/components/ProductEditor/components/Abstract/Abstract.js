import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

import { value2label } from '~/src/react/lib/utils'

import { SelectOptions } from '~/src/react/constants'

// ----
const LongTitleWrapper = ({value}) => (
	<span>{value}</span>
)
const LongTitleForm = ({value, onChange}) => (
	<input type="text" value={value} onChange={onChange} />
)

// ----
const ShortTitleWrapper = ({value}) => (
	<span>{value}</span>
)
const ShortTitleForm = ({value, onChange}) => (
	<input type="text" value={value} onChange={onChange} />
)

// ----
const ImgSrcWrapper = ({value}) => !!value
? (
		<img src={value} alt=""/>
)
: (
	<span></span>
)
const ImgSrcForm = ({value, onChange}) => (
	<input type="file" value={value} onChange={onChange} />
)

// ----
const CategoryWrapper = ({value}) => (
	<span>{value2label(SelectOptions.ProductCategory, value)}</span>
)
const CategoryForm = ({value, onChange}) => (
	<Select
		value={value}
		onChange={onChange}
		options={SelectOptions.ProductCategory}
	/>
)

// ----
const ProductNameWrapper = ({value}) => !!value
?	<span>{value}</span>
: <span></span>
const ProductNameForm = ({value, onChange}) => (
	<input type="text" value={value} onChange={onChange} />
)

// ----
const StateWrapper = ({value}) => !!value
?	<span>{value2label(SelectOptions.ProductState, value)}</span>
: <span></span>
const StateForm = ({value, onChange}) => (
	<Select
		value={value}
		onChange={onChange}
		options={SelectOptions.ProductState}
	/>
)

// ----
const PostIntroWrapper = ({value}) => !!value
?	<span>{value}</span>
: <span></span>
const PostIntroForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange}/>

// ----
const CreatorNameWrapper = ({value}) => !!value
? <span>{value}</span>
: <span></span>
const CreatorNameForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange}/>

// ----
const CreatorImgSrcWrapper = ({value}) => !!value
? <img src={value} alt=""/>
: <span></span>
const CreatorImgSrcForm = ({value, onChange}) =>
	<input type="file" value={value} onChange={onChange}/>

// ----
const CreatorDescriptionWrapper = ({value}) => !!value
? <span>{value}</span>
: <span></span>
const CreatorDescriptionForm = ({value, onChange}) =>
	<textarea rows="3" cols="45" value={value} onChange={onChange}/>

// ----
const SponsorNameWrapper = ({value}) => !!value
? <span>{value}</span>
: <span></span>
const SponsorNameForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange}/>



const Abstract = ({
	abstract: {
		longTitle,
		shortTitle,
		imgSrc,
		category,
		productName,
		state,
		postIntro,
	},
	creator: {
		creatorName,
		creatorImgSrc,
		creatorDescription,
	},
	sponsor: {
		sponsorName,
	},

	// onSubmit callbacks
	_onLongTitleSubmit,
	_onShortTitleSubmit,
	_onImgSrcSubmit,
	_onCategorySubmit,
	_onProductNameSubmit,
	_onStateSubmit,
	_onPostIntroSubmit,

	_onCreatorNameSubmit,
	_onCreatorImgSrcSubmit,
	_onCreatorDescriptionSubmit,

	_onSponsorNameSubmit,
}) => {


	return (
		<div className="abstract-container">
			<span className="editor-small-title">프로젝트 개요</span>
		
			<FormWrapper
				title="프로젝트 제목"
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
				title="프로젝트 짧은 제목"
				valueType={VALUE_TYPE.TEXT}
				alt="짧은 제목을 입력하세요"
				initialValue={shortTitle}
				submitCaption={'전시 짧은 제목을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onShortTitleSubmit}
				Wrapper={ShortTitleWrapper}
				Form={ShortTitleForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="프로젝트 대표이미지"
				valueType={VALUE_TYPE.IMAGE}
				alt="프로젝트 이미지를 추가하세요"
				initialValue={imgSrc}
				submitCaption={'대표이미지를 등록하세요'}
				submitCaptionsub={'등록하기'}
				onSubmit={_onImgSrcSubmit}
				Wrapper={ImgSrcWrapper}
				Form={ImgSrcForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="프로젝트 카테고리"
				valueType={VALUE_TYPE.SELECT}
				alt="프로젝트 카테고리를 선택하세요"
				initialValue={category}
				submitCaption={'카테고리를 선택하세요'}
				submitCaptionsub={'선택하기'}
				onSubmit={_onCategorySubmit}
				Wrapper={CategoryWrapper}
				Form={CategoryForm}
				classNameopen ="editor-open-container"
			/>

			{/* <FormWrapper
				title="Abstract Product Name"
				valueType={VALUE_TYPE.TEXT}
				alt="프로젝트 이름을 입력하세요"
				initialValue={productName}
				submitCaption={'전시 제목을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onProductNameSubmit}
				Wrapper={ProductNameWrapper}
				Form={ProductNameForm}
				classNameopen ="editor-open-container"
			/> */}

			<FormWrapper
				title="프로젝트 상태"
				valueType={VALUE_TYPE.SELECT}
				alt="프로젝트 진행 상황을 선택하세요"
				initialValue={state}
				submitCaption={'프로젝트 상태를 선택하세요'}
				submitCaptionsub={'선택하기'}
				onSubmit={_onStateSubmit}
				Wrapper={StateWrapper}
				Form={StateForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="프로젝트 요약"
				valueType={VALUE_TYPE.TEXT}
				alt="포스트탭에서 보여줄 인트로 문구를 입력하세요"
				initialValue={postIntro}
				submitCaption={'요약 내용을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onPostIntroSubmit}
				Wrapper={PostIntroWrapper}
				Form={PostIntroForm}
				className ="exhibition-eng-title"
				classNameopen ="editor-open-container"
			/>

			<span className="editor-small-title">프로젝트 진행자</span>

			<FormWrapper
				title="진행자 이름"
				valueType={VALUE_TYPE.TEXT}
				alt="작성자 이름을 입력하세요"
				initialValue={creatorName}
				submitCaption={'진행자 이름을 입력하세요'}
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
				alt="작성자 이미지를 입력하세요"
				initialValue={creatorImgSrc}
				submitCaption={'프로필 이미지를 등록하세요'}
				submitCaptionsub={'등록하기'}
				onSubmit={_onCreatorImgSrcSubmit}
				Wrapper={CreatorImgSrcWrapper}
				Form={CreatorImgSrcForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="진행자 소개"
				valueType={VALUE_TYPE.IMAGE}
				alt="작성자에 대해 간략히 설명해주세요"
				initialValue={creatorDescription}
				submitCaption={'진행자를 간략히 소개해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onCreatorDescriptionSubmit}
				Wrapper={CreatorDescriptionWrapper}
				Form={CreatorDescriptionForm}
				className ="exhibition-eng-title"
				classNameopen ="editor-open-container"
			/>

			<span className="editor-small-title">스폰서 이름</span>

			<FormWrapper
				title="스폰서 이름"
				valueType={VALUE_TYPE.TEXT}
				alt="스폰서 이름을 입력 해 주세요"
				initialValue={sponsorName}
				submitCaption={'스폰서 이름을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onSponsorNameSubmit}
				Wrapper={SponsorNameWrapper}
				Form={SponsorNameForm}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container"
			/>

		</div>
	)
}

export default Abstract