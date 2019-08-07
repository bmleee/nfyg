import React, { Component } from 'react'
import { Scrollspy } from 'react-scrollspy'
import MetaTags from 'react-meta-tags';

import ScrollToTop from 'react-scroll-up';

const scrollStyle = {
  cursor: 'pointer',
}

export default class Faq extends Component {
    
    componentDidMount () {
          window.scrollTo(0, 0)
    }
	
	_faqrender = () => {
	    
	    let faqBackground = {
			backgroundImage: `url(/assets/images/7pictures_faq_main4.jpg)`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
	    
        return (
            <div>
                <section id="faq-main">
                <div className="faq-container-main" style={faqBackground}>
                    <div className="faq-container-main-sub">
                        <h1>도움말</h1>
                        <p>자주묻는 질문들을 모았습니다.</p>
                    </div>
                </div>
                </section>
                
                <Scrollspy items={ ['faq-main'] } currentClassName="sticky">
                <div className="faq-container-index">
                    <div className="faq-container-index-title">도움말 목차</div>
                    <div className="faq-container-index-title-sub"></div>
                    <Scrollspy items={ ['section-1', 'section-2', 'section-3', 'section-4', 'section-5'] } currentClassName="index-menu-is-current">
                    <div className="faq-container-index-menu-1"><a href="#section-1">후원하기</a></div>
                    <div className="faq-container-index-menu"><a href="#section-2">제안 및 참여하기</a></div>
                    <div className="faq-container-index-menu"><a href="#section-3">제작 및 배송문의</a></div>
                    <div className="faq-container-index-menu"><a href="#section-4">내 계정 관리</a></div>
                    <div className="faq-container-index-menu"><a href="#section-5">기타</a></div>
                    </Scrollspy>
                    <div className="faq-mail-container">
                        <a href="mailto:help@7pictures.co.kr?subject=[7Pictures - 문의하기] 문의 하실 제목을 입력해주세요&body=문의 하실 내용을 자유롭게 입력해주세요. 빠른 시일내로 답변 드리겠습니다 :)">
                            <button className="faq-mail-button">메일로 문의하기</button>
                        </a>
                    </div>
                </div>
                </Scrollspy>
            </div>    
        );
	} 
    
    render = () => {
        
        return (
            <div className="faq-container">
                <MetaTags>
		            <title>도움말 - 7Pictures</title>
		        </MetaTags>
		        
		        <ScrollToTop showUnder={600} style={scrollStyle} duration={0} >
					<button className="back-to-top" />
				</ScrollToTop>
		        
                {this._faqrender()}
                <div className="faq-container-content">    
                    <div className="faq-container-2">
                    <section id="section-1">
                        <div className="faq-section-1">
                            <div className="faq-content-title">후원하기</div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 리워드가 뭔가요?
                                </div>
                                <div className="faq-content-answer">
                                    후원한 프로젝트의 작가님이 후원자분들께 금액별로 드리는 선물입니다.
                                </div>
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 후원하는 방법을 상세하게 알려주세요!
                                </div>
                                <div className="faq-content-answer">
                                    후원하고자 하는 프로젝트 페이지에 들어가 하단의 파란색 주문하기 버튼을 눌러주세요. 원하시는 리워드 옵션을 선택하신 후에, 수량을 확인해주세요. 주소지/연락처 등록을 해주신 후에, 주소 박스를 선택하고 다음 단계로 넘어가주세요. 카드 등록을 해주신 후에 마찬가지로 카드 박스를 선택한 후에, 결제확인 버튼을 눌러주세요. 최종 금액을 확인하고 결제 예약 버튼을 누르면 완료!
                                </div>
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 목표 금액이 채워지지 않으면 무조건 리워드를 못 받게 되나요?
                                </div>
                                <div className="faq-content-answer">
                                    아니요, 프로젝트 소개글 맨 위에 ‘무조건 리워드’ 라고 쓰여 있는 경우에는 목표금액에 도달하지 않아도 리워드를 받아보실 수 있습니다. ‘달성시 리워드’ 라고 적혀있는 경우, 목표금액에 도달하지 못하면 결제와 리워드 배송을 진행하지 않는 경우가 많습니다. 리워드 제작에 필요한 최소 금액이 채워지지 않았기 때문에 프로젝트가 중단됩니다.
                                </div>
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 체크카드는 등록이 안되나요?
                                </div>
                                <div className="faq-content-answer">
                                    체크카드도 신용카드와 마찬가지로 등록이 가능합니다. 다만 결제 예약일에 잔고가 부족하지 않도록 채워주셔야 결제가 가능합니다.
                                </div>
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 무통장입금은 안되나요?
                                </div>
                                <div className="faq-content-answer">
                                    'help@7pictures.co.kr'으로 후원자명/입금자명/프로젝트명/선택사항/수량/주소/연락처를 보내주시면 계좌를 안내해드리고 있습니다. 입금은 프로젝트 마감 전날까지 해주시면 됩니다. 프로젝트가 목표 금액에 도달하지 않고 작가님께서 프로젝트를 끝까지 진행하지 않기로 결정하신 경우, 적어주신 계좌번호로 환불해드립니다.
                                </div>
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 결제는 언제 되나요?
                                </div>
                                <div className="faq-content-answer">
                                    결제는 프로젝트 마감 후, 1~2일 내로 진행됩니다. 첫번째 결제일에 카드사 한도나 잔액부족으로 결제에 실패할 경우 5-10일 뒤에 두번째 결제 요청을 합니다. 주문이 자동으로 취소되지는 않습니다. 
                                </div>
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 제가 후원한 내역은 어디에서 보나요?
                                </div>
                                <div className="faq-content-answer">
                                    우측 상단의 메뉴에서 ‘내 페이지’를 클릭하시면 지금까지의 후원 내역을 보실 수 있습니다. 상세내역에서 선택사항과 후원취소여부를 확인하실 수 있습니다.
                                </div>
                                {/* <div className="faq-content-answer-warn">
                                    ※ 2017년 3월 31일 이전 후원내역은 'help@7pictures.co.kr'으로 문의해주시면 감사하겠습니다.
                                </div> */}
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 결제 예약이 되어있는 내역의 카드/주소/선택사항을 수정하고 싶어요.
                                </div>
                                <div className="faq-content-answer">
                                    죄송합니다. 지금으로서는 정보 보호의 문제로 예약된 내역의 카드/주소/선택사항 수정은 불가능합니다. 수정하고 싶으신 후원을 ‘취소’해주시고, 수정된 사항으로 다시 주문해주세요. 프로젝트 마감은 되었지만 아직 결제 진행은 되지 않은 시점에 선택사항을 수정하고 싶으시다면, help@7pictures.co.kr 로 빠른 문의 부탁드립니다.
                                </div>
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 이미 결제가 됐는데, 배송지 주소를 바꾸고 싶어요. 어떻게 할까요?
                                </div>
                                <div className="faq-content-answer">
                                    help@7pictures.co.kr로 후원자명/프로젝트명/바뀐주소/연락처를 알려주세요. 바뀐 주소를 작가님께 안전하게 전달해드겠습니다.
                                </div>
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 후원/결제예약 취소는 어떻게 하나요?
                                </div>
                                <div className="faq-content-answer">
                                    우측 상단의 내 페이지에 들어가 취소하실 후원 내역의 ‘상세 내역’을 클릭해주세요. 하단의 결제예약취소를 누르시면 후원이 안전하게 취소됩니다. 단, 이미 만들어진 제품이 아닌 후원금액으로 제작되는 제품이기 때문에 프로젝트 마감 이후에는 단순변심으로 인한 후원취소와 환불이 어렵습니다.
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="section-2">
                        <div className="faq-section-2">
                            <div className="faq-content-title">제안 및 참여하기</div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 펀딩 페이지/기획전을 오픈하고 싶은데, 어떻게 해야하나요?
                                </div>
                                <div className="faq-content-answer">
                                    홈페이지 우측상단에 ‘제안하기’ 버튼을 눌러 열고 싶은 프로젝트의 내용을 간단하게 이야기해주세요. 저희가 회신으로 필요한 자료와 필요하실 정보를 보내드리겠습니다.
                                </div>
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 제 전시/작품 소식을 7Pictures 커뮤니티에 알리고 싶어요!
                                </div>
                                <div className="faq-content-answer">
                                    전시 소식을 비롯한 문화예술 이야기를 7Pictures 매거진 탭에 업로드하고 있습니다. help@7pictures.co.kr로 전시 이야기를 보내주세요.
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="section-3">
                        <div className="faq-section-3">
                            <div className="faq-content-title">제작 및 배송문의</div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 제작은 어디에서 하는 건가요?
                                </div>
                                <div className="faq-content-answer">
                                    프로젝트마다 제작하시는 작가님이 다릅니다. 각 프로젝트의 제작과 관련한 문의는 프로젝트의 ‘댓글’탭을 활용해주세요. 개인적으로 하고 싶으신 질문은 help@7pictures.co.kr 로 보내주시면 작가님께 전달해드리겠습니다.
                                </div>
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 두가지 다른 프로젝트를 후원하고 싶어요. 합배송은 안되나요?
                                </div>
                                <div className="faq-content-answer">
                                    네, 안타깝게도 프로젝트가 다른 경우 합배송이 불가합니다. 프로젝트마다 작가님이 달라 제작과 배송이 따로 진행됩니다. 
                                </div>
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 한 프로젝트에서 주문을 2번 했어요. 합배송은 안되나요?
                                </div>
                                <div className="faq-content-answer">
                                    두 주문을 모두 취소하고 하나로 통합한 새로운 주문을 해주세요. 옵션에 없는 선택사항을 원하시는 경우, 주문 시 선택사항에 옵션에 추가하실 구성을 적어주시면 됩니다.
                                </div>
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 배송 날짜가 궁금해요.
                                </div>
                                <div className="faq-content-answer">
                                    배송 날짜는 프로젝트마다 다릅니다. 평균적으로 프로젝트 마감후 2-3주 이내 배송이 완료 되지만, 정확한 배송일은 각 프로젝트의 FAQ나 소개글을 참고해주세요!
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="section-4">
                        <div className="faq-section-4">
                            <div className="faq-content-title">내 계정 관리</div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 회원가입은 어떻게 하나요?
                                </div>
                                <div className="faq-content-answer">
                                    가입하신 이메일이 회원님의 계정ID가 됩니다. 7Pictures 계정은 사이트 상단의 ‘회원가입’ 버튼을 눌러서 간단하게(이름, 이메일, 비밀번호 설정) 만드실 수 있습니다. 페이스북 사용자는 '회원가입 > 페이스북으로 회원가입' 버튼을 통해 페이스북 계정으로 간편하게 7Pictures를 이용할 수 있습니다.
                                </div>
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 비밀번호를 잊어버렸습니다. 어떻게 하면 좋죠?
                                </div>
                                <div className="faq-content-answer">
                                    로그인 페이지 하단의 ‘비밀번호 찾기'를 통해 비밀번호를 재설정 하실 수 있습니다.
                                </div>
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 계정을 삭제하려면 어떻게 해야 하나요?
                                </div>
                                <div className="faq-content-answer">
                                    현재 임의의 계정 삭제는 불가능한 상태입니다. 계정 삭제를 원하시면 'help@7pictures.co.kr'으로 문의해주시면 직접 처리해 드리겠습니다.
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="section-5">
                        <div className="faq-section-5">
                            <div className="faq-content-title">기타</div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 7Pictures의 소식을 볼 수 있는 다른 곳이 있나요?
                                </div>
                                <div className="faq-content-answer">
                                    <div>7Pictures SNS채널 다음과 같습니다! 팔로우 하셔서 소식을 접해보세요 :)</div>
                                    <div>페이스북 : <a href="https://www.facebook.com/7pictures" target="_blank">https://www.facebook.com/7pictures</a></div>
                                    <div>인스타그램 : <a href="https://www.instagram.com/seven__pictures" target="_blank">https://www.instagram.com/seven__pictures</a></div>
                                    <div>트위터 : <a href="https://twitter.com/7pictures1" target="_blank">https://twitter.com/7pictures1</a></div>
                                    <div>블로그 : <a href="http://blog.naver.com/7pictures" target="_blank">http://blog.naver.com/7pictures</a></div>
                                </div>
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 정기적으로 7Pictures의 소식을 받아보고 싶어요.
                                </div>
                                <div className="faq-content-answer">
                                    <div>7Pictures '구독하기'와 옐로아이디 친구추가를 통해 정기적으로 7Pictures의 소식을 받아보실 수 있습니다.</div>
                                    <div>
                                        <a href="https://7pictures.co.kr/subscribe" target="_blank"><button className="faq-etc-button">구독하기</button></a>
                                        <a href="http://plus.kakao.com/home/@7pictures" target="_blank"><button className="faq-etc-button-2">옐로아이디 친구추가</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="faq-content-qna">
                                <div className="faq-content-question">
                                    Q. 더 궁금한 점이 있습니다!
                                </div>
                                <div className="faq-content-answer">
                                    이외에 더 궁금한 점이 있다면 'help@7pictures.co.kr'으로 편하게 문의해주세요 :)
                                </div>
                            </div>
                        </div>
                    </section>
                    </div>
                    <a href="mailto:help@7pictures.co.kr?subject=[7Pictures - 문의하기] 문의 하실 제목을 입력해주세요&body=문의 하실 내용을 자유롭게 입력해주세요. 빠른 시일내로 답변 드리겠습니다 :)">
                        <button className="faq-mobile-mail">메일로 문의하기</button>
                    </a>
                </div>
            </div>
        )
    }
}