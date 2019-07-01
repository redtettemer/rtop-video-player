/**
 * RTO+P Video Player v1.1.0
 * Copyright 2019 RTO+P https://www.rtop.com
 * Author Rob Kandel
 */

import defaults from './config/defaults';
import config from './config/config';
import video from './helpers/video';
import playerControls from './player/controls';
import { buildPlayBtn, buildPauseBtn, buildMuteBtn, buildSoundBtn } from './player/player';
import { addClass, removeClass, remove } from './helpers/createDivs';
import { clone, extend } from './helpers/objects';
import { on, off, unbindAll, trigger } from './helpers/events';

// create the player class
class VideoPlayer {
    constructor(target, options) {
        if (!target) {
            // if no target, stop and send warning;
            console.log('There was an error loading your video, please check documentation --> https://redtettemer.github.io/rtop-video-player/');
            return;  
        }

        // keep hold of the target
        this._element = document.querySelector(target);

        // some housekeeping
        this._name = 'RTOP_VideoPlayer';
        this._version = config.version;
        this._updated = config.updated;
        
        // create the video object to hold all video info
        this._video = {};

        // create an event listener array to hold them
        this._eventListeners = [];

        // extend settings with defaults
        this._settings = extend(
            {},
            defaults,
            VideoPlayer.settings,
            options || {},
        );

        // clone for destroy
        this._original = this._element.cloneNode(true);
        
        // Setup video
        video.init.call(this);

        trigger.call(this, this._video.player, 'custom');
    }

    // public functions to control the video
    play() {
        // if no video, return to avoid error
        if (!this._video.player) {
            return;
        }
        // add playing class
        addClass(this._playerWrapper, 'playing');

        // remove paused class
        removeClass(this._playerWrapper, 'paused');

        // remove the play button
        remove(this._controls.play.element);

        // build pause btn and add click events
        buildPauseBtn.call(this);
        
        // update progress if needed
        if (this._settings.showControls && (this._settings.showScrubber || this._settings.showTimer)) {
            const $that = this;
            // if no timers exist, create obj to hold them
            if (!this._timers) {
                this._timers = {}
            }
            // set interval to check progress
            this._timers._progress = setInterval(function(){
                if ($that._video.external) {
                    $that._video.player.on('progress', function(data) {
                        playerControls.updateProgress.call($that, data, {});
                    });
                    $that._video.player.on('timeupdate', function(data) {
                       playerControls.updateProgress.call($that, {}, data);
                    });
                } else {
                    playerControls.updateProgress.call($that);
                }
            }, 100);
        } 
        // if controls, start timer to hide
        if (this._settings.showControls) {
            // if motion timer, clear
            if (this._timers && this._timers._motion_timer) {
                clearTimeout(this._timers._motion_timer);
            }
            // if no timers exist, create obj to hold them
            if (!this._timers) {
                this._timers = {}
            }
            // create motion timer to hide the controls/overlay
            this._timers._motion_timer = setTimeout(() => {
                addClass(this._playerWrapper, 'hideOverlay');
                addClass(this._playerWrapper.querySelector(".vidControls"), 'hide');
            }, this._settings.controlsHoverSensitivity);
        }
        // actually play the video
        return this._video.player.play();
    }

    pause() {
        // if no video, return to avoid error
        if (!this._video.player) {
            return;
        }
        
        // add paused class
        addClass(this._playerWrapper, 'paused');
        
        // remove playing class
        removeClass(this._playerWrapper, 'playing');
        
        //remove the pause btn
        remove(this._controls.pause.element);

        // add the play button and attach click events
        buildPlayBtn.call(this);

        // pause the video
        this._video.player.pause();
    }

    stop() {
        // if no video, return to avoid error
        if (!this._video.player) {
            return;
        }

        // pause the video
        this.pause();

        //  if controls, stop the progress interval and clear the motion timers
        if (this._settings.showControls) {
            if (this._settings.showScrubber || this._settings.showTimer) {
                clearInterval(this._timers._progress);
            }
            clearTimeout(this._timers._motion_timer);

            // hide the controls
            removeClass(this._playerWrapper, 'finished');
            removeClass(this._playerWrapper.querySelector(".vidControls"), 'hide');
        }
        // reset the player to beginning
        this._video.player.currentTime = 0;
    }

