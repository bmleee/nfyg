import React from 'react'
import Select from 'react-select'

import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

import { SelectOptions } from '~/src/react/constants'
import { value2label } from '~/src/react/lib/utils'

// Recommended Magazine
const RelatedContentWrapper = ({value, handlers}) => {
	const {
		deleteContent,
	} = handlers

	let items = value && value.contents && value.contents.length > 0
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
		) )
		: <span className="form-wrapper-span"></span>

	return (
		<div className="recommends-wrapper-container">
			{ items }
		</div>
	)
}
const RelatedContentForm = ({value, handlers}) => {
	// console.log('handlers', handlers)

	const {
		title,
		imgSrc,
		link,
	} = value.newContent

	const {
		_onTitle,
		_onImgSrc,
		_onLink,
	} = handlers

	return (
		<div className="recommends-form-container">
			<div>
				<span className="item-deatail-small-title">제목</span>
				<input className="editor_input" type="text" value={title} onChange={_onTitle}/>
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

const Recommend = ({
	relatedContent,
	_onRelatedContentSubmit,
	contentHandlers
}) => {
	return (
		<div className="abstract-container">

			<FormWrapper
				title="관련 콘텐츠"
				valueType={VALUE_TYPE.RECOMMEND}
				alt="관련 콘텐츠를 추가하세요"
				initialValue={relatedContent}
				submitCaption="관련 콘텐츠를 추가하세요"
				submitCaptionsub={'추가하기'}
				onSubmit={_onRelatedContentSubmit}
				handlers={contentHandlers}
				Wrapper={RelatedContentWrapper}
				Form={RelatedContentForm}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container-middle"
			/>
		</div>
	)
}

export default Recommend
