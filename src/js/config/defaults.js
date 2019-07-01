// RTOP Video Player Default options

const defaults = {
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

export default defaults;