import React, { Component, PropTypes } from 'react';
import {
	HomeHeader,
	PresentProjectList,
	FutureProjectList,
	ExhibitionList,
	MagazineList,
	PastProjectList,

	HomeInfo,
	HomeHeading,

} from './';

import Modal from 'react-awesome-modal';

class Home extends Component {

	constructor(props) {
    super(props);
    this.state = {
        visible : false
    }
  }

  openModal() {
    this.setState({
        visible : true
    });
  }

  closeModal() {
    this.setState({
        visible : false
    });
  }

	render() {
		console.log('LocalStorage', localStorage);

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

					

						<input type="button" value="프로젝트 제안하기" onClick={() => this.openModal()} />
						
						{/* 프로젝트 제안 MODAl
						<Modal className="project-suggest-modal" visible={this.state.visible} width="480" height="560px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
						<div className="project-modal-header">
							<h3 className="project-modal-header-title">프로젝트 제안하기</h3>
							<a className="project-modal-header-close-container"><button className="project-modal-header-close" onClick={() => this.closeModal()}/></a>
						</div>
						<div className="project-modal-body">
							<p className="project-modal-body-small-title">연락처(필 수)
								<input className="project-modal-body-input-text" type="text" />
							</p>
							<p className="project-modal-body-small-title">이메일
								<input className="project-modal-body-input-text" type="text" />
							</p>
							<p className="project-modal-body-small-title">프로젝트 내용(필 수)
								<textarea className="project-modal-body-input-textarea" type="textarea"/>
							</p>
							<p className="project-modal-body-small-title">필요한 후원금(원)
								<input className="project-modal-body-input-text" type="number" />
							</p>
							<p className="project-modal-body-small-title">후원금 용도
								<textarea className="project-modal-body-input-textarea" type="textarea"/>
							</p>
							<p className="project-modal-body-small-title">관련 링크
								<input className="project-modal-body-input-text" type="text"/>
							</p>
						</div>
						<div className="project-modal-footer">
							<a className="project-modal-header-save-container" onClick={() => this.closeModal()}><button type="submit" className="project-modal-header-save">제안하기</button></a>
						</div>
						</Modal>
						*/}

      		
					<HomeHeading title="What's on?" />
					<PresentProjectList projects={presentProjects} />

					<HomeHeading title="Products" />
					<PresentProjectList projects={products} />

					<HomeHeading title="Featured Exhibitions" />
					<ExhibitionList exhibitions={recentExhibitions} />


					<HomeHeading title="7Pictures Magazine" />
					<MagazineList magazines={artMagazines} />

					{/* <HomeHeading title="종료된 프로젝트" />
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
