import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';

import { Nav, Footer } from './components/Common';

import { TodoApp, Test } from './components';

import Home from './components/Home/containers/HomeContainer';

import { ProjectDetail } from './components/ProjectDetail';
import { Overview as ProjectDetailOverview } from './components/ProjectDetail/Overview';
import { Post as ProjectDetailPost } from './components/ProjectDetail/Post';
import { Ranking as ProjectDetailRanking } from './components/ProjectDetail/Ranking';
import { QnA as ProjectDetailQnA } from './components/ProjectDetail/QnA';

import { Exhibitions } from './components/Exhibitions';

import ExhibitionDetail 													from './components/Exhibitions/ExhibitionDetail/containers/ExhibitionDetailContainer';
import { Overview as ExhibitionDetailOverview } 	from './components/Exhibitions/ExhibitionDetail/components/Overview';
import { Artworks as ExhibitionDetailArtworks } 	from './components/Exhibitions/ExhibitionDetail/components/Artworks';
import { Post as ExhibitionDetailPost } 					from './components/Exhibitions/ExhibitionDetail/components/Post';
import { QnA as ExhibitionDetailQnA } 						from './components/Exhibitions/ExhibitionDetail/components/QnA';

import { Magazines } from './components/Magazines';
import { MagazineDetail } from './components/Magazines/MagazineDetail';

const App = ({ children }) => (
	<div>
		<Nav></Nav>
		Links:
		{' '}
		<Link to="/">Home</Link>
		{' '}
		<Link to="/">Projects</Link>
		{' '}
		<Link to="/exhibitions">Exhibitions</Link>
		{' '}
		<Link to="/magazines">Magazines</Link>
		{' '}
		<Link to="/test">Test Component</Link>
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

		<Route path="todos" component={TodoApp}></Route>

		<Route path="test" component={Test}></Route>
	</Route>
)

export default routes;
