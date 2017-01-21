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
import ProjectDetailPurchase 											from './components/ProjectDetail/components/Purchase';

import ProductDetail 															from './components/ProductDetail';
import { Overview as ProductDetailOverview } 			from './components/ProductDetail/components/Overview';
import { Post as ProductDetailPost } 							from './components/ProductDetail/components/Post';
import { Ranking as ProductDetailRanking } 				from './components/ProductDetail/components/Ranking';
import { QnA as ProductDetailQnA } 								from './components/ProductDetail/components/QnA';

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

import ProductEditor 			from './components/ProductEditor/ProductEditor'
import ProductEditorAbstract 	from './components/ProductEditor/components/Abstract/Abstract'
import ProductEditorFunding 	from './components/ProductEditor/components/Funding/Funding'
import ProductEditorOverview 	from './components/ProductEditor/components/Overview/Overview'

import ExhibitionEditor from './components/ExhibitionEditor'
import ExhibitionEditorAbstract from './components/ExhibitionEditor/components/Abstract'
import ExhibitionEditorOverview from './components/ExhibitionEditor/components/Overview'
import ExhibitionEditorArtworks from './components/ExhibitionEditor/components/Artworks'

import MagazineEditor from './components/MagazineEditor';
import MagazineEditorAbstract from './components/MagazineEditor/components/Abstract'
import MagazineEditorContent from './components/MagazineEditor/components/Content'
import MagazineEditorRecommend from './components/MagazineEditor/components/Recommend'

import SponsorEditor from './components/SponsorEditor'

import { Login, Signup, SuperProfileContainer } from './components/User'

import { AdminProfileContainer, AdminProfileMain, AdminProfileProject, AdminProfileProduct, AdminProfileUser, AdminProfileSponsor  } from './components/User/Profile/AdminProfile'
import { ArtistProfileContainer, ArtistProfileMain, ArtistProfileProject, ArtistProfileProduct } from './components/User/Profile/ArtistProfile'
import { EditorProfileContainer, EditorProfileMain, EditorProfileProject, EditorProfileProduct } from './components/User/Profile/EditorProfile'
import { UserProfileContainer, UserProfileMain, UserProfileProject, UserProfileProduct } from './components/User/Profile/UserProfile'
import MyPage from './components/User/MyPage'

import {
	User as UserSummary,
	Project as ProjectSummary,
	Product as ProductSummary,
} from './components/Summary'

import { Sponsors } from './components/Sponsors'

