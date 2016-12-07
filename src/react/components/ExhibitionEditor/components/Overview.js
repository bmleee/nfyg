import React from 'react'
import Editor from '~/src/react/components/DraftEditor/SevenEditor'
import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'

import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

const Part1Wrapper = ({value}) => (
	<span>항상 보여지는 소개 문구를 입력하세요</span>
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
	<span>더보기 버튼을 통해 확장되는 소개 문구를 입력하세요</span>
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
