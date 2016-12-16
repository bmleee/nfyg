import { Link } from 'react-router'


const buttonClassName = 'exhibition-editor-tab-button';
const appliedClassName = 'exhibition-editor-tab-button-clicked';


const ExhibitionEditorTab = ({save}) => {
	
	let url, isAbstract, isArtwork, isOverview;

	url = document.URL;
	isOverview = document.URL.includes('/exhibition-editor/overview')
	isArtwork = document.URL.includes('exhibition-editor/artworks')
	isAbstract = !(isOverview || isArtwork)

	
	const abstartClassName = isAbstract ? `${buttonClassName} ${appliedClassName}` : buttonClassName
	const artwokrkClassName = isArtwork ? `${buttonClassName} ${appliedClassName}` : buttonClassName
	const overviewClassName = isOverview ? `${buttonClassName} ${appliedClassName}` : buttonClassName
	
	return (
	
	<div className="exhibition-editor-tab">
		<div className="exhibition-editor-title">
		<h3>전시 등록하기(*작가 및 예술관련 종사자 권한)</h3>
		<h5>진행 예정/중인 전시를 등록해주세요.</h5>
		<h5>구독자 분들에게 전시소식을 전달해드립니다.</h5>
		</div>
		<button className="share-button" onClick={save}>검토 요청하기</button>
		<div className="exhibition-editor-tab-container"><Link to="/exhibition-editor/abstract"><button className={abstartClassName}>전시 개요</button></Link></div>
		<div className="exhibition-editor-tab-container"><Link to="/exhibition-editor/overview"><button className={overviewClassName}>전시 소개</button></Link></div>
		<div className="exhibition-editor-tab-container"><Link to="/exhibition-editor/artworks"><button className={artwokrkClassName}>작품 등록</button></Link></div>
	</div>
)}

export default ExhibitionEditorTab
