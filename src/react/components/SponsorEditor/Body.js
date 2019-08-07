import React from 'react'
import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'

import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

const SponsorNameWrapper = ({value}) => value
	? <span className="form-wrapper-span">{value}</span>
	: <span className="form-wrapper-span"></span>

const SponsorNameForm = ({value, onChange}) =>
	<input className="editor_input" type="text" value={value} onChange={onChange}/>

const DisplayNameWrapper = ({value}) => value
	? <span className="form-wrapper-span">{value}</span>
	: <span className="form-wrapper-span"></span>

const DisplayNameForm = ({value, onChange}) =>
	<input className="editor_input" type="text" value={value} onChange={onChange}/>

const DescriptionWrapper = ({value}) => value
	? <span className="form-wrapper-span">{value}</span>
	: <span className="form-wrapper-span"></span>

const DescriptionForm = ({value, onChange}) =>
	<input className="editor_input" type="text" value={value} onChange={onChange}/>

const ImgSrcWrapper = ({value}) => value
	? <img src={value} alt=""/>
	: <span className="form-wrapper-span"></span>

const ImgSrcForm = ({value, onChange}) =>
	<img src={value}/>

const LogoSrcWrapper = ({value}) => value
	? <img src={value} alt=""/>
	: <span className="form-wrapper-span"></span>

const LogoSrcForm = ({value, onChange}) =>
	<img src={value}/>

const MoneyWrapper = ({value}) => value
	? <span className="form-wrapper-span">{value.toLocaleString()}원</span>
	: <span className="form-wrapper-span"></span>

const MoneyForm = ({value, onChange}) =>
	<input className="editor_input" type="number" value={Number(value)} onChange={onChange} step="1000 "/>

const FacebookWrapper = ({value}) => value
	? <span className="form-wrapper-span">{value}</span>
	: <span className="form-wrapper-span"></span>

const FacebookForm = ({value, onChange}) =>
	<input className="editor_input" type="text" value={value} onChange={onChange}/>

const HomepageWrapper = ({value}) => value
	? <span className="form-wrapper-span">{value}</span>
	: <span className="form-wrapper-span"></span>

const HomepageForm = ({value, onChange}) =>
	<input className="editor_input" type="text" value={value} onChange={onChange}/>

const BlogWrapper = ({value}) => value
	? <span className="form-wrapper-span">{value}</span>
	: <span className="form-wrapper-span"></span>

const BlogForm = ({value, onChange}) =>
	<input className="editor_input" type="text" value={value} onChange={onChange}/>

const Body = ({
	sponsor: {
		sponsorName,
		displayName,
		description,
		imgSrc,
		logoSrc,
		money,
		contacts: {
			facebook,
			homepage,
			blog,
		}
	},

	_onSponsorName,
	_onDisplayName,
	_onDescription,
	_onImgSrc,
	_onLogoSrc,
	_onMoney,
	_onFacebook,
	_onHomepage,
	_onBlog
}) => {
	return (
		<div className="abstract-container">
			<FormWrapper
				title="스폰서 이름"
				valueType={VALUE_TYPE.TEXT}
				initialValue={displayName}
				submitCaption={'스폰서 이름을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onDisplayName}
				Wrapper={DisplayNameWrapper}
				Form={DisplayNameForm}
				className ="exhibition-long-title"
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="스폰서 영문 이름"
				valueType={VALUE_TYPE.TEXT}
				initialValue={sponsorName}
				submitCaption="링크주소를 입력하세요"
				onSubmit={_onSponsorName}
				Wrapper={SponsorNameWrapper}
				Form={SponsorNameForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="스폰서 설명"
				valueType={VALUE_TYPE.TEXT}
				initialValue={description}
				submitCaption={'스폰서 설명을 입력하세요'}
				submitCaptionsub={'입력하기'}
				onSubmit={_onDescription}
				Wrapper={DescriptionWrapper}
				Form={DescriptionForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="스폰서 이미지"
				valueType={VALUE_TYPE.IMAGE}
				initialValue={imgSrc}
				submitCaption="스폰서 이미지를 등록하세요"
				submitCaptionsub={'등록하기'}
				onSubmit={_onImgSrc}
				Wrapper={ImgSrcWrapper}
				Form={ImgSrcForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="스폰서 로고"
				valueType={VALUE_TYPE.IMAGE}
				initialValue={logoSrc}
				submitCaption="스폰서 이미지를 등록하세요"
				submitCaptionsub={'등록하기'}
				onSubmit={_onLogoSrc}
				Wrapper={LogoSrcWrapper}
				Form={LogoSrcForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="후원 금액"
				valueType={VALUE_TYPE.MONEY}
				initialValue={money}
				submitCaption="후원금액을 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onMoney}
				Wrapper={MoneyWrapper}
				Form={MoneyForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="페이스북 주소"
				valueType={VALUE_TYPE.TEXT}
				initialValue={facebook}
				submitCaption="페이스북 주소를 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onFacebook}
				Wrapper={FacebookWrapper}
				Form={FacebookForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="홈페이지 주소"
				valueType={VALUE_TYPE.TEXT}
				initialValue={homepage}
				submitCaption="홈페이지 주소를 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onHomepage}
				Wrapper={HomepageWrapper}
				Form={HomepageForm}
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="블로그 주소"
				valueType={VALUE_TYPE.TEXT}
				initialValue={blog}
				submitCaption="블로그 주소를 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onBlog}
				Wrapper={BlogWrapper}
				Form={BlogForm}
				className ="exhibition-eng-title"
				classNameopen ="editor-open-container"
			/>
		</div>
	)
}

export default Body
