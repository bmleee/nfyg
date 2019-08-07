import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'
import { Link } from 'react-router'

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
		<span className="form-wrapper-description">프로젝트를 잘 나타내거나 흥미를 갖게 할 수 있는 멋진 제목을 입력해보세요. 프로젝트 페이지와 메인페이지에 사용됩니다.</span>
		{/* <div className="editor_use_container">
			<div className="editor_use_container-half">
				<div className="editor_use_container-title">제목은 어디에 쓰이나요?</div>
				<img className="editor_use_container-img" src="/assets/images/긴제목안내2.png"/>
			</div>
		</div> */}
		<input className="editor_input" type="text" value={value} onChange={onChange} maxLength={32} />
		<span className="editor-remain-char">{32- value.length}자 남았습니다.</span>
	</div>
)

// ----
const ShortTitleWrapper = ({value}) => (
	<span className="form-wrapper-span">{value}</span>
)
const ShortTitleForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 짧은 제목</span>
		<span className="form-wrapper-description">프로젝트의 짧은 제목을 입력해주세요. 프로젝트 관련 문자 및 메일 안내에 사용됩니다.</span>
		{/* <div className="editor_use_container">
			<div className="editor_use_container-half">
				<div className="editor_use_container-title">짧은 제목은 어디에 쓰이나요?</div>
				<img className="editor_use_container-img" src="/assets/images/짧은제목안내.png"/>
			</div>
		</div> */}
		<input className="editor_input" type="text" value={value} onChange={onChange} maxLength={16} />
		<span className="editor-remain-char">{16 - value.length}자 남았습니다.</span>
	</div>
)

// ----
const ImgSrcWrapper = ({value}) => !!value
? (
		<div className="editor-main-image-container">
			<div className="editor-thumbnail">
				<div className="ex-centered">
					<img className="editor-main-image" src={value} alt=""/>
				</div>
			</div>
		</div>
)
: (
	<span className="form-wrapper-span"></span>
)
const ImgSrcForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 대표이미지</span>
		<span className="form-wrapper-description">프로젝트를 잘 나타낼 수 있는 대표 이미지를 등록해주세요. (<div> </div>부분에 여백이 생깁니다.)</span>
		{ !!value ? 
		<div className="editor-main-image-container">
			<div className="editor-thumbnail">
				<div className="ex-centered">	
					<img className="editor-main-image" src={value} alt=""/>
				</div>
			</div>
		</div>
		: null }
	</div>
)

// ----
const CategoryWrapper = ({value}) => (
	<span className="form-wrapper-span">{value2label(SelectOptions.MainCategory, value)}</span>
)
const CategoryForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 카테고리</span>
		<span className="form-wrapper-description">프로젝트 성격에 맞는 카테고리를 선택해주세요.</span>
		<Select
			value={value}
			onChange={onChange}
			options={SelectOptions.MainCategory}
		/>
	</div>
)

// ----
const CategoryArrayWrapper = ({value, handlers}) => {
	const {
		deleteCategory
	} = handlers
	
	return (
	<span className="form-wrapper-span">
		{ value && value.map(({
		}, index) =>
			<div className="editor-category-list">
				{value2label(SelectOptions.ProductCategoryArray, value[index])}
				<button className="editor-category-delete" onClick={() => deleteCategory(index)}>
				</button>
			</div>
		)}
	</span>
	)
}
const CategoryArrayForm = ({value, onChange, handlers}) => {
	return (
	<div>
		<span className="form-wrapper-title">프로젝트 카테고리</span>
		<span className="form-wrapper-description">프로젝트 성격에 맞는 카테고리를 선택해주세요.(최대 3개)</span>
		<Select
			value={value}
			onChange={onChange}
			options={SelectOptions.ProductCategoryArray}
		/>
	</div>
	)
}

// ----
const ProductNameWrapper = ({value}) => !!value
?	<span className="form-wrapper-span">https://netflix-salon.co.kr/products/{value}</span>
: <span className="form-wrapper-span"></span>
const ProductNameForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 페이지 주소(URL)</span>
		<div><span className="form-wrapper-description">프로젝트 페이지로 들어올 수 있는 마지막주소(URL)를 입력해주세요.</span></div>
		<div className="editor-link-text">https://netflix-salon.co.kr/products/</div>
		<input className="editor-link-input" type="text" value={value} onChange={onChange} maxLength={28}/>
		<span className="editor-remain-char">{28 - value.length}자 남았습니다.</span>
	</div>
)

