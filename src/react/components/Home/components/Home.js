import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import Progress from 'react-progressbar';

import SuccessImage from '~/src/assets/images/success2.svg'

import {
	HomeHeader,
	PresentProjectList,
	PresentProductList,

	FutureProjectList,
	ExhibitionList,
	MagazineList,
	PastProjectList,

	HomeInfo,
	HomeHeading,

} from './';

import Modal from '~/src/react/components/react-awesome-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Slider from 'react-slick';

const sliderSettings = {
	dots: false,
	infinite: true,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 3,
	initialSlide: 0,
	responsive: [{
		breakpoint: 1024,
		settings: {
			slidesToShow: 3,
			slidesToScroll: 3,
		}
	}, {
		breakpoint: 991,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
			dots: true,
			speed: 250
		}
	}],
};

class Home extends Component {
	
	componentDidMount () {
          window.scrollTo(0, 0)
        }
	
	render() {
		const {
			presentProjects,
			// futureProjects,
			recentExhibitions,
			artMagazines,
			// pastProjects
			products
		} = this.props;

		return (
			<div className="home">
				<HomeHeader />
				<div className ="home-body">
					{/* <HomeInfo title="공유로 후원한 금액" amount={10000} /> */}
					<HomeHeading title="What's on?" />
					<Tabs onSelect={this.handleSelect} selectedIndex={0}>
					<TabList>
						<Tab>프로젝트</Tab>
						<Tab>미술소품</Tab>
					</TabList>

					<TabPanel>
						<PresentProjectList projects={presentProjects.slice(0, 4)} />
						<div className="home-sub-title">
							<h3>진행 중인 미술소품</h3>
						</div>
						<Slider {...sliderSettings}>
							{
								products.slice(0, 8).map(
								({
									imgSrc,
									creator,
									title,
									currentMoney,
									targetMoney,
									numDirectSupports,
									numIndirectSupports,
									remainingDays,
									link,
									postIntro,
								}, index) => (
									<div className="present-project-list-item-container">
										<div className="present-project-list-item" key={index}>
											<Link to={link}>
												<div className="pr-thumbnail">
													<div className="ex-centered">
														<img className="home-exhibition-image" src={imgSrc} />
													</div>
												</div>
											</Link>
											<div className="present-project-list-item-caption">
												<Link to={link}><h4 className="project-list-title">{title}</h4></Link>
												<div className="product-purchase-num"><p>000명</p>주문중</div>
											</div>
										</div>
									</div>
								)
							) }
						</Slider>
						<PresentProjectList projects={presentProjects.slice(4, presentProjects.length)} />
					</TabPanel>

					<TabPanel>
						<PresentProductList products={products.slice(0, 4)} />
						<div className="home-sub-title">
							<h3>진행 중인 프로젝트</h3>
						</div>
						<Slider {...sliderSettings}>
							{
								presentProjects.slice(0, 8).map(
									({
										imgSrc,
										creator,
										title,
										currentMoney,
										targetMoney,
										numDirectSupports,
										numIndirectSupports,
										remainingDays,
										link,
										postIntro,
									}, index) => (
										<div className="present-project-list-item-container" key={index}>
											<div className="present-project-list-item">
												<Link to={link}> {/* TODO: include :project_name */}
													<div className="pr-thumbnail">
														<div className="ex-centered">
															<img className="home-exhibition-image" src={imgSrc} />
														</div>
													</div>
												</Link>
												<div className="present-project-list-item-caption">
													<Link to={link}><h4 className="project-list-title">{title}</h4></Link>
													<Progress completed={Math.min(100, Math.round(currentMoney / targetMoney * 100))} />
													<div className="project-summary-detail">
													{Math.round(currentMoney / targetMoney * 100)}%
													</div>
												</div>
											</div>
										</div>
									))
							}
						</Slider>
						<PresentProductList products={products.slice(4, products.length)} />

					</TabPanel>
					</Tabs>

					{/*
					<HomeHeading title="Featured Exhibitions" />
					<ExhibitionList exhibitions={recentExhibitions} />

					<HomeHeading title="7Pictures Magazine" />
					<MagazineList magazines={artMagazines} />

					<HomeHeading title="종료된 프로젝트" />
					<PastProjectList projects={pastProjects} /> */}
				</div>

		        <script
			      dangerouslySetInnerHTML={{ __html:
			        `
			          require(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us13.list-manage.com","uuid":"7ab71f9618a27f6e6f7e4a94f","lid":"c7e4765340"}) })
			        `
			      }}
			    />

			    <script src="https://s3.amazonaws.com/downloads.mailchimp.com/js/signup-forms/popup/embed.js"
			    	// dataDojoConfig="usePlainJson: true, isDebug: false"
			    	/>

			</div>
			)
	}

}
export default Home;
