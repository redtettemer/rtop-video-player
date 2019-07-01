// all things vimeo

import config from '../config/config';
import playerControls from '../player/controls';
import { loadScript } from './utils';
import { createElement, append, setAttributes, addClass, removeClass } from './createDivs';
import { buildWrapper, buildControls } from '../player/player';
import { on, off, trigger } from './events';

const vimeo = {
	isVimeo(url) {
		return (/^https?:\/\/vimeo.com\/\d{0,9}(?=\b|\/)/.test(url) || /^https?:\/\/player.vimeo.com\/\d{0,9}(?=\b|\/)/.test(url));
	},
	loadVimeo() {
		if (!(window.Vimeo)) {
			loadScript(config.vimeo.api)
                .then(() => {
                    vimeo.ready.call(this);
                })
                .catch(error => {
                    console.log('Vimeo SDK (player.js) failed to load', error);
			});
        } else {
            vimeo.ready.call(this);
        }
	},
	ready() {
		const iframe = createElement('iframe', { class: 'vimeo' });
		const regex = /^.*(vimeo.com\/|video\/)(\d+).*/;
		setAttributes(iframe, { 
			src: 'https://player.vimeo.com/video/' + (this._settings.src.match(regex) ? RegExp.$2 : this._settings.src) + '?controls=0',
			allowfullscreen: '',
			allowtransparency: '',
			allow: 'autoplay',
			id: this._randomId
		});
		const externalPlayer = createElement('div', { class: 'rtopExternalPlayer' });
		externalPlayer.append(iframe);
		this._element.append(externalPlayer);
		this._video.player = externalPlayer;
		buildWrapper.call(this);
 		this._video.player = new window.Vimeo.Player(iframe);
        if (this._settings.loop) {
            this._video.player.setLoop(true);
        }
        removeClass(this._playerWrapper, 'loading');
        // build some controls
        if (this._settings.showControls) {
            buildControls.call(this);
        } else if (!this._settings.showControls && this._settings.autoPlay) {
           	playerControls.autoPlay.call(this);
        }
        // add class to remove play button and cursor
        if (!this._settings.showControls) {
            addClass(this._playerWrapper, 'noControls');
        }
        trigger.call(this, this._video.player, 'play', {test: 'test'});
        this._video.player.on('play', () => {
        	console.log('vimeo play');
        });
	}
}

export default vimeo;
