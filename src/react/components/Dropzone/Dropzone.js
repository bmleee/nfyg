import React, { Component  } from 'react'
import Dropzone from 'react-dropzone'
import autobind from 'react-autobind'


// Props
// disableClick [Boolean | **false**] — Clicking the <Dropzone> brings up the browser file picker.
// multiple [Boolean | **true**] — Accept multiple files
// minSize [Number | **0**] — Only accept file(s) larger than minSize bytes.
// maxSize [Number | **Infinity**] — Only accept file(s) smaller than maxSize bytes.
// accept - Accept only specified mime types. Must be a valid MIME type according to input element specification, for example application/pdf, image/*, audio/aiff,audio/midi

class _Dropzone extends Component {
	constructor(props) {
		super(props)
		autobind(this)
	}

	state = {
		acceptedFiles: []
	}

	render() {
		const _onDrop = this.props._onDrop || this._onDrop;

		return (
			<div className="dropzone-container">
				<Dropzone
					onDrop={_onDrop}
					{...this.props} >
					<div>Try dropping some files here, or click to select files to upload.</div>
				</Dropzone>
				{
					this.state.acceptedFiles.length > 0
						? this.state.acceptedFiles.map(file => (
							<img src={file.preview} alt=""/>
						))
						: null
				}
			</div>

		)
	}

	_onDrop(acceptedFiles, rejectedFiles) {
		console.log('Accepted files: ', acceptedFiles);
		console.log('Rejected files: ', rejectedFiles);

		this.setState({ acceptedFiles });
	}
}

export default _Dropzone
