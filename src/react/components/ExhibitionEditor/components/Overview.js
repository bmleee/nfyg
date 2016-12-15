import React from 'react'
import Editor from '~/src/react/components/DraftEditor/SevenEditor'
import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'

import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

const Part1Wrapper = ({value}) => (
	<span></span>
)
const Part1Form = ({value, onChange}) => (
	<div>
		<Editor
			raw={value}
			onChangeToRaw={onChange}
		/>
	</div>
)
const Part2Wrapper = ({value}) => (
	<span></span>
)
const Part2Form = ({value, onChange}) => (
	<div>
		<Editor
			raw={value}
			onChangeToRaw={onChange}
		/>
	</div>
)

const Overview = ({
	overview: {
		part1,
		part2
	},

	_onPart1Submit,
	_onPart2Submit,
}) => {
	return (
		<div className="abstract-container">
			<FormWrapper
				title="전시 소개"
				valueType={VALUE_TYPE.RICH_TEXT}
				initialValue={part1}
				submitCaption="전시를 소개해주세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onPart1Submit}
				Wrapper={Part1Wrapper}
				Form={Part1Form}
				className ="exhibition-overview1"
				classNameopen ="editor-open-container"
			/>

			<FormWrapper
				title="추가 소개"
				valueType={VALUE_TYPE.RICH_TEXT}
				initialValue={part2}
				submitCaption="추가 소개를 해주세요"
				submitCaptionsub={'입력하기'}
				onSubmit={_onPart2Submit}
				Wrapper={Part2Wrapper}
				Form={Part2Form}
				className ="exhibition-overview2"
				classNameopen ="editor-open-container"
			/>
		</div>
	)
}

export default Overview
