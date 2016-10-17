import React, { Component, PropTypes } from 'react';
// import Lightbox from 'react-images';
import Gallery from 'react-photo-gallery';


const borderStyle = {
	border: '1px solid gray'
}

class Artworks extends Component {

	render() {
		console.log('this.props', this.props);
		console.log('this.context', this.context);
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


		const input = artworks.map( ({
			imgSrc, description,
		}, index) => ({
			src: imgSrc,
			width: '50%',
			height: 'auto',
			aspectRatio: 1,
			lightboxImage:{
		    src: imgSrc,
		    srcset: [
					`${imgSrc} 1024w`,
					`${imgSrc} 800w`,
					`${imgSrc} 320w`,
		    ],
				caption: description,
	    }
		}))

		console.log(input);
		{/* { items } */}

		return (
			<div className="exhibition-detail-artworks">
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
