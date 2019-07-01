function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var s=0;s<t.length;s++){var i=t[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,s){return t&&_defineProperties(e.prototype,t),s&&_defineProperties(e,s),e}function _defineProperty(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _iterableToArrayLimit(e,t){var s=[],i=!0,o=!1,r=void 0;try{for(var n,l=e[Symbol.iterator]();!(i=(n=l.next()).done)&&(s.push(n.value),!t||s.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{i||null==l.return||l.return()}finally{if(o)throw r}}return s}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}var defaults={src:"",poster:"",type:"",showControls:!0,showControlsOnHover:!0,controlsHoverSensitivity:3e3,showScrubber:!0,showTimer:!1,showPlayPauseBtn:!0,showSoundControl:!1,showFullScreen:!1,keyboardControls:!0,themeClass:"rtopTheme",fontAwesomeControlIcons:!0,autoPlay:!1,loop:!1,allowReplay:!0,playInModal:!1,showCloseBtn:!1,closeModalOnFinish:!1,gtmOptions:{}},config={version:"1.1.0",updated:"05.15.19",vimeo:{api:"https://player.vimeo.com/api/player.js"}};function wrap(e,t){var s=e.length?e:[e];Array.from(s).reverse().forEach(function(e,s){var i=s>0?t.cloneNode(!0):t,o=e.parentNode,r=e.nextSibling;i.appendChild(e),r?o.insertBefore(i,r):o.appendChild(i)})}function createElement(e,t,s){var i=document.createElement(e);return setAttributes(i,t),s&&""!==s&&(i.innerText=s),i}function setAttributes(e,t){t&&0!==Object.keys(t).length&&Object.entries(t).forEach(function(t){var s=_slicedToArray(t,2),i=s[0],o=s[1];return e.setAttribute(i,o)})}function prepend(e,t){e.insertBefore(t,e.children[0])}function remove(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function addClass(e,t){return e.classList.add(t),e.classList.contains(t)}function removeClass(e,t){return e.classList.remove(t),e.classList.contains(t)}function hasClass(e,t){return e.classList.contains(t)}function html(e,t){e.innerHTML=t}var commonjsGlobal="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function createCommonjsModule(e,t){return e(t={exports:{}},t.exports),t.exports}var loadjs_umd=createCommonjsModule(function(e,t){e.exports=function(){var e=function(){},t={},s={},i={};function o(e,t){if(e){var o=i[e];if(s[e]=t,o)for(;o.length;)o[0](e,t),o.splice(0,1)}}function r(t,s){t.call&&(t={success:t}),s.length?(t.error||e)(s):(t.success||e)(t)}function n(t,s,i,o){var r,l,a=document,c=i.async,d=(i.numRetries||0)+1,h=i.before||e,u=t.replace(/^(css|img)!/,"");o=o||0,/(^css!|\.css$)/.test(t)?((l=a.createElement("link")).rel="stylesheet",l.href=u,(r="hideFocus"in l)&&l.relList&&(r=0,l.rel="preload",l.as="style")):/(^img!|\.(png|gif|jpg|svg)$)/.test(t)?(l=a.createElement("img")).src=u:((l=a.createElement("script")).src=t,l.async=void 0===c||c),l.onload=l.onerror=l.onbeforeload=function(e){var a=e.type[0];if(r)try{l.sheet.cssText.length||(a="e")}catch(e){18!=e.code&&(a="e")}if("e"==a){if((o+=1)<d)return n(t,s,i,o)}else if("preload"==l.rel&&"style"==l.as)return l.rel="stylesheet";s(t,a,e.defaultPrevented)},!1!==h(t,l)&&a.head.appendChild(l)}function l(e,s,i){var l,a;if(s&&s.trim&&(l=s),a=(l?i:s)||{},l){if(l in t)throw"LoadJS";t[l]=!0}function c(t,s){!function(e,t,s){var i,o,r=(e=e.push?e:[e]).length,l=r,a=[];for(i=function(e,s,i){if("e"==s&&a.push(e),"b"==s){if(!i)return;a.push(e)}--r||t(a)},o=0;o<l;o++)n(e[o],i,s)}(e,function(e){r(a,e),t&&r({success:t,error:s},e),o(l,e)},a)}if(a.returnPromise)return new Promise(c);c()}return l.ready=function(e,t){return function(e,t){e=e.push?e:[e];var o,r,n,l=[],a=e.length,c=a;for(o=function(e,s){s.length&&l.push(e),--c||t(l)};a--;)r=e[a],(n=s[r])?o(r,n):(i[r]=i[r]||[]).push(o)}(e,function(e){r(t,e)}),l},l.done=function(e){o(e,[])},l.reset=function(){t={},s={},i={}},l.isDefined=function(e){return e in t},l}()});function generateRandomId(){return Math.random().toString(36).substr(2,12)}function timeFormat(e){return[Math.floor(e/60)%60,Math.floor(e%60)].map(function(e,t){return(e<10?"0":"")+e}).join(":")}function runPrefixMethod(e,t){for(var s,i,o=["webkit","moz","ms","o",""],r=0;r<o.length&&!e[s];){if(s=t,""==o[r]&&(s=s.substr(0,1).toLowerCase()+s.substr(1)),"undefined"!==(i=toType(e[s=o[r]+s])))return o=[o[r]],"function"===i?e[s]():e[s];r++}}function toType(e){return{}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function loadScript(e){return new Promise(function(t,s){loadjs_umd(e,{success:t,error:s})})}function checkTaging(e){if(void 0!==("undefined"==typeof dataLayer?"undefined":_typeof(dataLayer))){for(var t in dataLayer)if(dataLayer[t].event===e)return!0;return!1}return!0}function sendTag(e,t){dataLayer.push({type:t})}var controls={pause:function(){this.pause()},play:function(){this.play()},playPauseRepeat:function(){hasClass(this._playerWrapper,"playing")?this.pause():hasClass(this._playerWrapper,"finished")?this._settings.allowReplay&&this.restart():this.play()},videoMove:function(){this._settings.showControls&&hasClass(this._playerWrapper,"hideOverlay")&&(this._timers&&this._timers._motion_timer&&clearTimeout(this._timers._motion_timer),removeClass(this._playerWrapper,"hideOverlay"),removeClass(this._playerWrapper.querySelector(".vidControls"),"hide"))},videoOut:function(){var e=this;!this._video.player.paused&&this._settings.showControls&&(this._timers&&this._timers._motion_timer&&clearTimeout(this._timers._motion_timer),this._timers||(this._timers={}),this._timers._motion_timer=setTimeout(function(){addClass(e._playerWrapper,"hideOverlay"),addClass(e._playerWrapper.querySelector(".vidControls"),"hide")},this._settings.controlsHoverSensitivity))},progressClick:function(e){e.stopPropagation();var t=e.pageX-this._controls.progressholder.element.offsetLeft-this._playerWrapper.parentNode.parentNode.offsetLeft,s=this._controls.progressholder.element.offsetWidth;if(this._video.player)if(this._video.external){var i=this;this._video.player.getDuration().then(function(e){i.goto(t/s*e)})}else this.goto(t/s*this._video.player.duration)},progressMove:function(e){var t=this._playerWrapper.querySelector("#progressorb"),s=e.pageX-this._controls.progressholder.element.offsetLeft-this._playerWrapper.parentNode.parentNode.offsetLeft-t.offsetWidth/2,i=this._controls.progressholder.element.offsetWidth-t.offsetWidth/2;t.style.left=s>i?i:s+"px"},mute:function(){this._controls.isMute?this.adjustVolume(this._controls.volume):this.mute()},adjustVolume:function(e){this.adjustVolume(e.getAttribute("data-value"))},fullscreen:function(){this._controls.isFs?(this._controls.isFs=!1,runPrefixMethod(document,"CancelFullScreen")):(this._controls.isFs=!0,runPrefixMethod(this._playerWrapper,"RequestFullScreen"))},close:function(){this.close()},updateProgress:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this._video.player&&(this._settings.showTimer&&((this._video.player.currentTime||Object.keys(s).length>0)&&html(this._controls.time.current.element,timeFormat(Object.keys(s).length>0?s.seconds:this._video.player.currentTime)),(this._video.player.duration||Object.keys(t).length>0)&&html(this._controls.time.total.element,timeFormat(Object.keys(t).length>0?t.duration:this._video.player.duration))),this._settings.showScrubber&&((this._video.player.buffered||Object.keys(t).length>0)&&(this._controls.buffered.element.style.width=(Object.keys(t).length>0?100*s.percent:this._video.player.buffered.end(this._video.player.buffered.length-1)/this._video.player.duration*100)+"%"),(this._video.player.currentTime||Object.keys(s).length>0)&&(this._controls.progress.element.style.width=(Object.keys(s).length>0?100*s.percent:this._video.player.currentTime/this._video.player.duration*100)+"%")),Object.keys(this._settings.gtmOptions).length>0&&"undefined"!=typeof dataLayer&&Object.keys(this._settings.gtmOptions).map(function(t){Math.floor(Object.keys(s).length>0?s.percent:e._video._player.currentTime/e._video._player.duration*100)===parseFloat(e._settings.gtmOptions[t].time)&&(checkTaging(e._settings.gtmOptions[t].name)||sendTag(e._settings.gtmOptions[t].type,name))}),this._video.player.ended&&controls.videoEnded.call(this))},autoPlay:function(){var e=this;this._playerWrapper.addClass("playing"),this._video.player.muted=!0,this._video.player.volume=0,this._video.player.autoplay=!0,this._video.player.load(),this._settings.showControls&&(this._timers&&this._timers._motion_timer&&clearTimeout(this._timers._motion_timer),this._timers||(this._timers={}),this._timers._motion_timer=setTimeout(function(){addClass(e._playerWrapper,"hideOverlay"),addClass(e._playerWrapper.querySelector(".vidControls"),"hide")},this._settings.controlsHoverSensitivity))},openModal:function(){addClass(this._modal,"show")},keyboardControls:function(e){if(32===e.keyCode)return e.preventDefault(),e.stopPropagation(),void(hasClass(this._playerWrapper,"playing")?this.pause():hasClass(this._playerWrapper,"finished")?this._settings.allowReplay&&this.restart():this.play())},videoEnded:function(){if(removeClass(this._playerWrapper,"playing"),removeClass(this._playerWrapper,"pause"),removeClass(this._playerWrapper,"hideOverlay"),addClass(this._playerWrapper,this._settings.closeModalOnFinish?"closing":"finished"),addClass(this._playerWrapper.querySelector(".vidControls"),"hide"),this._timers&&(this._timers._progress&&clearInterval(this._timers._progress),this._timers._motion_timer&&clearTimeout(this._timers._motion_timer)),this._settings.loop)this.restart();else if(this._settings.closeModalOnFinish){var e=this;setTimeout(function(){e.stop(),removeClass(e._modal,"show")},300)}},getData:function(e){var t={event:e};switch(e){case"timeupdate":t.data={duration:{value:this._video.player.duration,type:"sec"},currentTime:{value:this._video.player.currentTime/this._video.player.duration*100,type:"sec"}};break;case"volumechange":t.data={volume:{value:this._controls.volume,type:"range 0 - 1"}};break;case"loadedmetadata":t.event="video loaded"}return t}};function buildWrapper(){var e=createElement("div",{class:"rtopVideoPlayerWrapper"}),t=createElement("div",{class:"rtopVideoHolder"+(this._settings.fontAwesomeControlIcons?" hasFAIcons":"")+(this._video.external?" externalPlayer":"")});wrap(this._video.player,t),this._playerWrapper=createElement("div",{class:"rtopVideoPlayer "+this._settings.themeClass+(this._settings.fontAwesomeControlIcons?" hasFA":"")+(this._video.external?" loading":"")}),this._playerWrapper.append(t),e.append(this._playerWrapper),this._settings.playInModal?buildModal.call(this,e):this._element.append(e)}function buildModal(e){var t=this;if(this._settings.playInModal){var s=createElement("div",{class:"rtopVideoModal",id:this._randomId+"_modal"}),i=createElement("div",{class:"videoModalHolder"});if(i.append(e),s.append(i),document.body&&document.body.append(s),this._modal=s,!this._video.isVimeo&&!this._video.isYoutube){var o=createElement("div",{class:"rtopVideoPosterImage"+(this._settings.fontAwesomeControlIcons?" hasFAIcons":"")}),r=createElement("img",{src:this._video.poster});o.append(r)}if(this._controls||(this._controls={}),this._controls={modalPoster:{element:poster,events:{click:poster.addEventListener("click",function(){return controls.openModal.call(t)},!0)}}},this._element.append(poster),this._settings.showCloseBtn){var n=buildFontAwesomeButton.call(this,"closeVideo","far fa-times-circle");i.append(n),this._controls.closeModal={element:n,events:{click:n.addEventListener("click",function(){return controls.close.call(t)},!0)}}}}}function buildControls(){var e=this,t=createElement("div",{class:"vidControls"+(this._settings.fontAwesomeControlIcons?" hasFAIcons":"")});if(this._playerWrapper.append(t),this._controls||(this._controls={}),this._controls.video={element:this._playerWrapper.querySelector(".rtopVideoHolder"),events:{click:this._playerWrapper.querySelector(".rtopVideoHolder").addEventListener("click",function(){return controls.playPauseRepeat.call(e)},!0),mousemove:this._playerWrapper.querySelector(".rtopVideoHolder").addEventListener("mousemove",function(){return controls.videoMove.call(e)},!0),mouseout:this._playerWrapper.querySelector(".rtopVideoHolder").addEventListener("mouseout",function(){return controls.videoOut.call(e)},!0)}},this._settings.keyboardControls&&(this._controls.keyboard={events:document.addEventListener("keyup",function(t){return controls.keyboardControls.call(e,t)},!0)}),this._settings.showPlayPauseBtn)buildPlayBtn.call(this);else{addClass(t,"noPP");var s=createElement("div",{className:"controlBtn",id:"playPauseHolder"});videoControls.append(s)}if(this._settings.showScrubber)buildProgressBar.call(this);else{addClass(t,"noProgressBar");var i=createElement("div",{className:"controlBtn",id:"progressSpacer"});videoControls.append(i)}this._settings.showTimer&&buildTimer.call(this),this._settings.showSoundControl&&buildSoundControl.call(this),this._settings.showFullScreen&&buildFullScreen.call(this),this._settings.autoPlay&&controls.autoPlay.call(this)}function buildPauseBtn(){var e=this,t=this._playerWrapper.querySelector(".vidControls");addClass(t,"hasPP");var s=buildFontAwesomeButton.call(this,"playPause","far fa-pause-circle");prepend(t,s),this._controls.pause={element:s,events:{click:s.addEventListener("click",function(){return controls.pause.call(e)},!0)},info:{event:"pause"}}}function buildPlayBtn(){var e=this,t=this._playerWrapper.querySelector(".vidControls");addClass(t,"hasPP");var s=buildFontAwesomeButton.call(this,"playPause","far fa-play-circle");prepend(t,s),this._controls.play={element:s,events:{click:s.addEventListener("click",function(){return controls.play.call(e)},!0)},info:{event:"play"}}}function buildProgressBar(){var e=this,t=this._playerWrapper.querySelector(".vidControls");addClass(t,"hasProgressBar");var s=createElement("div",{class:"controlBtn",id:"progressholder"});this._controls.progressholder={element:s,events:{click:s.addEventListener("click",function(t){return controls.progressClick.call(e,t)},!0),mousemove:s.addEventListener("mousemove",function(t){return controls.progressMove.call(e,t)},!0)}};var i=createElement("div",{id:"fullvideoprogress"}),o=createElement("div",{id:"buffered"});this._controls.buffered={element:o};var r=createElement("div",{id:"progress"});this._controls.progress={element:r};var n=createElement("div",{id:"progressorb"});this._controls.progressorb={element:n},s.append(i),s.append(o),s.append(r),s.append(n),t.append(s)}function buildTimer(){var e=this._playerWrapper.querySelector(".vidControls");addClass(e,"hasTimer");var t=createElement("div",{class:"controlBtn",id:"timeholder"}),s=createElement("span",{id:"currenttime"},"00:00"),i=createElement("span",{}," / "),o=createElement("span",{id:"totaltime"},"00:00");t.append(s),t.append(i),t.append(o),e.append(t),this._controls.time={current:{element:s},total:{element:totaltime}}}function buildSoundControl(){var e=this,t=this._playerWrapper.querySelector(".vidControls");addClass(t,"hasSound");var s=createElement("div",{class:"controlBtn",id:"soundControl"}),i=createElement("span",{class:"soundBars"});this._controls.volume=1,Array(4).fill().map(function(t,s){var o=createElement("span",{class:"soundBar active","data-value":.25*(s+1)});i.append(o),e._controls["soundBar"+s]={element:o,events:{click:o.addEventListener("click",function(){return controls.adjustVolume.call(e,o)},!0)}}}),s.append(i),t.append(s),buildSoundBtn.call(this)}function buildSoundBtn(){var e=this,t=createElement("span",{class:"muteBtn"+(this._settings.fontAwesomeControlIcons?" FAIcon":" localAsset")}),s=createElement("i",{class:"fas fa-volume-up"});this._settings.fontAwesomeControlIcons&&t.append(s),this._controls.mute={element:t,events:{click:t.addEventListener("click",function(){return controls.mute.call(e)},!0)}},prepend(this._playerWrapper.querySelector("#soundControl"),t)}function buildMuteBtn(){var e=this,t=createElement("span",{class:"muteBtn isMuted"+(this._settings.fontAwesomeControlIcons?" FAIcon":" localAsset")}),s=createElement("i",{class:"fas fa-volume-mute"});this._settings.fontAwesomeControlIcons&&t.append(s),this._controls.mute={element:t,events:{click:t.addEventListener("click",function(){return controls.mute.call(e)},!0)}},prepend(this._playerWrapper.querySelector("#soundControl"),t)}function buildFullScreen(){var e=this,t=this._playerWrapper.querySelector(".vidControls");addClass(t,"hasFS");var s=buildFontAwesomeButton.call(this,"fullScreenBtn","fas fa-expand");t.append(s),this._controls.fullscreen={element:s,events:{click:s.addEventListener("click",function(){return controls.fullscreen.call(e)},!0)}}}function buildFontAwesomeButton(e,t){var s=createElement("div",{class:"controlBtn",id:e}),i=createElement("span",{class:this._settings.fontAwesomeControlIcons?"FAIcon":"localAsset"}),o=createElement("i",{class:t});return this._settings.fontAwesomeControlIcons&&i.append(o),s.append(i),s}function trigger(e,t,s){e.dispatchEvent(new CustomEvent(t,{bubbles:!0,info:Object.assign({},s,{VideoPlayer:this,type:t})}))}function listener(e,t,s,i){var o=this;t.split(" ").forEach(function(t){o._eventListeners&&i&&o._eventListeners.push({element:e,type:t,callback:s}),e[i?"addEventListener":"removeEventListener"](t,function(){s(controls.getData.call(o,t))},{bubbles:!0})})}function on(e,t,s){listener.call(this,e,t,s,!0)}function off(e,t,s){listener.call(this,e,t,s,!1)}function unbindAll(){this._eventListeners&&(this._eventListeners.forEach(function(e){var t=e.element,s=e.type,i=e.callback,o=e.options;t.removeEventListener(s,i,o)}),this._eventListeners=[])}var vimeo={isVimeo:function(e){return/^https?:\/\/vimeo.com\/\d{0,9}(?=\b|\/)/.test(e)||/^https?:\/\/player.vimeo.com\/\d{0,9}(?=\b|\/)/.test(e)},loadVimeo:function(){var e=this;window.Vimeo?vimeo.ready.call(this):loadScript(config.vimeo.api).then(function(){vimeo.ready.call(e)}).catch(function(e){console.log("Vimeo SDK (player.js) failed to load",e)})},ready:function(){var e=createElement("iframe",{class:"vimeo"});setAttributes(e,{src:"https://player.vimeo.com/video/"+(this._settings.src.match(/^.*(vimeo.com\/|video\/)(\d+).*/)?RegExp.$2:this._settings.src)+"?controls=0",allowfullscreen:"",allowtransparency:"",allow:"autoplay",id:this._randomId});var t=createElement("div",{class:"rtopExternalPlayer"});t.append(e),this._element.append(t),this._video.player=t,buildWrapper.call(this),this._video.player=new window.Vimeo.Player(e),this._settings.loop&&this._video.player.setLoop(!0),removeClass(this._playerWrapper,"loading"),this._settings.showControls?buildControls.call(this):!this._settings.showControls&&this._settings.autoPlay&&controls.autoPlay.call(this),this._settings.showControls||addClass(this._playerWrapper,"noControls"),trigger.call(this,this._video.player,"play",{test:"test"}),this._video.player.on("play",function(){console.log("vimeo play")})}},youtube={isYoutube:function(e){return/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e)}},video={init:function(){var e=this._element.querySelector("video");this._randomId=generateRandomId(),e&&(this._video.player=e,this._video.src=e.getAttribute("src"),this._video.poster=e.getAttribute("poster"),this._video.type=e.getAttribute("type"),e.getAttribute("id")||setAttributes(e,_id)),this._element.getAttribute("data-video")&&(this._video.src=this._element.getAttribute("data-video"),this._video.poster=this._element.getAttribute("data-poster"),this._video.type=this._element.getAttribute("data-type"),this._video.createTag=!0),""!==this._settings.src&&(this._video.isVimeo=vimeo.isVimeo(this._settings.src),this._video.isYoutube=youtube.isYoutube(this._settings.src),this._video.isVimeo||this._video.isYoutube?this._video.external=!0:(this._video.createTag=!0,this._video.src=this._settings.src,this._video.poster=this._settings.poster,this._video.type=this._settings.src.type)),this._video.src||this._video.external?(this._video.isVimeo&&vimeo.loadVimeo.call(this),this._video.isYoutube&&youtube.loadYoutube.call(this),this._video.createTag?video.createTag.call(this):this._video.external||video.videoReady.call(this)):console.log("There was an error loading your video, please check documentation --\x3e https://redtettemer.github.io/rtop-video-player/")},createTag:function(){var e=createElement("source",{src:this._video.src,type:this._video.type}),t=createElement("video",{src:this._video.src,poster:this._video.poster,type:this._video.type,playsinline:!0,id:this._randomId});t.append(e),this._element.append(t),this._video.player=t,video.videoReady.call(this)},videoReady:function(){buildWrapper.call(this),this._settings.showControls?buildControls.call(this):!this._settings.showControls&&this._settings.autoPlay&&(this._video.isVimeo||this._video.isYoutube||controls.autoPlay.call(this)),this._settings.showControls||addClass(this._playerWrapper,"noControls")}},getConstructor=function(e){return null!=e?e.constructor:null};function clone(e){return JSON.parse(JSON.stringify(e))}function extend(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length,s=new Array(t>1?t-1:0),i=1;i<t;i++)s[i-1]=arguments[i];if(!s.length)return e;var o=s.shift();return getConstructor(o)!==Object?e:(Object.keys(o).forEach(function(t){getConstructor(o[t])===Object?(Object.keys(e).includes(t)||Object.assign(e,_defineProperty({},t,{})),extend(e[t],o[t])):Object.assign(e,_defineProperty({},t,o[t]))}),extend.apply(void 0,[e].concat(s)))}var VideoPlayer=function(){function e(t,s){_classCallCheck(this,e),t?(this._element=document.querySelector(t),this._name="RTOP_VideoPlayer",this._version=config.version,this._updated=config.updated,this._video={},this._eventListeners=[],this._settings=extend({},defaults,e.settings,s||{}),this._original=this._element.cloneNode(!0),video.init.call(this),trigger.call(this,this._video.player,"custom")):console.log("There was an error loading your video, please check documentation --\x3e https://redtettemer.github.io/rtop-video-player/")}return _createClass(e,[{key:"play",value:function(){var e=this;if(this._video.player){if(addClass(this._playerWrapper,"playing"),removeClass(this._playerWrapper,"paused"),remove(this._controls.play.element),buildPauseBtn.call(this),this._settings.showControls&&(this._settings.showScrubber||this._settings.showTimer)){var t=this;this._timers||(this._timers={}),this._timers._progress=setInterval(function(){t._video.external?(t._video.player.on("progress",function(e){controls.updateProgress.call(t,e,{})}),t._video.player.on("timeupdate",function(e){controls.updateProgress.call(t,{},e)})):controls.updateProgress.call(t)},100)}return this._settings.showControls&&(this._timers&&this._timers._motion_timer&&clearTimeout(this._timers._motion_timer),this._timers||(this._timers={}),this._timers._motion_timer=setTimeout(function(){addClass(e._playerWrapper,"hideOverlay"),addClass(e._playerWrapper.querySelector(".vidControls"),"hide")},this._settings.controlsHoverSensitivity)),this._video.player.play()}}},{key:"pause",value:function(){this._video.player&&(addClass(this._playerWrapper,"paused"),removeClass(this._playerWrapper,"playing"),remove(this._controls.pause.element),buildPlayBtn.call(this),this._video.player.pause())}},{key:"stop",value:function(){this._video.player&&(this.pause(),this._settings.showControls&&((this._settings.showScrubber||this._settings.showTimer)&&clearInterval(this._timers._progress),clearTimeout(this._timers._motion_timer),removeClass(this._playerWrapper,"finished"),removeClass(this._playerWrapper.querySelector(".vidControls"),"hide")),this._video.player.currentTime=0)}},{key:"restart",value:function(){this._video.player&&(this._settings.showControls&&(this._settings.showPlayPauseBtn&&remove(this._controls.pause.element),(this._settings.showScrubber||this._settings.showTimer)&&clearInterval(this._timers._progress),clearTimeout(this._timers._motion_timer),removeClass(this._playerWrapper,"finished"),removeClass(this._playerWrapper.querySelector(".vidControls"),"hide")),this._video.player.currentTime=0,this.play())}},{key:"goto",value:function(e){this._video.player&&(this._video.external?this._video.player.setCurrentTime(e):this._video.player.currentTime=e)}},{key:"mute",value:function(){var e=this;this._video.player&&(this._video.external?this._video.player.setVolume(0):this._video.player.muted=!0,this._controls.isMute=!0,remove(this._controls.mute.element),buildMuteBtn.call(this),Array(4).fill().map(function(t,s){removeClass(e._controls["soundBar"+s].element,"active")}))}},{key:"adjustVolume",value:function(e){var t=this;if(this._video.player){var s=e||1;(s=Number(s))>1&&(s=1),s<0&&(s=0),this._controls.isMute&&(this._video.player.muted=!1,this._controls.isMute=!1,remove(this._controls.mute.element),buildSoundBtn.call(this)),this._video.external?this._video.player.setVolume(s):this._video.player.volume=s,Array(4).fill().map(function(e,i){Number(t._controls["soundBar"+i].element.getAttribute("data-value"))<=s?addClass(t._controls["soundBar"+i].element,"active"):removeClass(t._controls["soundBar"+i].element,"active")}),this._controls.volume=s}}},{key:"closeModal",value:function(){this.stop(),removeClass(this._modal,"show")}},{key:"on",value:function(e,t){this._video.player&&on.call(this,this._video.player,e,t)}},{key:"off",value:function(e,t){this._video.player&&off(this._elements,e,t)}},{key:"destroy",value:function(){this._video.player&&(this._video.player.pause(),this._timers&&(this._settings.showControls&&(this._settings.showScrubber||this._settings.showTimer)&&clearInterval(this._timers._progress),this._settings.showControls&&clearTimeout(this._timers._motion_timer)),unbindAll.call(this),remove(document.querySelector(".rtopVideoPlayerWrapper")),this._video.createTag||video.createTag.call(this))}}]),e}();VideoPlayer.settings=clone(defaults);