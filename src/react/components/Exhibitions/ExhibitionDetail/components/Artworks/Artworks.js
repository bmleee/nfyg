import React, { Component, PropTypes } from 'react';
// import Lightbox from 'react-images';
// import Gallery from 'react-photo-gallery';
import Masonry from 'react-masonry-component'

import { displayType } from '../../../../../lib/utils'
import { Display } from '../../../../../constants'

const masonryOptions = {
	transitionDuration: 0,
	percentPosition: true,
}

const borderStyle = {
	border: '1px solid gray'
}

class Artworks extends Component {

	render() {
		const {
			artworks,
	 	} = this.props;

		const gridWidth = displayType === Display.DESKTOP ? '33.333%' : '50%'

		console.log('artworks', artworks);

		const items = artworks.map( ({
			imgSrc, description, width, height
		}, index) => (
			<div key={index} className="exhibition-detail-artworks-item grid-item" style={{width: gridWidth}}>
				<img src={imgSrc} alt="" width={'100%'}/>
				<span>{description}</span>
			</div>
		))

		const fixedWidth = 300;
		const fixedHeight = 300;

		const input = artworks.map( ({
			imgSrc, description, width, height
		}, index) => ({
			src: imgSrc,
			width: fixedWidth,
			// height: 300,
			aspectRatio: width / height,
			lightboxImage:{
		    src: imgSrc,
				caption: description,
	    }
		}))

		return (
			<div className="exhibition-artworks-container">
			<div className="exhibition-detail-artworks" style={{width: '100%'}}>
				{/* <Lightbox images={input}  /> */}
				{/* <Gallery photos={input} /> */}
				<Masonry
					className="grid"
					options={masonryOptions} >
					{ items }
				</Masonry>
			</div>
			</div>
		)
	}

}

Artworks.propTypes = {
	artworks: PropTypes.arrayOf(PropTypes.shape({
		imgSrc: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	}))
}

export default Artworks;
