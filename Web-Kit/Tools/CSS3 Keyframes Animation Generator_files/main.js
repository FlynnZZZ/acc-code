var markerCanvasWidth = 12;
var markerCanvasHeight = 12;
var frameMarkers;
var markersLastId = 1;
var currentMark;
var cssAnimationElement;
var currentTime = 0;
var cssAnimationDelayElement;
var animationPreviewInProgress = false;
var animationDuration;

var defaultCSSProperties = {
  'left' : 0,
  'top' : 0,
  'opacity' : 1,
  'rotate' : 0,
  'scaleX' : 1,
  'scaleY' : 1,
  'skewX' : 0,
  'skewY' : 0
};

jQuery(document).ready(function(){
  initFrameMarker();
	initTimeLine();
  drawTimeLineNicks();

	initButtons();
	initPropertyFields();

 jQuery('#frame-mark-start,#frame-mark-end').attr({ width: markerCanvasWidth, height: markerCanvasHeight });
  
  drawTriangle( jQuery('#frame-mark-start') );
  drawTriangle( jQuery('#frame-mark-end'));

  initTimeLineChecker();
  
  initShorcuts();

  initControls();

  initPreviewRectangle();
  initTransformSelect();
  initKeyFrameSwitchers();
  //initGenerateCodeTextarea();
  initKeyframesNav();
  initAcardion();
  initPreviewArea();
  initBrowserCheckboxes();
  updateCodeArea();
  initRotationOriginController();
  
  initExamples();
  
  loadSketch(caBasicSketch);
  updateCodeArea();
});

function initRotationOriginController(){
  jQuery('.roi-point').click(function(){
    var rPointElement = jQuery(this);
    jQuery('.roi-point').removeClass('active');
    rPointElement.addClass('active');
    jQuery('#pa-transform-origin').val( rPointElement.attr('data-value') );
    handleJsTimePosition();
    updateCodeArea();

  });
}

function initBrowserCheckboxes(){
  jQuery('#browser-checkboxes input').change(function(){
    updateCodeArea();
  });
}

function initPreviewArea(){

  jQuery( "#preview-area" ).resizable();

  jQuery('#preview-area').mouseenter(function(){
    jQuery(window).bind('keydown', previewAreaKeyDownHandle);
  });

  jQuery('#preview-area').mouseleave(function(){
   jQuery(window).unbind('keydown', previewAreaKeyDownHandle);
  });
}

function previewAreaKeyDownHandle(e){
  // move left
  if( e.keyCode == 37)
     updatePreviewStatesByPositionDelta({left: -1 });
  // move right
  else if( e.keyCode == 39)
     updatePreviewStatesByPositionDelta({left: 1 });
  // move top
  else if( e.keyCode == 38)
     updatePreviewStatesByPositionDelta({top: -1 });
  // move bottom
  else if( e.keyCode == 40)
     updatePreviewStatesByPositionDelta({top: 1 });
  e.preventDefault();
  return false;
}

function updatePreviewStatesByPositionDelta( deltaData){
  checkCurrentMarkOnTimeline();

  if(!currentMark)
    return;
  var previewRectagnle = jQuery('#rectangle2');
  var position = previewRectagnle.position();
  
  if(typeof deltaData.left != 'undefined'){
    var leftPosition = position.left + deltaData.left;
    currentMark.properties.left = leftPosition;
    previewRectagnle.css('left', leftPosition);
    jQuery('#pf-left').val(leftPosition);
    jQuery('#pf-left').trigger('value_update');
  }

  if(typeof deltaData.top != 'undefined'){
    var topPosition = position.top + deltaData.top;
    currentMark.properties.top = topPosition;
    previewRectagnle.css('top', topPosition);
    jQuery('#pf-top').val(topPosition);
    jQuery('#pf-top').trigger('value_update');
    
  }


  updateKeyFrameSwichers();
}

function initAcardion(){
   jQuery('.acardion-block-title').click(function(){
     var block = jQuery(this).parent();
     var content = block.find('.acardion-block-content,.manage-box-block');
     if(block.hasClass('closed')){
        block.removeClass('closed');
        content.slideDown();
     }
     else{
        block.addClass('closed');
        content.slideUp();
     }
     
   });
}

/*
function initGenerateCodeTextarea(){
  jQuery('#generated-code-copy-btn').click(function(){
   

  });

   

}
*/

function drawTimeLineNicks(){
  jQuery('#timeline-checker .timeline-nick').remove();
  var duration = Math.ceil(parseFloat( jQuery('#pa-duration').val() ));
  var timelineWidth = jQuery('#timeline-checker').width();

  var nickRange = timelineWidth / duration * 0.5;
  var nicksCount = duration * 2 + 1;

  for(var i = 0; i < nicksCount; i++){
    var newNick = jQuery('<label>');
    newNick.addClass('timeline-nick');
    if(i % 2 == 0)
      newNick.addClass('timeline-nick-l');
    newNick.css('left', i * nickRange);
    jQuery('#timeline-checker').append(newNick);
  }

}

function initKeyFrameSwitchers(){
  jQuery('.keyframe-switcher').click(function(){
    var switcher = jQuery(this);
    if(switcher.hasClass('active') ){
      
      if(currentMark && currentMark.markerId != 'start'){
          switcher.removeClass('active');
          currentMark.properties[ switcher.attr('property') ] = undefined;
          handleTimeSlider();
      }
    }
    else{
      switcher.addClass('active');
      if(currentMark)
        currentMark.properties[ switcher.attr('property') ] = jQuery('#pf-' + switcher.attr('property') ).val();
    }

    return false;
  });
}

