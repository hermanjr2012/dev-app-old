
var  _tmpFiles = [];

var galleryFileList = {
   
    
    init: function() {
        _tmpFiles = [];
    },
    getFileList: function(data) {
        _tmpFiles.push(data);
    },
    bufferFileList: function() {
         return _tmpFiles;      
    }
}







$(document).on('tap','.thumbnails-wrapper',function(e){

    var t = $(event.e);
    //console.log(e);
    if (t.is('input:checkbox')) {
        return;
    }
    var checkbox = $(this).find("input[type='checkbox']");
        checkbox.prop("checked", !checkbox.is(':checked'));
});



/* a tag wont accept tap so resort back to click */
$(document).on('click','#uploadselected',function(e){
     $("#gallery-list").each(function(i,div) {
              $(div).find('input:checked').each(function(i,el){
                  // alert($(el).attr('data-value'));
                  galleryFileList.getFileList($(el).attr('data-value'));
                 
          	  });
      });
    
    var tmp = galleryFileList.bufferFileList();
    if( tmp instanceof Array ){
        alert(galleryFileList.bufferFileList());
    }  
    
    
    /*reset array*/
    galleryFileList.init();
});


/* bind this div to change event */

$(document).bind("pagebeforechange",function(e,data){
	var toPage = data.toPage;

	if(typeof toPage === 'string') {
		var u = $.mobile.path.parseUrl(toPage);
		toPage = u.hash || '#' + u.pathname.substring(1);
    		if(toPage === '#photogallery')	 {
                
           
              var domParent = $('#gallery-list');  
                 CameraRoll.getPhotos(function(picdata){

                    var htmlString = '';
            		htmlString = htmlString + '<li><div class="thumbnails-wrapper">';
            		htmlString = htmlString + '	<input data-value="'+picdata+'" type="checkbox" name="checkbox-sel[]"  />';
            		htmlString = htmlString + '	<img src="data:image/jpeg;base64,'+picdata+'"/>';
            		htmlString = htmlString + '</div></li>';	
            		domParent.append(htmlString);  

                });   
                
    		}
	    }
    
	
});