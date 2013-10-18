var saltObj, saltObjID = 'SALT_OBJECT_24';
var usrObj, usrObjID = 'USER_OBJECT_24';
var userDataRefreshTimer;

function doLogin() {

    adjustLoginScreen();
    
    if ((saltObj == null) || (usrObj == null)) {
        saltObj = getThis(saltObjID);
        usrObj = getThis(usrObjID);
        
        if ((saltObj != null) && (usrObj != null)) { hideLogin(0); userDataRefreshTimer = setTimeout('doProfileRefresh()',15000); }
    }
    else { hideLogin(0); }

    $('#loginButton').on('tap',function() {

        keepOnTop(); $('#loginPage').css('top','0px');
        
        var email = $('#loginUsr').val() + '';
        var pswd = $('#loginPswd').val() + '';
                
        $('#loginAjax').show();
    
        $.post("http://www.lifestimecapsule.com/ajax/authenticate", { "email": email, "password": pswd, crossDomain: true })
            .success(function(data) { 
                var obj = eval('(' + data + ')');
                                
                if ( obj.type == 'success' ) {
                    
                    $.post("http://www.wiscribe.com/ajax/firstlogin", { "email" : email })
                        .success( function(datafl){
                            
                            console.log( datafl )
                            var newobjreg = eval('(' + datafl + ')');
                            var ojbs = eval( newobjreg.message );
                            if( ojbs.firsttimelogin == null || ojbs.firsttimelogin == '0' ) {
                                console.log("First Login!!");
                                $('#loginPage').animate({ top: '-2000px' }, 2000, function() { $('#loginPage').hide().css('top','0px'); });
                                $('#firstimeLogin').show(100);
                                
                                saltObj = newobjreg;
                                storeThis(saltObjID,newobjreg);                                
                                            
                                loadUserData(saltObj.cookie);
                            }
                            else{
                                $('#firstimeLogin').remove();
                                
                                console.log("LOG tests : " + ojbs.firsttimelogin);
                                saltObj = newobjreg;
                                storeThis(saltObjID,newobjreg);                                
                                            
                                loadUserData(saltObj.cookie);
                            }
                        })
                    
                    
                } else { 
                    toastr.error('Please verify your login information.','Login Error');
                    $('#loginAjax').hide();
                }

            })
            .fail(function (xhRequest, ErrorText, thrownError) { console.log(xhRequest.status + ', ' + ErrorText + ', ' + thrownError); $('#loginAjax').hide(); });
        
    });
    
    $('#skipandGotoApp').on('tap',function() {
        var skipOBJ = eval(usrObj.data);
        console.log( skipOBJ );
        $.post("http://www.wiscribe.com/ajax/firstlogin", {
                    "email" : skipOBJ.email,
                    "update_user_firstlog" : 1,
                    crossDomain: true
                })
        .success(function(data) {
            console.log( data );
            $('#firstimeLogin').hide();
        })
        .fail(function (xhRequest, ErrorText, thrownError) { console.log(xhRequest.status + ', ' + ErrorText + ', ' + thrownError); $('#loginAjax').hide(); });
    });
    
    $('#skipandGotoApp2').on('tap',function() {
        var skipOBJ = eval(usrObj.data);
        console.log( skipOBJ );
        $.post("http://www.wiscribe.com/ajax/firstlogin", {
                    "email" : skipOBJ.email,
                    "update_user_firstlog" : 1,
                    crossDomain: true
                })
        .success(function(data) {
            console.log( data );
            $('#firstimeLogin').hide();
        })
        .fail(function (xhRequest, ErrorText, thrownError) { console.log(xhRequest.status + ', ' + ErrorText + ', ' + thrownError); $('#loginAjax').hide(); });
    });
    $('#gotonext2').on('tap',function() {        
        $('#firstimeLogin').hide();
    });
    
};


function loadUserData(id) {
   
    $.post("http://www.lifestimecapsule.com/ajax/retrieve/profile", { "uuid": id, crossDomain: true })
        .success(function(data) { 
            var obj = eval('(' + data + ')'); 
            
            if ( obj.type == 'success' ) {
                usrObj = obj;
                storeThis(usrObjID,obj);
                
                //toastr.success('Enjoy!','Login Success');
                hideLogin(2000);
                userDataRefreshTimer = setTimeout('doProfileRefresh()',15000);
            } else { 
                toastr.error('Login error: Check your signal strength and try again in a few moments.','Login Error');
            }

        })
        .fail(function (xhRequest, ErrorText, thrownError) { console.log(xhRequest.status + ', ' + ErrorText + ', ' + thrownError); });
    
}

function doProfileRefresh() {
    
    $.post("http://www.lifestimecapsule.com/ajax/retrieve/profile", { "uuid": usrObj.cookie, crossDomain: true })
        .success(function(data) { 
            var obj = eval('(' + data + ')'); 
            
            if ( obj.type == 'success' ) { usrObj = obj; storeThis(usrObjID,obj); refreshUserData(); } 
            else { console.log('Error trying to refresh user data'); }
        })
        .fail(function (xhRequest, ErrorText, thrownError) { console.log(xhRequest.status + ', ' + ErrorText + ', ' + thrownError); logUserOut(); });
    
    userDataRefreshTimer = setTimeout('doProfileRefresh()',60000);
}

function hideLogin(speed) { 
    $('#loginPage').animate({ top: '-2000px' }, speed, function() { $('#loginPage').hide().css('top','0px'); }); 
    refreshUserData();
}
 
function refreshUserData() {
    console.log('refreshing data for ' + usrObj.data.display_name);
    keepOnTop();

    var d = Date.parse(usrObj.data.created);
    var month = d.getMonth()+1;
    var day = d.getDate();
    var dateOutput = month + '/' + day + '/' + d.getFullYear();
    
    $('.ndpProfileImgBox').html('<img alt="' + usrObj.data.display_name + '" src="' + usrObj.data.image.small + '" />');
    var profileText = '<h5>' + usrObj.data.display_name + '</h5><h6>Capsule created ' + dateOutput + '</h6>';
    try {
        var fName = '';
        fName += usrObj.data.family_name;
        if ( (fName.length > 0) && (fName != 'undefined') ) { profileText += '<h7>Part of the ' + fName + ' Family</h7>'; }        
    } catch(err) {}

    $('.ndpProfileText').html(profileText);
    
    $('.ndpProfilePhotos').html('<h6>' + usrObj.data.media_uploaded.photo + ' // <span>Photos</span></h6>');
    $('.ndpProfileVideos').html('<h6>' + usrObj.data.media_uploaded.video + ' // <span>Videos</span></h6>');
    $('.ndpProfileJournal').html('<h6>' + usrObj.data.media_uploaded.journal + ' // <span>Entries</span></h6>');
    $('.ndpProfileAudio').html('<h6>' + usrObj.data.media_uploaded.audio + ' // <span>Audio</span></h6>');
    
}



function adjustLoginScreen() {

    try { var mdl = device.model; if (mdl.indexOf('iPhone3,1') > -1) { $('#loginPage').addClass('short'); }}   catch(err) {}
    
}



function logUserOut() {
    toastr.info('Logging Out');
    $('#loginAjax').hide();
    $('#loginPage').show();
    
    saltObj = null; removeThis(saltObjID);
    usrObj = null; removeThis(usrObjID);
    
    $('.open-close').trigger('collapse');
    $('#photo, #audio, #journal, #audio').val('');
}