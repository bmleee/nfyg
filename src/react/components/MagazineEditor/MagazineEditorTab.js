import { Link } from 'react-router'

const MagazineEditorTab = ({save}) => (
	<div className="project-editor-tab">
		<Link className="project-editor-tab-button" to="/magazine-editor/abstract"><button>매거진 개요</button></Link>
		<Link to="/magazine-editor/content"><button className="project-editor-tab-button">매거진 내용</button></Link>
		<Link to="/magazine-editor/recommend"><button className="project-editor-tab-button">관련 매거진 / 전시</button></Link>
		<button onClick={save}>저장하기</button>
	</div>
)

export default MagazineEditorTab
