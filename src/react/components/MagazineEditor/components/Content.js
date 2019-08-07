import React from 'react'
import Editor from '~/src/react/components/DraftEditor/SevenEditor'
import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'

import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

const ContentWrapper = ({value}) => (
	<span className="form-wrapper-span"></span>
)
const ContentForm = ({value, onChange}) => (
	<div>
		<Editor
			raw={value}
			onChangeToRaw={onChange}
		/>
	</div>
)

const SilderContentWrapper = ({value, handlers}) => {
	const {
		deleteSlider,
	} = handlers

	let items = value && value.contents && value.contents.length > 0
		? value.contents.map(({
				imgSrc,
				infoBackground = { 
					backgroundImage: `url(${imgSrc})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
					backgroundRepeat: 'no-repeat' }
			}, index) => (
				<div className="editor-related-item">
					<div className="editor-slide-item-image" style={infoBackground}>
					</div>
					<button className="editor-related-item-delete" onClick={() => deleteSlider(index)}>
						삭제하기
					</button>
				</div>
		))
		: <span className="form-wrapper-span"></span>

	return (
		<div className="recommends-wrapper-container">
			{ items }
		</div>
	)
}
const SilderContentForm = ({value, handlers}) => {
	// console.log('handlers', handlers)

	const {
		imgSrc
	} = value.newContent

	const {
		_onSilderImgSrc
	} = handlers

	return (
		<div className="recommends-form-container">
			<div>
				<span className="item-deatail-small-title">상단 슬라이드 이미지</span>
				<input type="file" onChange={_onSilderImgSrc} accept="image/*" />
				<img src={imgSrc} />
			</div>
		</div>
	)
}

const ArtworkContentWrapper = ({value, handlers}) => {
	const {
		deleteArtwork,
	} = handlers

	let items = value && value.contents && value.contents.length > 0
		? value.contents.map(({
				artist,
				title,
				year,
				price,
				imgSrc,
				infoBackground = { 
					backgroundImage: `url(${imgSrc})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
					backgroundRepeat: 'no-repeat' }
			}, index) => (
				<div className="editor-related-item">
						<div className="editor-related-item-image" style={infoBackground}>
							<span className="editor-related-item-title">{title}</span>
						</div>
					<button className="editor-related-item-delete" onClick={() => deleteArtwork(index)}>
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
const ArtworkContentForm = ({value, handlers}) => {
	
	const {
		artist,
		title,
		year,
		price,
		imgSrc,
	} = value.newContent

	const {
		_onArtworkImgSrc,
		_onArtist,
		_onArtworkTitle,
		_onArtworkYear,
		_onArtworkPrice,
	} = handlers

	return (
		<div className="recommends-form-container">
			<div>
				<span className="item-deatail-small-title">제목</span>
				<input className="editor_input" type="text" value={title} onChange={_onArtworkTitle}/>
			</div>
			<div>
				<span className="item-deatail-small-title">작가</span>
				<input className="editor_input" type="text" value={artist} onChange={_onArtist}/>
			</div>
			<div>
				<span className="item-deatail-small-title">작품년도</span>
				<input className="editor_input" type="text" value={year} onChange={_onArtworkYear}/>
			</div>
			<div>
				<span className="item-deatail-small-title">가격</span>
				<input className="editor_input" type="number" value={price} onChange={_onArtworkPrice}/>
			</div>
			<div>
				<span className="item-deatail-small-title">이미지</span>
				<input type="file" onChange={_onArtworkImgSrc} accept="image/*" />
				<img src={imgSrc} />
			</div>
		</div>
	)
}

const Content = ({
	content,
	contentHandlers,
	_onContentSubmit,
	
	headingSlider,
	_onSliderContentSubmit,
	
	artworks,
	_onArtworksContentSubmit,
}) => {
	return (
		<div className="abstract-container">
			
			<span className="editor-small-title">상단 슬라이드 이미지</span>
			<FormWrapper
				title="상단 슬라이드 이미지"
				valueType={VALUE_TYPE.RECOMMEND}
				alt="이미지를 추가하세요"
				initialValue={headingSlider}
				submitCaption="슬라이드 이미지를 추가하세요"
				submitCaptionsub={'추가하기'}
				onSubmit={_onSliderContentSubmit}
				handlers={contentHandlers}
				Wrapper={SilderContentWrapper}
				Form={SilderContentForm}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container-middle"
			/>
		
			<span className="editor-small-title2">매거진 내용</span>
			<FormWrapper
				title="매거진 내용"
				valueType={VALUE_TYPE.RICH_TEXT}
				initialValue={content}
				submitCaption="매거진 세부 내용을 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onContentSubmit}
				Wrapper={ContentWrapper}
				Form={ContentForm}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container-middle"
			/>
			
			<span className="editor-small-title2">전시 작품 이미지</span>
			<FormWrapper
				title="전시 작품 이미지"
				valueType={VALUE_TYPE.RECOMMEND}
				alt="작품 이미지를 추가하세요"
				initialValue={artworks}
				submitCaption="전시 작품 이미지를 추가하세요"
				submitCaptionsub={'추가하기'}
				onSubmit={_onArtworksContentSubmit}
				handlers={contentHandlers}
				Wrapper={ArtworkContentWrapper}
				Form={ArtworkContentForm}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container-middle"
			/>
			
		</div>
	)
}

export default Content