// ----
const StateWrapper = ({value}) => !!value
?	<span className="form-wrapper-span">{value2label(SelectOptions.ProductState, value)}</span>
: <span className="form-wrapper-span"></span>
const StateForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 상태</span>
		<Select
			value={value}
			onChange={onChange}
			options={SelectOptions.ProductState}
		/>
	</div>
)

// ----
const PostIntroWrapper = ({value}) => !!value
?	<span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span"></span>
const PostIntroForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 요약</span>
		<span className="form-wrapper-description3">프로젝트에 대해 간략한 소개를 해주세요. 메인페이지의 프로젝트 카드이미지에 사용됩니다.</span>
		<textarea rows="3" cols="45" value={value} onChange={onChange} maxLength={100}/>
		<span className="editor-remain-char">{100 - value.length}자 남았습니다.</span>
	</div>
)

// ----
const CreatorNameWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span"></span>
const CreatorNameForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">진행자 이름</span>
		<span className="form-wrapper-description">진행자님을 대표하는 이름(또는 팀명)을 입력해주세요.</span>
		<input className="editor_input" type="text" value={value} onChange={onChange}/>
	</div>
)

// ----
const CreatorImgSrcWrapper = ({value}) => !!value
? <img className="editor-profile-img" src={value} alt=""/>
: <span className="form-wrapper-span"></span>
const CreatorImgSrcForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로필 이미지</span>
		<span className="form-wrapper-description">진행자님을 대표하는 사진(또는 이미지)을 등록해주세요.</span>
		{ !!value ? <img src={value} alt=""/> : <div className="editor-profile-icon"></div> }
	</div>
)

// ----
const CreatorDescriptionWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span"></span>
const CreatorDescriptionForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">진행자 소개</span>
		<span className="form-wrapper-description3">진행자님에 대한 간단한 소개를 작성해주세요.</span>
		<textarea rows="3" cols="45" value={value} onChange={onChange} maxLength={100}/>
		{/* <span className="editor-remain-char">{100 - value.length}자 남았습니다.</span> */}
	</div>
)

const CreatorEmailWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span"></span>
const CreatorEmailForm = ({value, onChange, email}) => (
	<div>
		<span className="form-wrapper-title">이메일 주소</span>
		<span className="form-wrapper-description">댓글 소식과 문의를 받아 볼 이메일 주소를 입력해주세요.</span>
		<input className="editor_input" name="email" id="email" type="text" value={value} onChange={onChange}/>
	</div>
)
const CreatorEmailFormSub = ({value, check_value, onChange, email}) => (
	<div>
		<span className="form-wrapper-span">{value}</span>
		<span className="form-wrapper-description">위 이메일 주소로 전송된 인증번호를 입력해주세요. 인증번호는 3분간 유효합니다.</span>
		<input className="editor_input" name="number" id="number" type="text" value={check_value} onChange={onChange}/>
	</div>
)

const CreatorNumberWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span"></span>
const CreatorNumberForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">휴대폰 번호</span>
		<span className="form-wrapper-description">진행자님의 휴대폰 번호를 입력해주세요. 프로젝트 관련 사항 전달에 사용됩니다.</span>
		<input className="editor_input" name="email" id="email" type="text" value={value} onChange={onChange}/>
	</div>
)
const CreatorNumberFormSub = ({value, check_value, onChange}) => (
	<div>
		<span className="form-wrapper-span">{value}</span>
		<span className="form-wrapper-description">위 휴대폰 번호로 전송된 인증번호를 입력해주세요. 인증번호는 3분간 유효합니다.</span>
		<input className="editor_input" name="number" id="number" type="text" value={check_value} onChange={onChange}/>
	</div>
)