function initTransformSelect(){
  
  // for scaling
  var middleLeftMarker = jQuery('<span>').addClass('sg-marker sg-middle-left-marker');
  var middleRightMarker = jQuery('<span>').addClass('sg-marker sg-middle-right-marker');
  var middleTopMarker = jQuery('<span>').addClass('sg-marker sg-middle-top-marker');
  var middleBottomMarker = jQuery('<span>').addClass('sg-marker sg-middle-bottom-marker');

  // for rotation
  var leftTopMarker = jQuery('<span>').addClass('sg-marker sg-left-top-marker');
  var rightBottomMarker = jQuery('<span>').addClass('sg-marker sg-right-bottom-marker');

  var container = jQuery('#rectangle2');
  container.append( middleLeftMarker );
  container.append( middleRightMarker );
  container.append( middleTopMarker );
  container.append( middleBottomMarker );

  container.append( leftTopMarker );
  container.append( rightBottomMarker );

  
  middleLeftMarker.css({ top: container.height() * 0.5 - middleLeftMarker.height() * 0.5,  left: - middleLeftMarker.width() * 0.5 });
  middleRightMarker.css({ top: container.height() * 0.5 - middleLeftMarker.height() * 0.5,  right: - middleLeftMarker.width() * 0.5 });
  middleTopMarker.css({ left: container.width() * 0.5 - middleLeftMarker.width() * 0.5,  top: - middleLeftMarker.height() * 0.5 });
  middleBottomMarker.css({ left: container.width() * 0.5 - middleLeftMarker.width() * 0.5,  bottom: - middleLeftMarker.height() * 0.5 });

  leftTopMarker.css({ left:  - leftTopMarker.width() * 0.5,  top: - leftTopMarker.height() * 0.5 });
  rightBottomMarker.css({ right:  - rightBottomMarker.width() * 0.5,  bottom: - rightBottomMarker.height() * 0.5 });

  middleLeftMarker.mousedown(function(e){
      startMarkerScaling(1, 'scaleX', 'clientX', e );
  });

  middleRightMarker.mousedown(function(e){
      startMarkerScaling(-1, 'scaleX', 'clientX', e );
  });

  middleTopMarker.mousedown(function(e){
      startMarkerScaling(1, 'scaleY', 'clientY', e );
  });

  middleBottomMarker.mousedown(function(e){
      startMarkerScaling(-1, 'scaleY', 'clientY', e );
  });

  leftTopMarker.mousedown(function(e){
      startMarkerRotation(e, container);
  });

  rightBottomMarker.mousedown(function(e){
      startMarkerRotation(e, container);
  });

}

// rotation
var markerRotationVector;
var markerContainerCenterX;
var markerContainerCenterY

function startMarkerRotation(mEvent, container){

  markerContainerCenterX = container.offset().left + container.width() * 0.5;
  markerContainerCenterY = container.offset().top + container.height() * 0.5;
  
  var vX = mEvent.clientX - markerContainerCenterX;
  var vY = mEvent.clientY - markerContainerCenterY;

  markerRotationVector = normalizeVector( {x: vX, y: vY} );
  
  jQuery(window).bind('mousemove', markerWindowMouseMoveRotate);
  jQuery(window).bind('mouseup', markerWindowMouseUpRotate);
}

function markerWindowMouseMoveRotate(e){
  var vX = e.clientX - markerContainerCenterX;
  var vY = e.clientY - markerContainerCenterY;

  var newMarkerRotationVector = normalizeVector( {x: vX, y: vY} );
  var deltaAngle = vectorsAngle(newMarkerRotationVector, markerRotationVector) ;
  markerRotationVector = newMarkerRotationVector;

  checkCurrentMarkOnTimeline();

  if(currentMark){
    
    if(currentMark.properties.rotate == undefined)
      currentMark.properties.rotate = jQuery('#pf-rotate').val();
    
    
    currentMark.properties.rotate =  Math.round(currentMark.properties.rotate + deltaAngle);

    jQuery('#pf-rotate').val(currentMark.properties.rotate );//.change();
    
    handleTimeSlider();
    updateCodeArea();
  }

}

function vectorsAngle(v1, v2){
  var perDot = v1.x * v2.x + v1.y * v2.y;
  var dot = getVectorLength(v1) * getVectorLength(v2);
  var cosA = perDot / dot;
  
  var angle =  - 180/Math.PI * Math.atan2( v1.x*v2.y-v1.y*v2.x , v1.x*v2.x+v1.y*v2.y );
  return angle;
  
  // optimize ???
  /*var signed_angle = (Math.atan2(v1.y,v1.x) - Math.atan2(v2.y,v2.x) ) * 180 / Math.PI;
  console.log( 's ' + signed_angle + ' ' + angle);
  return signed_angle;
  */
  
}

function markerWindowMouseUpRotate(){
  jQuery(window).unbind('mousemove', markerWindowMouseMoveRotate);
  jQuery(window).unbind('mouseup', markerWindowMouseUpRotate);  
}

function getVectorLength(vector){
  var vectorLength = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  return vectorLength;
}

function normalizeVector(vector){
  var vectorLength = getVectorLength(vector);
  var newVector = {};
  if(vectorLength != 0){
    newVector.x = vector.x /  vectorLength;
    newVector.y = vector.y /  vectorLength;
  }

  return newVector;

}

// scaling
var markerPrevClientAxisPos;
var markerScaleAxisName;
var markerClientAxisName;
var markerSlideDirection = 1;


function startMarkerScaling(direction, scaleXName, clientAxisName, mEvent){
  markerSlideDirection = direction;
  markerScaleAxisName = scaleXName;
  markerClientAxisName = clientAxisName;
  markerPrevClientAxisPos = mEvent[markerClientAxisName];
  jQuery(window).bind('mousemove', markerWindowMouseMoveScale);
  jQuery(window).bind('mouseup', markerWindowMouseUpScale);
}


function markerWindowMouseMoveScale(e){
  var step = 0.01;
  var delta =  (  markerPrevClientAxisPos - e[markerClientAxisName] ) * step * markerSlideDirection;
  markerPrevClientAxisPos = e[markerClientAxisName];

  //if( currentMark.properties.scaleX == undefined)
  //  currentMark.properties.scaleX = 1;
  checkCurrentMarkOnTimeline();
  
  if(currentMark){
    if(currentMark.properties[markerScaleAxisName] == undefined)
      currentMark.properties[markerScaleAxisName] = parseFloat(jQuery('#pf-' + markerScaleAxisName).val());

    currentMark.properties[markerScaleAxisName] += delta;
  }
  //markerPrevClientX = e.clientX;
  jQuery('#pf-'+ markerScaleAxisName).val(currentMark.properties[markerScaleAxisName] );//.change();
  //updateKeyFrameSwichers();
  handleTimeSlider();
  updateCodeArea();
}

