function readyRecordAudio() {
    
    recordaudioApp = new recordaudioApp();
    recordaudioApp.run();    
    
}

function recordaudioApp(){}

recordaudioApp.prototype={
    
    _captureCount: 0,
    _captureArray: null,     

    run: function(){
        var that=this;
        $('#recordAudioButton').on('tap',function() { that._recordeAudio.apply(that,arguments);  });
    },

    _recordeAudio:function() {
		var src = "myrecording.mp3";
        var mediaRec = new Media(src, onSuccess, onError);

        // Record audio
        mediaRec.startRecord();

        // Stop recording after 10 sec
        var recTime = 0;
        var recInterval = setInterval(function() {
            recTime = recTime + 1;
            setAudioPosition(recTime + " sec");
            if (recTime >= 10) {
                clearInterval(recInterval);
                mediaRec.stopRecord();
            }
        }, 1000);
	}
    
}