    restart() {
        // if no video, return to avoid error
        if (!this._video.player) {
            return;
        }
        if (this._settings.showControls) {
            // if pause button is up, remove it
            if (this._settings.showPlayPauseBtn) {
                remove(this._controls.pause.element);
            }
            //  if controls, stop the progress interval and clear the motion timers
            if (this._settings.showScrubber || this._settings.showTimer) {
                clearInterval(this._timers._progress);
            }
            clearTimeout(this._timers._motion_timer);
            // hide the controls
            removeClass(this._playerWrapper, 'finished');
            removeClass(this._playerWrapper.querySelector(".vidControls"), 'hide');
        }
        // reset the player to beginning
        this._video.player.currentTime = 0;
        // play the video again
        this.play();
    }

    goto(sec) {
        // if no video, return to avoid error
        if (!this._video.player) {
            return;
        }
        // seek video to requested time in seconds
        if (this._video.external) {
            this._video.player.setCurrentTime(sec);
        } else {
            this._video.player.currentTime = sec
        }
    }

    mute() {
        // if no video, return to avoid error
        if (!this._video.player) {
            return;
        }
        // mute video
        if (this._video.external) {
            this._video.player.setVolume(0);
        } else {
            this._video.player.muted = true;
        }
        // set our mute flag
        this._controls.isMute = true;
        // remove the mute btn/icon
        remove(this._controls.mute.element);
        // build muted btn/icon
        buildMuteBtn.call(this);
        // remove the active class on all the sound bars
        Array(4).fill().map((_, i) => {        
            removeClass(this._controls['soundBar' + i].element, 'active');
        });
    }

    adjustVolume(val) {
        // if no video, return to avoid error
        if (!this._video.player) {
            return;
        }
        // check to make sure request volume great than or equal to 0 and less than or equal to 1
        let vol = (val ? val : 1);
        const max = 1;
        const min = 0;
        vol = Number(vol);
        if (vol > max) {
            vol = max;
        }
        if (vol < min) {
            vol = min;
        }
        // if its muted, un mute as well
        if (this._controls.isMute) {
            this._video.player.muted = false;
            this._controls.isMute = false;
            // remove the mute btn/icon
            remove(this._controls.mute.element);
            // build the sound btn/icon
            buildSoundBtn.call(this);
        }
        // adjust the player volume
        if (this._video.external) {
            this._video.player.setVolume(vol);
        } else {
            this._video.player.volume = vol;
        }
        // add active class for all the bars under the requested volume threshold, remove those above
        Array(4).fill().map((_, i) => {
            if (Number(this._controls['soundBar' + i].element.getAttribute('data-value')) <= vol ) {
                addClass(this._controls['soundBar' + i].element, 'active');
            } else {
                removeClass(this._controls['soundBar' + i].element, 'active');
            }
        });
        // hold on to current volume
        this._controls.volume = vol;
    }

    closeModal() {
        // stop the video on close modal
        this.stop();
        // remove the class showing the modal
        removeClass(this._modal, 'show');
    }

    on(event, callback) {
        if (!this._video.player) {
            return;
        }
        // allow for jquery like on event listeners on the video player
        on.call(this, this._video.player, event, callback);
    }

    off(event, callback) {
        if (!this._video.player) {
            return;
        }
        // allow jquery like off event listener
        off(this._elements, event, callback);
    }

    destroy() {
        // if no video, return to avoid error
        if (!this._video.player) {
            return;
        }
        // pause the video
        this._video.player.pause();
        // clear the timers
        if (this._timers) {
            if (this._settings.showControls && (this._settings.showScrubber || this._settings.showTimer)) {
                clearInterval(this._timers._progress);
            }
            if (this._settings.showControls) {
                clearTimeout(this._timers._motion_timer);
            }
        }
        // unbind all events
        unbindAll.call(this);
        // remove the Video Player items
        remove(document.querySelector('.rtopVideoPlayerWrapper'));
        // if the video tag was already there, add it back in
        if (!this._video.createTag) {
            video.createTag.call(this);
        }
    }
}

VideoPlayer.settings = clone(defaults);

// export default VideoPlayer;