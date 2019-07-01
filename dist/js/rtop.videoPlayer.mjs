typeof navigator === "object" && function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

// RTOP Video Player Default options
var defaults = {
  // override source
  src: '',
  // override poster
  poster: '',
  // override source type
  type: '',
  // display controls
  showControls: true,
  // display controls on player hover
  showControlsOnHover: true,
  // ms for hiding controls after non movement
  controlsHoverSensitivity: 3000,
  // display progress scrubber bar
  showScrubber: true,
  // display timer
  showTimer: false,
  // display play/pause timer
  showPlayPauseBtn: true,
  // display sound/mute controls
  showSoundControl: false,
  // display full screen button
  showFullScreen: false,
  // allow space bar to play/pause video
  keyboardControls: true,
  // add class to help theme
  themeClass: 'rtopTheme',
  // use font awesome icons
  fontAwesomeControlIcons: true,
  // auto play video
  autoPlay: false,
  // loop video on finish
  loop: false,
  // allow replay video
  allowReplay: true,
  // play in modal
  playInModal: false,
  // display a close button on modal
  showCloseBtn: false,
  // close the modal when video ends
  closeModalOnFinish: false,
  // all the GTM options
  gtmOptions: {}
};

// RTOP Video Player Config options
var config = {
  version: '1.1.0',
  updated: '05.15.19'
};

// all things vimeo
var vimeo = {
  isVimeo: function isVimeo(url) {
    return /^https?:\/\/vimeo.com\/\d{0,9}(?=\b|\/)/.test(url);
  }
};

// all things youtube
var youtube = {
  isYoutube: function isYoutube(url) {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(url);
  }
};

// all our jquery functions in pure javascript
// wrap
function wrap(elements, wrapper) {
  var targets = elements.length ? elements : [elements];
  Array.from(targets).reverse().forEach(function (element, index) {
    var child = index > 0 ? wrapper.cloneNode(true) : wrapper;
    var parent = element.parentNode;
    var sibling = element.nextSibling;
    child.appendChild(element);

    if (sibling) {
      parent.insertBefore(child, sibling);
    } else {
      parent.appendChild(child);
    }
  });
} // create new element (divs, spans, etc)

function createElement(type, attr, text) {
  var element = document.createElement(type);
  setAttributes(element, attr);

  if (text && text !== '') {
    element.innerText = text;
  }

  return element;
} // add attrs to div

function setAttributes(element, attr) {
  if (!attr || Object.keys(attr).length === 0) {
    return;
  }

  Object.entries(attr).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return element.setAttribute(key, value);
  });
} // add element after

function prepend(parent, element) {
  parent.insertBefore(element, parent.children[0]);
} // remove element

function remove(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
} // add class

function addClass(element, className) {
  element.classList.add(className);
  return element.classList.contains(className);
} // remove class

function removeClass(element, className) {
  element.classList.remove(className);
  return element.classList.contains(className);
} // if element has class

function hasClass(element, className) {
  return element.classList.contains(className);
} // add html

function html(element, html) {
  element.innerHTML = html;
} // replace element

// useful utility functions
// get a random id if needed
function generateRandomId() {
  return Math.random().toString(36).substr(2, 12);
} // format time into seconds

function timeFormat(s) {
  var fm = [Math.floor(s / 60) % 60, Math.floor(s % 60)];
  return fm.map(function (v, i) {
    return (v < 10 ? '0' : '') + v;
  }).join(':');
} // browser specific

function runPrefixMethod(obj, method) {
  var pfx = ["webkit", "moz", "ms", "o", ""];
  var p = 0,
      m,
      t;

  while (p < pfx.length && !obj[m]) {
    m = method;

    if (pfx[p] == "") {
      m = m.substr(0, 1).toLowerCase() + m.substr(1);
    }

    m = pfx[p] + m;
    t = _typeof(obj[m]);

    if (t != "undefined") {
      pfx = [pfx[p]];
      return t == "function" ? obj[m]() : obj[m];
    }

    p++;
  }
}

