import React from 'react'
import Editor from '~/src/react/components/DraftEditor/SevenEditor'
import FormWrapper from '~/src/react/components/FormWrapper/FormWrapper'

import { VALUE_TYPE } from '~/src/react/components/FormWrapper/constants'

const ContentWrapper = ({value}) => (
	<span>매거진 세부 내용을 입력하세요</span>
)
const ContentForm = ({value, onChange}) => (
	<div>
		<Editor
			raw={value}
			onChangeToRaw={onChange}
		/>
	</div>
)

const Content = ({
	content,

	_onContentSubmit,
}) => {
	return (
		<div className="abstract-container">
			<FormWrapper
				title="Magazine Content"
				valueType={VALUE_TYPE.RICH_TEXT}
				initialValue={content}
				submitCaption="입력하기"
				onSubmit={_onContentSubmit}
				Wrapper={ContentWrapper}
				Form={ContentForm}
			/>
		</div>
	)
}

export default Content
