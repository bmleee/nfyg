import React from 'react'
import Select from 'react-select'

import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

import { SelectOptions } from '~/src/react/constants'
import { value2label } from '~/src/react/lib/utils'

const ArtworksWrapper = ({value, handlers}) => {
	let {
		deleteArtwork
	} = handlers

	let items = !!value.artworks && value.artworks.length > 0
		? value.artworks.map( ({
			title,
			description,
			price,
			imgSrc,
			soldOut,
		}, index) => (
			<div className="editor-item-detail-wrapper">
				<div>
					<span className="item-deatail-small-title-saved">작품명 : {title}</span>
				</div>
				<div>
					<span className="item-deatail-small-title-saved">캡 션 : {description}</span>
				</div>
				<div>
					<span className="item-deatail-small-title-saved">가 격 : {price.toLocaleString()}원</span>
				</div>
				<div>
					<img src={imgSrc} alt=""/>
				</div>
				<div>
					<span className="item-deatail-small-title-saved">상 태 : {value2label(SelectOptions.Artwork, soldOut)}</span>
				</div>
				<button className="item-deatail-delete" onClick={() => deleteArtwork(index)}>삭제하기</button>
			</div>
		))
		: ''

	return (
		<div className="artworks-wrapper-container">
			{ items }
		</div>
	)
}

const ArtworksForm = ({value, handlers}) => {
	const {
		title,
		description,
		imgSrc,
		price,
		soldOut
	} = value.newArtwork

	const {
		_onTitle,
		_onDescription,
		_onImgSrc,
		_onPrice,
		_onSoldOut,
	} = handlers

	return (
		<div className="artworks-form-container">
			<div>
				<span className="item-deatail-small-title">작품명</span>
				<input type="text" value={title} onChange={_onTitle}/>
			</div>
			<div>
				<span className="item-deatail-small-title">캡션(사이즈/재료/제작년도 순)</span>
				<input type="text" value={description} onChange={_onDescription}/>
			</div>
			<div>
				<span className="item-deatail-small-title">작품 가격(선택)</span>
				<input type="number" value={price} onChange={_onPrice}/>
			</div>
			<div>
				<span className="item-deatail-small-title">작품 이미지(최대 00MB)</span>
				<input type="file" value={imgSrc} onChange={_onImgSrc} accept="image/*" />
			</div>
			{/* <div>
				<span>판매 가능 여부</span>
				<Select
					value={soldOut}
					onChange={_onSoldOut}
					options={SelectOptions.Artwork}
				/>
			</div> */}
		</div>
	)
}

const Artworks = ({
	artwork,

	_onArtworkSubmit,

	// onChange callbacks
	artworkHandlers,
}) => {
	return (
		<div className="artwork-container">
			<FormWrapper
				title="작품 등록"
				valueType={VALUE_TYPE.ARTWORK}
				alt="제목을 입력하세요"
				initialValue={artwork}
				submitCaption="전시작을 등록해주세요"
				submitCaptionsub="입력하기"
				onSubmit={_onArtworkSubmit}
				handlers={artworkHandlers}
				Wrapper={ArtworksWrapper}
				Form={ArtworksForm}
				className ="exhibition-editor-artwork"
				classNameopen ="editor-open-container"
			/>
		</div>
	)
}

export default Artworks
