import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react';

const buttonClassName = 'exhibition-editor-tab-button';
const appliedClassName = 'exhibition-editor-tab-button-clicked';

class ProductEditorTab extends Component {
	render() {
		const {
			tabLinkBase,
			editor_title,
			abstract_check,
			overview_check,
			funding_check
		} = this.props
		
		let url, isAbstract, isFunding, isOverview;
	
		url = document.URL;
		isOverview = document.URL.includes(`${tabLinkBase}/overview`)
		isFunding = document.URL.includes(`${tabLinkBase}/funding`)
		isAbstract = !(isOverview || isFunding)
	
	
		const abstartClassName = isAbstract ? `${buttonClassName} ${appliedClassName}` : buttonClassName
		const artwokrkClassName = isFunding ? `${buttonClassName} ${appliedClassName}` : buttonClassName
		const overviewClassName = isOverview ? `${buttonClassName} ${appliedClassName}` : buttonClassName
	
		return (
		<div className="exhibition-editor-tab">
			<div className="exhibition-editor-title">
				<h3 className="editor-title">{editor_title}</h3>
			</div>
			<div className="editor-tab-guide">
				<div>세 개의 섹션을 완성시켜주세요. 섹션이 완성되면 탭 아이콘이 <div className="editor-tab-guide-icon"></div>로 변합니다.</div>
				<div>'임시저장' 버튼의 경우 프로젝트 제목, 페이지 주소, 내용을 입력해야만 활성화가 되고</div>
				<div>'검토 요청하기' 버튼의 경우 선택항목을 제외한 모든 항목을 입력해야만 활성화가 됩니다.</div>
			</div>
			<div className="exhibition-editor-tab-container">
				<Link to={`${tabLinkBase}/abstract`}>
					<button className={abstartClassName}>개 요
						{ !abstract_check ? <div className="editor-tab-uncheck-icon"></div> :<div className="editor-tab-check-icon"></div> }
					</button>
				</Link>
			</div>
			<div className="exhibition-editor-tab-container">
				<Link to={`${tabLinkBase}/overview`}>
					<button className={overviewClassName}>내 용
						{ !overview_check ? <div className="editor-tab-uncheck-icon"></div> :<div className="editor-tab-check-icon"></div> }
					</button>
				</Link>
			</div>
			<div className="exhibition-editor-tab-container">
				<Link to={`${tabLinkBase}/funding`}>
					<button className={artwokrkClassName}>펀딩/리워드
						{ !funding_check ? <div className="editor-tab-uncheck-icon"></div> :<div className="editor-tab-check-icon"></div> }
					</button>
				</Link>
			</div>
		</div>
	)}
}

export default ProductEditorTab
