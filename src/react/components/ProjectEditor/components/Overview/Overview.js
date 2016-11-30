import React, { Component, PropTypes } from 'react'
import Editor from '~/src/react/components/DraftEditor/SevenEditor'
import Select from 'react-select'
import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'

import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'
import { canUseDOM } from '~/src/lib/utils'


const IntroWrapper = ({value}) => !!value
? (
	<span>{value}</span>
)
: (
	<span>소개 문구를 입력하세요</span>
)
const IntroForm = ({value, onChange}) => (
	<input type="text" value={value} onChange={onChange} />
)

const Part1Wrapper = ({value}) => (
	<span>항상 보여지는 소개 문구를 입력하세요</span>
)
const Part1Form = ({value, onChange}) => (
	<div>
		<Editor
			raw={value}
			onChange={onChange}
		/>
	</div>
)
const Part2Wrapper = ({value}) => (
	<span>리워드 다음에 보여질 문구를 입력하세요</span>
)
const Part2Form = ({value, onChange}) => (
	<div>
		<Editor
			raw={value}
			onChange={onChange}
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

	// to use refs...
	parent
}) => {
	return (
		<div className="funding-container">

			<FormWrapper
				title="Overview Intro"
				valueType={VALUE_TYPE.TEXT}
				initialValue={intro}
				submitCaption="입력하기"
				onSubmit={_onIntroSubmit}
				Wrapper={IntroWrapper}
				Form={IntroForm}
			/>

			<FormWrapper
				title="Overview Part1"
				valueType={VALUE_TYPE.RICH_TEXT}
				initialValue={part1}
				submitCaption="입력하기"
				onSubmit={_onPart1Submit}
				Wrapper={Part1Wrapper}
				Form={Part1Form}
			/>

			<FormWrapper
				title="Overview Part2"
				valueType={VALUE_TYPE.RICH_TEXT}
				initialValue={part2}
				submitCaption="입력하기"
				onSubmit={_onPart2Submit}
				Wrapper={Part2Wrapper}
				Form={Part2Form}
			/>
		</div>
	)
}

export default Overview
