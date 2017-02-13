import { Link } from 'react-router'

const Tab = ({save}) => (
	<div className="exhibition-editor-tab">
		<div className="exhibition-editor-title">
		<h3>스폰서 등록</h3>
		</div>
		<button className="share-button" onClick={save}>발행하기</button>
	</div>
)

export default Tab
