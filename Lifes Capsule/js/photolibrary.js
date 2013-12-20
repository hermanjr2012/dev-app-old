var getPhotoLibrary = {
    init: function(){
        
    },
    
    displayPhotoFromCamRoll: function() {
      var picSource = navigator.camera.PictureSourceType;
      picSource.PHOTOLIBRARY;
      //CameraRoll.getPhotos(this.showGallery,this.getPhotosURIFail); 
      CameraRoll.getPhotos(this.showGallery,this.getPhotosURIFail);          
    },
    
    showGallery: function(pic) {
      alert('pic');
    },
    
    getPhotosURIFail: function() {
      //todo
    }
};  

var CameraRoll = {
    getPhotos: function(cb, cf){
        
    }
} 