import { Link } from 'react-router'

const ProjectEditorTab = () => (
	<div className="project-editor-tab">
		<Link className="project-editor-tab-button" to="/project-editor/abstract"><button>프로젝트 개요</button></Link>
		<Link to="/project-editor/funding"><button className="project-editor-tab-button">펀딩 및 리워드</button></Link>
		<Link to="/project-editor/overview"><button className="project-editor-tab-button">프로젝트 소개</button></Link>
	</div>
)

export default ProjectEditorTab