function markerWindowMouseUpScale(e){
   jQuery(window).unbind('mousemove', markerWindowMouseMoveScale);
   jQuery(window).unbind('mouseup', markerWindowMouseUpScale);
}

function initControls(){
  jQuery('#pf-rotate').inputSlider({step:1, showArrows: true});
  jQuery('#pf-left').inputSlider({step:1, showArrows: true});

  jQuery('#pf-opacity').inputSlider({step:0.01, showArrows: true, maxValue : 1, minValue: 0});
  
  jQuery('#pf-top').inputSlider({step:1, showArrows: true});
  jQuery('#pf-scaleX').inputSlider({step:0.01, showArrows: true});
  jQuery('#pf-scaleY').inputSlider({step:0.01, showArrows: true});
  
  jQuery('#pf-skewX').inputSlider({step:1, showArrows: true});
  jQuery('#pf-skewY').inputSlider({step:1, showArrows: true});
  
  jQuery('#pa-iteration-count,#pa-duration,#pa-timing-function,#pf-animation-fill-mode,#pf-animation-iteration-infinite,#cg-class-name,#cg-animation-name').change(function(){
    updateControls();
    updateCodeArea();
  });

  jQuery('#marker-title-text').change(function(){
     if(currentMark){
       var newTitle = jQuery(this).val();
       if(!newTitle || currentMark.isBasic)
          return;
       var sortedMarkers = sortMarkersByPercent();
       var index = getMarkerIndex(currentMark, sortedMarkers);
       currentMark.markerTitle = newTitle;
       jQuery('#keyframes-nav option:eq('+ index +')').text(newTitle);
     }
  });
  
  jQuery('#reset-anim-btn').click(function(){ resetAnimation(); });
  
  
}

function updateControls(){
  var isInfinitRepeat = jQuery('#pf-animation-iteration-infinite').is(':checked');
  if(isInfinitRepeat)
    jQuery('#pa-iteration-count').attr('disabled','disabled');
  else
    jQuery('#pa-iteration-count').removeAttr('disabled');
      
}

function initShorcuts(){
  jQuery(window).keydown(function(e) {
    // delete button down
    if(e.keyCode == 46 && e.target.nodeName == 'BODY'){
       removeSelectedMarker();
    }
  });
}

function initBasicMarkers(){
  var rectangle = jQuery('#rectangle');
  var initPos = rectangle.position();
  var startMarker = {markerId: 'start', isBasic: true, markerTitle: 'Start',  percent: 0, temp : {}, properties: { left: initPos.left, top : initPos.top, skewX : 0, skewY : 0, scaleX: 1, scaleY : 1, opacity: 1, rotate : 0} };
  var endMarker = { markerId: 'end', isBasic: true, markerTitle: 'End', percent: 100, temp : {}, properties: {  } };
  frameMarkers = new Array(startMarker, endMarker);
}

function initFrameMarker(){
  initBasicMarkers();
  goFirstMarker();
}

function goFirstMarker(){
  currentMark = findMarkerById('start');
  if(currentMark){
    fillMarkProperties(currentMark);
    highlightMarker(currentMark.markerId);
  }
}


function resetAnimation(){
  frameMarkers.forEach(function(tmpMarker){
    var markerId = tmpMarker.markerId;
    if(markerId == 'start' || markerId == 'end')
      return;
    var markElement = jQuery('#frame-mark-' + markerId);
    markElement.remove();
  });

  initBasicMarkers();

  // finishing
  buildKeyframesNav();
  jQuery("#keyframes-nav option:first").prop("selected", "selected");
  handleKeframesNavSelectedItem();
  updateCodeArea();
}

function initKeyframesNav(){
  var nav = jQuery('#keyframes-nav');
  nav.change(function(){
    handleKeframesNavSelectedItem();
  });

  buildKeyframesNav();
}

function handleKeframesNavSelectedItem(){
  var nav = jQuery('#keyframes-nav');
  var selectedId = nav.val();
  currentMark = findMarkerById(selectedId);
  highlightMarker(selectedId);
  fillMarkProperties(currentMark);

}

function buildKeyframesNav(){
  var nav = jQuery('#keyframes-nav');
  nav.empty();
  var count  = 0 ;
  var sortedMarkers = sortMarkersByPercent();
  for (var key in sortedMarkers){
    var marker = sortedMarkers[key];
    var option = jQuery('<option>');
    option.attr('value', marker.markerId );
    option.text(marker.markerTitle );
    nav.append(option);
    count ++;
  }

  nav.attr('size', count);
  updateMarkersListSelection();
}

function updateMarkersListSelection(){
  var sortedMarkers = sortMarkersByPercent();
  var index = getMarkerIndex(currentMark, sortedMarkers);
  jQuery('#keyframes-nav').get(0).selectedIndex = index;
}

function initPreviewRectangle(){

  var previewRectagnle = jQuery('#rectangle2');
  previewRectagnle.draggable({ /*axis: "x", containment: '#timeline-wrap', */
    start: function(e){
      
      if(jQuery(e.srcElement).hasClass('sg-marker') )
        return false;
    },

    stop: function() {
      //previewRectagnle.position();
      
      updateActiveMarkerOnPreviewPosition();
    },
    drag: function(){
      updateActiveMarkerOnPreviewPosition();
    }
  
  });

  

}

function updateActiveMarkerOnPreviewPosition(){
  checkCurrentMarkOnTimeline();

  if(!currentMark)
    return;
  var previewRectagnle = jQuery('#rectangle2');
  var previewPosition = previewRectagnle.position();
  var leftPosition = Math.round(previewPosition.left);
  var topPosition = Math.round(previewPosition.top);

  jQuery('#pf-left').val(leftPosition);
  jQuery('#pf-left').trigger('value_update');

  jQuery('#pf-top').val(topPosition);
  jQuery('#pf-top').trigger('value_update');

  currentMark.properties.left = leftPosition;//previewPosition.left;
  currentMark.properties.top = topPosition; //previewPosition.top;

  updateKeyFrameSwichers();
  updateCodeArea();
}