import {
	About,
	Faq,
	Privacy,
	TermOfUse
} from './components/Common/Footer/components'

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
		</Route>

		<Route path="projects/:projectName/edit" component={ProjectEditor}>
			<IndexRoute component={ProjectEditorAbstract} />
			<Route path="abstract" component={ ProjectEditorAbstract }></Route>
			<Route path="funding" component={ ProjectEditorFunding }></Route>
			<Route path="overview" component={ ProjectEditorOverview }></Route>
		</Route>

		<Route path="projects/:projectName/purchase" component={ ProjectDetailPurchase }></Route>

		<Route path="products/:productName" component={ProductDetail}>
			// Project Detail: Overview, Post, Ranking, QnA, ...
			<IndexRoute component={ProductDetailOverview} />
			<Route path="post" component={ ProductDetailPost }></Route>
			<Route path="ranking" component={ ProductDetailRanking }></Route>
			<Route path="qna" component={ ProductDetailQnA }></Route>
			{/* <Route path="new" component={ ProductEditor }></Route> */}
		</Route>

		<Route path="products/:productName/edit" component={ProductEditor}>
			<IndexRoute component={ProductEditorAbstract} />
			<Route path="abstract" component={ ProductEditorAbstract }></Route>
			<Route path="funding" component={ ProductEditorFunding }></Route>
			<Route path="overview" component={ ProductEditorOverview }></Route>
		</Route>

		{/* <Route path="products/:productName/payment" component={ProductPayment}/> */}

		<Route path="exhibitions" component={Exhibitions}>
		</Route>

		<Route path="exhibitions/:exhibitionName" component={ExhibitionDetail}>
			<IndexRoute component={ExhibitionDetailOverview} />
			<Route path="post" component={ ExhibitionDetailPost }></Route>
			<Route path="artworks" component={ ExhibitionDetailArtworks }></Route>
			<Route path="qna" component={ ExhibitionDetailQnA }></Route>
		</Route>

		<Route path="magazines" component={Magazines}>
		</Route>

		<Route path="magazines/:magazineName" component={MagazineDetail}>
			{/* // Magazine Detail: Post, Artworks, QnA
			<IndexRoute component={ExhibitionDetailOverview} />
			<Route path="post" component={ ExhibitionDetailPost }></Route>
			<Route path="artworks" component={ ExhibitionDetailArtworks }></Route>
			<Route path="qna" component={ ExhibitionDetailQnA }></Route> */}
		</Route>

		<Route path="project-editor" component={ProjectEditor}>
			<IndexRoute component={ProjectEditorAbstract} />
			<Route path="abstract" component={ ProjectEditorAbstract }></Route>
			<Route path="funding" component={ ProjectEditorFunding }></Route>
			<Route path="overview" component={ ProjectEditorOverview }></Route>
		</Route>

		<Route path="product-editor" component={ProductEditor}>
			<IndexRoute component={ProductEditorAbstract} />
			<Route path="abstract" component={ ProductEditorAbstract }></Route>
			<Route path="funding" component={ ProductEditorFunding }></Route>
			<Route path="overview" component={ ProductEditorOverview }></Route>
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

		{/* to dev rendering */}
		<Route path="profile" component={SuperProfileContainer}>
			<Route path="admin" component={AdminProfileContainer}>
				<IndexRoute component={AdminProfileMain}></IndexRoute>
				<Route path="main" component={AdminProfileMain}></Route>
				<Route path="project" component={AdminProfileProject}></Route>
				<Route path="product" component={AdminProfileProduct}></Route>
				<Route path="user" component={AdminProfileUser}></Route>
				<Route path="sponsor" component={AdminProfileSponsor}></Route>
			</Route>

			<Route path="editor" component={EditorProfileContainer}>
				<IndexRoute component={EditorProfileMain}></IndexRoute>
				<Route path="main" component={EditorProfileMain}></Route>
				<Route path="project" component={EditorProfileProject}></Route>
				<Route path="product" component={EditorProfileProduct}></Route>
			</Route>

			<Route path="artist" component={ArtistProfileContainer}>
				<IndexRoute component={ArtistProfileMain}></IndexRoute>
				<Route path="main" component={ArtistProfileMain}></Route>
				<Route path="project" component={ArtistProfileProject}></Route>
				<Route path="product" component={ArtistProfileProduct}></Route>
			</Route>

			<Route path="user" component={UserProfileContainer}>
				<IndexRoute component={UserProfileMain}></IndexRoute>
				<Route path="main" component={UserProfileMain}></Route>
				<Route path="project" component={UserProfileProject}></Route>
				<Route path="product" component={UserProfileProduct}></Route>
			</Route>
		</Route>

		<Route path="user/me" component={MyPage}></Route>
		<Route path="user/:user_id" component={MyPage}></Route>

		<Route path="sponsors" component={Sponsors}></Route>
		<Route path="sponsors/:sponsorName/edit" component={SponsorEditor}></Route>

		{/* Summary */}
		<Route path="projects/:projectName/summary" component={ProjectSummary}></Route>
		<Route path="products/:productName/summary" component={ProductSummary}></Route>
		<Route path="users/:user_id/summary" component={UserSummary}></Route>
		
		{/* Footer components */}
		<Route path="about" component={About}></Route>
		<Route path="faq" component={Faq}></Route>
		<Route path="privacy" component={Privacy}></Route>
		<Route path="termofuse" component={TermOfUse}></Route>
		

		<Route path="test1" component={Test1}></Route>
		<Route path="test2" component={Test2}></Route>
		<Route path="test3" component={Test3}></Route>

	</Route>
)

export default routes;
