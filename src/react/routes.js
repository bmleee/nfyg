import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';

import App from './App'

import { TodoApp, Test1, Test2 } from './components';
import Test3 from './components/Test3'

import Home from './components/Home/containers/HomeContainer';

import ProjectDetail 															from './components/ProjectDetail';
import { Overview as ProjectDetailOverview } 			from './components/ProjectDetail/components/Overview';
import { Post as ProjectDetailPost } 							from './components/ProjectDetail/components/Post';
import { Ranking as ProjectDetailRanking } 				from './components/ProjectDetail/components/Ranking';
import { QnA as ProjectDetailQnA } 								from './components/ProjectDetail/components/QnA';

import Exhibitions  from './components/Exhibitions/containers/ExhibitionsContainer';

import ExhibitionDetail 													from './components/Exhibitions/ExhibitionDetail/containers/ExhibitionDetailContainer';
import { Overview as ExhibitionDetailOverview } 	from './components/Exhibitions/ExhibitionDetail/components/Overview';
import { Artworks as ExhibitionDetailArtworks } 	from './components/Exhibitions/ExhibitionDetail/components/Artworks';
import { Post as ExhibitionDetailPost } 					from './components/Exhibitions/ExhibitionDetail/components/Post';
import { QnA as ExhibitionDetailQnA } 						from './components/Exhibitions/ExhibitionDetail/components/QnA';

import Magazines from './components/Magazines/containers/MagazinesContainer';
import MagazineDetail from './components/Magazines/MagazineDetail/containers/MagazineDetailContainer'

import ProjectEditor 			from './components/ProjectEditor/ProjectEditor'
import ProjectEditorAbstract 	from './components/ProjectEditor/components/Abstract/Abstract'
import ProjectEditorFunding 	from './components/ProjectEditor/components/Funding/Funding'
import ProjectEditorOverview 	from './components/ProjectEditor/components/Overview/Overview'

import ExhibitionEditor from './components/ExhibitionEditor'
import ExhibitionEditorAbstract from './components/ExhibitionEditor/components/Abstract'
import ExhibitionEditorOverview from './components/ExhibitionEditor/components/Overview'
import ExhibitionEditorArtworks from './components/ExhibitionEditor/components/Artworks'

import MagazineEditor from './components/MagazineEditor'
import MagazineEditorAbstract from './components/MagazineEditor/components/Abstract'
import MagazineEditorContent from './components/MagazineEditor/components/Content'
import MagazineEditorRecommend from './components/MagazineEditor/components/Recommend'

import SponsorEditor from './components/SponsorEditor'

import { Login, Profile, Signup } from './components/User'
import { Sponsors } from './components/Sponsors'



// <Route path="projects/:project_name" component={ProjectDetail}> // TODO: activate
const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Home}></IndexRoute>

		<Route path="projects/:projectName" component={ProjectDetail}>
			// Project Detail: Overview, Post, Ranking, QnA, ...
			<IndexRoute component={ProjectDetailOverview} />
			<Route path="post" component={ ProjectDetailPost }></Route>
			<Route path="ranking" component={ ProjectDetailRanking }></Route>
			<Route path="qna" component={ ProjectDetailQnA }></Route>
			<Route path="new" component={ ProjectEditor }></Route>
		</Route>

		<Route path="exhibitions" component={Exhibitions}>
		</Route>

		<Route path="exhibitions/detail" component={ExhibitionDetail}>
			<IndexRoute component={ExhibitionDetailOverview} />
			<Route path="post" component={ ExhibitionDetailPost }></Route>
			<Route path="artworks" component={ ExhibitionDetailArtworks }></Route>
			<Route path="qna" component={ ExhibitionDetailQnA }></Route>
		</Route>

		<Route path="magazines" component={Magazines}>
		</Route>

		<Route path="magazines/detail" component={MagazineDetail}>
			// Project Detail: Overview, Post, Ranking, QnA, ...
			<IndexRoute component={ExhibitionDetailOverview} />
			<Route path="post" component={ ExhibitionDetailPost }></Route>
			<Route path="artworks" component={ ExhibitionDetailArtworks }></Route>
			<Route path="qna" component={ ExhibitionDetailQnA }></Route>
		</Route>

		<Route path="project-editor" component={ProjectEditor}>
			<IndexRoute component={ProjectEditorAbstract} />
			<Route path="abstract" component={ ProjectEditorAbstract }></Route>
			<Route path="funding" component={ ProjectEditorFunding }></Route>
			<Route path="overview" component={ ProjectEditorOverview }></Route>
		</Route>

		<Route path="exhibition-editor" component={ExhibitionEditor}>
			<IndexRoute component={ExhibitionEditorAbstract} />
			<Route path="abstract" component={ ExhibitionEditorAbstract }></Route>
			<Route path="overview" component={ ExhibitionEditorOverview }></Route>
			<Route path="artworks" component={ ExhibitionEditorArtworks }></Route>
		</Route>

		<Route path="magazine-editor" component={MagazineEditor}>
			<IndexRoute component={MagazineEditorAbstract} />
			<Route path="abstract" component={ MagazineEditorAbstract }></Route>
			<Route path="content" component={ MagazineEditorContent }></Route>
			<Route path="recommend" component={ MagazineEditorRecommend }></Route>
		</Route>

		<Route path="sponsor-editor" component={SponsorEditor}></Route>

		<Route path="login" component={Login}></Route>
		<Route path="signup" component={Signup}></Route>
		<Route path="profile" component={Profile}></Route>
		<Route path="sponsors" component={Sponsors}></Route>

		<Route path="test1" component={Test1}></Route>
		<Route path="test2" component={Test2}></Route>
		<Route path="test3" component={Test3}></Route>
	</Route>
)

export default routes;
