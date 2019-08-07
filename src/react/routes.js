import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';

import App from './App'


import Home from './components/Home/containers/HomeContainer';

import Homewhatson from './components/Home/containers/HomeContainerwhatson';

import Homeartkit from './components/Home/containers/HomeContainerartkit';
import Homebadge from './components/Home/containers/HomeContainerbadge';
import Homegreen from './components/Home/containers/HomeContainergreen';
import Homeecobag from './components/Home/containers/HomeContainerecobag';

import Homeprojects from './components/Home/containers/HomeContainerprojects';

// import Sticker from './components/Home/components/Sticker'
// import Sticker2 from './components/Home/components/Sticker2'
// import Sticker3 from './components/Home/components/Sticker3'
// import fleamarket from './components/Home/components/fleamarket'
// import Poster from './components/Home/components/Poster'

import UserQnA from './components/Home/components/UserQnA'

import special_category from './components/Home/components/special_category'
import special_categoryPast from './components/Home/components/special_categoryPast'
import CategorySort from './components/Home/components/CategorySort'
import CategorySortItems from './components/Home/components/CategorySortItems'

import Start from './components/Home/components/Start'
import StartFunding from './components/Home/components/StartFunding'
import StartStore from './components/Home/components/StartStore'

//////// Store Of Weeks //////////

import Store_1_hwatustore from './components/StoreOfWeeks/Store_1_hwatustore'
import Store_2_somemood from './components/StoreOfWeeks/Store_2_somemood'

//////// Store Of Weeks //////////

import StoreList from './components/Home/containers/StoreListContainer';
import StoreMain from './components/Home/components/StoreMain'

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

import { Overview as StoreDetailOverview } 			from './components/StoreDetail/components/Overview';
import { Items as StoreDetailItems } 					from './components/StoreDetail/components/Items';
import StoreDetailPurchase 								from './components/StoreDetail/components/Purchase';

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
import ProductEditorPreview 	from './components/ProductEditor/components/Preview/Preview'

import StoreEditor 			from './components/StoreEditor/StoreEditor'
import StoreEditorAbstract 	from './components/StoreEditor/components/Abstract/Abstract'
import StoreEditorItem 		from './components/StoreEditor/components/Item/Item'

import ExhibitionEditor from './components/ExhibitionEditor'
import ExhibitionEditorAbstract from './components/ExhibitionEditor/components/Abstract'
import ExhibitionEditorOverview from './components/ExhibitionEditor/components/Overview'
import ExhibitionEditorArtworks from './components/ExhibitionEditor/components/Artworks'

import MagazineEditor from './components/MagazineEditor';
import MagazineEditorAbstract from './components/MagazineEditor/components/Abstract'
import MagazineEditorContent from './components/MagazineEditor/components/Content'
import MagazineEditorRecommend from './components/MagazineEditor/components/Recommend'

import SponsorEditor from './components/SponsorEditor'

import { Login, Signup, Signupsuccess, Forgot, Reset, Subscribe, SuperProfileContainer } from './components/User'

import { AdminProfileContainer, AdminProfileMain, AdminProfileProject, AdminProfileProduct, AdminProfileUser, AdminProfileSponsor  } from './components/User/Profile/AdminProfile'
import { ArtistProfileContainer, ArtistProfileMain, ArtistProfileProject, ArtistProfileProduct } from './components/User/Profile/ArtistProfile'
import { EditorProfileContainer, EditorProfileMain, EditorProfileProject, EditorProfileProduct } from './components/User/Profile/EditorProfile'
import { UserProfileContainer, UserProfileMain, UserProfileProject, UserProfileProduct } from './components/User/Profile/UserProfile'
import MyPage from './components/User/MyPage'
import Userlist from './components/User/Userlist'
import LikeList from './components/User/LikeList'

import {
	UserSummary,
	ProjectSummary,
	ProductSummary,
	PurchaseSummary,
	StoreSummary,
} from './components/Summary'

import Sponsors from './components/Sponsors/Sponsors'

import {
	About,
	Faq,
	Privacy,
	TermOfUse,
	Search
} from './components/Common/Footer/components'