var currentTime;
function initTimeLineChecker(){
  jQuery('#timeline-slider').draggable({ axis: "x", containment: '#timeline-wrap', 
                      stop: function() {
                         handleTimeSlider();
                         
                      },
                      drag: function(){
                        handleTimeSlider();
                      }
  
  });

  jQuery('#timeline-checker').click(function(e){
     
     if(e.target.id == "timeline-checker"){
       jQuery('#timeline-slider').css('left', (e.offsetX - 5));
       handleTimeSlider();
     }
       
  });
}

function handleTimeSlider(){
  var marker = jQuery('#timeline-slider');
  var markerPercent = gerMarkerPercent(marker);

  var markerRelatedToPercent = findMarkerByPercent(markerPercent);
  if( markerRelatedToPercent && markerRelatedToPercent != currentMark){
    currentMark = markerRelatedToPercent;
    highlightMarker(markerRelatedToPercent.markerId);
  }
  else if(!markerRelatedToPercent){
    currentMark = null;
    unhighlightMarker();

  }


  animationDuration = parseFloat(jQuery('#pa-duration').val());
  currentTime = animationDuration * (markerPercent * 0.01);
  currentTime = currentTime.toFixed(2);
  jQuery('#timeline-slider-time').html(currentTime + 's');
  handleCurrentTimeAnimation(); 
  handleJsTimePosition();
}


var playingAnimationTimeoutId = null;
function finishPlayingAnimation(){
  if(playingAnimationTimeoutId)
    clearTimeout(playingAnimationTimeoutId);
  jQuery('#play-btn').removeClass('active');  
  if(cssAnimationElement)
    cssAnimationElement.remove();

  jQuery('#rectangle').hide();
  jQuery('#rectangle2').show();
}

function applyAnimationToElement(){

  jQuery('#rectangle').show();
  jQuery('#rectangle2').hide();

  if(cssAnimationElement)
      cssAnimationElement.remove();
    jQuery('#rectangle').removeClass('element-animation');
    var generatedCss = generateAnimationCss();
    cssAnimationElement = jQuery("<style type='text/css'> "+ generatedCss +" </style>").appendTo("head");
    setGeneratedCode(generatedCss);
    var animationDuration = jQuery('#pa-duration').val() * 1000;
    playingAnimationTimeoutId = setTimeout('finishPlayingAnimation()', animationDuration);
    jQuery('#rectangle').addClass('element-animation');

}

function setGeneratedCode(generatedCss){
  var className = jQuery('#cg-class-name').val();
  if(className){
    generatedCss = generatedCss.replace(/\.element-animation/i,'.' + className);
  }
  
  var animationName = jQuery('#cg-animation-name').val();
  if(animationName){
    generatedCss = generatedCss.replace(/animationFrames/ig, animationName);
  }
  
  jQuery('#generated-code').text(generatedCss);
}

function updateCodeArea(){
  var generatedCss = generateAnimationCss();
  //jQuery('#generated-code').text(generatedCss);
  setGeneratedCode(generatedCss);
}

function handleCurrentTimeAnimation(){
  if(animationPreviewInProgress)
      return;
  
  //applyAnimationToElement();
  

  if(cssAnimationDelayElement)
      cssAnimationDelayElement.remove();
    
  var generatedDelayCss = generateDelayAnimationCss();
  cssAnimationDelayElement = jQuery("<style type='text/css'> "+ generatedDelayCss +" </style>").appendTo("head");
  
  jQuery('#rectangle').addClass('element-delay-animation');
  jQuery('#rectangle').removeClass('pause-animation');
  
  jQuery('#rectangle').css('visibility', 'hidden');
  
  //jQuery('#rectangle2').css('visibility', 'visible');
  animationPreviewInProgress = true;
  setTimeout(pauseAnimation, 100);
}

function applyPausedAnimationTo(selector){
  var element = jQuery(selector);

}

function generateDelayAnimationCss(){
  var secondTime = currentTime;//roundFloat(currentTime); ???
  var css =  ".element-delay-animation { \n" +
       "animation-delay:-"+ secondTime +"s; \n"+ 
       "-webkit-animation-delay:-" + secondTime +"s;";
  return css;
}

function roundFloat(value){
  var newValue = Math.round(value * 100) * 0.01;
  return newValue;
}

function pauseAnimation(){
  jQuery('#rectangle').addClass('pause-animation');
  jQuery('#rectangle').css('visibility', 'visible');
  //jQuery('#rectangle2').css('visibility', 'hidden');
  animationPreviewInProgress = false;
}

function sortMarkersByPercent(){

  var sorted = frameMarkers.sort(function(a,b){
  	 return a.percent - b.percent;
  });

  return sorted;
  
}


function initButtons(){
	jQuery('#play-btn').click(function(){
		
		/*if(cssAnimationElement)
			cssAnimationElement.remove();
		jQuery('#rectangle').removeClass('element-animation');
    var generatedCss = generateAnimationCss();
		cssAnimationElement = jQuery("<style type='text/css'> "+ generatedCss +" </style>").appendTo("head");
    jQuery('#generated-code').text(generatedCss);
		jQuery('#rectangle').addClass('element-animation');
    */

    

    jQuery('#rectangle').removeClass('element-delay-animation');
    jQuery('#rectangle').removeClass('pause-animation');

    if(jQuery('#play-btn').hasClass('active') ){
      finishPlayingAnimation();
    }
    else{
      jQuery('#play-btn').addClass('active');  
      applyAnimationToElement();
    }
    
    
    
		return false;
	});

  

	jQuery('#stop-btn').click(function(){
		
		jQuery('#rectangle').removeClass('element-animation');
		cssAnimationElement.remove();
		cssAnimationElement = null;
		return false;
	});

	jQuery('#remove-marker-btn').click(function(){
		
		removeSelectedMarker();

		return false;
	});

  jQuery('#forward-btn').click(function(){
    var sortedMarkers = sortMarkersByPercent();
    var index = getMarkerIndex(currentMark, sortedMarkers);
    index++;
    if(index >= sortedMarkers.length)
      index = 0;

    currentMark = sortedMarkers[index];
    highlightMarker(currentMark.markerId);
    
    return false;
  });

  jQuery('#backward-btn').click(function(){

    var sortedMarkers = sortMarkersByPercent();
    var index = getMarkerIndex(currentMark, sortedMarkers);
    index--;
    if(index < 0 )
      index = sortedMarkers.length - 1;

    currentMark = sortedMarkers[index];
    highlightMarker(currentMark.markerId);

    return false;
  });

  

  var clip = new ZeroClipboard( jQuery("#copy-btn"), {
    moviePath: "swf/ZeroClipboard.swf"
  } );

 
  clip.on('mousedown',function() {
    updateCodeArea();
    clip.setText( jQuery('#generated-code').val() );
  });

  

}

