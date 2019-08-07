import React, { Component, PropTypes } from 'react'
import Editor from '~/src/react/components/DraftEditor/SevenEditor'
import Select from 'react-select'
import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'

import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'
import { canUseDOM } from '~/src/lib/utils'


const IntroWrapper = ({value}) => !!value
? <span className="form-wrapper-span">{value}</span>
: <span className="form-wrapper-span">소개 문구를 입력하세요</span>

const IntroForm = ({value, onChange}) =>
	<input type="text" value={value} onChange={onChange} />


const Part1Wrapper = ({value}) => (
	<span className="form-wrapper-span"></span>
)
const Part1Form = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 내용</span>
		<Editor
			raw={value}
			onChangeToRaw={onChange}
		/>
	</div>
)
const Part2Wrapper = ({value}) => (
	<span className="form-wrapper-span"></span>
)
const Part2Form = ({value, onChange}) => (
	<div>
		<span className="form-wrapper-title">프로젝트 내용 Part2</span>
		<Editor
			raw={value}
			onChangeToRaw={onChange}
		/>
	</div>
)

const Overview = ({
	overview: {
		intro,
		part1,
		part2,
	},

	// onSubmit callbacks
	_onIntroSubmit,
	_onPart1Submit,
	_onPart2Submit,

	// onChange callbacks
	rewardHandlers,

}) => {
	return (
		<div className="abstract-container">

			{/* <FormWrapper
				title="프로젝트 요야"
				valueType={VALUE_TYPE.TEXT}
				initialValue={intro}
				submitCaption="입력하기"
				onSubmit={_onIntroSubmit}
				Wrapper={IntroWrapper}
				Form={IntroForm}
			/> */}

			<FormWrapper
				title="프로젝트 내용"
				valueType={VALUE_TYPE.RICH_TEXT}
				initialValue={part1}
				submitCaption="프로젝트 세부 내용을 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onPart1Submit}
				Wrapper={Part1Wrapper}
				Form={Part1Form}
				className ="exhibition-long-title"
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="프로젝트 내용 Part2"
				valueType={VALUE_TYPE.RICH_TEXT}
				initialValue={part2}
				submitCaption="리워드 다음에 보여질 내용을 입력하세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onPart2Submit}
				Wrapper={Part2Wrapper}
				Form={Part2Form}
				className ="exhibition-eng-title"
				classNameopen ="editor-open-container"
			/>
		</div>
	)
}

export default Overview
