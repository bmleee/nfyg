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
	<span>프로젝트 이미지를 입력하세요</span>
)
const ImgSrcForm = ({value, onChange}) => (
	<input type="file" value={value} onChange={onChange} />
)

// ----
const CategoryWrapper = ({value}) => (
	<span>{value2label(SelectOptions.ProjectCategory, value)}</span>
)
const CategoryForm = ({value, onChange}) => (
	<Select
		value={value}
		onChange={onChange}
		options={SelectOptions.ProjectCategory}
	/>
)

// ----
const ProjectNameWrapper = ({value}) => !!value
?	<span>{value}</span>
: <div>프로젝트 이름을 입력하세요</div>
const ProjectNameForm = ({value, onChange}) => (
	<input type="text" value={value} onChange={onChange} />
)

// ----
const StateWrapper = ({value}) => !!value
?	<span>{value2label(SelectOptions.ProjectState, value)}</span>
: <div>프로젝트 진행 상황을 입력하세요</div>
const StateForm = ({value, onChange}) => (
	<Select
		value={value}
		onChange={onChange}
		options={SelectOptions.ProjectState}
	/>
)

// ----
const PostIntroWrapper = ({value}) => !!value
?	<span>{value}</span>
: <div>Post 탭에 보여질 인트로 문구를 입력하세요</div>
const PostIntroForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange}/>

// ----
const CreatorNameWrapper = ({value}) => !!value
? <span>{value}</span>
: <div>작성자 이름을 입력하세요</div>
const CreatorNameForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange}/>

// ----
const CreatorImgSrcWrapper = ({value}) => !!value
? <img src={value} alt=""/>
: <div>작성자 이미지를 입력하세요</div>
const CreatorImgSrcForm = ({value, onChange}) =>
	<input type="file" value={value} onChange={onChange}/>

// ----
const CreatorDescriptionWrapper = ({value}) => !!value
? <span>{value}</span>
: <div>작성자에 대한 간략한 설명을 적어주세요</div>
const CreatorDescriptionForm = ({value, onChange}) =>
	<textarea rows="3" cols="45" value={value} onChange={onChange}/>

// ----
const SponsorNameWrapper = ({value}) => !!value
? <span>{value}</span>
: <span>스폰서 이름을 입력해주세요</span>
const SponsorNameForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange}/>



const Abstract = ({
	abstract: {
		longTitle,
		shortTitle,
		imgSrc,
		category,
		projectName,
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
	_onProjectNameSubmit,
	_onStateSubmit,
	_onPostIntroSubmit,

	_onCreatorNameSubmit,
	_onCreatorImgSrcSubmit,
	_onCreatorDescriptionSubmit,

	_onSponsorNameSubmit,
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
				alt="짧은 제목을 입력하세요"
				initialValue={shortTitle}
				submitCaption="입력하기"
				onSubmit={_onShortTitleSubmit}
				Wrapper={ShortTitleWrapper}
				Form={ShortTitleForm}
			/>

			<FormWrapper
				title="Abstract Image"
				valueType={VALUE_TYPE.IMAGE}
				alt="프로젝트 이미지를 추가하세요"
				initialValue={imgSrc}
				submitCaption="입력하기"
				onSubmit={_onImgSrcSubmit}
				Wrapper={ImgSrcWrapper}
				Form={ImgSrcForm}
			/>

			<FormWrapper
				title="Abstract Category"
				valueType={VALUE_TYPE.SELECT}
				alt="프로젝트 카테고리를 선택하세요"
				initialValue={category}
				submitCaption="선택하기"
				onSubmit={_onCategorySubmit}
				Wrapper={CategoryWrapper}
				Form={CategoryForm}
			/>

			<FormWrapper
				title="Abstract Project Name"
				valueType={VALUE_TYPE.TEXT}
				alt="프로젝트 이름을 입력하세요"
				initialValue={projectName}
				submitCaption="입력하기"
				onSubmit={_onProjectNameSubmit}
				Wrapper={ProjectNameWrapper}
				Form={ProjectNameForm}
			/>

			<FormWrapper
				title="Abstract State"
				valueType={VALUE_TYPE.SELECT}
				alt="프로젝트 진행 상황을 선택하세요"
				initialValue={state}
				submitCaption="선택하기"
				onSubmit={_onStateSubmit}
				Wrapper={StateWrapper}
				Form={StateForm}
			/>

			<FormWrapper
				title="Abstract Category"
				valueType={VALUE_TYPE.TEXT}
				alt="포스트탭에서 보여줄 인트로 문구를 입력하세요"
				initialValue={postIntro}
				submitCaption="선택하기"
				onSubmit={_onPostIntroSubmit}
				Wrapper={PostIntroWrapper}
				Form={PostIntroForm}
			/>

			<span>-----</span>

			<FormWrapper
				title="Creator Name"
				valueType={VALUE_TYPE.TEXT}
				alt="작성자 이름을 입력하세요"
				initialValue={creatorName}
				submitCaption="입력하기"
				onSubmit={_onCreatorNameSubmit}
				Wrapper={CreatorNameWrapper}
				Form={CreatorNameForm}
			/>

			<FormWrapper
				title="Creator Image"
				valueType={VALUE_TYPE.IMAGE}
				alt="작성자 이미지를 입력하세요"
				initialValue={creatorImgSrc}
				submitCaption="입력하기"
				onSubmit={_onCreatorImgSrcSubmit}
				Wrapper={CreatorImgSrcWrapper}
				Form={CreatorImgSrcForm}
			/>

			<FormWrapper
				title="Creator Description"
				valueType={VALUE_TYPE.IMAGE}
				alt="작성자에 대해 간략히 설명해주세요"
				initialValue={creatorDescription}
				submitCaption="입력하기"
				onSubmit={_onCreatorDescriptionSubmit}
				Wrapper={CreatorDescriptionWrapper}
				Form={CreatorDescriptionForm}
			/>

			<span>-----</span>

			<FormWrapper
				title="Sponsor Name"
				valueType={VALUE_TYPE.TEXT}
				alt="스폰서 이름을 입력 해 주세요"
				initialValue={sponsorName}
				submitCaption="입력하기"
				onSubmit={_onSponsorNameSubmit}
				Wrapper={SponsorNameWrapper}
				Form={SponsorNameForm}
			/>

		</div>
	)
}

export default Abstract