// all this video tag related
var video = {
  // Setup media
  init: function init() {
    var videoTag = this._element.querySelector("video");

    this._randomId = generateRandomId(); // if the video tag is already present

    if (videoTag) {
      this._video.player = videoTag;
      this._video.src = videoTag.getAttribute('src');
      this._video.poster = videoTag.getAttribute('poster');
      this._video.type = videoTag.getAttribute('type');

      if (!videoTag.getAttribute('id')) {
        setAttributes(videoTag, _id);
      }
    } // if there is a video data attr


    if (this._element.getAttribute('data-video')) {
      this._video.src = this._element.getAttribute('data-video');
      this._video.poster = this._element.getAttribute('data-poster');
      this._video.type = this._element.getAttribute('data-type');
      this._video.createTag = true;
    }

    if (this._settings.src !== '') {
      // check if vimeo
      this._video.isVimeo = vimeo.isVimeo(this._settings.src); // check if youtube

      this._video.isYoutube = youtube.isYoutube(this._settings.src);

      if (this._video.isVimeo || this._video.isYoutube) {
        this._video.external = true;
      } else {
        this._video.createTag = true;
      } // or if you specified the src/poster/type


      this._video.src = this._settings.src;
      this._video.poster = this._settings.poster;
      this._video.type = this._settings.src.type;
    } // if no source, stop and add error


    if (!this._video.src) {
      console.log('There was an error loading your video, please check documentation --> https://redtettemer.github.io/rtop-video-player/');
      return;
    } // if vimeo, load iframe


    if (this._video.isVimeo) {
      vimeo.loadVimeo();
    } // if youtube, load iframe


    if (this._video.isYoutube) {
      youtube.loadYoutube();
    } // if need to add <video>, build it


    if (this._video.createTag) {
      video.createTag.call(this);
    }
  },
  // build the video tag if needed
  createTag: function createTag() {
    var sourceTag = createElement('source', {
      src: this._video.src,
      type: this._video.type
    });
    var videoTag = createElement('video', {
      src: this._video.src,
      poster: this._video.poster,
      type: this._video.type,
      playsinline: true,
      id: this._randomId
    });
    videoTag.append(sourceTag);

    this._element.append(videoTag);

    this._video.player = videoTag;
  }
};

// GTM stuff
function checkTaging(tag) {
  if ((typeof dataLayer === "undefined" ? "undefined" : _typeof(dataLayer)) !== undefined) {
    for (var i in dataLayer) {
      if (dataLayer[i].event === tag) {
        return true;
      }
    }

    return false;
  }

  return true;
}
function sendTag(type, tag) {
  dataLayer.push({
    type: tag
  });
}

