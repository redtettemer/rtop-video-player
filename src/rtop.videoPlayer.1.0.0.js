(function(jQuery, window, document, undefined) {
    'use strict';

    // create plugin necessities
    function vid(element, options) {
        this._element = jQuery(element);
        this._settings = jQuery.extend({}, vid._defaults, options);
        this._defaults = jQuery.extend(true, {}, vid._defaults);
        this._name = 'RTOP_VideoPlayer';
        this._version = '1.0.0';
        this._updated = '05.03.19';
        this.init();
    };

    // default options for video player
    vid._defaults = {
        showControls: true,
        showControlsOnHover: true,
        controlsHoverSensitivity: 3000,
        showScrubber: true,
        showTimer: true,
        showPlayPauseBtn: true,
        showSoundControl: false,
        showFullScreen: false,
        showCloseBtn: false,
        allowPlayPause: true,
        themeClass: 'rtopTheme',
        lazyload: false,
        fontAwesomeControlIcons: false,
        playInModal: false,
        replayFinished: false,
        closeModalFinished: false,
        collapseFinished: false,
        repeatFinished: false,
        gtmTagging: false,
        gtmOptions: {}
    }

    //init player
    vid.prototype.init = function() {
        var _self = this;
        // wrap everything into new divs
        _self._element.wrap('<div class="rtopVideoPlayerWrapper"><div class="rtopVideoPlayer ' + _self._settings.themeClass + '"></div>');

        // check for video or buid video tags
        _self._video = (_self._element.find('video')[0] === undefined) ? _self.createVideoTags() : _self._element.find('video');

        // set random id if not there
        if (!_self._video.attr('id')) {
            _self._video.attr('id', this.generateRandomId());
        }

        // set video tag id
        _self._player = document.getElementById(this._element.find('video').attr('id'));

        // built necessary controls;
        if (_self._settings.showControls) {
            _self.buildControls();
        } else if (_self._settings.allowPlayPause) {
            _self.playPauseEvents();
        }
        
        // send trigger that player has loaded
        this.trigger('load_player');
    }

    // create the html video tag if we are lazy loading video
    vid.prototype.createVideoTags = function() {
        var _self = this;
        var _videoData = _self._element.data();
        _self._element.html('<video src="' + _videoData.video + '" playsinline type="' + _videoData.type + '" poster="' + _videoData.poster + '"><source src="' + _videoData.video + '" type="' + _videoData.type + '"></video>');
        return _self._element.find('video');
    }

    vid.prototype.buildControls = function() {
        var _self = this;
        _self._element.append('<div class="vidControls"></div>');
        if (_self._settings.showScrubber){
            _self.addProgressBar();
        }
        if (_self._settings.showTimer) {
            _self.addTimer();
        }

        // setup click/mouse events;
        // _self.clickEvents();
    }

    // setup click events
    vid.prototype.clickEvents = function() {
        var _self = this;

        // close btn if present
        // _self._element.find('.closeBtn').on('click', function(evt) {
        //     evt.preventDefault();
        //     evt.stopPropagation();
        //     _self.closeVideo();
        // });

        // full screen if present
        // _self._element.find('.fa-expand-wide').on('click', function(evt) {
        //   evt.preventDefault();
        //   evt.stopPropagation();
        //   _self.fullScreen();
        // });

        // video play/pause/repeat on click;
        // _self._element.find('.vidPlayer').on('click', function(){
        //     _self._element.hasClass('playing') ? _self.pauseVideo() : _self._element.hasClass('finished') ? _self.replayVideo() : _self.playVideo()
        // }).on('mousemove', function(){
        //     if (_self._element.hasClass('hideOverlay')){
        //         clearTimeout(_self._motion_timer);
        //        _self._element.removeClass('hideOverlay').find('.vidControls').removeClass('hide');
        //     }
        // }).on('mouseout', function(){
        //     if (!_self._player.paused){
        //         clearTimeout(_self._motion_timer);
        //         _self._motion_timer = setTimeout(function() {
        //             _self._element.addClass('hideOverlay').find('.vidControls').addClass('hide');
        //         }, _self._settings.controlsHoverSensitivity);
        //     }
        // });
        // this._element.find("#progressholder").mousemove(function(e){
        //     _self.updateOrb(e);
        // }).click(function(e) {
        //     _self.progressClick(e);
        // });
    }

    vid.prototype.playPauseEvents = function() {
        var _self = this;
        // video play/pause/repeat on click;
        _self._element.find('.vidPlayer').on('click', function(){
            _self._element.hasClass('playing') ? _self.pauseVideo() : _self._element.hasClass('finished') ? (_self._settings.replayFinished ? _self.replayVideo() : null) : _self.playVideo();
        }).on('mousemove', function(){
            if (_self._element.hasClass('hideOverlay')){
                clearTimeout(_self._motion_timer);
               _self._element.removeClass('hideOverlay').find('.vidControls').removeClass('hide');
            }
        }).on('mouseout', function(){
            if (!_self._player.paused){
                clearTimeout(_self._motion_timer);
                _self._motion_timer = setTimeout(function() {
                    _self._element.addClass('hideOverlay').find('.vidControls').addClass('hide');
                }, _self._settings.controlsHoverSensitivity);
            }
        });
    }

    // create progress bar/scrubber if present
    vid.prototype.addProgressBar = function() {
        var _self = this;
        _self._element.find('.vidControls').addClass('hasProgressBar').append('<div id="progressholder"><div id="fullvideoprogress"></div><div id="buffered"></div><div id="progress"></div><div id="progressorb"></div></div>');
    }

    // create timer if present
    vid.prototype.addTimer = function() {
        var _self = this;
        _self._element.find('.vidControls').addClass('hasTimer').append('<div id="timeholder"><span id="currenttime">00:00</span> / <span id="totaltime">00:00</span></div>');
    }

    // close video if present
    vid.prototype.closeVideo = function() {
        var _self = this;
        if (_self._element.hasClass('playing')) {
            _self.pauseVideo();
        }
        _self._element.removeClass('finished').find('.vidControls').removeClass('hide');
        this.trigger('closeVideo');
    }

    // play the video
    vid.prototype.playVideo = function() {
        var _self = this;
        this._element.addClass('playing').removeClass('paused').find('.vidControls');
        this._player.play();
        this._progress = setInterval(function(){_self.updateProgress(_self)}, 100);
        clearTimeout(_self._motion_timer);
        _self._motion_timer = setTimeout(function() {
            _self._element.addClass('hideOverlay').find('.vidControls').addClass('hide');
        }, 3000);
        this.trigger('playVideo');
    }

    // pause video
    vid.prototype.pauseVideo = function() {
        var _self = this;
        this._element.removeClass('playing').addClass('paused').removeClass('hideOverlay').find('.vidControls');
        clearInterval(this._progress);
        clearTimeout(_self._motion_timer);
        this._player.pause();
        this.trigger('pauseVideo');
    }

    // toggle full screen if present
    vid.prototype.fullScreen = function() {
      var _self = this;
      if (!window.isFs) {
        window.isFs = true;
        var fn_enter = this._player.requestFullscreen || this._player.webkitEnterFullscreen || this._player.mozRequestFullScreen || this._player.oRequestFullscreen || this._player.msRequestFullscreen;
        fn_enter.call(this._player);
        this.trigger('videoEnterFullScreen');
      } else {
        window.isFs = false;
        var fn_exit = this._player.exitFullScreen || this._player.webkitExitFullScreen || this._player.mozExitFullScreen || this._player.oExitFullScreen || this._player.msExitFullScreen;
        fn_exit.call(this._player);
        this.trigger('videoExitFullScreen');
      }
    }

    // replay video if present
    vid.prototype.replayVideo = function() {
        var _self = this;
        clearInterval(this._progress);
        clearTimeout(_self._motion_timer);
        this.trigger('replayVideo');
        this._element.removeClass('finished').find('.vidControls').removeClass('hide');
        this.playVideo();
    }

    // update progress on scrubber if needed
    vid.prototype.updateProgress = function(_self) {
        _self._element.find("#buffered").css("width", ((_self._player.buffered.end(_self._player.buffered.length-1) / _self._player.duration) * 100) + "%");
        _self._element.find("#progress").css("width", ((_self._player.currentTime / _self._player.duration) * 100) + "%");

        var current = (_self.sformat(_self._player.currentTime))
        var total = (_self.sformat(_self._player.duration))

        _self._element.find('#currenttime').text(current);
        _self._element.find('#totaltime').text(total);
        if(_self._player.ended) {
            _self.videoEnded();
        }
        _self.trigger('video_progress', {
            action: {
                name: 'progress',
                value: {
                    buffered: ((_self._player.buffered.end(_self._player.buffered.length-1) / _self._player.duration) * 100),
                    duration: _self._player.duration,
                    currentTime: ((_self._player.currentTime / _self._player.duration) * 100)
                }
            }
        });
    }

    // format time
    vid.prototype.sformat = function(s) {
        var fm = [
            Math.floor(s/60)%60,
            Math.floor(s%60)
        ];
        return $.map(fm,function(v,i) { return ( (v < 10) ? '0' : '' ) + v; }).join( ':' );
    }

    // move orb along if needed
    vid.prototype.updateOrb = function(e){
        var _self = this;
        var _pos = e.pageX - _self._element.find("#progressholder").offset().left, _prop = _pos / _self._element.find("#progressholder").width(), _prog = _prop * _self._player.duration;
        _self._element.find("#progressorb").css("margin-left", (_pos - _self._element.find("#progressorb").width()/2) + "px");
    }

    // update orb to scubber location click
    vid.prototype.progressClick = function(e){
        var _self = this;
        e.stopPropagation();
        var _pos = e.pageX - _self._element.find("#progressholder").offset().left, _prop = (_pos + 1) / _self._element.find("#progressholder").width(), _prog = _prop * _self._player.duration;
        _self._player.currentTime = _prog;
        this.updateProgress(_self);
    }

    // end of video
    vid.prototype.videoEnded = function() {
        var _self = this;
        this._element.removeClass('playing').removeClass('paused').addClass('finished').removeClass('hideOverlay').find('.vidControls').addClass('hide');
        clearInterval(this._progress);
        clearTimeout(_self._motion_timer);
        setTimeout(function(){
            _self._settings.collapseFinished ? _self.closeVideo() : _self._player.load()
        }, 300);
        this.trigger('videoEnded');
    }

    // random video id if needed
    vid.prototype.generateRandomId = function() {
        var _self = this;
        var _random = '', _chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = 0; i < 10; i++) {
            _random += _chars[Math.round(Math.random() * (_chars.length - 1))];
        }
        this._settings.id = _random;
        return _random;
    }

    // send gtm tags
    vid.prototype.sendTag = function(type, tag) {
        var _info = {};
        _info[type] = tag;
        dataLayer.push(_info);
    }

    // gtm tag?
    vid.prototype.checkTaging = function(tag) {
        if (typeof(dataLayer) !== undefined) {
            for (var i in dataLayer) {
                if (dataLayer[i].event === tag) {
                    return true
                }
            }
            return false;
        }
        return true;
    }

    // destroy plugin
    vid.prototype.destroy = function() {
        var _self = this;
        this.trigger('destroy_player');
        clearInterval(this._progress);
        clearTimeout(_self._motion_timer);
        jQuery(this._element).removeData("vid.RTOP_VideoPlayer")
    }

    // update options
    vid.prototype.update = function(updated_options) {
        for (var i in updated_options) {
            if (i in this._settings) {
                this._settings[i] = updated_options[i]
            }
        }
        this.trigger('updated_settings', {
            action: {
                name: 'settings',
                value: {
                    updated: updated_options,
                    all: this._settings
                }
            }
        });
    };

    // send triggers
    vid.prototype.trigger = function(name, data, namespace, state, enter) {
        var handler = jQuery.camelCase(
                jQuery.grep(['on', name, namespace], function(v) {
                    return v
                })
                .join('-').toLowerCase()
            ),
            event = jQuery.Event(
                [name, 'vid', namespace || 'RTOP_VideoPlayer'].join('.').toLowerCase(),
                jQuery.extend({
                    relatedTarget: this
                }, status, data)
            );
        this.register({
            name: name
        });
        this._element.trigger(event);
        if (this._settings && typeof this._settings[handler] === 'function') {
            this._settings[handler].call(this, event);
        }
        return event;
    };

    // register plugin
    vid.prototype.register = function(object) {
        if (!jQuery.event.special[object.name]) {
            jQuery.event.special[object.name] = {};
        }
        if (!jQuery.event.special[object.name].vid) {
            var _default = jQuery.event.special[object.name]._default;
            jQuery.event.special[object.name]._default = function(e) {
                if (_default && _default.apply && (!e.namespace || e.namespace.indexOf('vid') === -1)) {
                    return _default.apply(this, arguments);
                }
                return e.namespace && e.namespace.indexOf('vid') > -1;
            };
            jQuery.event.special[object.name].vid = true;
        }
    };

    // define plugin
    jQuery.fn.RTOP_VideoPlayer = function(_option) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var _this = jQuery(this), _data = _this.data('vid.RTOP_VideoPlayer');
            if (!_data) {
                _data = new vid(this, typeof _option == 'object' && _option);
                _this.data('vid.RTOP_VideoPlayer', _data);
            }
            if (typeof _option == 'string') {
                try {
                    _data[_option].apply(_data, args);
                } catch (err) {
                    _data.trigger('error', {
                        action: {
                            name: 'update',
                            error: {
                                message: err
                            }
                        }
                    });
                }
            }
        });
    };

    jQuery.fn.RTOP_VideoPlayer.Constructor = vid;
})(window.jQuery, window, document);