function removeSelectedMarker(){
  if(currentMark){
      var markerId = currentMark.markerId;
      var markElement = jQuery('#frame-mark-' + markerId);
      markElement.remove();

      var indexToRemove = findMarkerIndexById(markerId);
      frameMarkers.splice(indexToRemove, 1);

      buildKeyframesNav();
      jQuery("#keyframes-nav option:first").prop("selected", "selected");
      handleKeframesNavSelectedItem();
      updateCodeArea();

    }
}

function checkCurrentMarkOnTimeline(){
  if(!currentMark){
        var timelineSlider = jQuery('#timeline-slider');
        var offsetX = parseInt(timelineSlider.css('left').replace('px','')) + 5;
        addNewFrameMarker(offsetX);
      }

}

function initPropertyFields(){

  jQuery('.pf-value-input').change(function(){
    var input = jQuery(this);
    var propertyName = input.attr('data-property');

    var value =  input.val() ? input.val() : 0 ;
    // ??? refactor this
    if(propertyName == 'left' || propertyName == 'top')
      value = parseInt(value);
    else
      value = parseFloat(value);

    checkCurrentMarkOnTimeline();
    if(currentMark){
      
      //if(!displayingCurrentValuesInProgress)
      //checkCurrentMarkOnTimeline();
      
      input.val(value);
      currentMark.properties[ propertyName ] = value;

      jQuery('#pf-'+  propertyName +'-key-switcher').addClass('active');
      
      //displayingCurrentValuesInProgress = false;
      //handleTimeSlider();
      handleTimeSlider();
      
    }

    updateCodeArea();
  });
  
  /*jQuery('#pf-left').change(function(){
    
    var value = jQuery(this).val() ? parseInt(jQuery(this).val()) : null;
    checkCurrentMarkOnTimeline();
  	if(currentMark){
      
      //if(!displayingCurrentValuesInProgress)
      //checkCurrentMarkOnTimeline();
      jQuery(this).val(value);
      currentMark.properties.left = value;
      //console.log(value);
      //displayingCurrentValuesInProgress = false;
      //handleTimeSlider();
      handleTimeSlider();
    }
  });

  jQuery('#pf-top').change(function(){
    var value = jQuery(this).val() ? parseInt(jQuery(this).val()) : null;
    checkCurrentMarkOnTimeline();
    if(currentMark){
      
      //if(!displayingCurrentValuesInProgress)
      jQuery(this).val(value);
      currentMark.properties.top = value;

      //displayingCurrentValuesInProgress = false;
      handleTimeSlider();
    }
  });

  jQuery('#pf-rotate').change(function(){
    if(currentMark){
      var value = jQuery(this).val() ? parseFloat(jQuery(this).val()) : null;
      //if(!displayingCurrentValuesInProgress)
      currentMark.properties.rotate = value;
      //displayingCurrentValuesInProgress = false;
      handleTimeSlider();
    }
  });

  jQuery('#pf-scaleX').change(function(){
    if(currentMark){
      var value = jQuery(this).val() ? parseFloat(jQuery(this).val()) : null;
      //if(!displayingCurrentValuesInProgress)
      currentMark.properties.scaleX = value;
      displayingCurrentValuesInProgress == false;
      //handleTimeSlider();
    }
  });

  jQuery('#pf-scaleY').change(function(){
    if(currentMark){
      var value = jQuery(this).val() ? parseFloat(jQuery(this).val()) : null;
      //if(!displayingCurrentValuesInProgress)
      currentMark.properties.scaleY = value;
      displayingCurrentValuesInProgress == false;
      //handleTimeSlider();
    }
  });
*/

}

function initTimeLine(){

  jQuery('#pa-duration').change(function(){
    drawTimeLineNicks();
    
  });

  var timeline = jQuery('#timeline');
  timeline.click(function(event){
  	
  	var target = jQuery(event.target);
  	if(target.hasClass('frame-mark') ){
  		var markId = fetchMarkerId( target.attr('id') );
  		jQuery('#marker-id-label').html(markId);



  		var foundMark = findMarkerById(markId);
  		
  		if(foundMark){
  			currentMark = foundMark;
  			fillMarkProperties(currentMark);
  			highlightMarker(currentMark.markerId);


  		}
  		
  	}
  	else{
  	  var offsetX = event.offsetX;
  	  addNewFrameMarker(offsetX);
  	}

  });
}

function fillMarkProperties(currentMark){
  jQuery('#remove-marker-btn').hide();
  // refactor this ???
  if(currentMark){
    
    jQuery('#pf-left').val(currentMark.properties.left);
    jQuery('#pf-left').trigger('value_update');

    jQuery('#pf-top').val(currentMark.properties.top);
    jQuery('#pf-top').trigger('value_update');

    var rotateValue = currentMark.properties.rotate;
    if(!rotateValue)
       rotateValue = 0;
    jQuery('#pf-rotate').val(rotateValue);
    jQuery('#pf-rotate').trigger('value_update');

    jQuery('#pf-scaleX').val(currentMark.properties.scaleX);
    jQuery('#pf-scaleY').val(currentMark.properties.scaleY);
    
    jQuery('#pf-skewX').val( currentMark.properties.skewX != undefined ? currentMark.properties.skewX : 0);
    jQuery('#pf-skewY').val(currentMark.properties.skewY != undefined ? currentMark.properties.skewY : 0);

    jQuery('#pf-opacity').val(currentMark.properties.opacity);
    

    jQuery('#marker-title-text').val(currentMark.markerTitle);

    if(currentMark.markerId != 'end' && currentMark.markerId != 'start')
    	jQuery('#remove-marker-btn').show();
  }
}

