'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSwipeable = require('react-swipeable');

var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MIN_INTERVAL = 500;

function throttle(func, wait) {
  var context = void 0,
      args = void 0,
      result = void 0;
  var timeout = null;
  var previous = 0;

  var later = function later() {
    previous = new Date().getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  return function () {
    var now = new Date().getTime();
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

var screenChangeEvents = ['fullscreenchange', 'msfullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange'];

var ImageGallery = function (_React$Component) {
  _inherits(ImageGallery, _React$Component);

  function ImageGallery(props) {
    _classCallCheck(this, ImageGallery);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageGallery).call(this, props));

    _this.state = {
      currentIndex: props.startIndex,
      thumbsTranslateX: 0,
      offsetPercentage: 0,
      galleryWidth: 0,
      thumbnailWidth: 0,
      isFullscreen: false,
      isPlaying: false
    };
    return _this;
  }

  _createClass(ImageGallery, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.disableArrowKeys !== nextProps.disableArrowKeys) {
        if (nextProps.disableArrowKeys) {
          window.removeEventListener('keydown', this._handleKeyDown);
        } else {
          window.addEventListener('keydown', this._handleKeyDown);
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.thumbnailWidth !== this.state.thumbnailWidth || prevProps.showThumbnails !== this.props.showThumbnails) {

        // adjust thumbnail container when thumbnail width is adjusted
        this._setThumbsTranslateX(-this._getThumbsTranslateX(this.state.currentIndex > 0 ? 1 : 0) * this.state.currentIndex);
      }

      if (prevState.currentIndex !== this.state.currentIndex) {
        if (this.props.onSlide) {
          this.props.onSlide(this.state.currentIndex);
        }

        this._updateThumbnailTranslateX(prevState);
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._slideLeft = throttle(this._slideLeft.bind(this), MIN_INTERVAL, true);
      this._slideRight = throttle(this._slideRight.bind(this), MIN_INTERVAL, true);
      this._handleResize = this._handleResize.bind(this);
      this._handleScreenChange = this._handleScreenChange.bind(this);
      this._handleKeyDown = this._handleKeyDown.bind(this);
      this._thumbnailDelay = 300;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // delay initial resize to get the accurate this._imageGallery.offsetWidth
      window.setTimeout(function () {
        return _this2._handleResize();
      }, 500);

      if (this.props.autoPlay) {
        this.play();
      }
      if (!this.props.disableArrowKeys) {
        window.addEventListener('keydown', this._handleKeyDown);
      }
      window.addEventListener('resize', this._handleResize);
      this._onScreenChangeEvent();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!this.props.disableArrowKeys) {
        window.removeEventListener('keydown', this._handleKeyDown);
      }
      window.removeEventListener('resize', this._handleResize);
      this._offScreenChangeEvent();

      if (this._intervalId) {
        window.clearInterval(this._intervalId);
        this._intervalId = null;
      }
    }
  }, {
    key: 'play',
    value: function play() {
      var _this3 = this;

      var callback = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (!this._intervalId) {
        this.setState({ isPlaying: true });
        var slideInterval = this.props.slideInterval;

        this._intervalId = window.setInterval(function () {
          if (!_this3.state.hovering) {
            if (!_this3.props.infinite && !_this3._canSlideRight()) {
              _this3.pause();
            } else {
              _this3.slideToIndex(_this3.state.currentIndex + 1);
            }
          }
        }, slideInterval > MIN_INTERVAL ? slideInterval : MIN_INTERVAL);

        if (this.props.onPlay && callback) {
          this.props.onPlay(this.state.currentIndex);
        }
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      var callback = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (this._intervalId) {
        window.clearInterval(this._intervalId);
        this._intervalId = null;
        this.setState({ isPlaying: false });

        if (this.props.onPause && callback) {
          this.props.onPause(this.state.currentIndex);
        }
      }
    }
  }, {
    key: 'fullScreen',
    value: function fullScreen() {
      var gallery = this._imageGallery;

      if (gallery.requestFullscreen) {
        gallery.requestFullscreen();
      } else if (gallery.msRequestFullscreen) {
        gallery.msRequestFullscreen();
      } else if (gallery.mozRequestFullScreen) {
        gallery.mozRequestFullScreen();
      } else if (gallery.webkitRequestFullscreen) {
        gallery.webkitRequestFullscreen();
      } else {
        // fallback to fullscreen modal for unsupported browsers
        this.setState({ modalFullscreen: true });
        // manually call because browser does not support screenchange events
        if (this.props.onScreenChange) {
          this.props.onScreenChange(true);
        }
      }

      this.setState({ isFullscreen: true });
    }
  }, {
    key: 'exitFullScreen',
    value: function exitFullScreen() {
      if (this.state.isFullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else {
          // fallback to fullscreen modal for unsupported browsers
          this.setState({ modalFullscreen: false });
          // manually call because browser does not support screenchange events
          if (this.props.onScreenChange) {
            this.props.onScreenChange(false);
          }
        }

        this.setState({ isFullscreen: false });
      }
    }
  }, {
    key: 'slideToIndex',
    value: function slideToIndex(index, event) {
      if (event) {
        if (this._intervalId) {
          // user triggered event while ImageGallery is playing, reset interval
          this.pause(false);
          this.play(false);
        }
      }

      var slideCount = this.props.items.length - 1;
      var currentIndex = index;

      if (index < 0) {
        currentIndex = slideCount;
      } else if (index > slideCount) {
        currentIndex = 0;
      }

      this.setState({
        previousIndex: this.state.currentIndex,
        currentIndex: currentIndex,
        offsetPercentage: 0,
        style: {
          transition: 'transform .45s ease-out'
        }
      });
    }
  }, {
    key: 'getCurrentIndex',
    value: function getCurrentIndex() {
      return this.state.currentIndex;
    }
  }, {
    key: '_handleScreenChange',
    value: function _handleScreenChange() {
      /*
        handles screen change events that the browser triggers e.g. esc key
      */
      var fullScreenElement = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

      if (this.props.onScreenChange) {
        this.props.onScreenChange(fullScreenElement);
      }

      this.setState({ isFullscreen: !!fullScreenElement });
    }
  }, {
    key: '_onScreenChangeEvent',
    value: function _onScreenChangeEvent() {
      var _this4 = this;

      screenChangeEvents.map(function (eventName) {
        document.addEventListener(eventName, _this4._handleScreenChange);
      });
    }
  }, {
    key: '_offScreenChangeEvent',
    value: function _offScreenChangeEvent() {
      var _this5 = this;

      screenChangeEvents.map(function (eventName) {
        document.removeEventListener(eventName, _this5._handleScreenChange);
      });
    }
  }, {
    key: '_toggleFullScreen',
    value: function _toggleFullScreen() {
      if (this.state.isFullscreen) {
        this.exitFullScreen();
      } else {
        this.fullScreen();
      }
    }
  }, {
    key: '_togglePlay',
    value: function _togglePlay() {
      if (this._intervalId) {
        this.pause();
      } else {
        this.play();
      }
    }
  }, {
    key: '_handleResize',
    value: function _handleResize() {
      if (this._imageGallery) {
        this.setState({ galleryWidth: this._imageGallery.offsetWidth });
      }

      if (this._imageGalleryThumbnail) {
        this.setState({ thumbnailWidth: this._imageGalleryThumbnail.offsetWidth });
      }
    }
  }, {
    key: '_handleKeyDown',
    value: function _handleKeyDown(event) {
      var LEFT_ARROW = 37;
      var RIGHT_ARROW = 39;
      var key = parseInt(event.keyCode || event.which || 0);

      switch (key) {
        case LEFT_ARROW:
          if (this._canSlideLeft() && !this._intervalId) {
            this._slideLeft();
          }
          break;
        case RIGHT_ARROW:
          if (this._canSlideRight() && !this._intervalId) {
            this._slideRight();
          }
          break;
      }
    }
  }, {
    key: '_handleMouseOverThumbnails',
    value: function _handleMouseOverThumbnails(index) {
      var _this6 = this;

      if (this.props.slideOnThumbnailHover) {
        this.setState({ hovering: true });
        if (this._thumbnailTimer) {
          window.clearTimeout(this._thumbnailTimer);
          this._thumbnailTimer = null;
        }
        this._thumbnailTimer = window.setTimeout(function () {
          _this6.slideToIndex(index);
        }, this._thumbnailDelay);
      }
    }
  }, {
    key: '_handleMouseLeaveThumbnails',
    value: function _handleMouseLeaveThumbnails() {
      if (this._thumbnailTimer) {
        window.clearTimeout(this._thumbnailTimer);
        this._thumbnailTimer = null;
        if (this.props.autoPlay === true) {
          this.play(false);
        }
      }
      this.setState({ hovering: false });
    }
  }, {
    key: '_handleImageError',
    value: function _handleImageError(event) {
      if (this.props.defaultImage && event.target.src.indexOf(this.props.defaultImage) === -1) {
        event.target.src = this.props.defaultImage;
      }
    }
  }, {
    key: '_handleOnSwiped',
    value: function _handleOnSwiped(ev, x, y, isFlick) {
      this.setState({ isFlick: isFlick });
    }
  }, {
    key: '_shouldSlideOnSwipe',
    value: function _shouldSlideOnSwipe() {
      var shouldSlide = Math.abs(this.state.offsetPercentage) > 30 || this.state.isFlick;

      if (shouldSlide) {
        // reset isFlick state after so data is not persisted
        this.setState({ isFlick: false });
      }
      return shouldSlide;
    }
  }, {
    key: '_handleOnSwipedTo',
    value: function _handleOnSwipedTo(index) {
      var slideTo = this.state.currentIndex;

      if (this._shouldSlideOnSwipe()) {
        slideTo += index;
      }

      if (index < 0) {
        if (!this._canSlideLeft()) {
          slideTo = this.state.currentIndex;
        }
      } else {
        if (!this._canSlideRight()) {
          slideTo = this.state.currentIndex;
        }
      }

      this.slideToIndex(slideTo);
    }
  }, {
    key: '_handleSwiping',
    value: function _handleSwiping(index, _, delta) {
      var offsetPercentage = index * (delta / this.state.galleryWidth * 100);
      this.setState({ offsetPercentage: offsetPercentage, style: {} });
    }
  }, {
    key: '_canNavigate',
    value: function _canNavigate() {
      return this.props.items.length >= 2;
    }
  }, {
    key: '_canSlideLeft',
    value: function _canSlideLeft() {
      return this.props.infinite || this.state.currentIndex > 0;
    }
  }, {
    key: '_canSlideRight',
    value: function _canSlideRight() {
      return this.props.infinite || this.state.currentIndex < this.props.items.length - 1;
    }
  }, {
    key: '_updateThumbnailTranslateX',
    value: function _updateThumbnailTranslateX(prevState) {
      if (this.state.currentIndex === 0) {
        this._setThumbsTranslateX(0);
      } else {
        var indexDifference = Math.abs(prevState.currentIndex - this.state.currentIndex);
        var scrollX = this._getThumbsTranslateX(indexDifference);
        if (scrollX > 0) {
          if (prevState.currentIndex < this.state.currentIndex) {
            this._setThumbsTranslateX(this.state.thumbsTranslateX - scrollX);
          } else if (prevState.currentIndex > this.state.currentIndex) {
            this._setThumbsTranslateX(this.state.thumbsTranslateX + scrollX);
          }
        }
      }
    }
  }, {
    key: '_setThumbsTranslateX',
    value: function _setThumbsTranslateX(thumbsTranslateX) {
      this.setState({ thumbsTranslateX: thumbsTranslateX });
    }
  }, {
    key: '_getThumbsTranslateX',
    value: function _getThumbsTranslateX(indexDifference) {
      if (this.props.disableThumbnailScroll) {
        return 0;
      }

      var thumbnailWidth = this.state.thumbnailWidth;


      if (this._thumbnails) {
        if (this._thumbnails.scrollWidth <= thumbnailWidth) {
          return 0;
        }
        var totalThumbnails = this._thumbnails.children.length;
        // total scroll-x required to see the last thumbnail
        var totalScrollX = this._thumbnails.scrollWidth - thumbnailWidth;
        // scroll-x required per index change
        var perIndexScrollX = totalScrollX / (totalThumbnails - 1);

        return indexDifference * perIndexScrollX;
      }
    }
  }, {
    key: '_getAlignmentClassName',
    value: function _getAlignmentClassName(index) {
      // LEFT, and RIGHT alignments are necessary for lazyLoad
      var currentIndex = this.state.currentIndex;

      var alignment = '';
      var LEFT = 'left';
      var CENTER = 'center';
      var RIGHT = 'right';

      switch (index) {
        case currentIndex - 1:
          alignment = ' ' + LEFT;
          break;
        case currentIndex:
          alignment = ' ' + CENTER;
          break;
        case currentIndex + 1:
          alignment = ' ' + RIGHT;
          break;
      }

      if (this.props.items.length >= 3 && this.props.infinite) {
        if (index === 0 && currentIndex === this.props.items.length - 1) {
          // set first slide as right slide if were sliding right from last slide
          alignment = ' ' + RIGHT;
        } else if (index === this.props.items.length - 1 && currentIndex === 0) {
          // set last slide as left slide if were sliding left from first slide
          alignment = ' ' + LEFT;
        }
      }

      return alignment;
    }
  }, {
    key: '_getTranslateXForTwoSlide',
    value: function _getTranslateXForTwoSlide(index) {
      // For taking care of infinite swipe when there are only two slides
      var _state = this.state;
      var currentIndex = _state.currentIndex;
      var offsetPercentage = _state.offsetPercentage;
      var previousIndex = _state.previousIndex;

      var baseTranslateX = -100 * currentIndex;
      var translateX = baseTranslateX + index * 100 + offsetPercentage;

      // keep track of user swiping direction
      if (offsetPercentage > 0) {
        this.direction = 'left';
      } else if (offsetPercentage < 0) {
        this.direction = 'right';
      }

      // when swiping make sure the slides are on the correct side
      if (currentIndex === 0 && index === 1 && offsetPercentage > 0) {
        translateX = -100 + offsetPercentage;
      } else if (currentIndex === 1 && index === 0 && offsetPercentage < 0) {
        translateX = 100 + offsetPercentage;
      }

      if (currentIndex !== previousIndex) {
        // when swiped move the slide to the correct side
        if (previousIndex === 0 && index === 0 && offsetPercentage === 0 && this.direction === 'left') {
          translateX = 100;
        } else if (previousIndex === 1 && index === 1 && offsetPercentage === 0 && this.direction === 'right') {
          translateX = -100;
        }
      } else {
        // keep the slide on the correct slide even when not a swipe
        if (currentIndex === 0 && index === 1 && offsetPercentage === 0 && this.direction === 'left') {
          translateX = -100;
        } else if (currentIndex === 1 && index === 0 && offsetPercentage === 0 && this.direction === 'right') {
          translateX = 100;
        }
      }

      return translateX;
    }
  }, {
    key: '_getSlideStyle',
    value: function _getSlideStyle(index) {
      var _state2 = this.state;
      var currentIndex = _state2.currentIndex;
      var offsetPercentage = _state2.offsetPercentage;
      var _props = this.props;
      var infinite = _props.infinite;
      var items = _props.items;

      var baseTranslateX = -100 * currentIndex;
      var totalSlides = items.length - 1;

      // calculates where the other slides belong based on currentIndex
      var translateX = baseTranslateX + index * 100 + offsetPercentage;

      // adjust zIndex so that only the current slide and the slide were going
      // to is at the top layer, this prevents transitions from flying in the
      // background when swiping before the first slide or beyond the last slide
      var zIndex = 1;
      if (index === currentIndex) {
        zIndex = 3;
      } else if (index === this.state.previousIndex) {
        zIndex = 2;
      }

      if (infinite && items.length > 2) {
        if (currentIndex === 0 && index === totalSlides) {
          // make the last slide the slide before the first
          translateX = -100 + offsetPercentage;
        } else if (currentIndex === totalSlides && index === 0) {
          // make the first slide the slide after the last
          translateX = 100 + offsetPercentage;
        }
      }

      // Special case when there are only 2 items with infinite on
      if (infinite && items.length === 2) {
        translateX = this._getTranslateXForTwoSlide(index);
      }

      var translate3d = 'translate3d(' + translateX + '%, 0, 0)';

      return {
        WebkitTransform: translate3d,
        MozTransform: translate3d,
        msTransform: translate3d,
        OTransform: translate3d,
        transform: translate3d,
        zIndex: zIndex
      };
    }
  }, {
    key: '_getThumbnailStyle',
    value: function _getThumbnailStyle() {
      var translate3d = 'translate3d(' + this.state.thumbsTranslateX + 'px, 0, 0)';
      return {
        WebkitTransform: translate3d,
        MozTransform: translate3d,
        msTransform: translate3d,
        OTransform: translate3d,
        transform: translate3d
      };
    }
  }, {
    key: '_slideLeft',
    value: function _slideLeft(event) {
      this.slideToIndex(this.state.currentIndex - 1, event);
    }
  }, {
    key: '_slideRight',
    value: function _slideRight(event) {
      this.slideToIndex(this.state.currentIndex + 1, event);
    }
  }, {
    key: '_renderItem',
    value: function _renderItem(item) {
      var onImageError = this.props.onImageError || this._handleImageError;

      return _react2.default.createElement(
        'div',
        { className: 'image-gallery-image' },
        _react2.default.createElement('img', {
          src: item.original,
          alt: item.originalAlt,
          srcSet: item.srcSet,
          sizes: item.sizes,
          onLoad: this.props.onImageLoad,
          onError: onImageError.bind(this)
        }),
        item.description && _react2.default.createElement(
          'span',
          { className: 'image-gallery-description' },
          item.description
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var _state3 = this.state;
      var currentIndex = _state3.currentIndex;
      var isFullscreen = _state3.isFullscreen;
      var modalFullscreen = _state3.modalFullscreen;
      var isPlaying = _state3.isPlaying;


      var thumbnailStyle = this._getThumbnailStyle();

      var slideLeft = this._slideLeft.bind(this);
      var slideRight = this._slideRight.bind(this);

      var slides = [];
      var thumbnails = [];
      var bullets = [];

      this.props.items.map(function (item, index) {
        var alignment = _this7._getAlignmentClassName(index);
        var originalClass = item.originalClass ? ' ' + item.originalClass : '';
        var thumbnailClass = item.thumbnailClass ? ' ' + item.thumbnailClass : '';

        var renderItem = item.renderItem || _this7.props.renderItem || _this7._renderItem.bind(_this7);

        var slide = _react2.default.createElement(
          'div',
          {
            key: index,
            className: 'image-gallery-slide' + alignment + originalClass,
            style: _extends(_this7._getSlideStyle(index), _this7.state.style),
            onClick: _this7.props.onClick
          },
          renderItem(item)
        );

        if (_this7.props.lazyLoad) {
          if (alignment) {
            slides.push(slide);
          }
        } else {
          slides.push(slide);
        }

        var onThumbnailError = _this7._handleImageError;
        if (_this7.props.onThumbnailError) {
          onThumbnailError = _this7.props.onThumbnailError;
        }

        if (_this7.props.showThumbnails) {
          thumbnails.push(_react2.default.createElement(
            'a',
            {
              onMouseOver: _this7._handleMouseOverThumbnails.bind(_this7, index),
              onMouseLeave: _this7._handleMouseLeaveThumbnails.bind(_this7, index),
              key: index,
              className: 'image-gallery-thumbnail' + (currentIndex === index ? ' active' : '') + thumbnailClass,

              onClick: function onClick(event) {
                return _this7.slideToIndex.call(_this7, index, event);
              } },
            _react2.default.createElement('img', {
              src: item.thumbnail,
              alt: item.thumbnailAlt,
              onError: onThumbnailError.bind(_this7) }),
            _react2.default.createElement(
              'div',
              { className: 'image-gallery-thumbnail-label' },
              item.thumbnailLabel
            )
          ));
        }

        if (_this7.props.showBullets) {
          bullets.push(_react2.default.createElement('button', {
            key: index,
            className: 'image-gallery-bullet ' + (currentIndex === index ? 'active' : ''),

            onClick: function onClick(event) {
              return _this7.slideToIndex.call(_this7, index, event);
            } }));
        }
      });

      return _react2.default.createElement(
        'section',
        {
          ref: function ref(i) {
            return _this7._imageGallery = i;
          },
          className: 'image-gallery' + (modalFullscreen ? ' fullscreen-modal' : '') },
        _react2.default.createElement(
          'div',
          { className: 'image-gallery-content' + (isFullscreen ? ' fullscreen' : '') },
          _react2.default.createElement(
            'div',
            { className: 'image-gallery-slide-wrapper' },
            this.props.showFullscreenButton && _react2.default.createElement('a', {
              className: 'image-gallery-fullscreen-button' + (isFullscreen ? ' active' : ''),
              onClick: this._toggleFullScreen.bind(this) }),
            this.props.showPlayButton && _react2.default.createElement('a', {
              ref: function ref(p) {
                return _this7._playButton = p;
              },
              className: 'image-gallery-play-button' + (isPlaying ? ' active' : ''),
              onClick: this._togglePlay.bind(this) }),
            this._canNavigate() ? [this.props.showNav && _react2.default.createElement(
              'span',
              { key: 'navigation' },
              _react2.default.createElement('button', {
                className: 'image-gallery-left-nav',
                disabled: !this._canSlideLeft(),
                onClick: slideLeft }),
              _react2.default.createElement('button', {
                className: 'image-gallery-right-nav',
                disabled: !this._canSlideRight(),
                onClick: slideRight })
            ), this.props.disableSwipe ? _react2.default.createElement(
              'div',
              { className: 'image-gallery-slides', key: 'slides' },
              slides
            ) : _react2.default.createElement(
              _reactSwipeable2.default,
              {
                className: 'image-gallery-swipe',
                key: 'swipeable',
                delta: 1,
                onSwipingLeft: this._handleSwiping.bind(this, -1),
                onSwipingRight: this._handleSwiping.bind(this, 1),
                onSwiped: this._handleOnSwiped.bind(this),
                onSwipedLeft: this._handleOnSwipedTo.bind(this, 1),
                onSwipedRight: this._handleOnSwipedTo.bind(this, -1)
              },
              _react2.default.createElement(
                'div',
                { className: 'image-gallery-slides' },
                slides
              )
            )] : _react2.default.createElement(
              'div',
              { className: 'image-gallery-slides' },
              slides
            ),
            this.props.showBullets && _react2.default.createElement(
              'div',
              { className: 'image-gallery-bullets' },
              _react2.default.createElement(
                'ul',
                { className: 'image-gallery-bullets-container' },
                bullets
              )
            ),
            this.props.showIndex && _react2.default.createElement(
              'div',
              { className: 'image-gallery-index' },
              _react2.default.createElement(
                'span',
                { className: 'image-gallery-index-current' },
                this.state.currentIndex + 1
              ),
              _react2.default.createElement(
                'span',
                { className: 'image-gallery-index-separator' },
                this.props.indexSeparator
              ),
              _react2.default.createElement(
                'span',
                { className: 'image-gallery-index-total' },
                this.props.items.length
              )
            )
          ),
          this.props.showThumbnails && _react2.default.createElement(
            'div',
            {
              className: 'image-gallery-thumbnails',
              ref: function ref(i) {
                return _this7._imageGalleryThumbnail = i;
              }
            },
            _react2.default.createElement(
              'div',
              {
                ref: function ref(t) {
                  return _this7._thumbnails = t;
                },
                className: 'image-gallery-thumbnails-container',
                style: thumbnailStyle },
              thumbnails
            )
          )
        )
      );
    }
  }]);

  return ImageGallery;
}(_react2.default.Component);

exports.default = ImageGallery;


ImageGallery.propTypes = {
  items: _react2.default.PropTypes.array.isRequired,
  showNav: _react2.default.PropTypes.bool,
  autoPlay: _react2.default.PropTypes.bool,
  lazyLoad: _react2.default.PropTypes.bool,
  infinite: _react2.default.PropTypes.bool,
  showIndex: _react2.default.PropTypes.bool,
  showBullets: _react2.default.PropTypes.bool,
  showThumbnails: _react2.default.PropTypes.bool,
  showPlayButton: _react2.default.PropTypes.bool,
  showFullscreenButton: _react2.default.PropTypes.bool,
  slideOnThumbnailHover: _react2.default.PropTypes.bool,
  disableThumbnailScroll: _react2.default.PropTypes.bool,
  disableArrowKeys: _react2.default.PropTypes.bool,
  disableSwipe: _react2.default.PropTypes.bool,
  defaultImage: _react2.default.PropTypes.string,
  indexSeparator: _react2.default.PropTypes.string,
  startIndex: _react2.default.PropTypes.number,
  slideInterval: _react2.default.PropTypes.number,
  onSlide: _react2.default.PropTypes.func,
  onScreenChange: _react2.default.PropTypes.func,
  onPause: _react2.default.PropTypes.func,
  onPlay: _react2.default.PropTypes.func,
  onClick: _react2.default.PropTypes.func,
  onImageLoad: _react2.default.PropTypes.func,
  onImageError: _react2.default.PropTypes.func,
  onThumbnailError: _react2.default.PropTypes.func,
  renderItem: _react2.default.PropTypes.func
};

ImageGallery.defaultProps = {
  items: [],
  showNav: true,
  autoPlay: false,
  lazyLoad: false,
  infinite: true,
  showIndex: false,
  showBullets: false,
  showThumbnails: true,
  showPlayButton: true,
  showFullscreenButton: true,
  slideOnThumbnailHover: false,
  disableThumbnailScroll: false,
  disableArrowKeys: false,
  disableSwipe: false,
  indexSeparator: ' / ',
  startIndex: 0,
  slideInterval: 3000
};