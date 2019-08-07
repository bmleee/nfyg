import React, { Component, PropTypes } from 'react'
// import Editor from '~/src/react/components/DraftEditor/SevenEditor'
import Select from 'react-select'
import { Link } from 'react-router'
import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'

import { Editor } from '@tinymce/tinymce-react';
import {upload_file} from '~/src/react/api/AppAPI'

import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'
import { canUseDOM } from '~/src/lib/utils'

import md5 from 'md5'

const IntroWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span">소개 문구를 입력하세요</span>

const IntroForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange} />

const onDrop = async (e) => {
	let {sourceURL} = await upload_file(e.target.files[0])
	// this.setState({value: sourceURL})
}

const uploadCallback = async (file) => {
	const {
		sourceURL
	} = await upload_file(file)

	return {
		data: {
			link: sourceURL
		}
	}
}

const Part1Wrapper = ({value}) => {
	let real_value = value.replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`);
	
	return (	
	<span className="form-wrapper-span">
		{ !value ? null :
		<div className="editor-overview-wrapper">
			<div dangerouslySetInnerHTML={{ __html: real_value}} />
		</div>
		}
	</span>
	)
}

var yyyymmdd = Date.now().toString().substring(0, 8)

const Part1Form = ({value, onChange}) => {
	let real_value = value.replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`);
	
	return (
	<div>
		<span className="form-wrapper-title">프로젝트 내용</span>
		{/*<Editor
			raw={value}
			onChangeToRaw={onChange}
		/> */}
		<input name="image" type="file" id="upload1" className="editor-image-hidden" onChange={onDrop} accept="image/*"/>
		<Editor
	        initialValue={real_value}
	        init={{
	          plugins: 'link image media colorpicker textcolor paste',
	          toolbar: 'undo redo | formatselect | bold italic underline blockquote strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | image media link',
	          image_advtab: true,
	          paste_as_text: true,
	          language_url : '/uploads/ko_KR.js',
	          skin_url: '/uploads/lightgray',
	          body_class: 'editor-bm-class',
	          file_picker_types: 'image',
			  file_picker_callback: function(callback, value, meta) {
			      if (meta.filetype == 'image') {
			        $('#upload1').trigger('click');
			        $('#upload1').on('change', function() {
			          var file = this.files[0];
			          // var file2 = uploadCallback(file);
			          var file_path = "https://netflix-salon.co.kr/uploads/" + md5(Date.now().toString().substring(0, 8) + '_' + file.name);
			          var reader = new FileReader(file_path);
			          reader.onload = function(e) {
			            callback(file_path, {
			              alt: '',
			              src: file_path
			            });
			          };
			          
			          reader.readAsText(file);
			        });
			      }
			    }
	        }}
	        onChange={onChange}
        />
	</div>
	)
}
const Part2Wrapper = ({value}) => (
	<span className="form-wrapper-span"></span>
)
const Part2Form = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 내용 Part.2</span>
		<Editor
			raw={value}
			onChangeToRaw={onChange}
		/>
	</div>
)

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
				{/* <div className="editor_use_container">
					<div className="editor_use_container-half">
						<div className="editor_use_container-title">관련 콘텐츠는 어디에 쓰이나요?</div>
						<img className="editor_use_container-img" src="/assets/images/관련콘텐츠안내.png"/>
					</div>
				</div> */}
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
					<input className="editor-recommend-img" type="file" onChange={_onImgSrc} accept="image/*" />
					<img src={imgSrc} />
				</div>
			</div>
		)
	}

const FaqWrapper = ({value, handlers}) => {
	const {
		deleteFAQ
	} = handlers

	const items = !!value && !!value.faqs && value.faqs.length > 0
		? value.faqs.map(({
			question,
			answer
		}, index) => (
			<div className="editor-item-detail-wrapper">
				<span className="item-deatail-small-title-saved">질 문 : {question}</span>
				<span className="item-deatail-small-title-saved">답 변 : {answer}</span>
				<button className="item-deatail-delete" onClick={() => deleteFAQ(index)}>삭제하기</button>
			</div>
		))
		: <span className="form-wrapper-span"></span>

	return (
		<div className="reward-wrapper-container">
			{items}
		</div>
	)
}
const FaqForm = ({value, handlers}) => {
	const {
		question,
		answer
	} = value.newFaq
	const {
		_onQuestion,
		_onAnswer
	} = handlers

	return (
		<div className="funding-reward-form-container">
			<div>
				<span className="item-deatail-small-title">질 문</span>
				<input className="editor_input" type="text" value={question} onChange={_onQuestion} />
			</div>

			<div>
				<span className="item-deatail-small-title">답 변</span>
				<input className="editor_input" type="text" value={answer} onChange={_onAnswer} />
			</div>

		</div>
	)
}