const Abstract = ({
	authorizedUser,
	abstract: {
		longTitle,
		shortTitle,
		imgSrc,
		category,
		sub_category,
		category_array,
		productName,
		state,
		postIntro,
	},
	creator: {
		creatorName,
		creatorImgSrc,
		creatorDescription,
		creatorEmail,
		creatorEmailCheck,
		creatorNumber,
		creatorNumberCheck
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
	_onCategoryArraySubmit,
	_onCategoryArrayClose,
	_onProductNameSubmit,
	_onStateSubmit,
	_onPostIntroSubmit,

	_onCreatorNameSubmit,
	_onCreatorImgSrcSubmit,
	_onCreatorDescriptionSubmit,
	
	_onCreatorEmailSubmit,
	_onCreatorEmailSubmitSub,
	
	_onCreatorNumberSubmit,
	_onCreatorNumberSubmitSub,

	_onSponsorNameSubmit,

	_onContentSubmit,
	
	categoryHandlers,
	contentHandlers,
	Exist_url_err,
	
	userType,
	tabLinkBase
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
				classNameopen ="editor-open-container-first"
				
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
				initialValue={sub_category}
				submitCaption={'카테고리를 선택하세요'}
				submitCaptionsub={'선택하기'}
				onSubmit={_onCategorySubmit}
				Wrapper={CategoryWrapper}
				Form={CategoryForm}
				classNameopen ="editor-open-container"
			/>
			
			{/*
			<FormWrapper
				title="프로젝트 카테고리"
				valueType={VALUE_TYPE.CATEGORY}
				alt="프로젝트 카테고리를 선택하세요"
				initialValue={category_array}
				submitCaption={'카테고리를 선택하세요'}
				submitCaptionsub={'선택하기'}
				onSubmit={_onCategoryArraySubmit}
				onSubmitSub={_onCategoryArrayClose}
				Wrapper={CategoryArrayWrapper}
				Form={CategoryArrayForm}
				handlers={categoryHandlers}
				classNameopen ="editor-open-container"
			/>
			*/}
			
			{ state == 'in-progress' ? 
			<div className="form-wrapper exhibition-eng-title">
				<span className="form-wrapper-title">프로젝트 페이지 주소(URL)</span>
				<div className="form-wrapper-value">
					<span className="form-wrapper-span">https://netflix-salon.co.kr/products/{productName}</span>
				</div>
			</div>
			:
			<FormWrapper
				title="프로젝트 페이지 주소(URL)"
				valueType={VALUE_TYPE.TEXT}
				alt="원하시는 링크를 입력하세요"
				initialValue={productName}
				submitCaption={'원하시는 링크를 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onProductNameSubmit}
				Wrapper={ProductNameWrapper}
				Form={ProductNameForm}
				className ="exhibition-eng-title"
				classNameopen ="editor-open-container-last"
				errMessage = {Exist_url_err}
			/>
			}
			
			{ userType == 'admin' ?
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
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container-middle"
			/>
			: null }
			
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
				classNameopen ="editor-open-container-first"
				
			/>

			<FormWrapper
				title="프로필 이미지"
				valueType={VALUE_TYPE.PROFILE}
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
				title="이메일 주소"
				valueType={VALUE_TYPE.MAIL}
				alt="이메일 주소를 입력해주세요"
				initialValue={creatorEmail}
				submitCaption={'이메일 주소를 입력해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onCreatorEmailSubmit}
				onSubmitSub={_onCreatorEmailSubmitSub}
				Wrapper={CreatorEmailWrapper}
				Form={CreatorEmailForm}
				FormSub={CreatorEmailFormSub}
				check={creatorEmailCheck}
				email={authorizedUser}
				classNameopen ="editor-open-container"
			/>
			
			<FormWrapper
				title="휴대폰 번호"
				valueType={VALUE_TYPE.PHONE}
				alt="휴대폰 번호를 입력해주세요"
				initialValue={creatorNumber}
				submitCaption={'휴대폰 번호를 입력해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onCreatorNumberSubmit}
				onSubmitSub={_onCreatorNumberSubmitSub}
				Wrapper={CreatorNumberWrapper}
				Form={CreatorNumberForm}
				FormSub={CreatorNumberFormSub}
				check={creatorNumberCheck}
				email={authorizedUser}
				className ="exhibition-eng-title"
				classNameopen ="editor-open-container-last"
			/>
			
			<div className="editor-bottom-button-container">
				<div className="editor-bottom-button-left-container">
					
				</div>
				<div className="editor-bottom-button-right-container">
					<Link to={`${tabLinkBase}/overview`}><button className="editor-bottom-button-right">다 음</button></Link>
				</div>
			</div>
			
		</div>
	)
}

export default Abstract
