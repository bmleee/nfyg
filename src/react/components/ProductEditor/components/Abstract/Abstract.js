import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

import { value2label } from '~/src/react/lib/utils'

import { SelectOptions } from '~/src/react/constants'

import { fetchOptions } from '~/src/react/api/AppAPI'

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
const ImgSrcForm = ({value, onChange}) =>
	<img src={value} alt=""/>

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
	<img src={value} alt=""/>

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
	// <input type="text" value={value} onChange={onChange}/>
	<Select.async
		value={value}
		onChange={onChange}
		loadOptions={async () => await fetchOptions('sponsor')}
	/>

	// ----
	const RelatedContentWrapper = ({value, handlers}) => {
		const {
			deleteContent
		} = handlers

		let item = value && value.contents && value.contents.length > 0
			? value.contents.map(({
				title,
				imgSrc,
				link
			}, index) => (
				<div className="editor-item-detail-wrapper">
					<span className="item-deatail-small-title-saved">제 목 : {title}</span>
					<span className="item-deatail-small-title-saved">링 크 : {link}</span>
					<img src={imgSrc}/>
					<button className="item-deatail-delete" onClick={() => deleteContent(index)}>삭제하기</button>
				</div>
			))
			: <span></span>

		return (
			<div className="recommends-wrapper-container">
				{ item }
			</div>
		)
	}
	const RelatedContentForm = ({value, handlers}) => {
		const {
			title,
			imgSrc,
			link
		} = value.newContent

		const {
			_onTitle,
			_onImgSrc,
			_onLink
		} = handlers

		return (
			<div className="recommends-form-container">
				<div>
					<span className="item-deatail-small-title">제목</span>
					<input type="text" value={title} onChange={_onTitle}/>
				</div>
				<div>
					<span className="item-deatail-small-title">링크</span>
					<input type="text" value={link} onChange={_onLink}/>
				</div>
				<div>
					<span className="item-deatail-small-title">이미지</span>
					<input type="file" onChange={_onImgSrc} accept="image/*" />
					<img src={imgSrc} alt="관런 콘텐츠 이미지를 추가하세요"/>
				</div>
			</div>
		)
	}

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

	relatedContent,

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

	_onContentSubmit,

	contentHandlers,
}) => {


	return (
		<div className="abstract-container">
			<span className="editor-small-title">미술소품 개요</span>

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

			<FormWrapper
				title="미술소품 영문 이름"
				valueType={VALUE_TYPE.TEXT}
				alt="미술소품 영문 이름을 입력하세요"
				initialValue={productName}
				submitCaption={'미술소품 영문 이름을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onProductNameSubmit}
				Wrapper={ProductNameWrapper}
				Form={ProductNameForm}
				classNameopen ="editor-open-container"
			/>

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
				className ="creater-profile-img"
				classNameopen ="creater-profile-img-open"
			/>

			<FormWrapper
				title="진행자 소개"
				valueType={VALUE_TYPE.TEXT}
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

			{/* <span className="editor-small-title">스폰서 이름</span> */}

			{/* <FormWrapper
				title="스폰서 이름"
				valueType={VALUE_TYPE.SELECT}
				alt="스폰서 이름을 입력 해 주세요"
				initialValue={sponsorName}
				submitCaption={'스폰서 이름을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onSponsorNameSubmit}
				Wrapper={SponsorNameWrapper}
				Form={SponsorNameForm}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container"
			/> */}

			<span className="editor-small-title">관련 콘텐츠</span>

			<FormWrapper
				title="관련 콘텐츠"
				valueType={VALUE_TYPE.RECOMMEND}
				alt="관련 콘텐츠를 추가하세요"
				initialValue={relatedContent}
				submitCaption="관련 콘텐츠를 추가하세요"
				submitCaptionsub={'추가하기'}
				onSubmit={_onContentSubmit}
				handlers={contentHandlers}
				Wrapper={RelatedContentWrapper}
				Form={RelatedContentForm}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container"
			/>


		</div>
	)
}

export default Abstract
