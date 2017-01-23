import React, { Component } from 'react'

export default class Privacy extends Component {
    
    render() {
        return (
            <div className="terms-container">
                <div className="terms-title-container">
                    <h3 className="terms-main-title">개인정보 취급방침</h3>
                    <p className="terms-main-title-sub">시행일 : 2016년 6월 10일 ~ 현재</p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제1조 개인정보의 수집 및 이용 동의서</h4>
                    <p className="terms-elements">
                    ㈜세븐픽쳐스 (이하 “회사”라고 함)는 이용자의 동의를 기반으로 개인정보를 수집·이용 및 제공하고 
                    있으며, 이용자의 권리 (개인정보자기결정권)를 적극적으로 보장합니다. 회사는 정보통신서비스제공자가 
                    준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정, 가이드라인을 준수하고 있습니다.
                    “개인정보취급방침”이란 이용자의 소중한 개인정보를 보호하여 안심하고 서비스를 이용할 수 있도록 
                    회사가 세븐픽쳐스(7Pictures)서비스를 운영함에 있어 준수해야 할 지침을 말합니다.
                    본인은 ㈜세븐픽쳐스(www.7pictures.co.kr)의 이용과 관련하여 회사가 해당 서비스의 제공 및 각종 
                    부가정보 제공 또는 컨설팅 목적으로 개인정보를 수집, 활용하는데 동의하며 회사와 회사와 타기관 
                    간의 향후 제휴 및 마케팅 협력 여부를 결정하는데 참조할 수 있는 자료로 활용됨에 동의합니다. 
                    이 동의서는 약관 및 계약이 갱신 등으로 변경되는 경우에도 유효합니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제2조 개인정보의 수집</h4>
                    <p className="terms-elements">
                    이용자로부터 다음과 같은 개인정보를 수집하고 있습니다.
                    모든 이용자는 회사가 제공하는 서비스를 이용할 수 있고, 회원가입을 통해 더욱 다양한 서비스를 
                    제공받을 수 있습니다. 이용자의 개인정보를 수집하는 경우에는 반드시 사전에 이용자에게 해당 
                    사실을 알리고 동의를 구하도록 하겠습니다. 수집방법에는 홈페이지(회원가입), 서비스 이용, 이벤트 
                    응모, 고객센터, 팩스, 전화 등이 있습니다.
                    </p>
                    <p className="terms-elements">
                    회원 가입 시 아래와 같은 개인정보가 수집 됩니다.
                    (필수) 이름 또는 닉네임, 프로필사진, 이메일주소, 비밀번호 및 타 SNS계정과 연계된 친구목록
                    또한, 서비스 이용과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.
                    – 접속IP주소, 쿠키, 방문 일시, 지불정보 및 기록, 서비스 이용 기록, 불량 이용 기록
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제3조 개인정보의 이용</h4>
                    <p className="terms-elements">
                    이용자의 개인정보를 다음과 같은 목적으로만 이용하며, 목적이 변경될 경우에는 반드시 사전에 
                    이용자에게 동의를 구하도록 하겠습니다.
                    </p>
                    <p className="terms-elements">
                    1. 회원관리
                    </p>
                    <p className="terms-elements-sub">
                    - 이용자 식별, 가입의사 확인, 불량회원 부정한 이용 방지
                    </p>
                    <p className="terms-elements-sub">
                    - 친구추천, 친구에게 활동내역 알림 및 이용자 검색/등록
                    </p>
                    <p className="terms-elements-sub">
                    - 다양한 서비스 제공,문의사항 또는 불만 처리, 공지사항 전달
                    </p>
                    <p className="terms-elements">
                    2. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
                    </p>
                    <p className="terms-elements-sub">
                    - 이용자와 약속한 콘텐츠 및 서비스 제공, 유료 콘텐츠 및 서비스 구매 및 이용 시 요금 정산
                    </p>
                    <p className="terms-elements-sub">
                    - 금융거래 본인 인증 및 금융 서비스
                    </p>
                    <p className="terms-elements-sub">
                    - 신규 콘텐츠 및 서비스 개발,이벤트 행사 시 정보 전달,마케팅 및 광고 등에 활용
                    </p>
                    <p className="terms-elements-sub">
                    - 서비스 이용 기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 맞춤형 서비스 제공, 서비스 개선에 활용
                    </p>
                    <p className="terms-elements">
                    3. 개인정보 이용기간
                    </p>
                    <p className="terms-elements">
                    이용자의 개인정보를 수집 및 이용 목적, 이용 기간에만 제한적으로 이용하고 있으며, 
                    탈퇴를 요청하거나 동의를 철회하는 경우 지체 없이 파기합니다. 다만 관계법령에 의해 보관해야 
                    하는 정보는 법령이 정한 기간 동안 보관합니다.
                    </p>
                    <p className="terms-elements-sub">
                    - 서비스 이용 관련 개인정보(로그인기록) 보존 기간: 3개월
                    </p>
                    <p className="terms-elements-sub">
                    - 표시/광고에 관한 기록 보존 기간: 6개월
                    </p>
                    <p className="terms-elements-sub">
                    - 계약 또는 청약철회 등에 관한 기록 보존 기간: 5년
                    </p>
                    <p className="terms-elements-sub">
                    - 대금결제 및 재화 등의 공급에 관한 기록 보존 기간: 5년
                    </p>
                    <p className="terms-elements-sub">
                    - 소비자의 불만 또는 분쟁처리에 관한 기록 보존 기간 : 3년
                    </p>
                    <p className="terms-elements-sub">
                    - 신용정보의 수집, 처리 및 이용 등에 관한 기록: 3년
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제4조 개인정보의 제공 및 위탁</h4>
                    <p className="terms-elements">
                    회사는 회원의 동의 없이 회원 정보를 외부업체에 위탁하지 않습니다. 향후 그러한 필요가 생길 경우, 
                    위탁 대상자와 위탁업무내용에 대해 회원에게 상세히 알리고, 동의를 얻도록 하겠습니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제5조 개인정보의 파기</h4>
                    <p className="terms-elements">
                    이용자의 개인정보에 대해 개인정보의 수집 이용 목적이 달성된 후에는 해당 정보를 지체 없이 
                    파기합니다. 다만 관계법령에 의해 보관해야 하는 정보는 법령이 정한 기간 동안 보관한 후 
                    파기합니다. 이때 별도 저장 관리되는 개인정보는 법령에 정한 경우가 아니고서는 절대 다른 용도로 
                    이용되지 않습니다. 전자적 파일 형태인 경우 복구 및 재생되지 않도록 기술적인 방법을 이용하여 
                    완전하게 삭제하고, 그 밖에 기록물, 인쇄물, 서면 등의 경우 분쇄하거나 소각하여 파기합니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제6조 링크 사이트</h4>
                    <p className="terms-elements">
                    회사는 회원에게 다른 회사의 웹사이트 또는 자료에 대한 링크를 제공할 수 있습니다. 
                    이 경우 회사는 외부사이트 및 자료에 대한 아무런 통제권이 없으므로 그로부터 제공받는 
                    서비스나 자료의 유용성에 대해 책임질 수 없으며 보증할 수 없습니다. 회사가 포함하고 있는 
                    링크를 클릭하여 타 사이트의 페이지로 옮겨 갈 경우 해당 사이트의 개인정보보호정책은 회사와 
                    무관하므로 새로 방문한 사이트의 정책을 검토해 보시기 바랍니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제7조 회원 및 법정대리인의 권리</h4>
                    <p className="terms-elements">
                    회원 및 법정 대리인은 언제든지 등록되어 있는 자신 또는 대리자의 개인정보를 조회하거나 
                    수정할 수 있으며, 회원탈퇴절차를 통해 가입해지를 요청할 수도 있습니다.
                    회원 혹은 대리인의 개인정보 조회, 수정을 위해서는 홈페이지의 ‘마이페이지’ 내의 ‘정보변경’을, 
                    가입해지 (동의철회)를 성명, 아이디(가입 시 기재한 이메일) 등의 정보를 탈퇴의사와 함께 문의하기에 
                    게시하거나, 동일한 내용을 기재하여 help@7pictures.co.kr 으로 이메일을 보내면 탈퇴하실 수 
                    있습니다. 이 외에도, 회사의 개인정보관리책임자(이병만, bmlee@7pictures.co.kr, 010-2619-9235)에게 
                    서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.
                    회원이 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 
                    이용 또는 제공하지 않습니다.
                    회사는 회원이 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 회사가 수집하는 
                    “개인정보의 보유 및 이용기간”에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 
                    없도록 처리하고 있습니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제8조 개인정보 자동 수집 장치의 설치, 운영 및 그 거부에 관한 사항</h4>
                    <p className="terms-elements">
                    회사는 쿠키(“cookie”)를 설치, 운영하고 있고 이용자는 이를 거부할 수 있습니다.
                    쿠키란 웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에 보내는 아주 작은 텍스트 
                    파일로서 이용자의 컴퓨터에 저장됩니다.
                    </p>
                    <p className="terms-elements">
                    회사는 개인화되고 맞춤화된 서비스를 제공하기 위해서 이용자의 정보를 저장하고 수시로 불러오는 
                    쿠키를 사용합니다. 이용자가 웹사이트에 방문할 경우 웹 사이트 서버는 이용자의 디바이스에 
                    저장되어 있는 쿠키의 내용을 읽어 이용자의 환경설정을 유지하고 맞춤화된 서비스를 제공하게 
                    됩니다. 쿠키는 이용자가 웹 사이트를 방문할 때, 웹 사이트 사용을 설정한대로 접속하고 편리하게 
                    사용할 수 있도록 돕습니다. 또한, 이용자의 웹사이트 방문 기록, 이용 형태를 통해서 최적화된 
                    광고 등 맞춤형 정보를 제공하기 위해 활용됩니다.
                    </p>
                    <p className="terms-elements">
                    쿠키를 수집하지 못하게 거부하고 싶다면?
                    </p>
                    <p className="terms-elements">
                    쿠키는 개인을 식별하는 정보를 자동적/능동적으로 수집하지 않으며, 이용자는 쿠키 설치에 대한 
                    선택권을 가지고 있습니다. 따라서, 이용자는 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 
                    허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수도 있습니다. 
                    다만 쿠키 설치를 거부할 경우 웹 사용이 불편해지며 로그인이 필요한 일부 서비스 이용에 어려움이 
                    있을 수 있습니다.
                    </p>
                    <p className="terms-elements">
                    설정 방법의 예
                    </p>
                    <p className="terms-elements-sub">
                    - Internet Explorer의 경우 : 웹 브라우저 상단의 도구 메뉴 > 인터넷 옵션 > 개인정보 > 설정
                    </p>
                    <p className="terms-elements-sub">
                    - Chrome의 경우 : 웹 브라우저 우측의 설정 메뉴 > 화면 하단의 고급 설정 표시 > 개인정보의 콘텐츠 
                    설정 버튼 > 쿠키
                    </p>
                    <p className="terms-elements">
                    회원은 ㈜세븐픽쳐스 사이트의 각 서비스 단계에 필요한 필수정보에 대하여 개인정보 수집, 
                    이용에 대한 동의를 거부할 수 있으며, 이 경우 해당 서비스에 대한 이용이 불가능합니다.
                    </p>
                    <p className="terms-elements">
                    본 약관은 2016년 6월 10일부터 시행합니다. 회사의 사이트 내에서 피투자프로젝트 제안자가 
                    목표한 투자성사 시 투자를 받은 피투자프로젝트 제안자, 즉 제3자에게 개인정보를 제공할 경우, 
                    개인정보를 제공받는 자, 수집 및 이용목적, 제공하는 개인정보의 항목, 개인정보 보유 및 이용기간에 
                    대해 별도의 동의를 획득한 후 제공하고 있습니다. 회사에서 제 3자는 회사에서 프로젝트를 진행한 
                    피투자프로젝트 제안자를 의미하고 이 외에는 어떠한 제 3자에 대한 개인정보 제공도 하지 않습니다. 
                    프로젝트 진행 피투자프로젝트 제안자 투자자의 현물리워드 발송을 위해 성명, 휴대폰, 집전화번호, 
                    주소 등을 제공받으며 해당 프로젝트 제안자가 제공한 리워드의 구매자 평가분석을 위해 제공받은 
                    정보를 이용할 수 있습니다.
                    또한 개인정보가 침해되어 이에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하셔서 
                    도움을 받으실 수 있습니다.
                    </p>
                    <p className="terms-elements-sub">
                    개인정보침해신고센터 : 118, http://privacy.kisa.or.kr
                    </p>
                    <p className="terms-elements-sub">
                    대검찰청 사이버범죄수사단 : 1301, cybercid@spo.go.kr
                    </p>
                    <p className="terms-elements-sub">
                    경찰청 사이버테러대응센터 : 182, http://www.ctrc.go.kr
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제9조 개인정보취급방침의 개정 및 공지</h4>
                    <p className="terms-elements">
                    회사는 위 내용에 대한 추가, 삭제 및 수정이 있을 경우에는 시행일 7일 전부터 홈페이지 상에 
                    공지하여 이용자에게 설명 드리겠습니다. 단, 이용자의 소중한 권리 또는 의무에 중요한 내용 
                    변경은 최소 30일전에 말씀 드리도록 하겠습니다.
                    </p>
                    <p className="terms-elements">
                    개인정보취급방침 시행일자 : 2016년 6월 10일
                    </p>
                </div>
            </div>
        )
    }
}