function gerMarkerPercent(marker){
  var timeline = jQuery('#timeline');
  var offsetX = parseInt(marker.css('left').replace('px','')) + markerCanvasWidth * 0.5;
  var percent = Math.round( (offsetX / timeline.width() ) * 100 );
  return percent;
}

function addNewFrameMarker(offsetX, initData){
	var timeline = jQuery('#timeline');
	var newMark = jQuery('<canvas>').addClass('frame-mark');
  newMark.attr('width', markerCanvasWidth);
  newMark.attr('height', markerCanvasHeight);
	newMark.attr('id', 'frame-mark-' + markersLastId);
	newMark.css('left', offsetX - markerCanvasWidth * 0.5 );
	timeline.append(newMark);

	var percent = gerMarkerPercent(newMark);
	var frameMarkObject = { markerId: markersLastId, markerTitle: 'Marker ' + markersLastId,  percent: percent, temp: {}, properties: {} };
  if(initData !== undefined){
    frameMarkObject = initData;
    markersLastId = initData.markerId;
    newMark.attr('id', 'frame-mark-' + initData.markerId);
  }
   
  newMark.data('frameData', frameMarkObject);
	currentMark = frameMarkObject;
	frameMarkers.push(frameMarkObject);
  
  drawTriangle(newMark, true);

  newMark.draggable({ axis: "x", containment: '#timeline-wrap', 
                      stop: function() {
                         var marker = jQuery(this);
                         var markerData = newMark.data('frameData');
                         markerData.percent = gerMarkerPercent(marker);
                         buildKeyframesNav();

                      }
  
  });

	fillMarkProperties(currentMark);
	highlightMarker(markersLastId);

	jQuery('#marker-id-label').html(markersLastId);

  buildKeyframesNav();

	markersLastId++;	
  updateCodeArea();
}

function unhighlightMarker(){
  var previousActiveMarker = jQuery('.frame-mark.active-marker')[0];
  if(previousActiveMarker)
    drawTriangle(jQuery(previousActiveMarker));
  jQuery('.frame-mark').removeClass('active-marker');
  jQuery('.keyframe-switcher').removeClass('active');

}

function highlightMarker(markerId){
  /*var previousActiveMarker = jQuery('.frame-mark.active-marker')[0];
  if(previousActiveMarker)
	  drawTriangle(jQuery(previousActiveMarker));
  jQuery('.frame-mark').removeClass('active-marker');
  */
  unhighlightMarker();
	jQuery('#frame-mark-' + markerId).addClass('active-marker');
  drawTriangle(jQuery('#frame-mark-' + markerId), true);

  var makerPositionLeft = jQuery('#frame-mark-' + markerId).position().left;
  jQuery('#timeline-slider').css('left', (makerPositionLeft));

  // updating Keyframes selected item
  updateMarkersListSelection();

  handleTimeSlider();
  //jQuery('#timeline-slider');
  //updateActiveMarkerOnPreviewPosition
  updateKeyFrameSwichers();
}


function updateKeyFrameSwichers(){
  
  jQuery('.keyframe-switcher').each(function(i,e){
    var switcher = jQuery(e);
    var propertyName = switcher.attr('property');
    if(currentMark.properties[propertyName] != undefined)
      switcher.addClass('active');

  });
}

function findMarkerById(markId){
  
  for(var i = 0; i < frameMarkers.length; i++){
  	var marker = frameMarkers[i];
  	if(marker.markerId == markId)
  	  return marker;
  }
  return null;
}

function findMarkerByPercent(percent){
  
  for(var i = 0; i < frameMarkers.length; i++){
    var marker = frameMarkers[i];
    if(marker.percent == percent)
      return marker;
  }
  return null;
}

function findMarkerIndexById(markId){
  
  for(var i = 0; i < frameMarkers.length; i++){
  	var marker = frameMarkers[i];
  	if(marker.markerId == markId)
  	  return i;
  }
  return -1;
}

function getMarkerIndex(marker, sortedMarkers){
  for(var i = 0; i < sortedMarkers.length; i++)
    if(marker == sortedMarkers[i])
      return i;
  return -1;
}



function fetchMarkerId(elementId){
	var markerId = (elementId.replace('frame-mark-',''));
	return markerId;
}


function generateAnimationCss(){

var css = '';
var duration = jQuery('#pa-duration').val();
var iterationCount = jQuery('#pa-iteration-count').val();
var easeFunction =  jQuery('#pa-timing-function').val();
var transformPoint = jQuery('#pa-transform-origin').val();
var preserveFillMode = jQuery('#pf-animation-fill-mode').is(':checked');
var infiniteRepeat = jQuery('#pf-animation-iteration-infinite').is(':checked');

if(infiniteRepeat)
  iterationCount = 'infinite';


if(!transformPoint)
 transformPoint = "50% 50%";

css += ".element-animation{\n";

if(jQuery('#bsup_standart').is(':checked')){
  css += "  animation: animationFrames " + easeFunction + ' ' + duration +"s;\n";
  css += "  animation-iteration-count: "+ iterationCount +";\n";
  css += "  transform-origin: "+ transformPoint +";\n";
  if(preserveFillMode)
    css += "  animation-fill-mode:forwards; /*when the spec is finished*/\n";
}

if(jQuery('#bsup_webkit').is(':checked')){
  css += '  -webkit-animation: animationFrames ' + easeFunction + ' ' + duration +"s;\n";
  css += "  -webkit-animation-iteration-count: "+ iterationCount +";\n";
  css += "  -webkit-transform-origin: "+ transformPoint +";\n";
  if(preserveFillMode)
    css += "  -webkit-animation-fill-mode:forwards; /*Chrome 16+, Safari 4+*/ \n";
}

if(jQuery('#bsup_moz').is(':checked')){
  css += '  -moz-animation: animationFrames ' + easeFunction + ' ' + duration +"s;\n";
  css += "  -moz-animation-iteration-count: "+ iterationCount +";\n";
  css += "  -moz-transform-origin: "+ transformPoint +";\n";
  if(preserveFillMode)
    css += "  -moz-animation-fill-mode:forwards; /*FF 5+*/\n";
}

if(jQuery('#bsup_o').is(':checked')){
  css += '  -o-animation: animationFrames ' + easeFunction + ' ' + duration +"s;\n";
  css += "  -o-animation-iteration-count: "+ iterationCount +";\n";
  css += "  -o-transform-origin: "+ transformPoint +";\n";
  if(preserveFillMode)
    css +=  "  -o-animation-fill-mode:forwards; /*Not implemented yet*/\n";
}

if(jQuery('#bsup_ms').is(':checked')){
  css += '  -ms-animation: animationFrames ' + easeFunction + ' ' + duration +"s;\n";
  css += "  -ms-animation-iteration-count: "+ iterationCount +";\n";
  css += "  -ms-transform-origin: "+ transformPoint +";\n";
  if(preserveFillMode)
    css +=  "  -ms-animation-fill-mode:forwards; /*IE 10+*/\n";
}


css += "}\n\n";

 //var keyframes = generateKeyFrames();
 
if(jQuery('#bsup_standart').is(':checked'))
  css += "@keyframes animationFrames{\n" + generateKeyFrames() + "}\n\n";

if(jQuery('#bsup_moz').is(':checked'))
  css += "@-moz-keyframes animationFrames{\n" + generateKeyFrames('-moz-') + "}\n\n";

if(jQuery('#bsup_webkit').is(':checked'))
  css += "@-webkit-keyframes animationFrames {\n" + generateKeyFrames('-webkit-') + "}\n\n";

if(jQuery('#bsup_o').is(':checked')) 
  css += "@-o-keyframes animationFrames {\n" + generateKeyFrames('-o-') + "}\n\n";

if(jQuery('#bsup_ms').is(':checked'))
  css += "@-ms-keyframes animationFrames {\n" + generateKeyFrames('-ms-') + '}';


return css;

}


