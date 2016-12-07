import { Link } from 'react-router'

const ExhibitionEditorTab = ({save}) => (
	<div className="project-editor-tab">
		<Link className="project-editor-tab-button" to="/exhibition-editor/abstract"><button>전시 개요</button></Link>
		<Link to="/exhibition-editor/overview"><button className="project-editor-tab-button">전시 소개</button></Link>
		<Link to="/exhibition-editor/artworks"><button className="project-editor-tab-button">전시 작품</button></Link>
		<button onClick={save}>저장하기</button>
	</div>
)

export default ExhibitionEditorTab
