
define([], function () {
    return {

        loadStream: function(stream) {
            // console.log('load stream', stream);
            if(stream.tvmUrl){
                streamsPanel.loadTVMSource(stream, function(tvmStream){
                    orangeHasPlayer.load(tvmStream.url, tvmStream.protData);
                })
            }else{    
                orangeHasPlayer.load(stream.url, stream.protData);
            }
        },

        getDuration: function() {
            return orangeHasPlayer.getDuration();
        },

        play: function() {
            orangeHasPlayer.play();
        },

        pause: function() {
            orangeHasPlayer.pause();
        },

        seek: function(pos, done) {
            var onSeeked = function() {
                    orangeHasPlayer.removeEventListener('seeked', onSeeked);
                    done(true);
                };

            orangeHasPlayer.addEventListener('seeked', onSeeked);
            orangeHasPlayer.seek(pos);
        },

        setTrickModeSpeed: function(speed){
            orangeHasPlayer.setTrickModeSpeed(speed);
        },

        getTrickModeSpeed: function(speed){
            return orangeHasPlayer.getTrickModeSpeed();
        },

        getVideoBitrates: function() {
            return orangeHasPlayer.getVideoBitrates();
        },

        waitForEvent: function (event, done) {
            var onEventHandler = function() {
                    orangeHasPlayer.removeEventListener(event, onEventHandler);
                    done(true);
                };

            orangeHasPlayer.addEventListener(event, onEventHandler);
        },

        getErrorCode: function (done) {
            var onError = function(error) {
                    orangeHasPlayer.removeEventListener('error', onError);
                    done(error.data.code);
                };
            orangeHasPlayer.addEventListener('error', onError);
        }
    };
});