// all the click events
var controls = {
  // pause
  pause: function pause() {
    this.pause();
  },
  // play
  play: function play() {
    this.play();
  },
  // play pause or repeat if you click the video depending on current state
  playPauseRepeat: function playPauseRepeat() {
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
  videoMove: function videoMove() {
    if (this._settings.showControls) {
      if (hasClass(this._playerWrapper, 'hideOverlay')) {
        if (this._timers && this._timers._motion_timer) {
          clearTimeout(this._timers._motion_timer);
        }

        removeClass(this._playerWrapper, 'hideOverlay');
        removeClass(this._playerWrapper.querySelector(".vidControls"), 'hide');
      }
    }
  },
  // if you scroll out of the video, hide controls
  videoOut: function videoOut() {
    var _this = this;

    if (!this._video.player.paused && this._settings.showControls) {
      if (this._timers && this._timers._motion_timer) {
        clearTimeout(this._timers._motion_timer);
      }

      if (!this._timers) {
        this._timers = {};
      }

      this._timers._motion_timer = setTimeout(function () {
        addClass(_this._playerWrapper, 'hideOverlay');
        addClass(_this._playerWrapper.querySelector(".vidControls"), 'hide');
      }, this._settings.controlsHoverSensitivity);
    }
  },
  // seek
  progressClick: function progressClick(event) {
    event.stopPropagation();
    var pos = event.pageX - this._controls.progressholder.element.offsetLeft - this._playerWrapper.parentNode.parentNode.offsetLeft;
    var maxPos = this._controls.progressholder.element.offsetWidth;

    if (!this._video.player) {
      return;
    }

    this["goto"](pos / maxPos * this._video.player.duration);
  },
  // move orb with cursor
  progressMove: function progressMove(event) {
    var orb = this._playerWrapper.querySelector("#progressorb");

    var pos = event.pageX - this._controls.progressholder.element.offsetLeft - this._playerWrapper.parentNode.parentNode.offsetLeft;
    var orbPos = pos - orb.offsetWidth / 2;
    var maxPos = this._controls.progressholder.element.offsetWidth - orb.offsetWidth / 2;
    orb.style.left = orbPos > maxPos ? maxPos : orbPos + "px";
  },
  // mute
  mute: function mute() {
    if (this._controls.isMute) {
      this.adjustVolume(this._controls.volume);
    } else {
      this.mute();
    }
  },
  // adjust volume
  adjustVolume: function adjustVolume(bar) {
    this.adjustVolume(bar.getAttribute('data-value'));
  },
  // toggle fullscreen
  fullscreen: function fullscreen() {
    if (!this._controls.isFs) {
      this._controls.isFs = true;
      runPrefixMethod(this._playerWrapper, "RequestFullScreen");
    } else {
      this._controls.isFs = false;
      runPrefixMethod(document, "CancelFullScreen");
    }
  },
  // close modal
  close: function close() {
    this.close();
  },
  // update the scrubber/progress bar to current time
  updateProgress: function updateProgress() {
    var _this2 = this;

    if (!this._video.player) {
      return;
    }

    if (this._settings.showTimer) {
      html(this._controls.time.current.element, timeFormat(this._video.player.currentTime));
      html(this._controls.time.total.element, timeFormat(this._video.player.duration));
    }

    if (this._settings.showScrubber) {
      this._controls.buffered.element.style.width = this._video.player.buffered.end(this._video.player.buffered.length - 1) / this._video.player.duration * 100 + "%";
      this._controls.progress.element.style.width = this._video.player.currentTime / this._video.player.duration * 100 + "%";
    } // if there are GTM events, try and dispatch based on time


    if (Object.keys(this._settings.gtmOptions).length > 0) {
      if (typeof dataLayer !== "undefined") {
        Object.keys(this._settings.gtmOptions).map(function (i) {
          if (Math.floor(_this2._video._player.currentTime / _this2._video._player.duration * 100) === parseFloat(_this2._settings.gtmOptions[i].time)) {
            if (!checkTaging(_this2._settings.gtmOptions[i].name)) {
              sendTag(_this2._settings.gtmOptions[i].type, name);
            }
          }
        });
      }
    }

    if (this._video.player.ended) {
      controls.videoEnded.call(this);
    }
  },
  // auto play
  autoPlay: function autoPlay() {
    var _this3 = this;

    this._playerWrapper.addClass('playing'); // need to mute the video 


    this._video.player.muted = true; // mute the video fallback

    this._video.player.volume = 0;
    this._video.player.autoplay = true;

    this._video.player.load();

    if (this._settings.showControls) {
      if (this._timers && this._timers._motion_timer) {
        clearTimeout(this._timers._motion_timer);
      }

      if (!this._timers) {
        this._timers = {};
      }

      this._timers._motion_timer = setTimeout(function () {
        addClass(_this3._playerWrapper, 'hideOverlay');
        addClass(_this3._playerWrapper.querySelector(".vidControls"), 'hide');
      }, this._settings.controlsHoverSensitivity);
    }
  },
  // open the modal
  openModal: function openModal() {
    addClass(this._modal, 'show');
  },
  // only keyboard control is spacebar for play/pause
  keyboardControls: function keyboardControls(event) {
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
  videoEnded: function videoEnded() {
    removeClass(this._playerWrapper, 'playing');
    removeClass(this._playerWrapper, 'pause');
    removeClass(this._playerWrapper, 'hideOverlay');
    addClass(this._playerWrapper, this._settings.closeModalOnFinish ? 'closing' : 'finished');
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
      var $that = this;
      setTimeout(function () {
        $that.stop();
        removeClass($that._modal, 'show');
      }, 300);
    }
  }
};

// build the player
function buildWrapper() {
  // add a parent wrapper
  var parentWrapper = createElement('div', {
    "class": 'rtopVideoPlayerWrapper'
  }); // add a parent div that will hold everything

  var videoHolder = createElement('div', {
    "class": 'rtopVideoHolder' + (this._settings.fontAwesomeControlIcons ? ' hasFAIcons' : '')
  }); // wrap the player with the holder

  wrap(this._video.player, videoHolder); // create a player wrapper just for the player and append

  this._playerWrapper = createElement('div', {
    "class": 'rtopVideoPlayer ' + this._settings.themeClass + (this._settings.fontAwesomeControlIcons ? ' hasFA' : '')
  });

  this._playerWrapper.append(videoHolder);

  parentWrapper.append(this._playerWrapper); // if we need a modal, build that

  if (this._settings.playInModal) {
    buildModal.call(this, parentWrapper);
  } else {
    // attach the parent divs
    this._element.append(parentWrapper);
  }
}
function buildModal(parentWrapper) {
  var _this = this;

  if (this._settings.playInModal) {
    // add the modal wrapper
    var modal = createElement('div', {
      "class": 'rtopVideoModal',
      id: this._randomId + '_modal'
    }); // build the modal video holder

    var holder = createElement('div', {
      "class": 'videoModalHolder'
    });
    holder.append(parentWrapper);
    modal.append(holder); // add it to the page

    if (document.body) {
      document.body.append(modal);
    }

    this._modal = modal; // create a poster image as a button to launch (if vimeo or youtube, will create that from their api when appropriate)

    if (!this._video.isVimeo && !this._video.isYoutube) {
      var _poster = createElement('div', {
        "class": 'rtopVideoPosterImage' + (this._settings.fontAwesomeControlIcons ? ' hasFAIcons' : '')
      });

      var posterImage = createElement('img', {
        src: this._video.poster
      });

      _poster.append(posterImage);
    } // if controls arent ready yet, add them


    if (!this._controls) {
      this._controls = {};
    } // add the poster image as a click event and store in the controls obj


    this._controls = {
      modalPoster: {
        element: poster,
        events: {
          click: poster.addEventListener('click', function () {
            return controls.openModal.call(_this);
          }, true)
        }
      } // append poster

    };

    this._element.append(poster); // if close btn for modal, build that and add click event


    if (this._settings.showCloseBtn) {
      var close = buildFontAwesomeButton.call(this, 'closeVideo', 'far fa-times-circle');
      holder.append(close);
      this._controls.closeModal = {
        element: close,
        events: {
          click: close.addEventListener('click', function () {
            return controls.close.call(_this);
          }, true)
        }
      };
    }
  }
}
function buildControls() {
  var _this2 = this;

  // add the controls wrapper
  var vidControls = createElement('div', {
    "class": 'vidControls' + (this._settings.fontAwesomeControlIcons ? ' hasFAIcons' : '')
  });

  this._playerWrapper.append(vidControls); // hold all the controls


  if (!this._controls) {
    this._controls = {};
  } // add the video holder events (play/pause)


  this._controls.video = {
    element: this._playerWrapper.querySelector(".rtopVideoHolder"),
    events: {
      click: this._playerWrapper.querySelector(".rtopVideoHolder").addEventListener('click', function () {
        return controls.playPauseRepeat.call(_this2);
      }, true),
      mousemove: this._playerWrapper.querySelector(".rtopVideoHolder").addEventListener('mousemove', function () {
        return controls.videoMove.call(_this2);
      }, true),
      mouseout: this._playerWrapper.querySelector(".rtopVideoHolder").addEventListener('mouseout', function () {
        return controls.videoOut.call(_this2);
      }, true)
    }
  }; // if keyboard controls, add listener

  if (this._settings.keyboardControls) {
    this._controls.keyboard = {
      events: document.addEventListener('keyup', function (event) {
        return controls.keyboardControls.call(_this2, event);
      }, true)
    };
  } // if showPlayPauseBtn, build


  if (this._settings.showPlayPauseBtn) {
    buildPlayBtn.call(this);
  } else {
    // build a spacer to keep alignment
    addClass(vidControls, 'noPP');
    var pp = createElement('div', {
      className: 'controlBtn',
      id: 'playPauseHolder'
    });
    videoControls.append(pp);
  } // if scrubber, build


  if (this._settings.showScrubber) {
    buildProgressBar.call(this);
  } else {
    // build a spacer to keep alignment
    addClass(vidControls, 'noProgressBar');
    var spacer = createElement('div', {
      className: 'controlBtn',
      id: 'progressSpacer'
    });
    videoControls.append(spacer);
  } // if timer, build


  if (this._settings.showTimer) {
    buildTimer.call(this);
  } // if soundControl, build


  if (this._settings.showSoundControl) {
    buildSoundControl.call(this);
  } // if fullscreen, build


  if (this._settings.showFullScreen) {
    buildFullScreen.call(this);
  }

  if (this._settings.autoPlay) {
    controls.autoPlay.call(this);
  }
} // pause btn and event listener

function buildPauseBtn() {
  var _this3 = this;

  var controls$1 = this._playerWrapper.querySelector(".vidControls");

  addClass(controls$1, 'hasPP');
  var pp = buildFontAwesomeButton.call(this, 'playPause', 'far fa-pause-circle');
  prepend(controls$1, pp);
  this._controls.pause = {
    element: pp,
    events: {
      click: pp.addEventListener('click', function () {
        return controls.pause.call(_this3);
      }, true)
    },
    info: {
      event: 'pause'
    }
  };
} // play btn and event listener

function buildPlayBtn() {
  var _this4 = this;

  var controls$1 = this._playerWrapper.querySelector(".vidControls");

  addClass(controls$1, 'hasPP');
  var pp = buildFontAwesomeButton.call(this, 'playPause', 'far fa-play-circle');
  prepend(controls$1, pp);
  this._controls.play = {
    element: pp,
    events: {
      click: pp.addEventListener('click', function () {
        return controls.play.call(_this4);
      }, true)
    },
    info: {
      event: 'play'
    }
  };
} // progress bar/scrubber and event listeners

function buildProgressBar() {
  var _this5 = this;

  var controls$1 = this._playerWrapper.querySelector(".vidControls");

  addClass(controls$1, 'hasProgressBar');
  var holder = createElement('div', {
    "class": 'controlBtn',
    id: 'progressholder'
  });
  this._controls.progressholder = {
    element: holder,
    events: {
      click: holder.addEventListener('click', function (event) {
        return controls.progressClick.call(_this5, event);
      }, true),
      mousemove: holder.addEventListener('mousemove', function (event) {
        return controls.progressMove.call(_this5, event);
      }, true)
    }
  };
  var fullWidth = createElement('div', {
    id: 'fullvideoprogress'
  });
  var buffer = createElement('div', {
    id: 'buffered'
  });
  this._controls.buffered = {
    element: buffer
  };
  var progress = createElement('div', {
    id: 'progress'
  });
  this._controls.progress = {
    element: progress
  };
  var orb = createElement('div', {
    id: 'progressorb'
  });
  this._controls.progressorb = {
    element: orb
  };
  holder.append(fullWidth);
  holder.append(buffer);
  holder.append(progress);
  holder.append(orb);
  controls$1.append(holder);
} // timer btn and event listener

function buildTimer() {
  var controls = this._playerWrapper.querySelector(".vidControls");

  addClass(controls, 'hasTimer');
  var holder = createElement('div', {
    "class": 'controlBtn',
    id: 'timeholder'
  });
  var current = createElement('span', {
    id: 'currenttime'
  }, '00:00');
  var spacer = createElement('span', {}, ' / ');
  var total = createElement('span', {
    id: 'totaltime'
  }, '00:00');
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
} // sound controls and event listeners

function buildSoundControl() {
  var _this6 = this;

  var controls$1 = this._playerWrapper.querySelector(".vidControls");

  addClass(controls$1, 'hasSound');
  var parent = createElement('div', {
    "class": 'controlBtn',
    id: 'soundControl'
  });
  var bars = createElement('span', {
    "class": 'soundBars'
  });
  this._controls.volume = 1;
  Array(4).fill().map(function (_, i) {
    var bar = createElement('span', {
      "class": "soundBar active",
      "data-value": .25 * (i + 1)
    });
    bars.append(bar);
    _this6._controls['soundBar' + i] = {
      element: bar,
      events: {
        click: bar.addEventListener('click', function () {
          return controls.adjustVolume.call(_this6, bar);
        }, true)
      }
    };
  });
  parent.append(bars);
  controls$1.append(parent);
  buildSoundBtn.call(this);
} // sound (unmute) btn and event listener

function buildSoundBtn() {
  var _this7 = this;

  var icon = createElement('span', {
    "class": 'muteBtn' + (this._settings.fontAwesomeControlIcons ? ' FAIcon' : ' localAsset')
  });
  var btnIcon = createElement('i', {
    "class": 'fas fa-volume-up'
  });

  if (this._settings.fontAwesomeControlIcons) {
    icon.append(btnIcon);
  }

  this._controls.mute = {
    element: icon,
    events: {
      click: icon.addEventListener('click', function () {
        return controls.mute.call(_this7);
      }, true)
    }
  };
  prepend(this._playerWrapper.querySelector("#soundControl"), icon);
} // mute btn and event listener

function buildMuteBtn() {
  var _this8 = this;

  var icon = createElement('span', {
    "class": 'muteBtn isMuted' + (this._settings.fontAwesomeControlIcons ? ' FAIcon' : ' localAsset')
  });
  var btnIcon = createElement('i', {
    "class": 'fas fa-volume-mute'
  });

  if (this._settings.fontAwesomeControlIcons) {
    icon.append(btnIcon);
  }

  this._controls.mute = {
    element: icon,
    events: {
      click: icon.addEventListener('click', function () {
        return controls.mute.call(_this8);
      }, true)
    }
  };
  prepend(this._playerWrapper.querySelector("#soundControl"), icon);
} // fullscreen btn and event listener

function buildFullScreen() {
  var _this9 = this;

  var controls$1 = this._playerWrapper.querySelector(".vidControls");

  addClass(controls$1, 'hasFS');
  var fs = buildFontAwesomeButton.call(this, 'fullScreenBtn', 'fas fa-expand');
  controls$1.append(fs);
  this._controls.fullscreen = {
    element: fs,
    events: {
      click: fs.addEventListener('click', function () {
        return controls.fullscreen.call(_this9);
      }, true)
    }
  };
} // DRY for icon btns

function buildFontAwesomeButton($id, $icon) {
  var btn = createElement('div', {
    "class": "controlBtn",
    id: $id
  });
  var icon = createElement('span', {
    "class": this._settings.fontAwesomeControlIcons ? 'FAIcon' : 'localAsset'
  });
  var btnIcon = createElement('i', {
    "class": $icon
  });

  if (this._settings.fontAwesomeControlIcons) {
    icon.append(btnIcon);
  }

  btn.append(icon);
  return btn;
}

// pure javascript of jquery clone and extend
// make sure it exists
var getConstructor = function getConstructor(input) {
  return input !== null && typeof input !== 'undefined' ? input.constructor : null;
}; // jquery clone 


function clone(object) {
  return JSON.parse(JSON.stringify(object));
} // jquery extend

function extend() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  if (!sources.length) {
    return target;
  }

  var source = sources.shift();

  if (getConstructor(source) !== Object) {
    return target;
  }

  Object.keys(source).forEach(function (key) {
    if (getConstructor(source[key]) === Object) {
      if (!Object.keys(target).includes(key)) {
        Object.assign(target, _defineProperty({}, key, {}));
      }

      extend(target[key], source[key]);
    } else {
      Object.assign(target, _defineProperty({}, key, source[key]));
    }
  });
  return extend.apply(void 0, [target].concat(sources));
}

