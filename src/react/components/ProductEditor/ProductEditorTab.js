import { Link } from 'react-router'

const buttonClassName = 'exhibition-editor-tab-button';
const appliedClassName = 'exhibition-editor-tab-button-clicked';

const ProductEditorTab = ({save, tabLinkBase}) => {

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
		<h3>미술소품 등록</h3>
		</div>
		<button className="share-button" onClick={save}>발행하기</button>
		<div className="exhibition-editor-tab-container"><Link to={`${tabLinkBase}/abstract`}><button className={abstartClassName}>개 요</button></Link></div>
		<div className="exhibition-editor-tab-container"><Link to={`${tabLinkBase}/overview`}><button className={overviewClassName}>내 용</button></Link></div>
		<div className="exhibition-editor-tab-container"><Link to={`${tabLinkBase}/funding`}><button className={artwokrkClassName}>펀딩/리워드</button></Link></div>
	</div>
)}

export default ProductEditorTab
