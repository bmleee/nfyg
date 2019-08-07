import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'
import { value2label } from '~/src/react/lib/utils'
import { SelectOptions } from '~/src/react/constants'
import { fetchOptions } from '~/src/react/api/AppAPI'

// ----
const TitleWrapper = ({value}) => (
	<span className="form-wrapper-span">{value}</span>
)
const TitleForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">상점 이름</span>
		<span className="form-wrapper-description">상점 및 브랜드 이름을 입력해주세요.</span>
		<input className="editor_input" type="text" value={value} onChange={onChange} maxLength={32} />
		<span className="editor-remain-char">{32- value.length}자 남았습니다.</span>
	</div>
)


// ----
const DescriptionWrapper = ({value}) => !!value
?	<span className="form-wrapper-span">{value}</span>
:	<span className="form-wrapper-span"></span>
const DescriptionForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">상점 한줄 소개</span>
		<span className="form-wrapper-description">상점에 대해 간략한 소개를 해주세요.</span>
		<input className="editor_input" type="text" value={value} onChange={onChange} maxLength={38} />
		<span className="editor-remain-char">{38 - value.length}자 남았습니다.</span>
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
		<span className="form-wrapper-title">상점 대표이미지</span>
		<span className="form-wrapper-description">상점을 잘 나타낼 수 있는 이미지를 등록해주세요.</span>
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
	<span className="form-wrapper-span">{value2label(SelectOptions.ProductCategory, value)}</span>
)
const CategoryForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">상점 카테고리</span>
		<span className="form-wrapper-description">상점 성격에 맞는 카테고리를 선택해주세요.</span>
		<Select
			value={value}
			onChange={onChange}
			options={SelectOptions.ProductCategory}
		/>
	</div>
)

// ----
const StoreLinkWrapper = ({value}) => !!value
?	<span className="form-wrapper-span">https://netflix-salon.co.kr/store/{value}</span>
: <span className="form-wrapper-span"></span>
const StoreLinkForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">상점 주소</span>
		<div className="editor-link-text">https://netflix-salon.co.kr/store/</div>
		<input className="editor-link-input" type="text" value={value} onChange={onChange} maxLength={28}/>
		<span className="editor-remain-char">{28 - value.length}자 남았습니다.</span>
	</div>
)

// ----
const StateWrapper = ({value}) => !!value
?	<span className="form-wrapper-span">{value2label(SelectOptions.StoreState, value)}</span>
: <span className="form-wrapper-span"></span>
const StateForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">상점 상태</span>
		<Select
			value={value}
			onChange={onChange}
			options={SelectOptions.StoreState}
		/>
	</div>
)

// ----
const CancellationWrapper = ({value}) => !!value
?	<span className="form-wrapper-span">{value}</span>
:	<span className="form-wrapper-span"></span>
const CancellationForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">상점 환불 및 교환 정책</span>
		<textarea rows="3" cols="45" value={value} onChange={onChange} />
	</div>
)


// ----
const StoreNumberWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span"></span>
const StoreNumberForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">상점 연락처</span>
		<input className="editor_input" type="text" value={value} onChange={onChange} />
	</div>
)

// ----
const StoreEmailWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span"></span>
const StoreEmailForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">상점 메일주소</span>
		<input className="editor_input" type="text" value={value} onChange={onChange} />
	</div>
)

// ----
const StoreLocationWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span"></span>
const StoreLocationForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">상점 오프라인 주소<div className="editor-optional">선택항목</div></span>
		<input className="editor_input" type="text" value={value} onChange={onChange} />
	</div>
)

// ----
const StoreShippingCycleWrapper = ({value, handlers, onChange}) => {
	return (
		!value ? 
		<span className="form-wrapper-span"></span> 
		:
		<span className="form-wrapper-span">
			{ value.shippingStart == "매일" ? 
			<div>{value.shippingStart} 배송</div> :
			<div>이번주 {value.orderEnd}까지 주문건 다음주 {value.shippingStart} 배송</div>
			}
		</span>
	)
}

const StoreShippingCycleForm = ({value, handlers, ...otherProps, onChange}) => {
	const {
		_onOrderEnd,
		_onShippingStart
	} = handlers

	return (
		<div className="fuding-reward-form-container">
			<span className="form-wrapper-title">상점 배송주기</span>
			<div className="editor-shippingcycle-container">
				이번주 <Select value={value.orderEnd} onChange={_onOrderEnd} options={SelectOptions.ShippingCycle2} /> 까지 주문건
				다음주 <Select value={value.shippingStart} onChange={_onShippingStart} options={SelectOptions.ShippingCycle} /> 배송
			</div>
		</div>
	)
}


const StoreShippingCompanyWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value2label(SelectOptions.ShippingCompanyList, value)}</span>
: <span className="form-wrapper-span"></span>
const StoreShippingCompanyForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">상점 거래 배송사</span>
		<Select
			value={value}
			onChange={onChange}
			options={SelectOptions.ShippingCompanyList}
		/>
	</div>
)

// ----
const StoreShippingFeeWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value.toLocaleString()}원</span>
: <span className="form-wrapper-span"></span>
const StoreShippingFeeForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">상점 배송비</span>
		<input className="editor_input" type="number" value={Number(value)} onChange={onChange} />
	</div>
)

// ----
const FacebookWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span"></span>
const FacebookForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">페이스북 주소<div className="editor-optional">선택항목</div></span>
		<input className="editor_input" type="text" value={value} onChange={onChange} />
	</div>
)

// ----
const InstagramWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span"></span>
const InstagramForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">인스타그램 주소<div className="editor-optional">선택항목</div></span>
		<input className="editor_input" type="text" value={value} onChange={onChange} />
	</div>
)

// ----
const TwitterWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span"></span>
const TwitterForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">트위터 주소<div className="editor-optional">선택항목</div></span>
		<input className="editor_input" type="text" value={value} onChange={onChange} />
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
				<span className="editor-remain-char2">{16 - title.length}자 남았습니다.</span>
			</div>
			<div>
				<span className="item-deatail-small-title">링크(https 또는 http로 시작하는 주소를 입력해주세요.)</span>
				<input className="editor_input" type="text" value={link} onChange={_onLink}/>
			</div>
			<div>
				<span className="item-deatail-small-title">이미지</span>
				<input type="file" onChange={_onImgSrc} accept="image/*" />
				<img src={imgSrc} />
			</div>
		</div>
	)
}

const StoreOverviewWrapper = ({value, handlers, onChange}) => {
	const {
		deleteOverview,
		modifyOverview,
		modifyOverviewDone,
		modifyOverviewText,
		modifyOverviewImg,
		modifyOverviewImgLink
	} = handlers

	const overviews = !!value && !!value.storeOverviewList && value.storeOverviewList.length > 0
		? value.storeOverviewList.map(({
			text,
			img,
			img_link,
			open = false,
		}, index) => (
			open == false ?
			<div className="store-item-container">
				<div className="store-item-img-container">
					<div className="store-item-img-thumbnail">
						<img className="store-item-img" src={img}/>
					</div>
				</div>
				<div className="store-item-info-container">
					<div className="store-overview-text">{text}</div>
					<button className="store-item-modify" onClick={() => modifyOverview(index, true)}>수정하기</button>
					<button className="store-item-delete" onClick={() => deleteOverview(index)}></button>
				</div>
			</div>
			:
			<div className="editor-open-container-middle">
				<div className="fuding-reward-form-container">
					<div className="item-deatail-img-container">
						<span className="item-deatail-small-title">상점 소개 이미지({index + 1})</span>
						<input className="editor_input" type="file" onChange={(e) => modifyOverviewImg(index, e)} accept="image/*" />
						{ img && <img src={img} alt="상점 소개 이미지" accept="image/*"/> }
					</div>
					
					<div>
						<span className="item-deatail-small-title">상점 소개 이미지 링크({index + 1})</span>
						<input className="editor_input" type="text" value={img_link} onChange={(e) => modifyOverviewImgLink(index, e)} />
					</div>
					
					<div>
						<span className="item-deatail-small-title">상점 소개({index + 1})</span>
						<textarea rows="3" cols="45" value={text} onChange={(e) => modifyOverviewText(index, e)} />
					</div>
					
					<div className="item-modify-ok-container">
						<button className="item-modify-ok" onClick={() => modifyOverviewDone(index, false)}>수정완료</button>
					</div>
				</div>
			</div>
		))
		: <span className="form-wrapper-span"></span>
		
	return (
		<div className="reward-wrapper-container">
			{overviews}
		</div>
	)
}

