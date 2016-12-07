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
			<div className="artworks-wrapper-item">
				<div>
					<span>제목: {title}</span>
				</div>
				<div>
					<span>설명: {description}</span>
				</div>
				<div>
					<span>가격: {price.toLocaleString()}원</span>
				</div>
				<div>
					<img src={imgSrc} alt=""/>
				</div>
				<div>
					<span>{value2label(SelectOptions.Artwork, soldOut)}</span>
				</div>
				<button onClick={() => deleteArtwork(index)}>삭제하기</button>
			</div>
		))
		: '전시하실 작품을 추가하세요'

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
				<span>작품 제목</span>
				<input type="text" value={title} onChange={_onTitle}/>
			</div>
			<div>
				<span>작품 설명</span>
				<input type="text" value={description} onChange={_onDescription}/>
			</div>
			<div>
				<span>작품 가격</span>
				<input type="number" value={price} onChange={_onPrice}/>
			</div>
			<div>
				<span>작품 이미지</span>
				<input type="file" value={imgSrc} onChange={_onImgSrc} accept="image/*" />
			</div>
			<div>
				<span>판매 가능 여부</span>
				<Select
					value={soldOut}
					onChange={_onSoldOut}
					options={SelectOptions.Artwork}
				/>
			</div>
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
				title="Artworks"
				valueType={VALUE_TYPE.ARTWORK}
				alt="제목을 입력하세요"
				initialValue={artwork}
				submitCaption="입력하기"
				onSubmit={_onArtworkSubmit}
				handlers={artworkHandlers}
				Wrapper={ArtworksWrapper}
				Form={ArtworksForm}
			/>
		</div>
	)
}

export default Artworks