// <Route path="projects/:project_name" component={ProjectDetail}> // TODO: activate
const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Home}></IndexRoute>
		
		<Route path="whats-on" component={Homewhatson}></Route>
		
		<Route path="start" component={Start}></Route>
		<Route path="funding-start" component={StartFunding}></Route>
		<Route path="store-apply" component={StartStore}></Route>
		
		<Route path="artkit" component={Homeartkit}></Route>
		<Route path="badge" component={Homebadge}></Route>
		<Route path="green-design" component={Homegreen}></Route>
		<Route path="ecobag" component={Homeecobag}></Route>
		
		<Route path="collection/:special_category" component={special_category}></Route>
		<Route path="past-collection" component={special_categoryPast}></Route>
		<Route path="category/:category_array" component={CategorySort}></Route>
		<Route path="items-category/:category" component={CategorySortItems}></Route>
		
		<Route path="storelist" component={StoreList}></Route>
		<Route path="storemain" component={StoreMain}></Route>
		
		/////// Store Of Weeks /////////////
		
		<Route path="storeofweeks/hwatustore" component={Store_1_hwatustore}></Route>
		<Route path="storeofweeks/somemooddesign" component={Store_2_somemood}></Route>
		
		/////// Store Of Weeks /////////////
		
		
		{/* <Route path="social-projects" component={Homeprojects}></Route> */}
		
		{/*
		<Route path="sticker" component={Sticker}></Route>
		<Route path="sticker2" component={Sticker2}></Route>
		<Route path="2018stickit" component={Sticker3}></Route>
		<Route path="doneuiartshop" component={fleamarket}></Route>
		<Route path="blind-poster" component={Poster}></Route>
		*/}
		
		<Route path="user-qna" component={UserQnA}></Route>
		
		{/*
		<Route path="projects/:projectName" component={ProjectDetail}>
			// Project Detail: Overview, Post, Ranking, QnA, ...
			<IndexRoute component={ProjectDetailOverview} />
			<Route path="post" component={ ProjectDetailPost }></Route>
			<Route path="ranking" component={ ProjectDetailRanking }></Route>
			<Route path="qna" component={ ProjectDetailQnA }></Route>
		</Route>
		*/}

		<Route path="projects/:projectName/edit" component={ProjectEditor}>
			<IndexRoute component={ProjectEditorAbstract} />
			<Route path="abstract" component={ ProjectEditorAbstract }></Route>
			<Route path="funding" component={ ProjectEditorFunding }></Route>
			<Route path="overview" component={ ProjectEditorOverview }></Route>
		</Route>

		<Route path="projects/:projectName/purchase" component={ ProjectDetailPurchase }></Route>
		<Route path="products/:productName/purchase" component={ ProjectDetailPurchase }></Route>

		<Route path="products/:productName" component={ProductDetail}>
			// Project Detail: Overview, Post, Ranking, QnA, ...
			<IndexRoute component={ProductDetailOverview} />
			<Route path="faq" component={ ProductDetailPost }></Route>
			<Route path="post" component={ ProductDetailRanking }></Route>
			<Route path="qna" component={ ProductDetailQnA }></Route>
			{/* <Route path="new" component={ ProductEditor }></Route> */}
		</Route>
		
		<Route path="store/:storeLink" component={ StoreDetailOverview }></Route>
		<Route path="store/:storeLink/item/:itemLink" component={ StoreDetailItems }></Route>
		<Route path="store/:storeLink/purchase" component={ StoreDetailPurchase }></Route>

		<Route path="products/:productName/edit" component={ProductEditor}>
			<IndexRoute component={ProductEditorAbstract} />
			<Route path="abstract" component={ ProductEditorAbstract }></Route>
			<Route path="funding" component={ ProductEditorFunding }></Route>
			<Route path="overview" component={ ProductEditorOverview }></Route>
			<Route path="preview" component={ ProductEditorPreview }></Route>
		</Route>
		
		<Route path="store/:storeLink/edit" component={StoreEditor}>
			<IndexRoute component={StoreEditorAbstract} />
			<Route path="abstract" component={ StoreEditorAbstract }></Route>
			<Route path="item" component={ StoreEditorItem }></Route>
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

		<Route path="magazines/:magazineName/edit" component={MagazineEditor}>
			<IndexRoute component={MagazineEditorAbstract} />
			<Route path="abstract" component={ MagazineEditorAbstract }></Route>
			<Route path="content" component={ MagazineEditorContent }></Route>
			<Route path="recommend" component={ MagazineEditorRecommend }></Route>
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
			<Route path="preview" component={ ProductEditorPreview }></Route>
		</Route>
		
		<Route path="store-editor" component={StoreEditor}>
			<IndexRoute component={StoreEditorAbstract} />
			<Route path="abstract" component={ StoreEditorAbstract }></Route>
			<Route path="item" component={ StoreEditorItem }></Route>
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
		<Route path="signupsuccess" component={Signupsuccess}></Route>
		<Route path="forgot" component={Forgot}></Route>
		<Route path="subscribe" component={Subscribe}></Route>
		<Route path="reset/:token" component={Reset}></Route>

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
		<Route path="userlist" component={Userlist}></Route>
		<Route path="user/:user_id" component={MyPage}></Route>
		<Route path="likelist" component={LikeList}></Route>

		<Route path="sponsors" component={Sponsors}></Route>
		<Route path="sponsors/:sponsorName/edit" component={SponsorEditor}></Route>

		{/* Summary */}
		<Route path="projects/:projectName/summary" component={ProjectSummary}></Route>
		<Route path="products/:productName/summary" component={ProductSummary}></Route>
		<Route path="store/:storeLink/summary" component={StoreSummary}></Route>
		<Route path="users/:user_id/summary" component={UserSummary}></Route>
		<Route path="purchases/:purchase_id/summary" component={PurchaseSummary}></Route>

		{/* Footer, Search components */}
		<Route path="about" component={About}></Route>
		<Route path="help" component={Faq}></Route>
		<Route path="privacy" component={Privacy}></Route>
		<Route path="termofuse" component={TermOfUse}></Route>
		<Route path="Search" component={Search}></Route>

	</Route>
)

export default routes;
