import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'
import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'
import { SelectOptions } from '~/src/react/constants'
import { value2label, value2array } from '~/src/react/lib/utils'
// import Editor from '~/src/react/components/DraftEditor/SevenEditor'

import { Editor } from '@tinymce/tinymce-react';
import {upload_file} from '~/src/react/api/AppAPI'

import md5 from 'md5'

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

const ItemWrapper = ({value, handlers, onChange}) => {
	const {
		deleteItem,
		modifyItem,
		modifyItemDone,
		modifyItemName,
		modifyItemDescription,
		modifyItemCategory,
		modifyItemMainCategory,
		modifyItemImgSrc,
		modifyItemPrice,
		modifyItemSalePrice,
		modifyItemSize,
		modifyItemMadeIn,
		modifyItemOverview,
		modifyItemOverview_new,
		modifyItemComment,
		modifyItemTemporaryOut,
		modifyMaxPurcahseVolum,
		
		ModifyOptionOpt,
		ModifyOptionsAddPrice,
		ModifydeleteOption,
		ModifyOptionPush,
		ItemUp,
		ItemDown
	} = handlers

	const items = !!value && !!value.itemList && value.itemList.length > 0
		? value.itemList.map(({
			name,
			description,
			imgSrc,
			price,
			saleprice,
			category,
			sub_category,
			main_category,
			size,
			madein,
			itemLink,
			overview,
			overview_new,
			overview_real = overview_new? overview_new : overview.html,
			overview_real2 = overview_real.replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`), 
			open = false,
			rewardComment,
			temporary_outofstock,
			maxPurchaseVolume,
			options
		}, index) => (
			open == false ?
			<div className="store-item-container">
				<div className="store-item-img-container">
					<div className="store-item-img-thumbnail">
						<img className="store-item-img" src={imgSrc}/>
					</div>
				</div>
				<div className="store-item-info-container">
					<div className="store-item-nameandprice">{name}[{value2label(SelectOptions.MainCategory, main_category)}]</div>
					{options.map(({
						opt,
						add_price
						}, index) => (
						!!add_price ?
						<div className="store-item-option">{opt} +{add_price.toLocaleString()}원</div>
						:
						<div className="store-item-option">{opt}</div>
					))}
					{ !!price ? <div className="store-item-price">{price.toLocaleString()}원</div> : null }
					<button className="store-item-modify" onClick={() => modifyItem(index, true)}>수정하기</button>
					<button className="store-item-up" onClick={() => ItemUp(index)}></button>
					<button className="store-item-down" onClick={() => ItemDown(index)}></button>
					<button className="store-item-delete" onClick={() => deleteItem(index)}></button>
				</div>
			</div>
			:
			<div className="editor-open-container-middle">
				<div className="fuding-reward-form-container">
					<div>
						<span className="item-deatail-small-title">제품 이름</span>
						<input className="editor_input" type="text" value={name} onChange={(e) => modifyItemName(index, e)}/>
					</div>
					
					{/*
					<div>
						<span className="item-deatail-small-title">제품 옵션(쉼표[,]로 구분)</span>
						<input className="editor_input" type="text" value={description} onChange={(e) => modifyItemDescription(index, e)} />
					</div>
					*/}
					
					<div>
						<span className="item-deatail-small-title">제품 옵션:[옵션명] +[추가금액]</span>
						{options.map(({
							opt,
							add_price
							}, index2) => (
							<div className="editor-option-modify-container">
								<input className="editor-option-modify-opt" type="text" value={opt} onChange={(e) => ModifyOptionOpt(index, index2, e)}/>
								<div className="editor-option-modify-plus">+</div>
								<input className="editor-option-modify-price" type="number" step="1000" value={add_price} onChange={(e) => ModifyOptionsAddPrice(index, index2, e)}/>
								<div className="editor-option-modify-won">원</div>
								<button className="editor-option-delete" onClick={() => ModifydeleteOption(index, index2)}></button>
							</div>	
							)
						)}
							<div className="editor-option-add-container">
								<button className="editor-option-add" onClick={() => ModifyOptionPush(index)}></button>
							</div>
					</div>
					
					<div>
						<span className="item-deatail-small-title">제품 가격</span>
						<input className="editor_input" type="number" value={price} onChange={(e) => modifyItemPrice(index, e)} step="1000" />
					</div>
					
					<div>
						<span className="item-deatail-small-title">제품 할인 가격(선택항목)</span>
						<input className="editor_input" type="number" value={saleprice} onChange={(e) => modifyItemSalePrice(index, e)} step="1000" />
					</div>
					
					<div className="item-deatail-img-container">
						<span className="item-deatail-small-title">제품 대표이미지</span>
						<input className="editor_input" type="file" onChange={(e) => modifyItemImgSrc(index, e)} accept="image/*" />
						{ imgSrc && <img src={imgSrc} alt="제품 이미지를 등록하세요" accept="image/*"/> }
					</div>
					
					<div className="item-deatail-margin-top-9">
						<span className="item-deatail-small-title">제품 카테고리</span>
						<Select value={sub_category} onChange={(e) => modifyItemMainCategory(index, e.value)} options={SelectOptions.MainCategory} />
					</div>
					
					<div className="item-deatail-margin-top-9">
						<span className="item-deatail-small-title">제품 남기실 말 활성화</span>
						<Select
							value={rewardComment} onChange={(e) => modifyItemComment(index, e)}
							options={SelectOptions.EtcrewardActive}
						/>
					</div>
					
					<div>
						<span className="item-deatail-small-title2">제품 한정 수량(0은 한정수량 없음)</span>
						<input className="editor_input" type="number" value={maxPurchaseVolume} onChange={(e) => modifyMaxPurcahseVolum(index, e)} min={0}/>
					</div>
					
					<div className="item-deatail-margin-top-9">
						<span className="item-deatail-small-title">제품 일시품절</span>
						<Select
							value={temporary_outofstock} onChange={(e) => modifyItemTemporaryOut(index, e)}
							options={SelectOptions.EtcrewardActive}
						/>
					</div>
					
					<div className="item-deatail-margin-top-9">
						<span className="item-deatail-small-title">제품 사이즈</span>
						<input className="editor_input" type="text" value={size} onChange={(e) => modifyItemSize(index, e)} />
					</div>
					
					<div>
						<span className="item-deatail-small-title">제품 제조국</span>
						<input className="editor_input" type="text" value={madein} onChange={(e) => modifyItemMadeIn(index, e)} />
					</div>
					
					{/*
					<div>
						<span className="item-deatail-small-title">제품 링크</span>
						<input className="editor_input" type="text" value={itemLink} onChange={_onItemLink} maxLength={36} />
						<span className="editor-remain-char2">{36 - itemLink.length}자 남았습니다.</span>
					</div>
					*/}
					
					<div>
						<span className="item-deatail-small-title">제품 내용</span>
						<input name="image" type="file" id="upload2" className="editor-image-hidden" onChange={onDrop} accept="image/*"/>
						<Editor
					        initialValue={overview_real2}
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
							        $('#upload2').trigger('click');
							        $('#upload2').on('change', function() {
							          var file = this.files[0];
							          var file2 = uploadCallback(file);
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
					        onChange={(e) => modifyItemOverview_new(index, e)}
				        />
					</div>
					<div className="item-modify-ok-container">
						<button className="item-modify-ok" onClick={() => modifyItemDone(index, false)}>수정완료</button>
					</div>
				</div>
			</div>
		))
		: <span className="form-wrapper-span"></span>
		
	return (
		<div className="reward-wrapper-container">
			{items}
		</div>
	)
}
const ItemForm = ({value, handlers, ...otherProps, onChange}) => {
	const {
		name,
		description,
		imgSrc,
		price,
		saleprice,
		category,
		sub_category,
		itemLink,
		overview,
		overview_new,
		overview_new2 = overview_new.replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`),
		size,
		madein,
		rewardComment,
		maxPurchaseVolume,
		temporary_outofstock,
		options
	} = value.itemNew
	
	const {
		opt,
		add_price
	} = value.optionNew
	
	const {
		_onName,
		_onDescription,
		_onCategory,
		_onMainCategory,
		_onImgSrc,
		_onPrice,
		_onSalePrice,
		_onSize,
		_onMadeIn,
		_onItemLink,
		_onOverview,
		_onOverview_new,
		_onIsRewardComment,
		_onMaxPurcahseVolum,
		_onIsTemporaryOut,
		
		_onOptionOpt,
		_onOptionsAddPrice,
		_onNewOptionPush,
		deleteOption
	} = handlers

	return (
		<div className="fuding-reward-form-container">
			<div>
				<span className="item-deatail-small-title">제품 이름</span>
				<input className="editor_input" type="text" value={name} onChange={_onName}/>
			</div>
			
			{/*
			<div>
				<span className="item-deatail-small-title">제품 옵션(쉼표[,]로 구분)</span>
				<input className="editor_input" type="text" value={description} onChange={_onDescription}/>
			</div>
			*/}
			
			<div>
				<span className="item-deatail-small-title">제품 옵션:[옵션명] +[추가금액]</span>
				{options.map(({
					}, index) => (
					<div className="editor-option-modify-container">
						<input className="editor-option-modify-opt" type="text" value={options[index].opt} onChange={(e) => _onOptionOpt(index, e)}/>
						<div className="editor-option-modify-plus">+</div>
						<input className="editor-option-modify-price" type="number" step="1000" value={options[index].add_price} onChange={(e) => _onOptionsAddPrice(index, e)}/>
						<div className="editor-option-modify-won">원</div>
						<button className="editor-option-delete" onClick={() => deleteOption(index)}></button>
					</div>	
					)
				)}
					<div className="editor-option-add-container">
						<button className="editor-option-add" onClick={_onNewOptionPush}></button>
					</div>
			</div>
			
			<div>
				<span className="item-deatail-small-title3">제품 가격</span>
				<input className="editor_input" type="number" value={price} onChange={_onPrice} step="1000" />
			</div>
			
			<div>
				<span className="item-deatail-small-title3">제품 할인 가격(선택항목)</span>
				<input className="editor_input" type="number" value={saleprice} onChange={_onSalePrice} step="1000" />
			</div>
			
			<div className="item-deatail-img-container">
				<span className="item-deatail-small-title">제품 대표이미지</span>
				<input className="editor_input" type="file" onChange={_onImgSrc} accept="image/*" />
				{ imgSrc && <img src={imgSrc} alt="제품 이미지를 등록하세요" accept="image/*"/> }
			</div>
			
			<div className="item-deatail-margin-top-9">
				<span className="item-deatail-small-title">제품 카테고리</span>
				<Select
					value={sub_category}
					onChange={(e) => _onMainCategory(e.value)}
					options={SelectOptions.MainCategory}
				/>
			</div>
			
			<div className="item-deatail-margin-top-9">
				<span className="item-deatail-small-title">제품 남기실 말 활성화</span>
				<Select
					value={rewardComment} onChange={_onIsRewardComment}
					options={SelectOptions.EtcrewardActive}
				/>
			</div>
			
			<div>
				<span className="item-deatail-small-title2">제품 한정 수량(0은 한정수량 없음)</span>
				<input className="editor_input" type="number" value={maxPurchaseVolume} onChange={_onMaxPurcahseVolum} min={0}/>
			</div>
			
			<div className="item-deatail-margin-top-9">
				<span className="item-deatail-small-title">제품 일시품절</span>
				<Select
					value={temporary_outofstock} onChange={_onIsTemporaryOut}
					options={SelectOptions.EtcrewardActive}
				/>
			</div>
			
			<div className="item-deatail-margin-top-9">
				<span className="item-deatail-small-title">제품 사이즈</span>
				<input className="editor_input" type="text" value={size} onChange={_onSize} />
			</div>
			
			<div>
				<span className="item-deatail-small-title">제품 제조국</span>
				<input className="editor_input" type="text" value={madein} onChange={_onMadeIn} />
			</div>
			
			{/*
			<div>
				<span className="item-deatail-small-title">제품 링크</span>
				<input className="editor_input" type="text" value={itemLink} onChange={_onItemLink} maxLength={36} />
				<span className="editor-remain-char2">{36 - itemLink.length}자 남았습니다.</span>
			</div>
			*/}
			
			<div>
				<span className="item-deatail-small-title">제품 내용</span>
				<input name="image" type="file" id="upload3" className="editor-image-hidden" onChange={onDrop} accept="image/*"/>
				<Editor
			        initialValue={overview_new2}
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
					        $('#upload3').trigger('click');
					        $('#upload3').on('change', function() {
					          var file = this.files[0];
					          var file2 = uploadCallback(file);
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
			        onChange={_onOverview_new}
		        />
			</div>
			
		</div>
	)
}

const ItemWrapperForAdmin = ({value, handlers, onChange}) => {
	const {
		deleteItem,
		modifyItem,
		modifyItemDone,
		modifyItemName,
		modifyItemDescription,
		modifyItemCategory,
		modifyItemMainCategory,
		modifyItemImgSrc,
		modifyItemPrice,
		modifyItemSalePrice,
		modifyItemSize,
		modifyItemMadeIn,
		modifyItemOverview,
		modifyItemAccept,
		modifyItemOverview_new,
		modifyItemComment,
		modifyItemTemporaryOut,
		modifyMaxPurcahseVolum,
		
		ModifyOptionOpt,
		ModifyOptionsAddPrice,
		ModifydeleteOption,
		ModifyOptionPush,
		ItemUp,
		ItemDown
	} = handlers

	const items = !!value && !!value.itemList && value.itemList.length > 0
		? value.itemList.map(({
			name,
			description,
			imgSrc,
			price,
			saleprice,
			category,
			main_category,
			sub_category,
			size,
			madein,
			itemLink,
			overview,
			overview_new,
			overview_real= overview_new? overview_new : overview.html,
			overview_real2 = overview_real.replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`), 
			accept,
			rewardComment,
			maxPurchaseVolume,
			temporary_outofstock,
			open = false,
			options
		}, index) => (
			open == false ?
			<div className="store-item-container">
				<div className="store-item-img-container">
					<div className="store-item-img-thumbnail">
						<img className="store-item-img" src={imgSrc}/>
					</div>
				</div>
				<div className="store-item-info-container">
					<div className="store-item-nameandprice">{name}[{value2label(SelectOptions.MainCategory, main_category)}]</div>
					{options.map(({
						opt,
						add_price
						}, index) => (
						!!add_price ?
						<div className="store-item-option">{opt} +{add_price.toLocaleString()}원</div>
						:
						<div className="store-item-option">{opt}</div>
					))}
					{ !!price ? <div className="store-item-price">{price.toLocaleString()}원</div> : null }
					<button className="store-item-modify" onClick={() => modifyItem(index, true)}>수정하기</button>
					<button className="store-item-up" onClick={() => ItemUp(index)}></button>
					<button className="store-item-down" onClick={() => ItemDown(index)}></button>
					<button className="store-item-delete" onClick={() => deleteItem(index)}></button>
				</div>
			</div>
			:
			<div className="editor-open-container-middle">
				<div className="fuding-reward-form-container">
					<div>
						<span className="item-deatail-small-title">제품 이름</span>
						<input className="editor_input" type="text" value={name} onChange={(e) => modifyItemName(index, e)}/>
					</div>
					
					{/*
					<div>
						<span className="item-deatail-small-title">제품 옵션(쉼표[,]로 구분)</span>
						<input className="editor_input" type="text" value={description} onChange={(e) => modifyItemDescription(index, e)} />
					</div>
					*/}
					
					<div>
						<span className="item-deatail-small-title">제품 옵션:[옵션명] +[추가금액]</span>
						{options.map(({
							opt,
							add_price
							}, index2) => (
							<div className="editor-option-modify-container">
								<input className="editor-option-modify-opt" type="text" value={opt} onChange={(e) => ModifyOptionOpt(index, index2, e)}/>
								<div className="editor-option-modify-plus">+</div>
								<input className="editor-option-modify-price" type="number" step="1000" value={add_price} onChange={(e) => ModifyOptionsAddPrice(index, index2, e)}/>
								<div className="editor-option-modify-won">원</div>
								<button className="editor-option-delete" onClick={() => ModifydeleteOption(index, index2)}></button>
							</div>	
							)
						)}
							<div className="editor-option-add-container">
								<button className="editor-option-add" onClick={() => ModifyOptionPush(index)}></button>
							</div>
					</div>
					
					<div>
						<span className="item-deatail-small-title">제품 가격</span>
						<input className="editor_input" type="number" value={price} onChange={(e) => modifyItemPrice(index, e)} step="1000" />
					</div>
					
					<div>
						<span className="item-deatail-small-title">제품 할인 가격(선택항목)</span>
						<input className="editor_input" type="number" value={saleprice} onChange={(e) => modifyItemSalePrice(index, e)} step="1000" />
					</div>
					
					<div className="item-deatail-img-container">
						<span className="item-deatail-small-title">제품 대표이미지</span>
						<input className="editor_input" type="file" onChange={(e) => modifyItemImgSrc(index, e)} accept="image/*" />
						{ imgSrc && <img src={imgSrc} alt="제품 이미지를 등록하세요" accept="image/*"/> }
					</div>
					
					<div className="item-deatail-margin-top-9">
						<span className="item-deatail-small-title">제품 카테고리</span>
						<Select value={sub_category} onChange={(e) => modifyItemMainCategory(index, e.value)} options={SelectOptions.MainCategory} />
					</div>
					
					<div className="item-deatail-margin-top-9">
						<span className="item-deatail-small-title">제품 남기실 말 활성화</span>
						<Select
							value={rewardComment} onChange={(e) => modifyItemComment(index, e)}
							options={SelectOptions.EtcrewardActive}
						/>
					</div>
					
					<div>
						<span className="item-deatail-small-title2">제품 한정 수량(0은 한정수량 없음)</span>
						<input className="editor_input" type="number" value={maxPurchaseVolume} onChange={(e) => modifyMaxPurcahseVolum(index, e)} min={0}/>
					</div>
					
					<div className="item-deatail-margin-top-9">
						<span className="item-deatail-small-title">제품 일시품절</span>
						<Select
							value={temporary_outofstock} onChange={(e) => modifyItemTemporaryOut(index, e)}
							options={SelectOptions.EtcrewardActive}
						/>
					</div>
					
					<div className="item-deatail-margin-top-9">
						<span className="item-deatail-small-title">제품 사이즈</span>
						<input className="editor_input" type="text" value={size} onChange={(e) => modifyItemSize(index, e)} />
					</div>
					
					<div>
						<span className="item-deatail-small-title">제품 제조국</span>
						<input className="editor_input" type="text" value={madein} onChange={(e) => modifyItemMadeIn(index, e)} />
					</div>
					
					{/*
					<div>
						<span className="item-deatail-small-title">제품 링크</span>
						<input className="editor_input" type="text" value={itemLink} onChange={_onItemLink} maxLength={36} />
						<span className="editor-remain-char2">{36 - itemLink.length}자 남았습니다.</span>
					</div>
					*/}
					
					<div>
						<span className="item-deatail-small-title">제품 내용</span>
						<input name="image" type="file" id="upload4" className="editor-image-hidden" onChange={onDrop} accept="image/*"/>
						<Editor
					        initialValue={overview_real2}
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
							        $('#upload4').trigger('click');
							        $('#upload4').on('change', function() {
							          var file = this.files[0];
							          var file2 = uploadCallback(file);
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
					        onChange={(e) => modifyItemOverview_new(index, e)}
				        />
					</div>
					
					<div>
						<span className="item-deatail-small-title">승인 여부</span>
						<Select
							value={accept} onChange={(e) => modifyItemAccept(index, e)}
							options={SelectOptions.itemAccept}
						/>
					</div>
					
					<div className="item-modify-ok-container">
						<button className="item-modify-ok" onClick={() => modifyItemDone(index, false)}>수정완료</button>
					</div>
					
				</div>
			</div>
		))
		: <span className="form-wrapper-span"></span>
		
	return (
		<div className="reward-wrapper-container">
			{items}
		</div>
	)
}
const ItemFormForAdmin = ({value, handlers, ...otherProps, onChange}) => {
	const {
		name,
		description,
		imgSrc,
		price,
		saleprice,
		category,
		main_category,
		sub_category,
		itemLink,
		overview,
		size,
		madein,
		accept,
		overview_new,
		overview_new2 = overview_new.replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`).replace(`<img src="../uploads/`, `<img src="/uploads/`),
		rewardComment,
		maxPurchaseVolume,
		temporary_outofstock,
		options
	} = value.itemNew
	
	const {
		opt,
		add_price
	} = value.optionNew
	
	const {
		_onName,
		_onDescription,
		_onCategory,
		_onMainCategory,
		_onImgSrc,
		_onPrice,
		_onSalePrice,
		_onSize,
		_onMadeIn,
		_onItemLink,
		_onOverview,
		_onAccept,
		_onOverview_new,
		_onIsRewardComment,
		_onMaxPurcahseVolum,
		_onIsTemporaryOut,
		
		_onOptionOpt,
		_onOptionsAddPrice,
		_onNewOptionPush,
		deleteOption
	} = handlers

	return (
		<div className="fuding-reward-form-container">
			<div>
				<span className="item-deatail-small-title">제품 이름</span>
				<input className="editor_input" type="text" value={name} onChange={_onName} />
			</div>
			
			{/*
			<div>
				<span className="item-deatail-small-title">제품 옵션(쉼표[,]로 구분)</span>
				<input className="editor_input" type="text" value={description} onChange={_onDescription}/>
			</div>
			*/}
			
			<div>
				<span className="item-deatail-small-title">제품 옵션:[옵션명] +[추가금액]</span>
				{options.map(({
					}, index) => (
					<div className="editor-option-modify-container">
						<input className="editor-option-modify-opt" type="text" value={options[index].opt} onChange={(e) => _onOptionOpt(index, e)}/>
						<div className="editor-option-modify-plus">+</div>
						<input className="editor-option-modify-price" type="number" step="1000" value={options[index].add_price} onChange={(e) => _onOptionsAddPrice(index, e)}/>
						<div className="editor-option-modify-won">원</div>
						<button className="editor-option-delete" onClick={() => deleteOption(index)}></button>
					</div>	
					)
				)}
					<div className="editor-option-add-container">
						<button className="editor-option-add" onClick={_onNewOptionPush}></button>
					</div>
			</div>
			
			<div>
				<span className="item-deatail-small-title3">제품 가격</span>
				<input className="editor_input" type="number" value={price} onChange={_onPrice} step="1000" />
			</div>
			
			<div>
				<span className="item-deatail-small-title3">제품 할인 가격(선택항목)</span>
				<input className="editor_input" type="number" value={saleprice} onChange={_onSalePrice} step="1000" />
			</div>
			
			<div className="item-deatail-img-container">
				<span className="item-deatail-small-title">제품 대표이미지</span>
				<input className="editor_input" type="file" onChange={_onImgSrc} accept="image/*" />
				{ imgSrc && <img src={imgSrc} alt="제품 이미지를 등록하세요" accept="image/*"/> }
			</div>
			
			<div className="item-deatail-margin-top-9">
				<span className="item-deatail-small-title">제품 카테고리</span>
				<Select
					value={sub_category}
					onChange={(e) => _onMainCategory(e.value)}
					options={SelectOptions.MainCategory}
				/>
			</div>
			
			<div>
				<span className="item-deatail-small-title2">제품 한정 수량(0은 한정수량 없음)</span>
				<input className="editor_input" type="number" value={maxPurchaseVolume} onChange={_onMaxPurcahseVolum} min={0}/>
			</div>
			
			<div className="item-deatail-margin-top-9">
				<span className="item-deatail-small-title">제품 일시품절</span>
				<Select
					value={temporary_outofstock} onChange={_onIsTemporaryOut}
					options={SelectOptions.EtcrewardActive}
				/>
			</div>
			
			<div className="item-deatail-margin-top-9">
				<span className="item-deatail-small-title">제품 남기실 말 활성화</span>
				<Select
					value={rewardComment} onChange={_onIsRewardComment}
					options={SelectOptions.EtcrewardActive}
				/>
			</div>
			
			<div className="item-deatail-margin-top-9">
				<span className="item-deatail-small-title">제품 사이즈</span>
				<input className="editor_input" type="text" value={size} onChange={_onSize} />
			</div>
			
			<div>
				<span className="item-deatail-small-title">제품 제조국</span>
				<input className="editor_input" type="text" value={madein} onChange={_onMadeIn} />
			</div>
			
			{/*
			<div>
				<span className="item-deatail-small-title">제품 링크</span>
				<input className="editor_input" type="text" value={itemLink} onChange={_onItemLink} maxLength={36} />
				<span className="editor-remain-char2">{36 - itemLink.length}자 남았습니다.</span>
			</div>
			*/}
			
			<div>
				<span className="item-deatail-small-title">제품 내용</span>
				<input name="image" type="file" id="upload5" className="editor-image-hidden" onChange={onDrop} accept="image/*"/>
				<Editor
			        initialValue={overview_new2}
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
					        $('#upload5').trigger('click');
					        $('#upload5').on('change', function() {
					          var file = this.files[0];
					          var file2 = uploadCallback(file);
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
			        onChange={_onOverview_new}
		        />
			</div>
			
			<div>
				<span className="item-deatail-small-title">승인 여부</span>
				<Select
					value={accept} onChange={_onAccept}
					options={SelectOptions.itemAccept}
				/>
			</div>
			
			
		</div>
	)
}

const Item = ({
	items,
	
	_onItemSubmit,
	_onContentSubmit,
	
	itemHandlers,
	contentHandlers,
	
	userType
	
}) => {

	return (
		<div className="abstract-container">
		
			<div className="store-item-sub-title">제품을 추가해주세요</div>
			
			{ userType == 'admin' ?
			<FormWrapper
				title="제품 추가하기"
				valueType={VALUE_TYPE.ITEM}
				alt="제품 추가하기"
				initialValue={items}
				submitCaption={'제품을 추가해주세요'}
				submitCaptionsub={'추가하기'}
				onSubmit={_onItemSubmit}
				handlers={itemHandlers}
				Wrapper={ItemWrapperForAdmin}
				Form={ItemFormForAdmin}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container-middle"
			/>
			:
			<FormWrapper
				title="제품 추가하기"
				valueType={VALUE_TYPE.ITEM}
				alt="제품 추가하기"
				initialValue={items}
				submitCaption={'제품을 추가해주세요'}
				submitCaptionsub={'추가하기'}
				onSubmit={_onItemSubmit}
				handlers={itemHandlers}
				Wrapper={ItemWrapper}
				Form={ItemForm}
				className ="magazine-editor-detail"
				classNameopen ="editor-open-container-middle"
			/>	
			}
			
			
			
		</div>
	)
}

export default Item
