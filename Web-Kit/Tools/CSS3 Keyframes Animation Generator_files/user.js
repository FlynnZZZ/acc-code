jQuery(document).ready(function(){
  initLoginLink();
  initUserActions();
});

var userCurrentAnimationId;
function initUserActions(){

  jQuery('#save-as-animation-lnk').click(function(e){
    e.preventDefault();
    userSaveAsDialog();
    return false;
  });
  
  jQuery('#save-animation-lnk').click(function(e){
     e.preventDefault();
     var json = getCurrentAnimationJson();
     
     if(!userCurrentAnimationId){
        userSaveAsDialog();
     }
     else{
        jQuery.ajax({url: '/actions/user-save-animation.php', data: {project_id: userCurrentAnimationId, json: json }, success: function(data){
             userCurrentAnimationId = parseInt(data);
             alert('Animation has been saved');
          } 
        
        });
     }
     
     return false;
  });
  
  jQuery('#my-animations-lnk').click(function(e){
      e.preventDefault();
      
      var lnk = jQuery(this);
      
      jQuery('#examples-fader').show();
      jQuery('#user-popup-content').empty();
      jQuery('#user-popup').show();
      
      jQuery.ajax({ url: lnk.attr('href'), success: function(data){
          jQuery('#user-popup-content').append(data);
          
          initUserProjectsLinks();
          
        } 
      });
      
      return false;
  });
}

function userSaveAsDialog(){
  var animationName = prompt("Please enter animation name", "Animation name");
  var json = getCurrentAnimationJson();
        
        jQuery.ajax({url: '/actions/user-save-animation.php', data: {name: animationName, json: json }, success: function(data){
             userCurrentAnimationId = parseInt(data);
             alert('Animation has been saved');
          } 
        
        });

}

function initUserProjectsLinks(){

   jQuery('.user-animation-load-lnk').click(function(e){
            e.preventDefault();
            var projectLnk = jQuery(this);
            
            jQuery.ajax({url: projectLnk.attr('href'), success: function(data){
                 var json = JSON.parse(data);
                 if(json)
                   loadSketch(json);
                   
                 userCurrentAnimationId = parseInt( projectLnk.attr('data-id') );   
              }
            });
            
            
            jQuery('#examples-fader').hide();
            jQuery('#user-popup').hide();
            
            return false;
          });

   jQuery('.user-animation-remove-lnk').click(function(e){
            e.preventDefault();
            var projectRemoveLnk = jQuery(this);
            jQuery.ajax({url: projectRemoveLnk.attr('href'), success: function(data){
              projectRemoveLnk.parent().remove();
            }
            
            });
            
            return false;
            
   });                     
    
}


function getCurrentAnimationJson(){
    var json = {};
    json.settings = {};
    
    json.settings.duration = jQuery('#pa-duration').val();
    json.settings.iterationCount = jQuery('#pa-iteration-count').val();
    json.settings.easeFunction = jQuery('#pa-timing-function').val();
    json.settings.transformPoint = jQuery('#pa-transform-origin').val();
    //json.settings.transformPoint
    json.settings.preserveFillMode = jQuery('#pf-animation-fill-mode').prop('checked');
    
    json.frames = frameMarkers;
    return JSON.stringify(json);
}

function initLoginLink(){
  jQuery('#login-lnk').click(function(e){
      e.preventDefault();
      
      var lnk = jQuery(this);
      
      jQuery('#examples-fader').show();
      jQuery('#user-popup').show();
      
      jQuery.ajax({ url: lnk.attr('href'), success: function(data){
          jQuery('#user-popup-content').append(data);
        } 
      });
      
      
      
      
      return false;
  });
  
  jQuery('#user-popup-close,#examples-fader').click(function(e){
    
    jQuery('#examples-fader').hide();
    jQuery('#user-popup').hide();
    jQuery('#user-popup-content').empty();
  
    return false;
  });
}