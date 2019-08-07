import React, { Component, PropTypes } from 'react'
import Select from 'react-select'

import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

import { value2label } from '~/src/react/lib/utils'

import { SelectOptions } from '~/src/react/constants'

import { fetchOptions } from '~/src/react/api/AppAPI'


// ----
const LongTitleWrapper = ({value}) => (
	<span className="form-wrapper-span">{value}</span>
)
const LongTitleForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 제목</span>
		<input className="editor_input" type="text" value={value} onChange={onChange} maxLength={32} />
	</div>
)

// ----
const ShortTitleWrapper = ({value}) => (
	<span className="form-wrapper-span">{value}</span>
)
const ShortTitleForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 짧은 제목</span>
		<input className="editor_input" type="text" value={value} onChange={onChange} maxLength={32} />
	</div>
)

// ----
const ImgSrcWrapper = ({value}) => !!value
? (
		<img src={value} alt=""/>
)
: (
	<span className="form-wrapper-span"></span>
)
const ImgSrcForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 대표이미지</span>
		<img src={value} alt=""/>
	</div>
)
// ----
const CategoryWrapper = ({value}) => (
	<span className="form-wrapper-span">{value2label(SelectOptions.ProjectCategory, value)}</span>
)
const CategoryForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 카테고리</span>
		<Select
			value={value}
			onChange={onChange}
			options={SelectOptions.ProjectCategory}
		/>
	</div>
)

// ----
const ProjectNameWrapper = ({value}) => !!value
?	<span className="form-wrapper-span">https://netflix-salon.co.kr/projects/{value}</span>
: <span className="form-wrapper-span"></span>
const ProjectNameForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 주소</span>
		<div className="editor-link-text">https://netflix-salon.co.kr/projects/</div>
		<input className="editor-link-input" type="text" value={value} onChange={onChange} maxLength={28} />
	</div>
)

// ----
const StateWrapper = ({value}) => !!value
?	<span className="form-wrapper-span">{value2label(SelectOptions.ProjectState, value)}</span>
: <span className="form-wrapper-span"></span>
const StateForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 상태</span>
		<Select
			value={value}
			onChange={onChange}
			options={SelectOptions.ProjectState}
		/>
	</div>
)

// ----
const PostIntroWrapper = ({value}) => !!value
?	<span className="form-wrapper-span">{value}</span>
:	<span className="form-wrapper-span"></span>
const PostIntroForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 요약</span>
		<textarea rows="3" cols="45" value={value} onChange={onChange} maxLength={100}/>
	</div>
)
// ----
const CreatorNameWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span"></span>
const CreatorNameForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">진행자 이름</span>
		<input className="editor_input" type="text" value={value} onChange={onChange} maxLength={20}/>
	</div>
)
// ----
const CreatorImgSrcWrapper = ({value}) => !!value
? <img src={value} alt=""/>
: <span className="form-wrapper-span"></span>
const CreatorImgSrcForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로필 이미지</span>
		
		{ !!value ? <img src={value} alt=""/> : null }
	</div>
)

// ----
const CreatorDescriptionWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span"></span>
const CreatorDescriptionForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">진행자 소개</span>
		<textarea rows="3" cols="45" value={value} onChange={onChange} maxLength={50}/>
	</div>
)

// ---
const CreatorEmailWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span"></span>
const CreatorEmailForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">진행자 메일주소</span>
		<input className="editor_input" type="text" value={value} onChange={onChange} />
	</div>
)

// ----
const SponsorNameWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span"></span>
const SponsorNameForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">스폰서 이름</span>
		<Select.Async
			value={value}
			onChange={onChange}
			loadOptions={fetchOptions('sponsorName')}
		/>
	</div>
)

// ----
const RelatedContentWrapper = ({value, handlers}) => {
	const {
		deleteContent
	} = handlers

	let item = value && value.contents && value.contents.length > 0
		? value.contents.map(({
				title,
				imgSrc,
				link,
				infoBackground = { 
					backgroundImage: `url(${imgSrc})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
					backgroundRepeat: 'no-repeat' }
			}, index) => (
				<div className="editor-related-item">
					<a href={link} target="_blank">
						<div className="editor-related-item-image" style={infoBackground}>
							<span className="editor-related-item-title">{title}</span>
						</div>
					</a>
					<button className="editor-related-item-delete" onClick={() => deleteContent(index)}>
						삭제하기
					</button>
				</div>
		))
		: <span className="form-wrapper-span"></span>

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
				<input className="editor_input" type="text" value={title} onChange={_onTitle} maxLength={16}/>
			</div>
			<div>
				<span className="item-deatail-small-title">링크(https 또는 http로 시작하는 주소를 입력해주세요.)</span>
				<input className="editor_input" type="text" value={link} onChange={_onLink}/>
			</div>
			<div>
				<span className="item-deatail-small-title">이미지</span>
				<input type="file" onChange={_onImgSrc} accept="image/*" />
				<img src={imgSrc}/>
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
		projectName,
		state,
		postIntro,
	},
	creator: {
		creatorName,
		creatorImgSrc,
		creatorDescription,
		creatorEmail,
	},
	sponsor: {
		sponsorName,
		displayName
	},

	relatedContent,

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
	
	_onCreatorEmailSubmit,

	_onSponsorNameSubmit,
	_onDisplayNameSubmit,

	_onContentSubmit,

	contentHandlers,
}) => {


	return (
		<div className="abstract-container">
			<span className="editor-small-title">프로젝트 개요</span>

			<FormWrapper
				title="프로젝트 제목"
				valueType={VALUE_TYPE.TEXT}
				alt="제목을 입력하세요"
				initialValue={longTitle}
				submitCaption={'프로젝트 제목을 입력하세요'}
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
				submitCaption={'프로젝트 짧은 제목을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onShortTitleSubmit}
				Wrapper={ShortTitleWrapper}
				Form={ShortTitleForm}
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
				title="프로젝트 주소"
				valueType={VALUE_TYPE.TEXT}
				alt="프로젝트 링크를 입력하세요"
				initialValue={projectName}
				submitCaption={'원하시는 링크를 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onProjectNameSubmit}
				Wrapper={ProjectNameWrapper}
				Form={ProjectNameForm}
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
				classNameopen ="editor-open-container"
			/>
			
			<FormWrapper
				title="진행자 메일주소"
				valueType={VALUE_TYPE.TEXT}
				alt="진행자 메일주소를 입력해주세요"
				initialValue={creatorEmail}
				submitCaption={'진행자 메일주소를 입력해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onCreatorEmailSubmit}
				Wrapper={CreatorEmailWrapper}
				Form={CreatorEmailForm}
				className ="exhibition-eng-title"
				classNameopen ="editor-open-container"
			/>

			<span className="editor-small-title">스폰서 이름</span>

			<FormWrapper
				title="스폰서 이름"
				valueType={VALUE_TYPE.SELECT}
				alt="스폰서 이름을 입력 해 주세요"
				initialValue={displayName}
				submitCaption={'스폰서 이름을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onSponsorNameSubmit}
				Wrapper={SponsorNameWrapper}
				Form={SponsorNameForm}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container"
			/>

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