const StoreOverviewForm = ({value, handlers, ...otherProps, onChange}) => {
	const {
		text,
		img,
		img_link
	} = value.storeOverviewNew
	
	const {
		_onText,
		_onImg,
		_onImgLink
	} = handlers

	return (
		<div className="fuding-reward-form-container">
			<div className="item-deatail-img-container">
				<span className="item-deatail-small-title">상점 소개 이미지 추가</span>
				<input className="editor_input" type="file" onChange={_onImg} accept="image/*" />
				{ img && <img src={img} alt="제품 이미지를 등록하세요" accept="image/*"/> }
			</div>
			
			<div>
				<span className="item-deatail-small-title">상점 소개 이미지 링크 추가</span>
				<input className="editor_input" type="text" value={img_link} onChange={_onImgLink} />
			</div>
			
			<div>
				<span className="item-deatail-small-title">상점 소개 추가</span>
				<textarea rows="3" cols="45" value={text} onChange={_onText} />
			</div>
		</div>
	)
}

const FirstCharWrapper = ({value, handlers}) => {
	const {
		deleteFirstChar
	} = handlers
	
	return (
	<span className="form-wrapper-span">
		{ value && value.map(({
		}, index) =>
			<div className="editor-category-list">
				{value2label(SelectOptions.SortChar, value[index])}
				<button className="editor-category-delete" onClick={() => deleteFirstChar(index)}>
				</button>
			</div>
		)}
	</span>
	)
}
const FirstCharForm = ({value, onChange, handlers}) => {
	return (
	<div>
		<span className="form-wrapper-title">상점 정렬 첫 문자</span>
		<Select
			value={value}
			onChange={onChange}
			options={SelectOptions.SortChar}
		/>
	</div>
	)
}

const ShippingArrayWrapper = ({value, handlers}) => {
	const {
		deleteShippingArray
	} = handlers
	
	return (
	<span className="form-wrapper-span">
		{ value && value.map(({
		}, index) =>
			<div className="editor-category-list">
				{value2label(SelectOptions.ShippingArray, value[index])}
				<button className="editor-category-delete" onClick={() => deleteShippingArray(index)}>
				</button>
			</div>
		)}
	</span>
	)
}
const ShippingArrayForm = ({value, onChange, handlers}) => {
	return (
	<div>
		<span className="form-wrapper-title">상점 배송요일</span>
		<Select
			value={value}
			onChange={onChange}
			options={SelectOptions.ShippingArray}
		/>
	</div>
	)
}


