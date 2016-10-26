import React, { Component, PropTypes } from 'react';
// import Lightbox from 'react-images';
import Gallery from 'react-photo-gallery';

const borderStyle = {
	border: '1px solid gray'
}

class Artworks extends Component {

	render() {
		const {
			artworks,
	 	} = this.props;

		console.log('artworks', artworks);

		const items = artworks.map( ({
			imgSrc, description,
		}, index) => (
			<div key={index} className="exhibition-detail-artworks-item">
				<img src={imgSrc} alt=""/>
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
			<div className="exhibition-detail-artworks" style={{width: '88%'}}>
				{/* <Lightbox images={input}  /> */}
				<Gallery photos={input} />
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
