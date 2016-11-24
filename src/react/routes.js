import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';

import { Nav, Footer } from './components/Common';

import { TodoApp, Test1, Test2 } from './components';
import Test3 from './components/Test3'

import Home from './components/Home/containers/HomeContainer';

import ProjectDetail 															from './components/ProjectDetail/containers/ProjectDetailContainer';
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
import Abstract 	from './components/ProjectEditor/components/Abstract/Abstract'
import Funding 	from './components/ProjectEditor/components/Funding/Funding'
import Overview 	from './components/ProjectEditor/components/Overview/Overview'

import { Login, Profile, Signup } from './components/User'
import { Sponsers } from './components/Sponsors'

const App = ({ children }) => (
	<div>
		<div>
			Test Links:
			{' '}
			<Link to="/">Home</Link>
			{' '}
			<Link to="/">Projects</Link>
			{' '}
			<Link to="/exhibitions">Exhibitions</Link>
			{' '}
			<Link to="/magazines">Magazines</Link>
			{' '}
			<Link to="/project-editor">Project Editor</Link>
			{' '}
			<Link to="/login">Login</Link>
			{' '}
			<Link to="/signup">Signup</Link>
			{' '}
			<Link to="/profile">Profile</Link>
			{' '}
			<Link to="/sponsers">Sponsers</Link>
			{' '}
			<Link to="/test1">Test1</Link>
			{' '}
			<Link to="/test2">Test2</Link>
			{' '}
			<Link to="/test3">Test3</Link>
		</div>

		<Nav></Nav>

		{ children }

		<Footer></Footer>
	</div>
);

// <Route path="projects/:project_name" component={ProjectDetail}> // TODO: activate
const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Home}></IndexRoute>

		<Route path="projects" component={ProjectDetail}>
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
			<IndexRoute component={Abstract} />
			<Route path="abstract" component={ Abstract }></Route>
			<Route path="funding" component={ Funding }></Route>
			<Route path="overview" component={ Overview }></Route>
		</Route>

		<Route path="login" component={Login}></Route>
		<Route path="signup" component={Signup}></Route>
		<Route path="profile" component={Profile}></Route>
		<Route path="sponsers" component={Sponsers}></Route>

		<Route path="test1" component={Test1}></Route>
		<Route path="test2" component={Test2}></Route>
		<Route path="test3" component={Test3}></Route>
	</Route>
)

export default routes;
