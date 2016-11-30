import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

const LongTitleWrapper = ({value}) => (
	<span>{value}</span>
)
const LongTitleForm = ({value, onChange}) => (
	<input type="text" value={value} onChange={onChange} />
)

const ShortTitleWrapper = ({value}) => (
	<span>{value}</span>
)
const ShortTitleForm = ({value, onChange}) => (
	<input type="text" value={value} onChange={onChange} />
)

const ImgSrcWrapper = ({value}) => !!value
? (
		<img src={value} alt=""/>
)
: (
	<span>프로필 이미지를 입력하세요</span>
)
const ImgSrcForm = ({value, onChange}) => (
	<input type="file" value={value} onChange={onChange} />
)

const CategoryWrapper = ({value}) => (
	<span>{value}</span>
)
const CategoryForm = ({value, onChange}) => (
	<Select
		value={value} onChange={onChange}
		options={[
			{value: '라이프 스타일', label: '라이프 스타일'},
			{value: '뷰티', label: '뷰티'},
			{value: '건강', label: '건강'},
			{value: '문화', label: '문화'},
		]}
	/>
)

const ProjectNameWrapper = ({value}) => !!value
?	<span>{value}</span>
: <div>프로젝트 이름을 입력하세요</div>
const ProjectNameForm = ({value, onChange}) => (
	<input type="text" value={value} onChange={onChange} />
)

const CreatorNameWrapper = ({value}) => !!value
? <span>{value}</span>
: <div>작성자 이름을 입력하세요</div>
const CreatorNameForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange}/>

const CreatorImgSrcWrapper = ({value}) => !!value
? <img src={value} alt=""/>
: <div>작성자 이미지를 입력하세요</div>
const CreatorImgSrcForm = ({value, onChange}) =>
	<input type="file" value={value} onChange={onChange}/>

const CreatorDescriptionWrapper = ({value}) => !!value
? <span>{value}</span>
: <div>프로젝트에 대한 간략한 설명을 적어주세요</div>
const CreatorDescriptionName = ({value, onChange}) =>
	<textarea rows="3" cols="45" value={value} onChange={onChange}/>

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
				alt="작성자에대해 간략히 설명해주세요"
				initialValue={creatorDescription}
				submitCaption="입력하기"
				onSubmit={_onCreatorDescriptionSubmit}
				Wrapper={CreatorDescriptionWrapper}
				Form={CreatorDescriptionName}
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