function generateKeyFrames(prefix){
  if(prefix == undefined)
    prefix = '';
  var frames = '';
  var sortedMarkers = sortMarkersByPercent();
  var sortedMarkersCount = sortedMarkers.length;
  
  // finding changed properties to avoid adding non-needed properties to generated code
  var changedCSSProperites = {};
  for(var defaultCSSPropertyKey in defaultCSSProperties){  
    
    var defaultCSSPropertyValue = defaultCSSProperties[defaultCSSPropertyKey];
    var isChanged = false;
    for(var i = 0; i < sortedMarkers.length; i++){
      var marker = sortedMarkers[i];
      var markerPropetries = marker.properties;
      if( markerPropetries[defaultCSSPropertyKey] != undefined && markerPropetries[defaultCSSPropertyKey] != defaultCSSPropertyValue){
        isChanged = true;
        break;
      }
    }

    if(isChanged)
      changedCSSProperites[defaultCSSPropertyKey] = true;
  }


  for(var i = 0; i < sortedMarkers.length; i++){
  	var marker = sortedMarkers[i];
    var intermediateValues = getPropertyIntermediateValue(i);
    
    
    var isLastMarker = (i >= sortedMarkersCount - 1);
    var frameStep = "  " + marker.percent +"% {\n";
    
    var transformData = {};
    var transformPresent = true;

    var leftPos, topPost;
    if( marker.properties.left != undefined )
      leftPos = marker.properties.left + "px";
    else if(isLastMarker)
      leftPos = getMarkerPropertyFromPervious(sortedMarkers, 'left', i) + "px";
    else if( intermediateValues['left'] )
      leftPos = intermediateValues['left'] + "px";
    

    if( marker.properties.top != undefined )
      topPos = marker.properties.top + "px";
    else if(isLastMarker)
      topPos = getMarkerPropertyFromPervious(sortedMarkers, 'top', i) + "px";
    else if( intermediateValues['top'] )
      topPos = intermediateValues['top'] + "px";

    transformData.leftPos = leftPos;
    transformData.topPos = topPos;

    //frameStep += 
    
    /*
    if( marker.properties.left != undefined )
      frameStep += '    left:' + marker.properties.left + "px;\n";
    else if(isLastMarker){
      frameStep += '    left:' + getMarkerPropertyFromPervious(sortedMarkers, 'left', i) + "px;\n";
    }

    if( marker.properties.top != undefined )
      frameStep += '    top:' + marker.properties.top + "px;\n";
    else if(isLastMarker){
      frameStep += '    top:' + getMarkerPropertyFromPervious(sortedMarkers, 'top', i) + "px;\n";
    }*/
    

    if(changedCSSProperites['opacity']){
      if( marker.properties.opacity != undefined )
        frameStep += '    opacity:' + marker.properties.opacity + ";\n";
      else if(isLastMarker){
        frameStep += '    opacity:' + getMarkerPropertyFromPervious(sortedMarkers, 'opacity', i) + ";\n";
      }
      else if( intermediateValues['opacity'] )
        frameStep += '    opacity:' + intermediateValues['opacity'] + ";\n";
    }
    
    if(marker.properties.rotate != undefined){
      transformPresent = true;
      transformData.rotate = marker.properties.rotate;
    }
    else if( isLastMarker){
      transformData.rotate =  getMarkerPropertyFromPervious(sortedMarkers, 'rotate', i); //sortedMarkers[j].properties[property];
      transformPresent = true;
    }
    else if( intermediateValues['rotate'] )
      transformData.rotate = intermediateValues['rotate'];

    if(marker.properties.scaleX != undefined){
      transformPresent = true;
      transformData.scaleX = marker.properties.scaleX;
    }
    else if( isLastMarker ){
      transformData.scaleX =  getMarkerPropertyFromPervious(sortedMarkers, 'scaleX', i); //sortedMarkers[j].properties[property];
      transformPresent = true;
    }
    else if( intermediateValues['scaleX'] )
      transformData.scaleX = intermediateValues['scaleX'];

    if(marker.properties.scaleY != undefined){
      transformPresent = true;
      transformData.scaleY = marker.properties.scaleY;
    }
    else if( isLastMarker ){
      transformData.scaleY =  getMarkerPropertyFromPervious(sortedMarkers, 'scaleY', i); //sortedMarkers[j].properties[property];
      transformPresent = true;
    }
    else if( intermediateValues['scaleY'] )
      transformData.scaleY = intermediateValues['scaleY'];
    
    // SKEW
    if(marker.properties.skewX != undefined){
      transformPresent = true;
      transformData.skewX = marker.properties.skewX;
    }
    else if( isLastMarker ){
      transformData.skewX =  getMarkerPropertyFromPervious(sortedMarkers, 'skewX', i); 
      transformPresent = true;
    }
    else if( intermediateValues['skewX'] )
      transformData.skewX = intermediateValues['skewX'];

    if(marker.properties.skewY != undefined){
      transformPresent = true;
      transformData.skewY = marker.properties.skewY;
    }
    else if( isLastMarker ){
      transformData.skewY =  getMarkerPropertyFromPervious(sortedMarkers, 'skewY', i); 
      transformPresent = true;
    }
    else if( intermediateValues['skewY'] )
      transformData.skewY = intermediateValues['skewY'];

    if(transformPresent)
      frameStep += generateTransforms(transformData, prefix, changedCSSProperites);

    frameStep += "  }\n";
    frames += frameStep;
  }
  return frames;
}

