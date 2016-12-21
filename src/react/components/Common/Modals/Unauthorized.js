import React from 'react'
import Modal from 'react-modal'

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
  }
}


const Unauthorized = ({message}) => (
		<Modal
			isOpen={true}
			contentLabel="접근 권한이 없습니다."
		>
			<h3>접근 권한이 없습니다.</h3>
			{
				message ? <span>{message}</span> : null
			}
		</Modal>
)

export default Unauthorized
