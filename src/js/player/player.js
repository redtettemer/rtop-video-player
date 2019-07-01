// build the player

import { wrap, createElement, append, addClass, prepend } from '../helpers/createDivs';
import playerControls from './controls';

export function buildWrapper() {
	// add a parent wrapper
    const parentWrapper = createElement('div', { class: 'rtopVideoPlayerWrapper' });
    // add a parent div that will hold everything
    const videoHolder = createElement('div', { class: ('rtopVideoHolder' + (this._settings.fontAwesomeControlIcons ? ' hasFAIcons' : '')) + (this._video.external ? ' externalPlayer' : '') });
    // wrap the player with the holder
    wrap(this._video.player, videoHolder);
    // create a player wrapper just for the player and append
    this._playerWrapper = createElement('div', { class: ('rtopVideoPlayer ' + this._settings.themeClass + (this._settings.fontAwesomeControlIcons ? ' hasFA' : '') + (this._video.external ? ' loading' : ''))});
    this._playerWrapper.append(videoHolder);
    parentWrapper.append(this._playerWrapper);
    // if we need a modal, build that
    if (this._settings.playInModal) {
    	buildModal.call(this, parentWrapper);
    } else {
    	// attach the parent divs
    	this._element.append(parentWrapper);
    }
}

export function buildModal(parentWrapper) {
    if (this._settings.playInModal) {
    	// add the modal wrapper
        const modal = createElement('div', { class: 'rtopVideoModal', id: (this._randomId + '_modal') });
        // build the modal video holder
        const holder = createElement('div', { class: 'videoModalHolder' });
        holder.append(parentWrapper);
        modal.append(holder);
        // add it to the page
        if (document.body) {
           	document.body.append(modal);
        }
        this._modal = modal;
        // create a poster image as a button to launch (if vimeo or youtube, will create that from their api when appropriate)
        if (!this._video.isVimeo && !this._video.isYoutube) {
        	const poster = createElement('div', { class: ('rtopVideoPosterImage' + (this._settings.fontAwesomeControlIcons ? ' hasFAIcons' : '')) });
        	const posterImage = createElement('img', { src: this._video.poster });
        	poster.append(posterImage);
        }
        // if controls arent ready yet, add them
        if (!this._controls) {
        	this._controls = {};
        }
        // add the poster image as a click event and store in the controls obj
        this._controls = {
        	modalPoster: {
        		element: poster,
        		events: {
        			click: poster.addEventListener('click', () => playerControls.openModal.call(this), true)
        		}
        	}
        }
        // append poster
        this._element.append(poster);
        // if close btn for modal, build that and add click event
	    if (this._settings.showCloseBtn) {
	    	const close = buildFontAwesomeButton.call(this, 'closeVideo', 'far fa-times-circle');
			holder.append(close);
			this._controls.closeModal = {
				element: close,
				events: {
					click: close.addEventListener('click', () => playerControls.close.call(this), true)
				}
			};
	    }
    }
}

export function buildControls() {
	// add the controls wrapper
	const vidControls = createElement('div', { class: ('vidControls' + (this._settings.fontAwesomeControlIcons ? ' hasFAIcons' : '')) });
	this._playerWrapper.append(vidControls);
	// hold all the controls
	if (!this._controls) {
        this._controls = {};
    }
    // add the video holder events (play/pause)
	this._controls.video = {
		element: this._playerWrapper.querySelector(".rtopVideoHolder"),
		events: { 
			click: this._playerWrapper.querySelector(".rtopVideoHolder").addEventListener('click', () => playerControls.playPauseRepeat.call(this), true), 
			mousemove: this._playerWrapper.querySelector(".rtopVideoHolder").addEventListener('mousemove', () => playerControls.videoMove.call(this), true), 
			mouseout: this._playerWrapper.querySelector(".rtopVideoHolder").addEventListener('mouseout', () => playerControls.videoOut.call(this), true)
		}
	};

	// if keyboard controls, add listener
	if (this._settings.keyboardControls) {
		this._controls.keyboard = {
			events: document.addEventListener('keyup', (event) => playerControls.keyboardControls.call(this, event), true)
		}
    }

	// if showPlayPauseBtn, build
    if (this._settings.showPlayPauseBtn) {
       	buildPlayBtn.call(this);
   	} else {
   		// build a spacer to keep alignment
        addClass(vidControls, 'noPP');
    	const pp = createElement('div', { className: 'controlBtn', id: 'playPauseHolder' });
       	videoControls.append(pp);
    }

	// if scrubber, build
    if (this._settings.showScrubber){
        buildProgressBar.call(this);
    } else {
    	// build a spacer to keep alignment
    	addClass(vidControls, 'noProgressBar');
    	const spacer = createElement('div', { className: 'controlBtn', id: 'progressSpacer' });
       	videoControls.append(spacer);
    }

    // if timer, build
    if (this._settings.showTimer) {
        buildTimer.call(this);
    }

    // if soundControl, build
    if (this._settings.showSoundControl) {
        buildSoundControl.call(this);
    }

   	// if fullscreen, build
    if (this._settings.showFullScreen) {
        buildFullScreen.call(this);
    }

    if (this._settings.autoPlay) {
    	playerControls.autoPlay.call(this);
    }
}