function getMarkerPropertyFromPervious(sortedMarkers, property, i){
  for(var j = i; j >= 0; j--){
        if(sortedMarkers[j].properties[property] != undefined){
          return sortedMarkers[j].properties[property];
          break;
        }
      }

}

function generateTransforms(data, prefix, changedCSSProperites){
  var transformStyle = "";
  var transform = "";

  if(changedCSSProperites['left'] || changedCSSProperites['top'])
    transform += " translate("+ data.leftPos +"," + data.topPos + ") ";

  if(data.rotate != undefined && changedCSSProperites['rotate'])
    transform += " rotate("+ Math.round(data.rotate) +"deg)";

  if(data.scaleX != undefined && changedCSSProperites['scaleX'])
    transform += " scaleX("+ parseFloat(data.scaleX).toFixed(2) +")";

  if(data.scaleY != undefined && changedCSSProperites['scaleY'])
    transform += " scaleY("+ parseFloat(data.scaleY).toFixed(2) +")";
    
  if(data.skewX != undefined && changedCSSProperites['skewX'])
    transform += " skewX("+ data.skewX +"deg)";

  if(data.skewY != undefined && changedCSSProperites['skewY'])
    transform += " skewY("+ data.skewY +"deg)";  

  if(transform.trim()){
    transformStyle = "    " + prefix + "transform: "+ transform +" ;\n";
  }  

  return transformStyle;
}


function loadSketch(json){
  
  resetAnimation();
  
  jQuery('#pa-duration').val( json.settings.duration );
  jQuery('#pa-iteration-count').val( json.settings.iterationCount );
  jQuery('#pa-timing-function').val(json.settings.easeFunction);

  jQuery('#pa-transform-origin').val(json.settings.transformPoint);
  if(json.settings.transformPoint){
    jQuery('#rotation-origin-input .roi-point').each(function(i,e){
      var point = jQuery(e);
      point.removeClass('active');
      if(point.attr('data-value') == json.settings.transformPoint)
        point.addClass('active');
    });
  }

  jQuery('#pf-animation-fill-mode').prop('checked', json.settings.preserveFillMode);

  json.frames.forEach(function(tmpFrame){
    var markerId = tmpFrame.markerId;
    if(markerId == 'start' || markerId == 'end'){
      //var foundMarker = findMarkerById(markerId);
      var i = findMarkerIndexById(markerId);
      
      if(markerId == 'start')
        for(var defaultCSSPropertyKey in defaultCSSProperties){
          if(tmpFrame.properties[defaultCSSPropertyKey] == undefined)
            tmpFrame.properties[defaultCSSPropertyKey] = defaultCSSProperties[defaultCSSPropertyKey];
        }

      frameMarkers[i] = tmpFrame;  
      //foundMarker = tmpFrame;
      return;
    }

    var timeline = jQuery('#timeline');
    var offsetX = Math.round( (tmpFrame.percent / 100) * timeline.width() );// - markerCanvasWidth * 0.5;

    addNewFrameMarker(offsetX, tmpFrame );

  });

  goFirstMarker(); 
  return false;
}

function initExamples(){
  jQuery('#examples-fader,#examples-popup-close').click(function(){
    hideExamples();
  });
  
  var list = jQuery('#examples-list');
  var examplesCount = caExamples.length;
  for(var i = 0; i< examplesCount; i++){
    var example = caExamples[i];
    
    var refWrap = jQuery('<div>');
    refWrap.addClass('example-ref-wrap');
    var ref = jQuery('<a>');
    ref.attr('href','javascript:;');
    ref.attr('data-index', i );
    ref.text( example.name );
    refWrap.append(ref);
    list.append(refWrap);

    ref.click(function(){
        var json = caExamples[ parseInt(jQuery(this).attr('data-index'))  ].sketch;
        loadSketch ( json);
        hideExamples();
    })

  }
}

function showExamples(){
  jQuery('#examples-popup').show();
  jQuery('#examples-fader').show();
}

function hideExamples(){
  jQuery('#examples-popup').hide();
  jQuery('#examples-fader').hide();
}

function isdefined( variable){
    return (typeof(window[variable]) == "undefined")?  false: true;
}

function drawTriangle(canvasElement, highlightedParameter){
  
  var highlighted = false;
  
  var color = "#34A3C8";
  if(canvasElement.hasClass('fixed-marker') )
    color = "#99f";

  if(typeof(highlightedParameter) !== 'undefined') 
    highlighted = highlightedParameter;

  //var context = canvasElement.context.getContext("2d");
  var context = document.getElementById( canvasElement.attr('id') ).getContext("2d");
  

  context.clearRect(0, 0, canvasElement.width(), canvasElement.height());
  context.strokeStyle = color; 
  if(highlighted){
    context.strokeStyle = '#ffffff';
    context.lineWidth   = 2;
  }

  context.beginPath();
  context.moveTo(0, 0);        // Top Corner
  context.lineTo(markerCanvasWidth, 0); // Bottom Right
  context.lineTo(markerCanvasWidth * 0.5, markerCanvasHeight);         // Bottom Left
  context.closePath();

  // Fill the path
  context.fillStyle = color;
  context.fill();
  if(highlighted)
    context.stroke();
}