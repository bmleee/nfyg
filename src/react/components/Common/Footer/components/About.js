import React, { Component, PropTypes } from 'react'
import MetaTags from 'react-meta-tags';

import { suggestProject } from '~/src/react/api/AppAPI'

import Modal from '~/src/react/components/react-awesome-modal';

class About extends Component {
    
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
    
    componentDidMount () {
          window.scrollTo(0, 0)
        }
        
    async onClickSuggest() {
		
		try {
			let body = {
				contact: document.getElementById('suggest-contact').value,
				email: document.getElementById('suggest-email').value,
				text: document.getElementById('suggest-text').value,
				money: document.getElementById('suggest-money').value,
				purpose: document.getElementById('suggest-purpose').value,
				link: document.getElementById('suggest-link').value,
			}

			let r = await suggestProject(body)
			// console.log('suggestProject', r);
		    appUtils.setFlash({title: '성공적으로 접수되었습니다. 검토 후 빠른 시일내에 답변드리겠습니다.', level: 'success', autoDismiss: 3})
		} catch (e) {
			// console.error(e);
		}
	}
    
    render() {
        let AboutBackground = {
			backgroundImage: `url(/assets/images/7pictures_faq_main5.jpg)`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
		
		let Section1_1_background = {
			backgroundImage: `url(/assets/images/flowerwall_about.jpg)`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
		let Section1_2_background = {
			backgroundImage: `url(/uploads/KakaoTalk_20170317_140439160.jpg)`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
		let Section1_3_background = {
			backgroundImage: `url(/uploads/seoulscience1.jpg)`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
		let Section1_4_background = {
			backgroundImage: `url(/uploads/dj_main.png)`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
		let Section1_5_background = {
			backgroundImage: `url(/uploads/1496057293171_DAPCFIDUAAEzOIo.jpg)`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
		let Section1_6_background = {
			backgroundImage: `url(/assets/images/thegreat_about.jpg)`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
        
        return (
            <div className="about-container">
                <MetaTags>
		            <title>About 7Pictures</title>
		        </MetaTags>
                <div className="about-heading-container" style={AboutBackground}>
                    <div className="about-heading-title">예술과 디자인을</div>
                    <div className="about-heading-title">후원하는 일을 합니다.</div>
                    <div className="about-heading-description-container">
                        <div className="about-heading-description">우리 주변에는 가치 있고 아름다운</div>
                        <div className="about-heading-description">예술/디자인 프로젝트들은 많습니다.</div>
                    </div>
                    <div className="about-heading-description-container">
                        <div className="about-heading-description">다만, 우리는 이들을 일일히 만나지 못합니다.</div>
                        <div className="about-heading-description">그래서 이들이 만들어가는 예술/디자인 프로젝트들을</div>
                        <div className="about-heading-description">온라인을 통해 매주 새롭게 소개하려 합니다.</div>
                        <div className="about-heading-description">당신의 주변이 예술적 영감으로 반짝이길 바랍니다.</div>
                    </div>
                </div>
                <div className="about-section1-container">
                    <div className="about-section1-title-container">
                        <div className="about-section1-title">Previous Projects</div>
                    </div>
                    <div className="about-section1-item-container">
                        <a href="https://netflix-salon.co.kr/projects/flowerwall" target="_blank">
                            <div className="about-section1-item">
                                <div className="about-section1-item-background" style={Section1_1_background}>
                                    <span className="about-section1-item-title">차벽을 꽃벽으로</span>
                                </div>
                            </div>
                        </a>
                        <a href="https://netflix-salon.co.kr/products/nabiletter" target="_blank">
                            <div className="about-section1-item">
                                <div className="about-section1-item-background" style={Section1_2_background}>
                                    <span className="about-section1-item-title">그녀의 글씨로 기억하세요 'NABILETTER'</span>
                                </div>
                            </div>
                        </a>
                        <a href="https://netflix-salon.co.kr/products/seoulmodelshop" target="_blank">
                            <div className="about-section1-item">
                                <div className="about-section1-item-background" style={Section1_3_background}>
                                    <span className="about-section1-item-title">서울과학사 : 서울의 프라모델</span>
                                </div>
                            </div>
                        </a>
                        <a href="https://netflix-salon.co.kr/products/dongju" target="_blank">
                            <div className="about-section1-item">
                                <div className="about-section1-item-background" style={Section1_4_background}>
                                    <span className="about-section1-item-title">윤동주와 송몽규 뱃지, '동토의 꿈'</span>
                                </div>
                            </div>
                        </a>
                        <a href="https://netflix-salon.co.kr/products/flowercardbusan" target="_blank">
                            <div className="about-section1-item">
                                <div className="about-section1-item-background" style={Section1_5_background}>
                                    <span className="about-section1-item-title">부산의 모습을 담은, '부산 화투'</span>
                                </div>
                            </div>
                        </a>
                        <a href="https://netflix-salon.co.kr/projects/thegreatgraffiti" target="_blank">
                            <div className="about-section1-item">
                                <div className="about-section1-item-background" style={Section1_6_background}>
                                    <span className="about-section1-item-title">위대한 낙서展 : 아이들에게 예술을 선물합니다.</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="about-section2-container">
                    <div className="about-section2-title-container">
                        <div className="about-section2-title">자신의 색을 가진 예술가, 디자이너와</div>
                        <div className="about-section2-description">이들을 발견하고 소개할 7Pictures가 함께</div>
                        <div className="about-section2-description">예술 펀딩 프로젝트를 준비합니다.</div>
                        <div className="about-section-empty"></div>
                        <div className="about-section2-description">온전히 자신을 소개하고 프로젝트를 성공적으로</div>
                        <div className="about-section2-description">진행할 수 있도록 함께 고민합니다.</div>
                        <div className="about-section-empty"></div>
                        <div className="about-section2-description">프로젝트 제안을 언제든지 기다리고 있습니다.</div>
                        <div className="about-section-empty"></div>
                        <div className="about-section2-button-container">
                            <button className="about-section2-button" onClick={() => this.openModal()}>프로젝트 제안하기</button>
                        </div>
                        <Modal className="project-suggest-modal" visible={this.state.visible} width="480" height="560px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
							<div className="project-modal-header">
								<h3 className="project-modal-header-title">제안하기</h3>
								<a className="project-modal-header-close-container"><button className="project-modal-header-close" onClick={() => this.closeModal()}/></a>
							</div>
							<div className="project-modal-body">
								<p className="project-modal-body-small-title">연락처(필 수)
									<input className="project-modal-body-input-text" type="text" id="suggest-contact" />
								</p>
								<p className="project-modal-body-small-title">이메일
									<input className="project-modal-body-input-text" type="text" id="suggest-email" />
								</p>
								<p className="project-modal-body-small-title">제안 내용(필 수)
									<textarea className="project-modal-body-input-textarea" type="textarea" id="suggest-text" />
								</p>
								<p className="project-modal-body-small-title">필요한 후원금(원)
									<input className="project-modal-body-input-text" type="number" id="suggest-money" />
								</p>
								<p className="project-modal-body-small-title">후원금 용도
									<textarea className="project-modal-body-input-textarea" type="textarea" id="suggest-purpose" />
								</p>
								<p className="project-modal-body-small-title">관련 링크
									<input className="project-modal-body-input-text" type="text" id="suggest-link" />
								</p>
							</div>
							<div className="project-modal-footer">
								<a className="project-modal-header-save-container" onClick={this.onClickSuggest}><button type="submit" className="project-modal-header-save" onClick={() => this.closeModal()}>보내기</button></a>
							</div>
						</Modal>
                    </div>
                    <div className="about-section2-img-container">
                        <img className="about-section2-img" src="/assets/images/yoonsohyun.jpg"/>
                        <div className="about-section2-img-description">윤소현 작가의 'Layer' 프로젝트</div>
                    </div>
                </div>
                <div className="about-section3-container">
                    <div className="about-section3-title-container">
                        <div className="about-section2-title">필요한 만큼 제작되는 예술/디자인 제품들</div>
                        <div className="about-section2-description">만들고 싶은 예술/디자인 제품을</div>
                        <div className="about-section2-description">사전 주문을 받아 제작합니다.</div>
                        <div className="about-section-empty"></div>
                        <div className="about-section2-description">간단히 만든 시안/시제품을 통해 소개하고</div>
                        <div className="about-section2-description">최소 수량이 넘을 경우 실제 제작되며</div>
                        <div className="about-section2-description">후원자분들께 배송됩니다.</div>
                        <div className="about-section-empty"></div>
                        <div className="about-section2-description">매달 한가지 주제로 예술/디자인 제품을</div>
                        <div className="about-section2-description">소개하는 기획전이 열리기도 합니다.</div>
                        <div className="about-section-empty"></div>
                        <div className="about-section2-button-container">
                            <a href="https://netflix-salon.co.kr/subscribe" target="_blank">
                                <button className="about-section2-button">소식 받아보기</button>
                            </a>
                        </div>
                    </div>
                    <div className="about-section3-img-container">
                        <img className="about-section3-img" src="/assets/images/dongju_ab3.jpg"/>
                        <div className="about-section3-img-description">창작자 의균의 '동토의 꿈' 뱃지</div>
                    </div>
                </div>
                <div className="about-section5-container">
                    <div className="about-section5-title-container">
                        <div className="about-section5-title">7Pictures의 소식들</div>
                        <div className="about-section5-description">7Pictures에서 진행하는 프로젝트들을</div>
                        <div className="about-section5-description">네이버 디자인 및 다양한 채널에서 소개를 합니다.</div>
                        <div className="about-section-empty"></div>
                        <div className="about-section5-description">매주 인상적인 예술, 디자인 프로젝트들을</div>
                        <div className="about-section5-description">더 많은 사람들과 함께하고 싶습니다.</div>
                    </div>
                    <div className="about-section5-img-container">
                        <img className="about-section5-img" src="/assets/images/naverdesign2.jpg"/>
                        <div className="about-section5-img-description">네이버 디자인에서 소개하는 7Pictures 프로젝트</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;