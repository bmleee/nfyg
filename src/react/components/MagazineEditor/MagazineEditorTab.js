import { Link } from 'react-router'

const buttonClassName = 'exhibition-editor-tab-button';
const appliedClassName = 'exhibition-editor-tab-button-clicked';

const MagazineEditorTab = ({save}) => {
	
	let url, isAbstract, isArtwork, isOverview;

	url = document.URL;
	isOverview = document.URL.includes('magazine-editor/content')
	isArtwork = document.URL.includes('magazine-editor/recommend')
	isAbstract = !(isOverview || isArtwork)

	
	const abstartClassName = isAbstract ? `${buttonClassName} ${appliedClassName}` : buttonClassName
	const artwokrkClassName = isArtwork ? `${buttonClassName} ${appliedClassName}` : buttonClassName
	const overviewClassName = isOverview ? `${buttonClassName} ${appliedClassName}` : buttonClassName
	
	return (
	<div className="exhibition-editor-tab">
	<div className="exhibition-editor-title">
		<h3>매거진 등록하기(*작가 및 예술관련 종사자 권한)</h3>
		<h5>예술 관련 소식들을 작성해주세요.</h5>
		<h5>구독자 분들에게 매주 전달해드립니다.</h5>
		</div>
		<button className="share-button" onClick={save}>검토 요청하기</button>
		<div className="exhibition-editor-tab-container"><Link to="/magazine-editor/abstract"><button className={abstartClassName}>매거진 개요</button></Link></div>
		<div className="exhibition-editor-tab-container"><Link to="/magazine-editor/content"><button className={overviewClassName}>매거진 내용</button></Link></div>
		<div className="exhibition-editor-tab-container"><Link to="/magazine-editor/recommend"><button className={artwokrkClassName}>관련 콘텐츠</button></Link></div>
	</div>
)}

export default MagazineEditorTab