const Abstract = ({
	abstract: {
		title,
		description,
		main_img,
		category,
		storeLink,
		state,
		cancellation,
		first_char
	},
	storeInfo: {
		storeNumber,
		storeEmail,
		storeLocation,
		storeShippingCompany,
		storeShippingFee,
		facebook,
		instagram,
		twitter
	},
	
	userType,
	// relatedContent,

	// onSubmit callbacks
	_onTitleSubmit,
	_onDescriptionSubmit,
	_onMainImgSubmit,
	_onCategorySubmit,
	_onStoreLinkSubmit,
	_onStateSubmit,
	_onCancellationSubmit,

	_onStoreNumberSubmit,
	_onStoreEmailSubmit,
	_onStoreLocationSubmit,
	_onStoreShippingFeeSubmit,
	_onStoreShippingCompanySubmit,
	
	_onFacebookSubmit,
	_onInstagramSubmit,
	_onTwitterSubmit,
	
	_onFirstCharSubmit,
	_onFirstCharClose,
	FirstCharHandlers,
	
	Exist_url_err,
	
	storeOverview,
	overviewHandlers,
	_onStoreOverviewSubmit,
	
	storeShippingCycle,
	shippingCycleHandlers,
	_onStoreShippingCycleSubmit,
	
	_onShippingArraySubmit,
	_onShippingArrayClose
}) => {
	return (
		<div className="abstract-container">
		
			<FormWrapper
				title="상점 이름"
				valueType={VALUE_TYPE.TEXT}
				alt="상점 및 브랜드 이름을 입력해주세요"
				initialValue={title}
				submitCaption={'상점 및 브랜드 이름을 입력해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onTitleSubmit}
				Wrapper={TitleWrapper}
				Form={TitleForm}
				className ="exhibition-long-title"
				classNameopen ="editor-open-container-first"
				
			/>

			<FormWrapper
				title="상점 한줄 소개"
				valueType={VALUE_TYPE.TEXT}
				alt="상점 소개를 입력해주세요"
				initialValue={description}
				submitCaption={'상점에 대해 간략한 소개를 해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onDescriptionSubmit}
				Wrapper={DescriptionWrapper}
				Form={DescriptionForm}
				classNameopen ="editor-open-container"
				
			/>
			
			<FormWrapper
				title="상점 대표이미지"
				valueType={VALUE_TYPE.IMAGE}
				alt="상점 대표이미지를 등록해주세요"
				initialValue={main_img}
				submitCaption={'상점 대표이미지를 등록해주세요'}
				submitCaptionsub={'등록하기'}
				onSubmit={_onMainImgSubmit}
				Wrapper={ImgSrcWrapper}
				Form={ImgSrcForm}
				classNameopen ="editor-open-container"
				
			/>
			
			{/*
			<FormWrapper
				title="상점 카테고리"
				valueType={VALUE_TYPE.TAG}
				alt="상점 카테고리를 선택하세요"
				initialValue={category}
				submitCaption={'카테고리를 선택하세요'}
				submitCaptionsub={'선택하기'}
				onSubmit={_onCategorySubmit}
				Wrapper={CategoryWrapper}
				Form={CategoryForm}
				classNameopen ="editor-open-container"
			/>
			*/}
			
			
			<FormWrapper
				title="상점 페이지 주소"
				valueType={VALUE_TYPE.TEXT}
				alt="원하시는 링크를 입력해주세요"
				initialValue={storeLink}
				submitCaption={'상점 페이지 주소를 입력해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onStoreLinkSubmit}
				Wrapper={StoreLinkWrapper}
				Form={StoreLinkForm}
				classNameopen ="editor-open-container"
				errMessage = {Exist_url_err}
				
			/>
			
			
			{ userType == 'admin' ?
			<FormWrapper
				title="상점 상태"
				valueType={VALUE_TYPE.SELECT}
				alt="상점 상태를 선택하세요"
				initialValue={state}
				submitCaption={'상점 상태를 선택하세요'}
				submitCaptionsub={'선택하기'}
				onSubmit={_onStateSubmit}
				Wrapper={StateWrapper}
				Form={StateForm}
				classNameopen ="editor-open-container"
			/>
			: null }
			
			{ userType == 'admin' ?
			<FormWrapper
				title="상점 정렬 첫 문자"
				valueType={VALUE_TYPE.CATEGORY}
				alt="상점 정렬 첫 문자를 선택하세요"
				initialValue={first_char}
				submitCaption={'상점 정렬 첫 문자를 선택하세요'}
				submitCaptionsub={'선택하기'}
				onSubmit={_onFirstCharSubmit}
				onSubmitSub={_onFirstCharClose}
				Wrapper={FirstCharWrapper}
				Form={FirstCharForm}
				handlers={FirstCharHandlers}
				classNameopen ="editor-open-container"
			/>
			: null }
			
			<FormWrapper
				title="상점 환불 및 교환 정책"
				valueType={VALUE_TYPE.TEXT}
				alt="상점 소개를 입력해주세요"
				initialValue={cancellation}
				submitCaption={'상점 환불 및 교환 정책을 입력해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onCancellationSubmit}
				Wrapper={CancellationWrapper}
				Form={CancellationForm}
				className ="exhibition-eng-title"
				classNameopen ="editor-open-container-last"
				
			/>
			
			<span className="editor-small-title">상점 소개 페이지</span>
			
			<FormWrapper
				title="상점 소개 추가하기"
				valueType={VALUE_TYPE.STOREOVERVIEW}
				alt="상점 소개 추가하기"
				initialValue={storeOverview}
				submitCaption={'상점 소개를 추가해주세요'}
				submitCaptionsub={'추가하기'}
				onSubmit={_onStoreOverviewSubmit}
				handlers={overviewHandlers}
				Wrapper={StoreOverviewWrapper}
				Form={StoreOverviewForm}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container-middle"
			/>
			
			<span className="editor-small-title2">상점 추가 정보</span>
			
			<FormWrapper
				title="상점 메일주소"
				valueType={VALUE_TYPE.TEXT}
				alt="상점 메일주소를 입력해주세요"
				initialValue={storeEmail}
				submitCaption={'상점 메일주소를 입력해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onStoreEmailSubmit}
				Wrapper={StoreEmailWrapper}
				Form={StoreEmailForm}
				className ="exhibition-creater-name"
				classNameopen ="editor-open-container-first"
			/>
			
			<FormWrapper
				title="상점 연락처"
				valueType={VALUE_TYPE.TEXT}
				alt="상점 연락처를 입력해주세요"
				initialValue={storeNumber}
				submitCaption={'상점 연락처를 입력해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onStoreNumberSubmit}
				Wrapper={StoreNumberWrapper}
				Form={StoreNumberForm}
				classNameopen ="editor-open-container"
			/>
			
			{/*
			<FormWrapper
				title="상점 배송주기"
				valueType={VALUE_TYPE.STORESHIPPINGCYCLE}
				alt="상점 배송주기를 입력해주세요"
				initialValue={storeShippingCycle}
				submitCaption={'상점 배송주기를 입력해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onStoreShippingCycleSubmit}
				handlers={shippingCycleHandlers}
				Wrapper={StoreShippingCycleWrapper}
				Form={StoreShippingCycleForm}
				classNameopen ="editor-open-container"
			/>
			*/}
			
			<FormWrapper
				title="상점 배송요일"
				valueType={VALUE_TYPE.CATEGORY}
				alt="상점 배송요일을 추가하세요"
				initialValue={storeShippingCycle.shipping_array}
				submitCaption={'상점 배송요일을 추가하세요'}
				submitCaptionsub={'추가하기'}
				onSubmit={_onShippingArraySubmit}
				onSubmitSub={_onShippingArrayClose}
				Wrapper={ShippingArrayWrapper}
				Form={ShippingArrayForm}
				handlers={shippingCycleHandlers}
				classNameopen ="editor-open-container"
			/>
			
			<FormWrapper
				title="상점 배송비"
				valueType={VALUE_TYPE.MONEY}
				alt="상점 배송주기를 입력해주세요"
				initialValue={storeShippingFee}
				submitCaption={'상점 배송비를 입력해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onStoreShippingFeeSubmit}
				Wrapper={StoreShippingFeeWrapper}
				Form={StoreShippingFeeForm}
				classNameopen ="editor-open-container"
			/>
			
			<FormWrapper
				title="상점 거래 배송사"
				valueType={VALUE_TYPE.SELECT}
				alt="상점 거래 배송사를 선택하세요"
				initialValue={storeShippingCompany}
				submitCaption={'상점 거래 배송사를 선택하세요'}
				submitCaptionsub={'선택하기'}
				onSubmit={_onStoreShippingCompanySubmit}
				Wrapper={StoreShippingCompanyWrapper}
				Form={StoreShippingCompanyForm}
				classNameopen ="editor-open-container"
			/>
			
			<FormWrapper
				title="상점 오프라인 주소"
				valueType={VALUE_TYPE.TEXT}
				alt="상점 오프라인 주소를 입력해주세요"
				initialValue={storeLocation}
				submitCaption={'상점 오프라인 주소를 입력해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onStoreLocationSubmit}
				Wrapper={StoreLocationWrapper}
				Form={StoreLocationForm}
				className ="exhibition-eng-title"
				classNameopen ="editor-open-container-last"
				required_dot = {true}
			/>
			
			<span className="editor-small-title">상점 SNS채널</span>
			
			<FormWrapper
				title="페이스북 주소"
				valueType={VALUE_TYPE.TEXT}
				alt="페이스북 주소를 입력해주세요"
				initialValue={facebook}
				submitCaption={'페이스북 주소를 입력해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onFacebookSubmit}
				Wrapper={FacebookWrapper}
				Form={FacebookForm}
				className ="exhibition-creater-name"
				classNameopen ="editor-open-container-first"
				required_dot = {true}
			/>
			
			<FormWrapper
				title="인스타그램 주소"
				valueType={VALUE_TYPE.TEXT}
				alt="인스타그램 주소를 입력해주세요"
				initialValue={instagram}
				submitCaption={'인스타그램 주소를 입력해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onInstagramSubmit}
				Wrapper={InstagramWrapper}
				Form={InstagramForm}
				classNameopen ="editor-open-container"
				required_dot = {true}
			/>
			
			<FormWrapper
				title="트위터 주소"
				valueType={VALUE_TYPE.TEXT}
				alt="트위터 주소를 입력해주세요"
				initialValue={twitter}
				submitCaption={'트위터 주소를 입력해주세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onTwitterSubmit}
				Wrapper={TwitterWrapper}
				Form={TwitterForm}
				className ="exhibition-eng-title"
				classNameopen ="editor-open-container-last"
				required_dot = {true}
			/>

		</div>
	)
}

export default Abstract
