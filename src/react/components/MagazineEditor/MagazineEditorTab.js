import { Link } from 'react-router'

const buttonClassName = 'exhibition-editor-tab-button';
const appliedClassName = 'exhibition-editor-tab-button-clicked';

const MagazineEditorTab = ({save, tabLinkBase}) => {

	let url, isAbstract, isArtwork, isOverview;

	url = document.URL;
	isOverview = document.URL.includes(`${tabLinkBase}/content`)
	isArtwork = document.URL.includes(`${tabLinkBase}/recommend`)
	isAbstract = !(isOverview || isArtwork)


	const abstartClassName = isAbstract ? `${buttonClassName} ${appliedClassName}` : buttonClassName
	const artwokrkClassName = isArtwork ? `${buttonClassName} ${appliedClassName}` : buttonClassName
	const overviewClassName = isOverview ? `${buttonClassName} ${appliedClassName}` : buttonClassName

	return (
	<div className="exhibition-editor-tab">
	<div className="exhibition-editor-title">
		<h3>매거진 등록하기</h3>
		{/* <h5>예술 관련 소식들을 작성해주세요.</h5>
		<h5>구독자 분들에게 매주 전달해드립니다.</h5> */}
		</div>
		<button className="share-button" onClick={save}>매거진 발행하기</button>
		<div className="exhibition-editor-tab-container"><Link to={`${tabLinkBase}/abstract`}><button className={abstartClassName}>매거진 개요</button></Link></div>
		<div className="exhibition-editor-tab-container"><Link to={`${tabLinkBase}/content`}><button className={overviewClassName}>매거진 내용</button></Link></div>
		<div className="exhibition-editor-tab-container"><Link to={`${tabLinkBase}/recommend`}><button className={artwokrkClassName}>관련 콘텐츠</button></Link></div>
	</div>
)}

export default MagazineEditorTab
