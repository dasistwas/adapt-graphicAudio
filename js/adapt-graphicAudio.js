/**
 * A clickable graphic (based on adapt-contrib-graphic) that plays audio when the graphic is clicked.
 * Clicking the graphic during playback will pause the audio, clicking again will restart.
 * If audio playback is interrupted by another media component (or another instance of this component on the same page),
 * the audio will stop and return the playhead back to 0.
 */
define([
    'core/js/adapt',
    'core/js/views/componentView'
], function(Adapt, ComponentView) {

    var GraphicAudio = ComponentView.extend({

        audio: null,
        isPlaying: false,

        events:  {
            'click img': 'onImageClicked'
        },

        preRender: function() {
            this.listenTo(Adapt, {
                'device:changed': this.resizeImage,
                'media:stop': this.onMediaStop
            });

            _.bindAll(this, 'onAudioEnded', 'setReadyStatus');

            this.checkIfResetOnRevisit();
        },

        postRender: function() {
            this.resizeImage(Adapt.device.screenSize, true);
        },

        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },

        preRemove: function() {
            if (this.isPlaying) {
                this.pauseAudio();
            }

            if(this.audio !== null) {
                this.audio.removeEventListener('ended', this.onAudioEnded);
                this.audio = null;
            }

            ComponentView.prototype.preRemove.apply(this, arguments);
        },

        resizeImage: function(width, setupInView) {
            var imageWidth = width === 'medium' ? 'small' : width;
            var imageSrc = (this.model.get('_graphic')) ? this.model.get('_graphic')[imageWidth] : '';

            this.$('.graphic-widget img').attr('src', imageSrc);

            this.$('.graphic-widget').imageready(this.setReadyStatus);
        },

        playAudio: function() {
            if(this.audio === null) {
                this.audio = new Audio();
                this.audio.src = this.model.get('_audio');
                this.audio.addEventListener('ended', this.onAudioEnded);
                this.setCompletionStatus();
            }

            this.audio.play();

            this.isPlaying = true;

            this.$('.graphic-widget').removeClass('not-playing').addClass('playing');
            
            // stop any other media on the page from playing
            Adapt.trigger("media:stop", this);
        },

        pauseAudio: function(sendBackToStart) {
            this.audio.pause();

            this.isPlaying = false;

            if(sendBackToStart) {
                this.audio.currentTime = 0;
            }

            this.$('.graphic-widget').removeClass('playing').addClass('not-playing');
        },

        onAudioEnded: function(event) {
            this.$('.graphic-widget').removeClass('playing').addClass('not-playing');

            this.isPlaying = false;
        },

        onImageClicked: function(event) {
            if (event) event.preventDefault();

            if (this.isPlaying) {
                this.pauseAudio();
                return;
            }

            this.playAudio();
        },
        
        onMediaStop: function(view) {
            // Make sure this view isn't triggering media:stop
            if (view && view.cid === this.cid) return;

            if(!this.isPlaying) return;

            this.pauseAudio(true);// since we were interrupted by another piece of media, send playhead back to 0
        }

    }, {
        template: "graphicAudio"
    });

    Adapt.register('graphicaudio', GraphicAudio);

    return GraphicAudio;

});
