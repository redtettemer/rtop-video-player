// all the click events

import { hasClass, addClass, removeClass, html, append } from '../helpers/createDivs';
import { timeFormat, runPrefixMethod } from '../helpers/utils';
import { checkTaging, sendTag } from '../helpers/GTM';

const controls = {
	// pause
	pause() {
		this.pause();
	},
	// play
	play() {
		this.play();
	},
	// play pause or repeat if you click the video depending on current state
	playPauseRepeat() {
		if (hasClass(this._playerWrapper, 'playing')) {
			this.pause();
		} else if (hasClass(this._playerWrapper, 'finished')) {
			if (this._settings.allowReplay) {
				this.restart();
			}
		} else {
			this.play();
		}
	},
	// if you are moving over the video, show controls
	videoMove() {
		if (this._settings.showControls) {
        	if (hasClass(this._playerWrapper, 'hideOverlay')){
        		if (this._timers && this._timers._motion_timer) {
                	clearTimeout(this._timers._motion_timer);
                }
                removeClass(this._playerWrapper, 'hideOverlay');
                removeClass(this._playerWrapper.querySelector(".vidControls"), 'hide');
            }
        }
	},
	// if you scroll out of the video, hide controls
	videoOut() {
		if (!this._video.player.paused && this._settings.showControls) {
			if (this._timers && this._timers._motion_timer) {
            	clearTimeout(this._timers._motion_timer);
            }
            if (!this._timers) {
            	this._timers = {}
            }
            this._timers._motion_timer = setTimeout(() => {
                addClass(this._playerWrapper, 'hideOverlay');
                addClass(this._playerWrapper.querySelector(".vidControls"), 'hide');
            }, this._settings.controlsHoverSensitivity);
        }
	},
	// seek
	progressClick(event) {
		event.stopPropagation();
		const pos =  event.pageX - this._controls.progressholder.element.offsetLeft - this._playerWrapper.parentNode.parentNode.offsetLeft;
		const maxPos = this._controls.progressholder.element.offsetWidth;
		if (!this._video.player) {
			return;
		}
		if (this._video.external) {
			const $that = this;
			this._video.player.getDuration().then(function(duration) {
            	$that.goto((pos / maxPos) * duration);
            });
		} else {
			this.goto((pos / maxPos) * this._video.player.duration);
		}
	},
	// move orb with cursor
	progressMove(event) {
		const orb = this._playerWrapper.querySelector("#progressorb");
		const pos =  event.pageX - this._controls.progressholder.element.offsetLeft - this._playerWrapper.parentNode.parentNode.offsetLeft;
		const orbPos = pos - (orb.offsetWidth / 2);
		const maxPos = this._controls.progressholder.element.offsetWidth - (orb.offsetWidth / 2);
		orb.style.left = ((orbPos > maxPos) ? maxPos : orbPos + "px");
	},
	// mute
	mute() {
		if(this._controls.isMute) {
			this.adjustVolume(this._controls.volume);
		} else {
			this.mute();
		}
	},
	// adjust volume
	adjustVolume(bar) {
		this.adjustVolume(bar.getAttribute('data-value'));
	},
	// toggle fullscreen
	fullscreen() {
		if (!this._controls.isFs) {
        	this._controls.isFs = true;
        	runPrefixMethod(this._playerWrapper, "RequestFullScreen");
      	} else {
        	this._controls.isFs = false;
        	runPrefixMethod(document, "CancelFullScreen");
      	}
	},
	// close modal
	close() {
		this.close();
	},
	// update the scrubber/progress bar to current time
	updateProgress(buffer = {}, progress = {}) {
		if (!this._video.player) {
			return;
		}
		if (this._settings.showTimer) {
			if (this._video.player.currentTime || Object.keys(progress).length > 0) {
        		html(this._controls.time.current.element, timeFormat(Object.keys(progress).length > 0 ? progress.seconds : this._video.player.currentTime));
        	}
        	if (this._video.player.duration || Object.keys(buffer).length > 0) {
        		html(this._controls.time.total.element, timeFormat(Object.keys(buffer).length > 0 ? buffer.duration : this._video.player.duration));
        	}
		}
		if (this._settings.showScrubber) {
			if (this._video.player.buffered || Object.keys(buffer).length > 0) {
				this._controls.buffered.element.style.width = (Object.keys(buffer).length > 0 ? (progress.percent * 100) : ((this._video.player.buffered.end(this._video.player.buffered.length - 1) / this._video.player.duration) * 100)) + "%";
			}
			if (this._video.player.currentTime || Object.keys(progress).length > 0) {
				this._controls.progress.element.style.width = (Object.keys(progress).length > 0 ? (progress.percent * 100) : ((this._video.player.currentTime / this._video.player.duration) * 100)) + "%";
			}
		}
		// if there are GTM events, try and dispatch based on time
        if (Object.keys(this._settings.gtmOptions).length > 0) {
            if (typeof(dataLayer) !== "undefined") {
                Object.keys(this._settings.gtmOptions).map((i) => {
                    if (Math.floor(Object.keys(progress).length > 0 ? progress.percent : (this._video._player.currentTime / this._video._player.duration) * 100) === parseFloat(this._settings.gtmOptions[i].time)) {
                        if (!(checkTaging(this._settings.gtmOptions[i].name))) {
                            sendTag(this._settings.gtmOptions[i].type, name);
                        }
                    }
                });
            }
        }
        if(this._video.player.ended) {
            controls.videoEnded.call(this);
        }
	},
	// auto play
	autoPlay() {
		this._playerWrapper.addClass('playing');
		// need to mute the video 
		this._video.player.muted = true;
		// mute the video fallback
		this._video.player.volume = 0;
        this._video.player.autoplay = true;
        this._video.player.load();
        
        if (this._settings.showControls) {
            if (this._timers && this._timers._motion_timer) {
            	clearTimeout(this._timers._motion_timer);
            }
            if (!this._timers) {
            	this._timers = {}
            }
            this._timers._motion_timer = setTimeout(() => {
                addClass(this._playerWrapper, 'hideOverlay');
                addClass(this._playerWrapper.querySelector(".vidControls"), 'hide');
            }, this._settings.controlsHoverSensitivity);
        }
	},
	// open the modal
	openModal() {
		addClass(this._modal, 'show');
	},
	// only keyboard control is spacebar for play/pause
	keyboardControls(event) {
		if (event.keyCode === 32) {
			event.preventDefault();
			event.stopPropagation();
            if (hasClass(this._playerWrapper, 'playing')) {
				this.pause();
			} else if (hasClass(this._playerWrapper, 'finished')) {
				if (this._settings.allowReplay) {
					this.restart();
				}
			} else {
				this.play();
			}
			return;
        }
	},
	// what to do when video ends
	videoEnded() {
		removeClass(this._playerWrapper, 'playing');
		removeClass(this._playerWrapper, 'pause');
		removeClass(this._playerWrapper, 'hideOverlay');
		addClass(this._playerWrapper, (this._settings.closeModalOnFinish ? 'closing' : 'finished'));
		addClass(this._playerWrapper.querySelector(".vidControls"), 'hide');
		if (this._timers) {
			if (this._timers._progress) {
				clearInterval(this._timers._progress);
			}
			if (this._timers._motion_timer) {
				clearTimeout(this._timers._motion_timer);
			}
		}
		if (this._settings.loop) {
	        this.restart();
	    } else if (this._settings.closeModalOnFinish) {
	    	const $that = this;
	        setTimeout(() => {
	        	$that.stop();
	        	removeClass($that._modal, 'show');
	        }, 300);
	    }
	},
	// send data on event listeners
	getData: function(type) {
		// default is just that the event happened, not much else needed
		let _data = {event: type};
		switch (type){
			// send the duration and current time every interval it updates
			case 'timeupdate':
				_data.data = {
					duration: {
                    	value: this._video.player.duration,
                    	type: 'sec'
                    },
                    currentTime: {
                    	value: ((this._video.player.currentTime / this._video.player.duration) * 100),
                    	type: 'sec'
                    }
				}
				break;
			// when volume changes
			case 'volumechange':
				_data.data = {
					volume: {
						value: this._controls.volume,
						type: 'range 0 - 1'
					}
				}
				break;
			// loadedmetadata = loaded, lets make that a bit clearer
			case 'loadedmetadata':
				_data.event = 'video loaded';
				break;
		}
		return _data;
	}
}

export default controls;