import React, { Component } from 'react'

export default class TermOfUse extends Component {
    
    render() {
        return (
            <div className="terms-container">
                <div className="terms-title-container">
                    <h3 className="terms-main-title">세븐픽쳐스 이용약관</h3>
                    <h4 className="terms-main-title-sub">최종갱신일 : 2016 년 6월 10일</h4>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제1조 목적</h4>
                    <p className="terms-elements">
                    이 약관은 (주)세븐픽쳐스(이하”회사”라고 합니다)의 인터넷사이트
                    (https://7pictures.co.kr)를 통하여 제공하는 펀딩서비스 
                    및 기타서비스(이하 “서비스”라고합니다)와 관련하여 회사와 회원간의 권리와 의무, 책임사항 및 
                    회원의 서비스 이용절차에 관한 사항을 규정함을 목적으로 합니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제2조 용어의 정의</h4>
                    <p className="terms-elements">
                    1. 이 약관에서 사용하는 용어의 정의는 다음과 같습니다. 본 약관에 명시되지 않은 용어는 관련 
                    법령이 정하는 바에 따르며, 그 외에는 일반적인 상거래관행에 의합니다.
                    </p>
                    <p className="terms-elements-sub">
                    (1) 회원 : 이 약관을 승인하고 회사와 서비스 이용계약을 체결한 자를 말합니다. 회원은 
                    일반회원과 프로젝트 제안자로 구분되며 회사가 제시하는 정책에 의하여 회원의 등급을 구분하여 
                    서비스 이용범위나 혜택 또는 서비스 사용료징수 등을 다르게 적용할 수 있습니다. 또한, 회원은 
                    일반, 제안자 속성을 동시 또는 개별적으로 가져갈 수 있습니다.
                    </p>
                    <p className="terms-elements-sub">
                    (2) 이메일아이디(ID) : 회원의 식별과 서비스 이용을 위하여 회원이 사용하는 이메일계정을 정하고 
                    회사가 승인한 문자와 숫자의 조합을 말합니다.
                    </p>
                    <p className="terms-elements-sub">
                    (3) 비밀번호 : 회원의 동일성확인과 회원정보의 보호를 위하여 회원이 설정하고 회사가 승인한 
                    문자와 숫자의 조합을 말합니다.
                    </p>
                    <p className="terms-elements-sub">
                    (4) 투자자 : 프로젝트제안자 또는 단체의 프로젝트에 대한 투자금을 제공할 의사를 밝히고 회사가 
                    온라인으로 제공하는 양식에 맞추어 투자하기 신청을 하는 회원을 말합니다.
                    </p>
                    <p className="terms-elements-sub">
                    (5) 피투자프로젝트제안자 : 작가 또는 단체가 자금을 투자받을 의사를 밝히고 회사가 온라인으로 
                    제공하는 양식에 맞추어 펀딩신청을 하는 기업을 말합니다.
                    </p>
                    <p className="terms-elements-sub">
                    (6) 리워드 : 투자 완료 프로젝트를 진행하는 작가 또는 단체가 투자자에게 투자에 대한 보상으로 
                    지급하는 것을 말하며, 투자자는 투자금액에 따라 설정된 리워드를 받을 수 있습니다.
                    </p>
                    <p className="terms-elements-sub">
                    (7) 해지 : 회사 또는 회원이 이용계약의 효력을 소멸시키는 것을 말합니다.
                    </p>
                    <p className="terms-elements">
                    2.이 약관에서 사용하는 용어 중 제1항에서 정하지 아니한 것은, 관계법령 및 서비스 별 안내에서 정하는 
                    바에 따르며, 그 외에는 일반 거래관행에 따릅니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제3조 이용약관의 효력 및 변경</h4>
                    <p className="terms-elements">
                    1. 회사는 이 약관을 회원 및 서비스를 이용하고자 하는 자가 알 수 있도록 서비스가 제공되는 
                    인터넷사이트(https://7pictures.co.kr)에 게시합니다.
                    </p>
                    <p className="terms-elements">
                    2. 이 약관은 회원의 동의와 회사의 승낙으로 효력이 발생하며, 합리적인 사유가 발생할 경우 회사는 
                    관련법령(약관의 규제에 관한 법률, 정보통신망이용촉진 및 정보보호 등에 관한 법률 등)에 위배되지 
                    않는 범위 내에서 개정할 수 있습니다.
                    </p>
                    <p className="terms-elements">
                    3. 회사가 이 약관을 개정하는 경우에는 개정된 약관의 적용일자 및 개정사유를 명시하여 그 적용일자 
                    7일 이전부터 적용일자 전 일 까지 위 1항의 방법으로 공지함으로써, 그 효력이 발생합니다. 단, 
                    회원의 권리나 의무에 중대한 영향을 주는 변경이 아닌 경우에는 적용일자 전 일 까지 공지하도록 
                    합니다.
                    </p>
                    <p className="terms-elements">
                    4. 이 약관은 회사와 회원 간에 성립되는 서비스 이용계약의 기본 약정입니다. 회사는 필요한 경우 특정 
                    서비스에 관하여 적용될 사항(이하 “개별약관”)을 정하여 미리 공지할 수 있습니다. 회원이 이러한 개별
                    약관에 동의하고 특정서비스를 이용하는 경우에는 개별약관이 우선적으로 적용되고, 이 약관은 보충적인 
                    효력을 갖습니다. 개별약관의 변경에 관해서는 개별약관에 특별한 규정이 없는 한 위 3항을 준용합니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제4조 관련법령과의 관계</h4>
                    <p className="terms-elements">
                    1. 이 약관 또는 개별 약관에서 정하지 않은 사항은 전기통신사업법, 전자거래기본법, 정보통신망 
                    이용 촉진 및 정보보호 등에 관한 법률, 전자상거래 등 에서의 소비자 보호에 관한 법률 등 관련법령의
                    규정과 일반적인 상관례에 의합니다.
                    </p>
                    <p className="terms-elements">
                    2. 회원은 회사가 제공하는 서비스를 이용함에 있어서 전자상거래 등 에서의 소비자 보호에 관한 
                    법률, 전자거래기본법, 소비자보호법, 표시광고의 공정화에 관한 법률, 정보통신망 이용촉진 및 
                    정보보호 등에 관한 법률 등 관련법령을 준수하여야 하며, 이 약관의 규정을 들어 관련 법령위반에
                    대한 면책을 주장할 수 없습니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제5조 서비스의 종류</h4>
                    <p className="terms-elements">
                    회사가 회원에게 제공하는 서비스는 다음과 같습니다.
                    </p>
                    <p className="terms-elements">
                    1. 투자서비스는 인터넷사이트(https://7pictures.co.kr)를 통하여 피투자 프로젝트제안자가 
                    대중으로부터 투자유치를 위한 프로젝트를 올리고 투자자는 
                    자발적인 선택에 따라 투자를 결정하는 투자거래를 온라인으로 제공하는 서비스 및 관련 부가서비스 
                    일체를 말합니다.
                    </p>
                    <p className="terms-elements">
                    2. 기타서비스는 투자서비스 이외의 회사가 인터넷사이트(https://7pictures.co.kr)를 통하여 
                    제공하는 각종 서비스를 말합니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제6조 서비스의 성질과 목적</h4>
                    <p className="terms-elements">
                    회사가 제공하는 서비스는 회사가 회원 각자의 자기 결정에 의하여 회원과 기업간에 투자가 
                    이루어질 수 있도록 사이버 거래장소(marketplace)를 온라인으로 제공하는 것입니다. 투자자와 
                    피투자프로젝트 제안자간에 성립된 투자와 관련된 책임은 거래당사자인 투자자와 피투자프로젝트 
                    제안자 스스로가 부담하여야 합니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제7조 서비스이용계약</h4>
                    <p className="terms-elements">
                    1. 회사가 제공하는 서비스에 관한 이용계약(이하 “이용계약”이라고 합니다)은 서비스를 이용하고자 
                    하는 자가 회원가입신청을 하면 이를 이용신청으로 보고 회원에게 이용 승낙의 의사를 게시합니다. 
                    회사는 이용승낙의 의사를 해당 서비스화면에 게시하거나, E-Mail 또는 기타 방법으로 이용 
                    신청자에게 통지합니다.
                    </p>
                    <p className="terms-elements">
                    2. 이용신청자는 실명으로 가입신청을 하여야 하며, 실명이 아니거나 타인의 정보를 도용하여 
                    회원으로 가입한 자는 회사가 제공하는 서비스를 이용할 수 없으며, 이용하여서도 안됩니다. 
                    회원의 이메일 아이디(ID)는 실명 1인당 1개의 아이디를 사용하는 것을 원칙으로 합니다(다만, 
                    기업회원의 경우에는 사업자등록번호가 실명의 기준이 됩니다).
                    </p>
                    <p className="terms-elements">
                    3. 실명이 아니거나 타인의 이메일주소를 이용하여 허위가입한 회원은 법적인 보호를 받을 수 없으며, 
                    이에 따른 민사, 형사상의 모든 책임은 가입한 회원에게 있습니다. (주민등록법 제21조 제2항의 
                    벌칙조항을 참조하시길 바랍니다.) 또한 회사가 제공하는 투자확인, 리워드 배송에 관련한 안내 
                    사항 등 이용에 제약이 따릅니다.
                    </p>
                    <p className="terms-elements">
                    4. 회원이 이용계약종료(탈퇴를 포함) 후 재가입하는 경우에는 종료 후 3개월이 경과하거나 회사의 
                    승낙이 있어야 하며, 최종이용시에 사용한 아이디(ID)와 동일한 아이디(ID)를 사용하는 것은 원칙적
                    으로 금지됩니다. 즉, 이는 부정한 목적을 가지고 탈퇴 후 재가입하는 회원의 사이트 부정이용을 
                    사전에 방지 하고자 함에 그 목적이 있을 뿐, 탈퇴한 회원의 개인정보사항을 다른 목적으로 사용함을 
                    의미하지는 않습니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제8조 이용신청</h4>
                    <p className="terms-elements">
                    회사가 회원에게 제공하는 서비스는 다음과 같습니다.
                    </p>
                    <p className="terms-elements">
                    1. 서비스를 이용하고자 하는 자는 아래사항을 회사가 온라인으로 제공하는 가입신청 양식에 따라 
                    기재하여야 합니다. 가입신청 시 기재사항은 이용신청자가 개인 또는 생산회원인지 여부에 따라 
                    구분됩니다.
                    </p>
                    <p className="terms-elements">
                    일반회원의 경우 기재항목 : 성명, 이메일 아이디(ID)/비밀번호, E-mail 주소, 메일수신여부,
                    추가항목(핸드폰번호, 주소, 사진, 카드정보 등)
                    </p>
                    <p className="terms-elements">
                    2. 회원이 등록한 허위정보나 정보오류로 인한 문제는 등록한 회원의 책임입니다.
                    </p>
                    <p className="terms-elements">
                    3. 사실과 다른 정보 또는 허위정보를 기입하거나 추후 그러한 정보임이 밝혀질 경우 운영자의 
                    권한으로 서비스 이용을 일시 정지하거나 영구정지 및 이용계약을 해지할 수 있습니다. 
                    이로 인하여 회사 또는 제3자에게 발생한 손해는 해당 회원이 책임을 집니다. 다만, 회사의 
                    고의나 과실에 의하여 손해가 발생한 경우에는 회사가 손해를 부담합니다.
                    </p>
                    <p className="terms-elements">
                    4. 회사는 회원에게 회사의 투자서비스 및 관련서비스에 대한 다양하고 유익한 정보를 E-mail, 
                    서신우편, 전화, 문자 등을 통하여 제공할 수 있습니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제9조 이용신청승낙</h4>
                    <p className="terms-elements">
                    1. 회사는 이용신청자가 제8조에서 정한 기재항목을 정확하게 기재하고 이 약관에 동의한 경우에는 
                    이 약관에 규정된 실명확인절차를 거쳐 서비스의 이용을 승낙하는 것을 원칙으로 합니다.
                    </p>
                    <p className="terms-elements">
                    2. 회사는 다음과 같은 사유가 있는 경우, 이용신청에 대한 승낙을 거부할 수 있습니다.
                    </p>
                    <p className="terms-elements-sub">
                    (1) 가입신청 시 기재하여야 할 필수기재 항목에 허위사실을 기재한 경우
                    </p>
                    <p className="terms-elements-sub">
                    (2) 이미 가입된 회원과 이름 및 이메일아이디가 동일한경우
                    </p>
                    <p className="terms-elements-sub">
                    (3) 이 약관 제10조에 기하여 회사가 이용계약을 해지한 전(前)회원이 재이용 신청을 하는 경우
                    </p>
                    <p className="terms-elements-sub">
                    (4) 이 약관에 기하여 회사로부터 회원자격 정지 조치를 받은 회원이 이용정지 중에 이용계약을 
                    임의 해지하고 재이용 신청을 하는 경우
                    </p>
                    <p className="terms-elements-sub">
                    (5) 기타위법 또는 부당한 이용신청임이 객관적으로 확인된 경우
                    </p>
                    <p className="terms-elements">
                    3. 회사는 다음과 같은 사유가 있는 경우, 이용신청에 대한 승낙을 유보할 수 있습니다. 
                    이 경우, 회사는 이용신청자에게 승낙유보의 사유, 승낙 가능시기 또는 승낙에 필요한 
                    추가요청 정보 내지 자료 등 기타 승낙유보와 관련된 사항을 해당서비스 화면에 게시하거나
                    E-mail을 통하여 통지합니다.
                    </p>
                    <p className="terms-elements-sub">
                    (1) 설비에 여유가 없는 경우
                    </p>
                    <p className="terms-elements-sub">
                    (2) 기술상 지장이 있는 경우
                    </p>
                    <p className="terms-elements-sub">
                    (3) 회사의 실명확인 절차에서 실명가입 신청여부가 확인되지 않는 경우
                    </p>
                    <p className="terms-elements-sub">
                    (4) 프로젝트 제안자회원 가입을 신청한 자가 제8조 1항 (2)호의 증빙자료 또는 추가정보를 
                    제공하지 않는 경우
                    </p>
                    <p className="terms-elements-sub">
                    (5) 기타 회사가 합리적인 판단에 의하여 필요하다고 인정하는 경우
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제10조 이용계약의 해지, 종료</h4>
                    <p className="terms-elements">
                    1. 회원은 이 약관에서 정한 절차에 따라 이용계약을 해지할 수 있습니다.
                    </p>
                    <p className="terms-elements">
                    2. 회원의 해지
                    </p>
                    <p className="terms-elements-sub">
                    (1) 회원은 언제든지 회사에게 해지의사를 통지함으로써 이용계약을 해지할 수 있습니다. 
                    다만, 회원은 해지의사를 통지하기 전에 모든 거래중인 절차를 완료, 철회 또는 취소해야만 
                    해지의 의사표시를 할 수 있습니다. 이 경우 거래의 철회 또는 취소로 인한 불이익은 회원본인이 
                    부담하여야 합니다.
                    </p>
                    <p className="terms-elements-sub">
                    (2) 이용계약은 회원의 해지의사가 회사에 도달한 때에 종료됩니다.
                    </p>
                    <p className="terms-elements-sub">
                    (3) 본 항에 따라 해지를 한 회원은 해지 후 3개월이 경과한 경우 또는 회사가 승낙한 경우에 
                    한하여 이 약관이 정하는 회원가입 절차와 관련조항에 따라 회원으로 다시 가입할 수 있습니다.
                    </p>
                    <p className="terms-elements">
                    3. 회사의 해지
                    </p>
                    <p className="terms-elements-sub">
                    (1) 회사는 다음과 같은 사유가 있는 경우, 이용계약을 해지할 수 있습니다. 이 경우 회사는 
                    회원에게 E-mail, 전화, 팩스, 기타의 방법을 통하여 해지사유를 밝혀 그 시정을 요구하고, 
                    7일 이상으로 정한 기간 내에 이를 이행하지 아니한 때에는 계약을 해지합니다. 다만, 회사는 
                    해당회원에게 사전에 해지사유에 대한 의견진술의 기회를 부여할 수 있습니다.
                    </p>
                    <p className="terms-elements-sub">
                    - 회원에게 제9조 3항에서 정하고 있는 이용계약의 승낙거부사유가 있음이 확인된 경우 
                    </p>
                    <p className="terms-elements-sub">
                    - 회원이 공공질서 및 미풍양속에 위배되는 거래행위를 하거나 시도한 경우 
                    </p>
                    <p className="terms-elements-sub">
                    - 회원이 회사나 다른 회원, 기타 타인의 권리나 명예, 신용, 기타 정당한 이익을 침해하는 
                    행위를 한 경우 회원이 회사가 제공하는 서비스의 원활한 진행을 방해하는 행위를 하거나 
                    시도한 경우 
                    </p>
                    <p className="terms-elements-sub">
                    - 회원이 실제로 거래하고자 하는 의사없이 거래등록을 한 경우 
                    </p>
                    <p className="terms-elements-sub">
                    - 거래사기 등 범죄를 유발한다고 회사가 판단하는 행위 
                    </p>
                    <p className="terms-elements-sub">
                    - 타인의 결제수단(신용카드 / 핸드폰번호)를 도용한 경우 
                    </p>
                    <p className="terms-elements-sub">
                    - 성명 또는 주민등록번호가 본인과 불일치하거나 불량한 경우 
                    </p>
                    <p className="terms-elements-sub">
                    - 타인의 ID 및 실명을 도용한 경우
                    </p>
                    <p className="terms-elements-sub">
                    - 회사의 게시판에 사이트운영을 방해할 목적으로 반복적으로 동일한 글을 올리거나, 회원을 
                    상대로 광고 및 영업활동을 하는 글을 올리는 등 운영자의 합리적이고 객관적인 판단에 의하여 
                    회원의 자격이 없다고 인정되는 경우 
                    </p>
                    <p className="terms-elements-sub">
                    - 욕설이나 비방을 하는 행위 
                    </p>
                    <p className="terms-elements-sub">
                    (2) 이용계약은 회사의 해지의사가 회원에게도 달한 때에 종료됩니다. 
                    </p>
                    <p className="terms-elements-sub">
                    (3) 회사가 이용계약을 해지하는 경우, 회사는 별도의 통지없이 해당회원과 관련된 경매 및 
                    제반행위를 취소할 수 있습니다.
                    </p>
                    <p className="terms-elements-sub">
                    (4) 이용계약이 종료되는 경우, 회사는 해당회원의 가상계좌 보유액을 정산합니다. 정산 후, 
                    가상계좌 보유액이 잔존하는 경우 회사는 해당 회원이 지정한 입금계좌로 그 금액을 즉시 송금합니다. 
                    </p>
                    <p className="terms-elements-sub">
                    (5) 이용계약의 종료와 관련하여 발생한 손해는 이용계약이 종료된 해당회원이 책임을 부담하여야 
                    합니다. 다만, 회사의 고의나 과실에 의하여 손해가 발생한 경우에는 회사가 손해를 부담합니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제11조 회원정보의 보호</h4>
                    <p className="terms-elements">
                    1. 회사는 회원의 개인정보보호를 위하여 관리자를 최소한으로 한정합니다.
                    </p>
                    <p className="terms-elements">
                    2. 회사는 관련법령이 정하는 바에 따라서 회원정보를 포함한 개인정보를 보호하기 위하여 노력합니다.
                    </p>
                    <p className="terms-elements">
                    3. 회원의 개인정보보호에 관해서는 관련법령 및 회사가 정하고 별도로 게시하는 개인정보보호정책에 
                    정한 바에 준합니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제12조 회원정보의 변경</h4>
                    <p className="terms-elements">
                    1. 회원은 이용신청 시 기재한 사항이 변경되었을 경우, 즉시 해당사항을 수정해야 합니다. 
                    회원정보의 변경은 로그인을 한 후 마이페이지의 회원정보에서 변경할 수 있습니다. 
                    단, 아이디(ID) 및 성명은 수정할 수 없음을 원칙으로 합니다.
                    </p>
                    <p className="terms-elements">
                    2. 회원정보가 변경되었음에도 해당사항을 수정하지 않음으로써 발생하는 각종 손해와 잘못된 
                    수정으로 인하여 발생하는 손해는 당해 회원이 부담하여야 합니다. 다만, 회사의 고의나 과실에 
                    의하여 손해가 발생한 경우에는 회사가 손해를 부담합니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제13조 아이디(ID)의 관리</h4>
                    <p className="terms-elements">
                    1. 아이디(ID) 및 비밀번호에 대한 관리책임은 회원에게 있으며, 회원은 아이디(ID) 및 비밀번호를 
                    타인에게 양도, 대여할 수 없습니다.
                    </p>
                    <p className="terms-elements">
                    2. 회사의 행위에 의하지 아니한 아이디(ID) 또는 비밀번호의 유출, 양도, 대여로 인한 손실이나 
                    손해에 대하여 해당회원이 책임을 집니다. 다만, 회사의 고의나 과실에 의하여 손해가 발생한 경우
                    에는 회사가 책임을 집니다.
                    </p>
                    <p className="terms-elements">
                    3. 회원이 아이디(ID) 또는 비밀번호를 도난당하거나 제3자가 이를 사용하고 있음을 인지한 경우, 
                    즉시 회사에게 통보하여야 하고, 회사의 안내가 있는 경우에는 그에 따라야 합니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제14조 서비스의 종류 및 이용</h4>
                    <p className="terms-elements">
                    1. 회사가 제공하는 서비스는 회원의 피투자프로젝트 제안자에 대한 투자서비스, 피투자프로젝트 
                    제안자 등의 상품을 구매할 수 있는 마켓서비스, 기타서비스 등이 있습니다.
                    </p>
                    <p className="terms-elements">
                    2. 회사는 서비스의 종류에 따른 투자 및 리워드 배송 방법에 대한 사항을 서비스화면을 통하여 
                    공지합니다. 회원은 회사가 공지한 사항을 사전에 충분히 이해하고 서비스를 이용하여야 합니다.
                    </p>
                    <p className="terms-elements">
                    3. 회원은 아이디(ID)와 비밀번호를 통하여 회사가 제공하는 거래서비스에 접속할 수 있고, 
                    동서비스를 이용하여 자금을 투자하거나 투자 받을 수 있습니다.
                    </p>
                    <p className="terms-elements">
                    4. 회원은 투자서비스를 통하여 투자하거나 투자받을 수 있으며 반드시 회사가 마련한 거래보호
                    서비스를 통하여 거래를 완료하여야 합니다. 회사는 회원간의 직거래로 인하여 발생한 문제에 
                    대하여 책임지지 않습니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제15조 서비스이용의 정지, 제한</h4>
                    <p className="terms-elements">
                    1. 회사는 서비스를 통한 거래의 안전성과 신뢰성을 위하여 이 약관에서 정한 바에 따라 회원자격을 
                    정지하거나 서비스의 이용을 제한할 수 있습니다. 회원자격이 정지된 회원은 투자서비스를 포함한 
                    모든 서비스를 이용할 수 없습니다.
                    </p>
                    <p className="terms-elements-sub">
                    (1) 회원자격의 정지 회사는 투자서비스 등을 통한 거래의 신뢰성과 안전성을 위해 당해 회원의 
                    자격을 일시정지 하거나 영구정지 할 수 있습니다. 회사는 허위거래 등록 등 거래진행을 방해하는 
                    부당한 거래행위, 불법거래행위 등에 대하여 회원자격을 정지할 수 있습니다.
                    </p>
                    <p className="terms-elements-sub">
                    (2) 서비스 이용제한회사는 직거래 유도행위에 대하여 직거래 방지조치와 회원 대한 이용제한을 
                    부과합니다.
                    </p>
                    <p className="terms-elements-sub">
                    (3) 회원자격 정지 등의 해소 회사는 등급에 따라 회원자격이 정지되거나 투자서비스의 이용이 
                    제한된 회원이 해당행위를 할 수 밖에 없었던 사유를 소명하거나 거래상대방의 양해가 있었음을 
                    소명하는 등 회사가 정하는 기준을 충족하는 경우 회원 자격정지 또는 투자 서비스 이용제한 
                    조치를 해소할 수 있습니다.
                    </p>
                    <p className="terms-elements-sub">
                    (4) 회원에 대한 혜택 회사는 투자하기를 성실하고 적법하게 이용하 여 회원 상호간의 원활한 
                    거래에 기여한 회원에 대하여 각종 혜택을 부여합니다. 혜택의 종류와 범위,부여기준 등은 회사의 
                    별도 공지에 따릅니다.
                    </p>
                    <p className="terms-elements-sub">
                    (5) 재가입의 경우 회원이 이용계약 해지 후 재가입하는 경우에도 회사로부터 부과 받은 회원 
                    자격정지 등의 조치는 그대로 유지됩니다. 단, 이는 회사정책에 따라 마련된 제재에 관한 사항을 
                    의도적으로 회피할 목적으로 탈퇴 후 재가입 절차를 이용하려는 회원을 미연에 방지하고자, 
                    회사가 임의로 마련한 고객자료를 이용한다는 의미일 뿐, 탈퇴한 회원의 개인정보 사항을 이용함을 
                    의미하지는 않습니다.
                    </p>
                    <p className="terms-elements">
                    2. 회원 자격이 정지된 회원에게 완료되지 않은 투자거래가 있는 경우 해당회원은 투자거래에 관한 
                    제반과정을 완료하여야 합니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제16조 투자거래 보호서비스</h4>
                    <p className="terms-elements">
                    1. 회사는 서비스를 제공하는 과정에서 투자금의 수령, 보관 및 송금업무로 이루어지는 
                    거래보호서비스를 제공합니다. 이러한 거래보호서비스는 인터넷을 통하여 익명으로 이루어지는 
                    회사와 회원간 또는 회원상호간의 거래의 안전성과 신뢰성을 도모하고 보호하기 위한 목적에서 제공하는 
                    장치이므로 회사가 거래보호서비스를 통하여 투자자와 피투자프로젝트 제안자을 대리, 대행하거나 그 
                    이행을 보조하는 것은 아닙니다.
                    </p>
                    <p className="terms-elements">
                    2. 회사가 제공하는 거래보호서비스는 기본적인 거래서비스에 포함됩니다. 회원이 거래보호서비스를 
                    통하지 않는 직거래를 유도하는 경우 회사는 게시물삭제, 거래중지 등 기타 필요한 조치를 취할 수 
                    있습니다.
                    </p>
                    <p className="terms-elements">
                    3.회사가 제공하는 거래보호서비스를 이용하지 않은 거래 및 자금과 관련하여 발생한 모든 
                    사항은 투자자와 피투자프로젝트 제안자 간의 상호협의를 통해 해결하여야 하며, 회사는 이에 
                    대해 일체 책임을 지지 않습니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제17조 서비스이용료의내용</h4>
                    <p className="terms-elements">
                    1. 투자 서비스의 경우, 피투자프로젝트 제안자는 투자신청시 등록수수료와 투자성사시 
                    투자목표액기준으로 일정비율의 금액을 취급수수료로 회사에 지급하여야 하며, 
                    투자자에게는 투자에 공지한 리워드를 기일에 지급하여야 합니다.
                    </p>
                    <p className="terms-elements">
                    2.투자서비스와 관련하여 발생하는 은행에 대한 계좌이체수수료는 투자자가 가상계좌, 
                    실시간계좌이체, 카드결제 수수료는 피투자프로젝트 제안자 각자가 부담합니다.
                    </p>
                    <p className="terms-elements">
                    3.피투자프로젝트 제안자의 등록수수료와 취급수수료의 변경 등 회사가 서비스 이용에 따른 
                    수수료를 부과하고자 할 경우에는 부과기준 및 기타 상세한 내용을 시행 전에 사이트에 7일 
                    이상 공지합니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제18조 회사의 면책</h4>
                    <p className="terms-elements">
                    1. 회사가 회원들에게 제공하는 서비스는 온라인거래장소(marketplace)를 제공하고 투자서비스 
                    등 부가서비스를 통하여 회원상호간 거래가 원활하게 진행되도록 관리하는 것에 그칠 뿐 회원상호간의 
                    거래에 따른 권리와 의무 및 사후처리는 거래 당사자가 직접 부담합니다. 회사는 회원상호간 거래가 
                    원만하게 이루어지도록 상법상의 중개규정 및 전자상거래기본법 등 관련 법령을 준수합니다.
                    </p>
                    <p className="terms-elements">
                    2. 회사는 천재지변 또는 이에 준하는 불가항력, 정보통신설비의 보수 점검, 교체 또는 고장, 
                    통신의 두절 등으로 인하여 일시적 또는 종국적으로 서비스를 제공할 수 없는 경우, 서비스 제공에 
                    관한 책임이 면제됩니다. 이 경우 회사는 약관 제2조에 정한 방법으로 회원들에게 통지합니다.
                    </p>
                    <p className="terms-elements">
                    3. 회사는 인터넷 이용자 또는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 
                    지지 않습니다.
                    </p>
                    <p className="terms-elements">
                    4. 회사는 회사가 제공하는 거래서비스를 통하지 아니하고 이루어지는 개별계약과 회원본인이 
                    제공한 신상등록정보의 오류, 미비 등으로 인하여 회원이 입는 손해에 대해서는 책임을 지지 않습니다.
                    </p>
                    <p className="terms-elements">
                    5. 회사는 회원이 다른 회원에 의해 게재된 정보, 자료, 사실의 정확성 등을 신뢰함으로써 입은 
                    손해에 대하여 책임을 지지 않습니다.
                    </p>
                    <p className="terms-elements">
                    6. 회원은 서비스 이용시 노출되는 제휴업체를 포함한 회사의 광고게재에 대해 동의한 것 으로 
                    봅니다.
                    </p>
                    <p className="terms-elements">
                    7. 회사와 피연결회사(회사의 서비스화면과 링크 등으로 연결된 사이트를 운영하는 법인 또는 
                    회사를 말합니다)는 독자적으로 운영되며, 회사는 피연결회사와 회원간에 이루어진 거래에 
                    대하여는 책임을 지지 않습니다. 회사는 서비스상에 게재되어 있거나 본 서비스를 통한 제휴업체 
                    등의 판촉 활동에 회원이 참여하거나 교신 또는 거래를 함으로써 발생하는 손실과 손해에 대해 일체의
                    책임을 지지 않습니다. 회원은 서비스 내에 포함되어 있는 링크를 통하여 다른 웹사이트로 옮겨갈 
                    경우, 회사는 해당 사이트에서 제공하는 정보내용 및 이로 인한 손해 등 에 대한 책임을 지지 
                    않습니다.
                    </p>
                </div>
                <div className="terms-item-container">
                    <h4 className="terms-small-title">제19조 준거법 및 관할법원</h4>
                    <p className="terms-elements">
                    본 약관과 회사와 회원간의 개별서비스 이용약관, 회원상호간의 거래에 대해서는 대한민국 
                    법령이 적용되며, 회사와 회원간에 분쟁이 발생할 경우 민사소송법 등 관련법령에 의한 관할법원
                    이외에 서울중앙지방법원에 소를 제기할 수 있습니다.
                    </p>
                    <p className="terms-elements">
                    부칙 : 이 약관은 2016 년 6월 10일부터 효력이 발생합니다.
                    </p>
                </div>
            </div>
        )
    }
}