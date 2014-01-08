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
        
        $('#recordAudioButton').on('tap',function() { that._captureAudio.apply(that,arguments);  });
     },   
        
    

	_captureAudio:function() {
		var that = this;
        
		navigator.device.capture.captureAudio(
            function() { that._captureSuccess.apply(that, arguments); }, 
            function() { audioApp._onFail.apply(that, arguments); }
        ,{
            limit:1,
            duration: 30
        });
	},    
    
	_captureSuccess:function(capturedFiles) {
		var that = this;
        
        that._captureCount = capturedFiles.length;
        that._captureArray = capturedFiles;
        
        var audioFile = that._captureArray[0].fullPath;
        console.log(audioFile);
        
        
	},    
    
    _onFail: function(error) {
        toastr.error('Failed! Error: ' + error.code);
    } 
    
    
}