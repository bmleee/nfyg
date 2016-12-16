import { Link } from 'react-router'

const buttonClassName = 'exhibition-editor-tab-button';
const appliedClassName = 'exhibition-editor-tab-button-clicked';

const ProjectEditorTab = ({save}) => {
	
	let url, isAbstract, isArtwork, isOverview;

	url = document.URL;
	isOverview = document.URL.includes('/project-editor/overview')
	isArtwork = document.URL.includes('/project-editor/funding')
	isAbstract = !(isOverview || isArtwork)

	
	const abstartClassName = isAbstract ? `${buttonClassName} ${appliedClassName}` : buttonClassName
	const artwokrkClassName = isArtwork ? `${buttonClassName} ${appliedClassName}` : buttonClassName
	const overviewClassName = isOverview ? `${buttonClassName} ${appliedClassName}` : buttonClassName
	
	return (
	<div className="exhibition-editor-tab">
		<div className="exhibition-editor-title">
		<h3>프로젝트 등록(*관리자 권한)</h3>
		</div>
		<button className="share-button" onClick={save}>발행하기</button>
		<div className="exhibition-editor-tab-container"><Link to="/project-editor/abstract"><button className={abstartClassName}>개 요</button></Link></div>
		<div className="exhibition-editor-tab-container"><Link to="/project-editor/overview"><button className={overviewClassName}>내 용</button></Link></div>
		<div className="exhibition-editor-tab-container"><Link to="/project-editor/funding"><button className={artwokrkClassName}>펀딩/리워드</button></Link></div>
	</div>
)}

export default ProjectEditorTab
