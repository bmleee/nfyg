import React from 'react'
import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'

import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

const NameWrapper = ({value}) => value
	? <span>{value}</span>
	: <span>스폰서 영어 이름을 입력하세요</span>

const NameForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange}/>

const DisplayNameWrapper = ({value}) => value
	? <span>{value}</span>
	: <span>스폰서 이름을 입력하세요</span>

const DisplayNameForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange}/>

const DescriptionWrapper = ({value}) => value
	? <span>{value}</span>
	: <span>스폰서 설명을 입력하세요</span>

const DescriptionForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange}/>

const ImgSrcWrapper = ({value}) => value
	? <img src={value} alt=""/>
	: <span>스폰서 이미지를 입력하세요</span>

const ImgSrcForm = ({value, onChange}) =>
	<input type="file" value={value} onChange={onChange} accept="image/*" />

const MoneyWrapper = ({value}) => value
	? <span>{value.toLocaleString()}원</span>
	: <span>후원 금액을 입력하세요</span>

const MoneyForm = ({value, onChange}) =>
	<input type="number" value={Number(value)} onChange={onChange} step="1000 "/>

const FacebookWrapper = ({value}) => value
	? <span>{value}</span>
	: <span>Facebook 링크를 입력하세요</span>

const FacebookForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange}/>

const HomepageWrapper = ({value}) => value
	? <span>{value}</span>
	: <span>홈페이지 링크를 입력하세요</span>

const HomepageForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange}/>

const BlogWrapper = ({value}) => value
	? <span>{value}</span>
	: <span>홈페이지 링크를 입력하세요</span>

const BlogForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange}/>

const Body = ({
	sponsor: {
		name,
		displayName,
		description,
		imgSrc,
		money,
		contacts: {
			facebook,
			homepage,
			blog,
		}
	},

	_onName,
	_onDisplayName,
	_onDescription,
	_onImgSrc,
	_onMoney,
	_onFacebook,
	_onHomepage,
	_onBlog
}) => {
	return (
		<div className="abstract-container">
			<FormWrapper
				title="Sponsor Display Name"
				valueType={VALUE_TYPE.TEXT}
				initialValue={displayName}
				submitCaption="입력하기"
				onSubmit={_onDisplayName}
				Wrapper={DisplayNameWrapper}
				Form={DisplayNameForm}
			/>

			<FormWrapper
				title="Sponsor Name"
				valueType={VALUE_TYPE.TEXT}
				initialValue={name}
				submitCaption="입력하기"
				onSubmit={_onName}
				Wrapper={NameWrapper}
				Form={NameForm}
			/>

			<FormWrapper
				title="Sponsor Description"
				valueType={VALUE_TYPE.TEXT}
				initialValue={description}
				submitCaption="입력하기"
				onSubmit={_onDescription}
				Wrapper={DescriptionWrapper}
				Form={DescriptionForm}
			/>

			<FormWrapper
				title="Sponsor Image"
				valueType={VALUE_TYPE.IMAGE}
				initialValue={imgSrc}
				submitCaption="입력하기"
				onSubmit={_onImgSrc}
				Wrapper={ImgSrcWrapper}
				Form={ImgSrcForm}
			/>

			<FormWrapper
				title="Sponsor Money"
				valueType={VALUE_TYPE.MONEY}
				initialValue={money}
				submitCaption="입력하기"
				onSubmit={_onMoney}
				Wrapper={MoneyWrapper}
				Form={MoneyForm}
			/>

			<FormWrapper
				title="Sponsor Facebook"
				valueType={VALUE_TYPE.TEXT}
				initialValue={facebook}
				submitCaption="입력하기"
				onSubmit={_onFacebook}
				Wrapper={FacebookWrapper}
				Form={FacebookForm}
			/>

			<FormWrapper
				title="Sponsor Homepage"
				valueType={VALUE_TYPE.TEXT}
				initialValue={homepage}
				submitCaption="입력하기"
				onSubmit={_onHomepage}
				Wrapper={HomepageWrapper}
				Form={HomepageForm}
			/>

			<FormWrapper
				title="Sponsor Blog"
				valueType={VALUE_TYPE.TEXT}
				initialValue={blog}
				submitCaption="입력하기"
				onSubmit={_onBlog}
				Wrapper={BlogWrapper}
				Form={BlogForm}
			/>
		</div>
	)
}

export default Body