const CancellationWrapper = ({value}) => !!value
?	<span className="form-wrapper-span">{value}</span>
:	<span className="form-wrapper-span"></span>
const CancellationForm = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">환불 및 교환 정책</span>
		<span className="form-wrapper-description3">
			프로젝트 마감 후 환불 및 교환 요청은 프로젝트 진행자의 정책에 따라 진행됩니다. 후원자들과의 신뢰와 원활한 진행을 위해 자세히 작성해주시는게 좋습니다.
			<div className="form-wrapper-description-sub">
				환불 정책 : 후원자의 단순 변심, 제품 전달 지연 등 다양한 변수에 따른 환불정책을 제시해주세요. 환불을 진행하신다면, 기간 및 반송 절차를 명시해주세요.
			</div>
			<div className="form-wrapper-description-sub">
				교환 정책 : 제품이 불량품일 경우, 일정 기간 내에 교환을 진행해주시는 것이 적절합니다. 불량품에 대한 기준을 미리 제시해주시는 것이 좋습니다. 교환을 진행하신다면, 기간 및 반송 절차를 명시해주세요.
			</div>
		</span>
		<textarea rows="3" cols="45" value={value} onChange={onChange}/>
	</div>
)

const Overview = ({
	overview_new,
	
	abstract: {
		state
	},
	
	funding: {
		faq,
		cancellation
	},
	
	relatedContent,

	// onSubmit callbacks
	_onIntroSubmit,
	_onPart1Submit,
	_onPart2Submit,
	
	_onOverviewSubmit,
	
	_onContentSubmit,
	_onFaqSubmit,
	
	_onCancellationSubmit,
	
	contentHandlers,

	// onChange callbacks
	rewardHandlers,
	faqHandlers,
	
	userType,
	tabLinkBase
}) => {
	
	return (
		<div className="abstract-container">
			
			<span className="editor-small-title">프로젝트 소개</span>

			<FormWrapper
				title="프로젝트 내용"
				valueType={VALUE_TYPE.RICH_TEXT}
				initialValue={overview_new}
				submitCaption="프로젝트 세부 내용을 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onOverviewSubmit}
				Wrapper={Part1Wrapper}
				Form={Part1Form}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container-middle"
				
			/>

			{/* <FormWrapper
				title="프로젝트 내용 Part.2"
				valueType={VALUE_TYPE.RICH_TEXT}
				initialValue={part2}
				submitCaption="리워드 다음에 보여질 내용을 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onPart2Submit}
				Wrapper={Part2Wrapper}
				Form={Part2Form}
				className ="exhibition-eng-title"
				classNameopen ="editor-open-container"
			/> */}
			
			{ userType == 'admin' ?
			<span className="editor-small-title2">관련 콘텐츠</span>
			: null}
			
			{ userType == 'admin' ?
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
				classNameopen ="editor-open-container-middle"
			/>
			: null }
			
			{/*
			<span className="editor-small-title2">자주묻는 질문</span>
			
			<FormWrapper
				title="자주묻는 질문"
				valueType={VALUE_TYPE.FAQ}
				alt="FAQ"
				initialValue={faq}
				submitCaption={'자주묻는 질문을 추가하세요'}
				submitCaptionsub={'추가하기'}
				onSubmit={_onFaqSubmit}
				handlers={faqHandlers}
				Wrapper={FaqWrapper}
				Form={FaqForm}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container-middle"
			/>
			*/}
			
			<span className="editor-small-title2">환불 및 교환 정책</span>
			
			<FormWrapper
				title="환불 및 교환 정책"
				valueType={VALUE_TYPE.TEXT}
				alt="환불 및 교환 정책"
				initialValue={cancellation}
				submitCaption={'환불 및 교환 정책을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onCancellationSubmit}
				Wrapper={CancellationWrapper}
				Form={CancellationForm}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container-middle"
			/>
			
			<div className="editor-bottom-button-container">
				<div className="editor-bottom-button-left-container">
					<Link to={`${tabLinkBase}/abstract`}><button className="editor-bottom-button-left">이 전</button></Link>
				</div>
				<div className="editor-bottom-button-right-container">
					<Link to={`${tabLinkBase}/funding`}><button className="editor-bottom-button-right">다 음</button></Link>
				</div>
			</div>
			
		</div>
	)
}

export default Overview
