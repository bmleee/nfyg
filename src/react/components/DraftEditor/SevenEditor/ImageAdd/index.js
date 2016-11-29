import React, { Component } from 'react';

import Modal from 'react-modal';
import Dropzone from '~/src/react/components/Dropzone'

import { upload_file } from '~/src/react/api/AppAPI'

import styles from './styles.css';

const modalStyle = {
  zIndex                     : '10000',
  content : {
    zIndex                     : '10000',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '75%',
    height                : '75%',
    paddingLeft            : '5%',
    paddingRight            : '5%',
  },
  overlay : {
    zIndex                     : '10000',
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },

}

export default class ImageAdd extends Component {
  // Start the popover closed
  state = {
    open: false,
  };

  openPopover = () => {
    if (!this.state.open) {
      this.setState({
        open: true,
      });
    }
  };

  closePopover = () => {
    if (this.state.open) {
      this.setState({
        open: false,
      });
    }

  };

  addImage = async () => {
    try {
      let { editorState, onChange } = this.props;
      let urls = await this._uploadImages();

      for (let url of urls) {
        editorState = this.props.modifier(editorState, url)
      }

      onChange(editorState);
    } catch (e) {
      console.error(e);
    } finally {
      this.closePopover()
    }
  };

  render() {
    return (
      <div className={styles.addImage}>
        <button
          className={styles.addImageButton}
          onClick={this.openPopover}
          type="button"
        >
          +
        </button>

        <Modal
          isOpen={this.state.open}
          onRequestClose={this.closePopover}
          contentLabel="No Overlay Click Modal"
          style={modalStyle}
        >
          <h3>Image Upload</h3>
          <button
            className={styles.addImageConfirmButton}
            type="button"
            onClick={this.addImage}
          >
            Add
          </button>
          <button
            className={styles.addImageConfirmButton}
            type="button"
            onClick={this.closePopover}
          >
            Close
          </button>
          <Dropzone accept="image/*" ref="_dropzone_image" />
        </Modal>

      </div>
    );
  }

  _uploadImages = async () => {
    const files = this.refs._dropzone_image.state.acceptedFiles
    if (!!files && files.length <= 0) {
      this.closePopover()
      return
    }

    const results = await Promise.all(files.map(file => upload_file(file)))
    const sourceURLs = results.map(r => r.sourceURL)

    return sourceURLs;
  }
}
