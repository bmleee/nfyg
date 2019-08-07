import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react';

const buttonClassName = 'exhibition-editor-tab-button';
const appliedClassName = 'exhibition-editor-tab-button-clicked';

class StoreEditorTab extends Component {
	render() {
		const {
			tabLinkBase,
			editor_title,
			abstract_check,
			items_check
		} = this.props
		
		let url, isAbstract, isItem;
	
		url = document.URL;
		isItem = document.URL.includes(`${tabLinkBase}/item`)
		isAbstract = !(isItem)
	
		const abstartClassName = isAbstract ? `${buttonClassName} ${appliedClassName}` : buttonClassName
		const itemClassName = isItem ? `${buttonClassName} ${appliedClassName}` : buttonClassName
	
		return (
		<div className="exhibition-editor-tab">
			<div className="exhibition-editor-title">
				<h3 className="editor-title">{editor_title}</h3>
			</div>
			<div className="editor-tab-guide">
				<div>두 개의 섹션을 완성시켜주세요. 섹션이 완성되면 탭 아이콘이 <div className="editor-tab-guide-icon"></div>로 변합니다.</div>
				<div>'임시저장' 버튼의 경우 상점 제목, 상점 페이지 주소를 입력해야만 활성화가 되고</div>
				<div>'검토 요청하기' 버튼의 경우 선택항목을 제외한 모든 항목을 입력해야만 활성화가 됩니다.</div>
			</div>
			<div className="store-editor-tab-container">
				<Link to={`${tabLinkBase}/abstract`}>
					<button className={abstartClassName}>개 요
						{ !abstract_check ? <div className="editor-tab-uncheck-icon"></div> :<div className="editor-tab-check-icon"></div> }
					</button>
				</Link>
			</div>
			<div className="store-editor-tab-container">
				<Link to={`${tabLinkBase}/item`}>
					<button className={itemClassName}>품 목
						{ !items_check ? <div className="editor-tab-uncheck-icon"></div> :<div className="editor-tab-check-icon"></div> }
					</button>
				</Link>
			</div>
		</div>
	)}
}

export default StoreEditorTab
