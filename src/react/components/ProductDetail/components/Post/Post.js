import React, { Component, PropTypes } from 'react';
import { Viewer } from '~/src/react/components/DraftEditor/SevenEditor'
import {
	PostComments,
} from './';

import {date2string} from '~/src/react/lib/utils'
import Collapsible from 'react-collapsible';

class Post extends Component {

	render() {
		const {
			post: {
				heading: {iconSrc, description, intro},
				posts
			},
			funding: {
				faqs
			}
		} = this.props;


		// console.log('Post', this);

		const item = posts.map( ({
			opened,
			author,
			title,
			created_at,
			numSupporters,
			likes,
			post,
			comments,
			content
		}, index) => (
			<div className="project-detail-post-item" key={index}>
				<div>
					<img src={author.iconSrc} alt=""/>
					<span>{author.name}</span>
					<button>후원자 접근</button>
				</div>
				<div>
					<span>함께하고 있는 후원자: {numSupporters}명</span>
					{/* <span>작성일: {date2string(created_at)}</span> */}
				</div>
				<div>
					{
						opened
							? <Viewer raw={content}/>
							: <span>해당 소식을 열람할 권한이 없습니다.</span>
					}
				</div>
				{ opened ? <PostComments comments={comments} postLikes={likes} /> : null }
			</div>
		))

		let item2 = faqs.map(({question, answer}, index) => {
			answer = answer.split('\n').map(x => <p>{x}</p>)
			return (
				<Collapsible key={index} trigger={question} transitionTime="0">
    			 {answer}
  				</Collapsible>
			)
		})
		
		let item3 =  (
				<div>
					<Collapsible trigger="배송은 언제 진행되나요?" transitionTime="0">
	    			 배송은 주문이 성공적으로 마감된 후, 7일 이내 일괄 배송됩니다.
	  				</Collapsible>
	  				<Collapsible trigger="결제 예약취소를 하고 싶습니다." transitionTime="0">
	    			 우측 상단의 내 페이지에서 해당 프로젝트의 상세내역 보기에서 '결제 예약 취소'버튼을 클릭하시면 됩니다. 
	  				</Collapsible>
	  				<Collapsible trigger="배송지/옵션 변경하고 싶습니다." transitionTime="0">
	    			 해당프로젝트의 결제 예약을 취소 한 후 다시 한번 결제를 진행해 주시면 됩니다.
	  				</Collapsible>
	  				<Collapsible trigger="상품을 받았는데 교환이나 반품/환불이 가능한가요?" transitionTime="0">
	    			 단순 변심에 의한 교환이나 반품/환불은 불가능 하며, 수령하신 물품이 불량인 경우에는 조치가 가능하오니 고객센터로 연락주시면 감사하겠습니다.
	  				</Collapsible>
  				</div>
		)


		return (
			<div className="project-detail-post">
				<div className="product-faq-container">
					{item2}
  				<Collapsible trigger="결제 예약취소를 하고 싶습니다." transitionTime="0">
    			 우측 상단의 '내 페이지'에서 해당 프로젝트의 상세내역 보기에서 '결제 예약 취소'버튼을 클릭하시면 됩니다. 
  				</Collapsible>
  				<Collapsible trigger="배송지/결제 카드를 변경하고 싶습니다." transitionTime="0">
    			 우측 상단의 '내 페이지'에서 해당 프로젝트의 상세내역 보기에서 '배송지 변경' 또는 '결제 카드 변경'버튼을 누르고 원하시는 배송지나 결제 카드로 변경하시면 됩니다. (원하시는 '배송지/결제 카드'가 없을 경우, '프로필 설정'에서 추가하신 후 변경해주세요!)
  				</Collapsible>
  				<Collapsible trigger="상품을 받았는데 교환이나 반품/환불이 가능한가요?" transitionTime="0">
    			 단순 변심에 의한 교환이나 반품/환불은 불가능 하며, 수령하신 물품이 불량인 경우에는 조치가 가능하오니 댓글 혹은 고객센터로 연락주시면 감사하겠습니다.
  				</Collapsible>
				</div>
			</div>
			)
	}

}

export default Post;
