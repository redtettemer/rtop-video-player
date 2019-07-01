// all this video tag related

import vimeo from './vimeo';
import youtube from './youtube';
import { wrap, createElement, append, setAttributes, addClass } from './createDivs';
import { buildWrapper, buildControls } from '../player/player';
import playerControls from '../player/controls';
import { generateRandomId } from './utils';

const video = {
    // Setup media
    init() {
    	const videoTag = this._element.querySelector("video");
    	this._randomId = generateRandomId();
        // if the video tag is already present
        if (videoTag) {
        	this._video.player = videoTag;
        	this._video.src = videoTag.getAttribute('src');
        	this._video.poster = videoTag.getAttribute('poster');
        	this._video.type = videoTag.getAttribute('type');
        	if (!videoTag.getAttribute('id')) {
        		setAttributes(videoTag, _id);
        	}
        }
        // if there is a video data attr
        if (this._element.getAttribute('data-video')) {
        	this._video.src = this._element.getAttribute('data-video');
        	this._video.poster = this._element.getAttribute('data-poster');
        	this._video.type = this._element.getAttribute('data-type');
        	this._video.createTag = true;
        }
        if (this._settings.src !== '') {
            // check if vimeo
        	this._video.isVimeo = vimeo.isVimeo(this._settings.src);
            // check if youtube
        	this._video.isYoutube = youtube.isYoutube(this._settings.src)
        	if (this._video.isVimeo || this._video.isYoutube) {
        		this._video.external = true;
        	} else {
        		this._video.createTag = true;
                // or if you specified the src/poster/type
            	this._video.src = this._settings.src;
            	this._video.poster = this._settings.poster;
            	this._video.type = this._settings.src.type;
            }
        }
        // if no source, stop and add error
        if (!this._video.src && !this._video.external) {
        	console.log('There was an error loading your video, please check documentation --> https://redtettemer.github.io/rtop-video-player/');
        	return;
        }
        // if vimeo, load iframe
        if (this._video.isVimeo) {
        	vimeo.loadVimeo.call(this);
        }
        // if youtube, load iframe
        if (this._video.isYoutube) {
        	youtube.loadYoutube.call(this);
        }
        // if need to add <video>, build it
        if (this._video.createTag) {
        	video.createTag.call(this);
        } else {
            if (!this._video.external) {
                video.videoReady.call(this);
            }
        }
    },
    // build the video tag if needed
    createTag() {
    	const sourceTag = createElement('source', {src: this._video.src, type: this._video.type});
    	const videoTag = createElement('video', {src: this._video.src, poster: this._video.poster, type: this._video.type, playsinline: true, id: this._randomId});
    	videoTag.append(sourceTag);
    	this._element.append(videoTag);
    	this._video.player = videoTag;
        video.videoReady.call(this);
    },
    videoReady() {
        // build the wrapper everything in parent divs
        buildWrapper.call(this);

        // build some controls
        if (this._settings.showControls) {
            buildControls.call(this);
        } else if (!this._settings.showControls && this._settings.autoPlay) {
            if (!this._video.isVimeo && !this._video.isYoutube) {
                playerControls.autoPlay.call(this);
            }
        }
        // add class to remove play button and cursor
        if (!this._settings.showControls) {
            addClass(this._playerWrapper, 'noControls');
        }
    }
};

export default video;
