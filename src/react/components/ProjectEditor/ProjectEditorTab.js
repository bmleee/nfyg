import { Link } from 'react-router'

const ProjectEditorTab = () => (
	<div>
		<Link to="/project-editor/abstract"><button>Abstract</button></Link>
		<Link to="/project-editor/funding"><button>Funding</button></Link>
		<Link to="/project-editor/overview"><button>Overview</button></Link>
	</div>
)

export default ProjectEditorTab