// trigger a custom event to listen to 

function listener(element, event, callback, bool) {
  var _this = this;

  event.split(' ').forEach(function (type) {
    if (_this._eventListeners && bool) {
      _this._eventListeners.push({
        element: element,
        type: type,
        callback: callback
      });
    }

    element[bool ? 'addEventListener' : 'removeEventListener'](type, function () {
      callback({
        event: type
      });
    }, {
      bubbles: true
    });
  });
} // jquery on

function on(element, events, callback) {
  listener.call(this, element, events, callback, true);
} // jquery off

function off(element, events, callback) {
  listener.call(this, element, events, callback, false);
} // unbind everythind on destroy

function unbindAll() {
  if (this._eventListeners) {
    this._eventListeners.forEach(function (item) {
      var element = item.element,
          type = item.type,
          callback = item.callback,
          options = item.options;
      element.removeEventListener(type, callback, options);
    });

    this._eventListeners = [];
  }
}

var VideoPlayer =
/*#__PURE__*/
function () {
  function VideoPlayer(target, options) {
    _classCallCheck(this, VideoPlayer);

    if (!target) {
      // if no target, stop and send warning;
      console.log('There was an error loading your video, please check documentation --> https://redtettemer.github.io/rtop-video-player/');
      return;
    } // keep hold of the target


    this._element = document.querySelector(target); // some housekeeping

    this._name = 'RTOP_VideoPlayer';
    this._version = config.version;
    this._updated = config.updated; // create the video object to hold all video info

    this._video = {}; // create an event listener array to hold them

    this._eventListeners = []; // extend settings with defaults

    this._settings = extend({}, defaults, VideoPlayer.settings, options || {}); // Setup video

    video.init.call(this); // build the wrapper everything in parent divs

    buildWrapper.call(this); // build some controls

    if (this._settings.showControls) {
      buildControls.call(this);
    } else if (!this._settings.showControls && this._settings.autoPlay) {
      if (!this._video.isVimeo && !this._video.isYoutube) {
        controls.autoPlay.call(this);
      }
    } // add class to remove play button and cursor


    if (!this._settings.showControls) {
      addClass(this._playerWrapper, 'noControls');
    } // clone for destroy


    this._original = this._element.cloneNode(true);
  } // public functions to control the video


  _createClass(VideoPlayer, [{
    key: "play",
    value: function play() {
      var _this = this;

      // if no video, return to avoid error
      if (!this._video.player) {
        return;
      } // add playing class


      addClass(this._playerWrapper, 'playing'); // remove paused class

      removeClass(this._playerWrapper, 'paused'); // remove the play button

      remove(this._controls.play.element); // build pause btn and add click events

      buildPauseBtn.call(this); // update progress if needed

      if (this._settings.showControls && (this._settings.showScrubber || this._settings.showTimer)) {
        var $that = this; // if no timers exist, create obj to hold them

        if (!this._timers) {
          this._timers = {};
        } // set interval to check progress


        this._timers._progress = setInterval(function () {
          controls.updateProgress.call($that);
        }, 100);
      } // if controls, start timer to hide


      if (this._settings.showControls) {
        // if motion timer, clear
        if (this._timers && this._timers._motion_timer) {
          clearTimeout(this._timers._motion_timer);
        } // if no timers exist, create obj to hold them


        if (!this._timers) {
          this._timers = {};
        } // create motion timer to hide the controls/overlay


        this._timers._motion_timer = setTimeout(function () {
          addClass(_this._playerWrapper, 'hideOverlay');
          addClass(_this._playerWrapper.querySelector(".vidControls"), 'hide');
        }, this._settings.controlsHoverSensitivity);
      } // actually play the video


      return this._video.player.play();
    }
  }, {
    key: "pause",
    value: function pause() {
      // if no video, return to avoid error
      if (!this._video.player) {
        return;
      } // add paused class


      addClass(this._playerWrapper, 'paused'); // remove playing class

      removeClass(this._playerWrapper, 'playing'); //remove the pause btn

      remove(this._controls.pause.element); // add the play button and attach click events

      buildPlayBtn.call(this); // pause the video

      this._video.player.pause();
    }
  }, {
    key: "stop",
    value: function stop() {
      // if no video, return to avoid error
      if (!this._video.player) {
        return;
      } // pause the video


      this.pause(); //  if controls, stop the progress interval and clear the motion timers

      if (this._settings.showControls) {
        if (this._settings.showScrubber || this._settings.showTimer) {
          clearInterval(this._timers._progress);
        }

        clearTimeout(this._timers._motion_timer); // hide the controls

        removeClass(this._playerWrapper, 'finished');
        removeClass(this._playerWrapper.querySelector(".vidControls"), 'hide');
      } // reset the player to beginning


      this._video.player.currentTime = 0;
    }
  }, {
    key: "restart",
    value: function restart() {
      // if no video, return to avoid error
      if (!this._video.player) {
        return;
      }

      if (this._settings.showControls) {
        // if pause button is up, remove it
        if (this._settings.showPlayPauseBtn) {
          remove(this._controls.pause.element);
        } //  if controls, stop the progress interval and clear the motion timers


        if (this._settings.showScrubber || this._settings.showTimer) {
          clearInterval(this._timers._progress);
        }

        clearTimeout(this._timers._motion_timer); // hide the controls

        removeClass(this._playerWrapper, 'finished');
        removeClass(this._playerWrapper.querySelector(".vidControls"), 'hide');
      } // reset the player to beginning


      this._video.player.currentTime = 0; // play the video again

      this.play();
    }
  }, {
    key: "goto",
    value: function goto(sec) {
      // if no video, return to avoid error
      if (!this._video.player) {
        return;
      } // seek video to requested time in seconds


      this._video.player.currentTime = sec;
    }
  }, {
    key: "mute",
    value: function mute() {
      var _this2 = this;

      // if no video, return to avoid error
      if (!this._video.player) {
        return;
      } // mute video


      this._video.player.muted = true; // set our mute flag

      this._controls.isMute = true; // remove the mute btn/icon

      remove(this._controls.mute.element); // build muted btn/icon

      buildMuteBtn.call(this); // remove the active class on all the sound bars

      Array(4).fill().map(function (_, i) {
        removeClass(_this2._controls['soundBar' + i].element, 'active');
      });
    }
  }, {
    key: "adjustVolume",
    value: function adjustVolume(val) {
      var _this3 = this;

      // if no video, return to avoid error
      if (!this._video.player) {
        return;
      } // check to make sure request volume great than or equal to 0 and less than or equal to 1


      var vol = val ? val : 1;
      var max = 1;
      var min = 0;
      vol = Number(vol);

      if (vol > max) {
        vol = max;
      }

      if (vol < min) {
        vol = min;
      } // if its muted, un mute as well


      if (this._controls.isMute) {
        this._video.player.muted = false;
        this._controls.isMute = false; // remove the mute btn/icon

        remove(this._controls.mute.element); // build the sound btn/icon

        buildSoundBtn.call(this);
      } // adjust the player volume


      this._video.player.volume = vol; // add active class for all the bars under the requested volume threshold, remove those above

      Array(4).fill().map(function (_, i) {
        if (Number(_this3._controls['soundBar' + i].element.getAttribute('data-value')) <= vol) {
          addClass(_this3._controls['soundBar' + i].element, 'active');
        } else {
          removeClass(_this3._controls['soundBar' + i].element, 'active');
        }
      }); // hold on to current volume

      this._controls.volume = vol;
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      // stop the video on close modal
      this.stop(); // remove the class showing the modal

      removeClass(this._modal, 'show');
    }
  }, {
    key: "on",
    value: function on$1(event, callback) {
      // allow for jquery like on event listeners on the video player
      on.call(this, this._video.player, event, callback);
    }
  }, {
    key: "off",
    value: function off$1(event, callback) {
      // allow jquery like off event listener
      off(this._elements, event, callback);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // if no video, return to avoid error
      if (!this._video.player) {
        return;
      } // pause the video


      this._video.player.pause(); // clear the timers


      if (this._timers) {
        if (this._settings.showControls && (this._settings.showScrubber || this._settings.showTimer)) {
          clearInterval(this._timers._progress);
        }

        if (this._settings.showControls) {
          clearTimeout(this._timers._motion_timer);
        }
      } // unbind all events


      unbindAll.call(this); // remove the Video Player items

      remove(document.querySelector('.rtopVideoPlayerWrapper')); // if the video tag was already there, add it back in

      if (!this._video.createTag) {
        video.createTag.call(this);
      }
    }
  }]);

  return VideoPlayer;
}();

VideoPlayer.settings = clone(defaults);
// 5) add youtube
// 6) SSR, maybe export the class then;

export default VideoPlayer;