// pause btn and event listener
export function buildPauseBtn() {
	const controls = this._playerWrapper.querySelector(".vidControls");
	addClass(controls, 'hasPP');
	const pp = buildFontAwesomeButton.call(this, 'playPause', 'far fa-pause-circle');
	prepend(controls, pp);
	this._controls.pause = {
		element: pp,
		events: {
			click: pp.addEventListener('click', () => playerControls.pause.call(this), true)
		},
		info: {	
			event: 'pause'
		}
	};
}

// play btn and event listener
export function buildPlayBtn() {
	const controls = this._playerWrapper.querySelector(".vidControls");
	addClass(controls, 'hasPP');
	const pp = buildFontAwesomeButton.call(this, 'playPause', 'far fa-play-circle');
	prepend(controls, pp);
	this._controls.play = {
		element: pp,
		events: {
			click: pp.addEventListener('click', () => playerControls.play.call(this), true)
		},
		info: {	
			event: 'play'
		}
	};
}

// progress bar/scrubber and event listeners
export function buildProgressBar() {
	const controls = this._playerWrapper.querySelector(".vidControls");
	addClass(controls, 'hasProgressBar');
	const holder = createElement('div', { class: 'controlBtn', id: 'progressholder' });
	this._controls.progressholder = {
		element: holder,
		events: {
			click: holder.addEventListener('click', (event) => playerControls.progressClick.call(this, event), true),
			mousemove: holder.addEventListener('mousemove', (event) => playerControls.progressMove.call(this, event), true)
		}
	}
	const fullWidth = createElement('div', { id: 'fullvideoprogress' });
	const buffer = createElement('div', { id: 'buffered' });
	this._controls.buffered = {
		element: buffer
	}
	const progress = createElement('div', { id: 'progress' });
	this._controls.progress = {
		element: progress
	}
	const orb = createElement('div', { id: 'progressorb' });
	this._controls.progressorb = {
		element: orb
	}
	holder.append(fullWidth);
	holder.append(buffer);
	holder.append(progress);
	holder.append(orb);
	controls.append(holder);
}

// timer btn and event listener
export function buildTimer() {
	const controls = this._playerWrapper.querySelector(".vidControls");
	addClass(controls, 'hasTimer');
	const holder = createElement('div', { class: 'controlBtn', id: 'timeholder' });
	const current = createElement('span', { id: 'currenttime' }, '00:00');
	const spacer = createElement('span', {}, ' / ');
	const total = createElement('span', { id: 'totaltime' }, '00:00');
	holder.append(current);
	holder.append(spacer);
	holder.append(total);
	controls.append(holder);
	this._controls.time = {
		current: {
			element: current
		},
		total: {
			element: totaltime
		}
	};
}

// sound controls and event listeners
export function buildSoundControl() {
	const controls = this._playerWrapper.querySelector(".vidControls");
	addClass(controls, 'hasSound');
	const parent = createElement('div', { class: 'controlBtn', id: 'soundControl'});
	const bars = createElement('span', { class: 'soundBars' });
	this._controls.volume = 1;
	Array(4).fill().map((_, i) => {
		const bar = createElement('span', { class: "soundBar active",  "data-value": (.25 * (i + 1))});
		bars.append(bar);
		this._controls['soundBar' + i] = {
			element: bar,
			events: {
				click: bar.addEventListener('click', () => playerControls.adjustVolume.call(this, bar), true)
			}
		};
	});
	parent.append(bars);
	controls.append(parent);
	buildSoundBtn.call(this);
}


// sound (unmute) btn and event listener
export function buildSoundBtn() {
	const icon = createElement('span', { class: 'muteBtn' + (this._settings.fontAwesomeControlIcons ? ' FAIcon' : ' localAsset') });
	const btnIcon = createElement('i', { class: 'fas fa-volume-up' });
	if (this._settings.fontAwesomeControlIcons) {
		icon.append(btnIcon);
	}
	this._controls.mute = {
		element: icon,
		events: {
			click: icon.addEventListener('click', () => playerControls.mute.call(this), true)
		}
	}
	prepend(this._playerWrapper.querySelector("#soundControl"), icon);
}

// mute btn and event listener
export function buildMuteBtn() {
	const icon = createElement('span', { class: 'muteBtn isMuted' + (this._settings.fontAwesomeControlIcons ? ' FAIcon' : ' localAsset') });
	const btnIcon = createElement('i', { class: 'fas fa-volume-mute' });
	if (this._settings.fontAwesomeControlIcons) {
		icon.append(btnIcon);
	}
	this._controls.mute = {
		element: icon,
		events: {
			click: icon.addEventListener('click', () => playerControls.mute.call(this), true)
		}
	}
	prepend(this._playerWrapper.querySelector("#soundControl"), icon);
}

// fullscreen btn and event listener
export function buildFullScreen() {
	const controls = this._playerWrapper.querySelector(".vidControls");
	addClass(controls, 'hasFS');
	const fs = buildFontAwesomeButton.call(this, 'fullScreenBtn', 'fas fa-expand');
	controls.append(fs);
	this._controls.fullscreen = {
		element: fs,
		events: {
			click: fs.addEventListener('click', () => playerControls.fullscreen.call(this), true)
		}
	};
}

// DRY for icon btns
export function buildFontAwesomeButton($id, $icon) {
	const btn = createElement('div', { class: "controlBtn", id: $id });
	const icon = createElement('span', { class: (this._settings.fontAwesomeControlIcons ? 'FAIcon' : 'localAsset') });
	const btnIcon = createElement('i', { class: $icon });
	if (this._settings.fontAwesomeControlIcons) {
		icon.append(btnIcon);
	}
	btn.append(icon);
	return btn;
}
