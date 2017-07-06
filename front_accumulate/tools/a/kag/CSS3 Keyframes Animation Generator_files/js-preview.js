function handleJsTimePosition(){

	var timingFunctionName = jQuery('#pa-timing-function').val();
	var cbParam = getCubicBezierParams(timingFunctionName);
	var previewRect = jQuery('#rectangle2');
    var transformOrigin = jQuery('#pa-transform-origin').val();
	if(transformOrigin != "50% 50%")
	  previewRect.css( 'transform-origin', transformOrigin);

	var sortedMarkers = sortMarkersByPercent();
	var firstMarker = sortedMarkers[0];

	var percentTime = currentTime / animationDuration;
	var previousPercent = 0;
	
	var touchedProperties = {};
	

	for(var i = 0; i < sortedMarkers.length; i++){
	  var tmpTouchedMarker = sortedMarkers[i];
	  for(var touchedPropertyKey in tmpTouchedMarker.properties){
	  	if(touchedProperties[touchedPropertyKey])
	  		continue;
	  	var touchedValue = parseFloat(firstMarker.properties[touchedPropertyKey]);

	  	var touchedProperty = {lastBasePercent: 0, value: 0, reached: false, lastBaseValue: touchedValue };
	  	
	  	touchedProperties[touchedPropertyKey]  = touchedProperty;
	  }
	}

    for(var i = 0; i < sortedMarkers.length; i++){
  	  var marker = sortedMarkers[i];
  	  var dPercent = marker.percent / 100;
  	  
  	  for(var touchedPropertyKey in touchedProperties){

  	  	var touchedProperty = touchedProperties[touchedPropertyKey];
  	  	if(touchedProperty.reached)
  	  		continue;
  	  	var previousPercent = touchedProperty.lastBasePercent;
  	  	var previousValue = touchedProperty.lastBaseValue;
  	  	var dividerPercent = dPercent - previousPercent;



  	    var tempPercent =  0;
  	    if(dividerPercent > 0)
  	      tempPercent = (percentTime - previousPercent) / dividerPercent;
  	    var easePercent = CubicBezierAtTime(tempPercent, cbParam.p1x, cbParam.p1y, cbParam.p2x, cbParam.p2y, animationDuration);

  	  	var markerNewPropertyValue =  marker.properties[touchedPropertyKey];
  	  	
  	  	touchedProperty.value = touchedProperty.lastBaseValue;
  	    if( markerNewPropertyValue != undefined && !isNaN(markerNewPropertyValue)  ){
  	  	  var deltaValue = markerNewPropertyValue - previousValue;
  	  	  touchedProperty.lastBasePercent = dPercent;
  	  	  

  	  	  var stepValue = deltaValue * easePercent;
  	  	  
  	  	  if(touchedPropertyKey == 'left' || touchedPropertyKey == 'top' || touchedPropertyKey == 'rotate'
          || touchedPropertyKey == 'skewX' || touchedPropertyKey == 'skewY' )
  	  	  	stepValue = Math.round(stepValue);

		  touchedProperty.value += stepValue;
		  touchedProperty.lastBaseValue = markerNewPropertyValue;
		  
  	  	  if(dPercent > percentTime){
  	  	  	touchedProperty.reached = true;
  	  	  }

  	    }
  	  }

  	 
    }
     
     var transforms = '';
     for(var touchedPropertyKey in touchedProperties){
  	  	var touchedProperty = touchedProperties[touchedPropertyKey];
  	  	if(isTransformProperty(touchedPropertyKey)){
  	  	 //transform:  rotate(0deg) scaleX(1) scaleY(1);
  	  	 
  	  	 if(touchedPropertyKey == 'scaleX')
  	  	   transforms += ' scaleX('+ touchedProperty.value  +') ';
		     else if(touchedPropertyKey == 'scaleY')
  	  	   transforms += ' scaleY('+ touchedProperty.value  +') ';
         else if(touchedPropertyKey == 'skewX')
  	  	   transforms += ' skewX('+ touchedProperty.value  +'deg) ';
		     else if(touchedPropertyKey == 'skewY')
  	  	   transforms += ' skewY('+ touchedProperty.value  +'deg) ';  
  	  	 else if(touchedPropertyKey == 'rotate')
  	  	    transforms = ' rotate('+ touchedProperty.value  +'deg) ' + transforms;
  	  	}
  	  	else
  	  	  previewRect.css(touchedPropertyKey, touchedProperty.value);

  	 }

  	 
  	 updateControlsWithCurrentValues(touchedProperties);

  	 if(transforms)
  	   previewRect.css( 'transform', transforms);

	
}

function getPropertyIntermediateValue(index){
  var timingFunctionName = jQuery('#pa-timing-function').val();
  var cbParam = getCubicBezierParams(timingFunctionName);
	
  var sortedMarkers = sortMarkersByPercent();
  var firstMarker = sortedMarkers[0];
  var touchedProperties = {};
	
  for(var i = 0; i < sortedMarkers.length; i++){
	  var tmpTouchedMarker = sortedMarkers[i];

	  var done = false;
	  for(var touchedPropertyKey in firstMarker.properties){//tmpTouchedMarker.properties){
	  	if(!touchedProperties[touchedPropertyKey])
	  	  touchedProperties[touchedPropertyKey] = {lastBasePercent: 0, value: 0, reached: false};

	  	if(!touchedProperties[touchedPropertyKey]['lastBaseValue']){
	  		touchedProperties[touchedPropertyKey]['lastBaseValue'] = parseFloat(firstMarker.properties[touchedPropertyKey]);
	  	}

		var propertyValue = tmpTouchedMarker.properties[touchedPropertyKey];
		
		if(propertyValue && i < index){
			touchedProperties[touchedPropertyKey]['lastBaseValue'] = parseFloat(propertyValue);
			touchedProperties[touchedPropertyKey]['lastBasePercent'] = tmpTouchedMarker.percent;
		}

		if(propertyValue && i == index){
			touchedProperties[touchedPropertyKey]['value'] = parseFloat(propertyValue);
		}

		if(i == index){
			touchedProperties[touchedPropertyKey]['percent'] = tmpTouchedMarker.percent;
		}

		if(propertyValue && i > index && !touchedProperties[touchedPropertyKey]['nextBaseValue']){
			touchedProperties[touchedPropertyKey]['nextBaseValue'] = parseFloat(propertyValue);
			touchedProperties[touchedPropertyKey]['nextBasePercent'] = tmpTouchedMarker.percent;
		}

	  	
	  }

	}

	var marker = sortedMarkers[index];
	var dPercent = marker.percent / 100;

    var result = {};
	for(var touchedPropertyKey in touchedProperties){
  	  	var touchedProperty = touchedProperties[touchedPropertyKey];
  	  	if(!touchedProperty.nextBasePercent)
  	  	  continue;

  	  	result.percent = touchedProperty.percent;
  	  	if(touchedProperty.value)
  	  		result[touchedPropertyKey] = touchedProperty.value;
  	  	else{
  	  		var previousPercent = touchedProperty.lastBasePercent * 0.01;
  	  		var nextPercent = touchedProperty.nextBasePercent * 0.01;
  	  		var previousValue = touchedProperty.lastBaseValue;
  	  		var nextValue = touchedProperty.nextBaseValue;
  	  		var dividerPercent = nextPercent - previousPercent;
  	  		var tempPercent =  0;
  	    	if(dividerPercent > 0)
  	    	  tempPercent = (dPercent - previousPercent) / dividerPercent;

  	  		var easePercent = CubicBezierAtTime(tempPercent, cbParam.p1x, cbParam.p1y, cbParam.p2x, cbParam.p2y, animationDuration);
  	  		var deltaValue = nextValue - previousValue;
  	  		var stepValue =  deltaValue * easePercent;
  	  		if(touchedPropertyKey == 'left' || touchedPropertyKey == 'top' || touchedPropertyKey == 'rotate'
          	|| touchedPropertyKey == 'skewX' || touchedPropertyKey == 'skewY' )
  	  	  	stepValue = Math.round(stepValue);

  	  		result[touchedPropertyKey] = previousValue + stepValue;

  	  	}
  	}

  	return result;
}

var displayingCurrentValuesInProgress = false;
function updateControlsWithCurrentValues(touchedProperties){

	for(var touchedPropertyKey in touchedProperties){
  	  	var touchedProperty = touchedProperties[touchedPropertyKey];
  	  	var control = jQuery('#pf-' + touchedPropertyKey);
  	  	
  	  	//console.log('u ' + touchedPropertyKey + ' ' + touchedProperty.value);

  	  	//displayingCurrentValuesInProgress = true;
  	  	//console.log(control.val());
  	  	
  	  	control.val( touchedProperty.value );
  	  	control.trigger('value_update');

  	  	//control.change();
  	  	/*if(isTransformProperty(touchedPropertyKey)){
  	  	 //transform:  rotate(0deg) scaleX(1) scaleY(1);
  	  	 
  	  	 if(touchedPropertyKey == 'scaleX')
  	  	   transforms += ' scaleX('+ touchedProperty.lastBaseValue  +') ';
		 else if(touchedPropertyKey == 'scaleY')
  	  	   transforms += ' scaleY('+ touchedProperty.lastBaseValue  +') ';
  	  	 else if(touchedPropertyKey == 'rotate')
  	  	    transforms = ' rotate('+ touchedProperty.lastBaseValue  +'deg) ' + transforms;
  	  	}
  	  	else
  	  	  previewRect.css(touchedPropertyKey, touchedProperty.lastBaseValue);

  	 	
  	 */
  	}
}

function isTransformProperty(propertyName){
	if(propertyName == 'rotate' || propertyName == 'scaleX' || propertyName == 'scaleY'
  || propertyName == 'skewX' || propertyName == 'skewY' || propertyName == 'scale')
		return true;
	return false;
}

function getCubicBezierParams(param){
	switch (param){
		case 'ease':
		return { 'p1x' : 0.25, 'p1y' : 0.1, 'p2x' : 0.25, 'p2y' : 1.0 };
		break;

		case 'linear':
		return { 'p1x' : 0.0, 'p1y' : 0.0, 'p2x' : 1.0, 'p2y' : 1.0 };
		break;

		case 'ease-in':
		return { 'p1x' : 0.42, 'p1y' : 0.0, 'p2x' : 1.0, 'p2y' : 1.0 };
		break;

		case 'ease-out':
		return { 'p1x' : 0.0, 'p1y' : 0.0, 'p2x' : 0.58, 'p2y' : 1.0 };
		break;

		case 'ease-in-out':
		return { 'p1x' : 0.42, 'p1y' : 0.0, 'p2x' : 0.58, 'p2y' : 1.0 };
		break;

		case 'ease-out-in':
		return { 'p1x' : 0.0, 'p1y' : 0.42, 'p2x' : 1.0, 'p2y' : 0.58 };
		break;
	}

	return { 'p1x' : 0.25, 'p1y' : 0.1, 'p2x' : 0.25, 'p2y' : 1.0 };
	// ease 0.25, 0.1, 0.25, 1.0
	// linear  0.0, 0.0, 1.0, 1.0
	// ease-in 0.42, 0.0, 1.0, 1.0
	// ease-out 0.0, 0.0, 0.58, 1.0
	// ease-in-out 0.42, 0.0, 0.58, 1.0
	// ease-out-in 0.0, 0.42, 1.0, 0.58
}


	
	// currently used function to determine time
	// 1:1 conversion to js from webkit source files
	// UnitBezier.h, WebCore_animation_AnimationBase.cpp
	function CubicBezierAtTime(t,p1x,p1y,p2x,p2y,duration) {
	var ax=0,bx=0,cx=0,ay=0,by=0,cy=0;
		// `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
		function sampleCurveX(t) {return ((ax*t+bx)*t+cx)*t;};
		function sampleCurveY(t) {return ((ay*t+by)*t+cy)*t;};
		function sampleCurveDerivativeX(t) {return (3.0*ax*t+2.0*bx)*t+cx;};
		// The epsilon value to pass given that the animation is going to run over |dur| seconds. The longer the
		// animation, the more precision is needed in the timing function result to avoid ugly discontinuities.
		function solveEpsilon(duration) {return 1.0/(200.0*duration);};
		function solve(x,epsilon) {return sampleCurveY(solveCurveX(x,epsilon));};
		// Given an x value, find a parametric value it came from.
		function solveCurveX(x,epsilon) {var t0,t1,t2,x2,d2,i;
			function fabs(n) {if(n>=0) {return n;}else {return 0-n;}}; 
            // First try a few iterations of Newton's method -- normally very fast.
            for(t2=x, i=0; i<8; i++) {x2=sampleCurveX(t2)-x; if(fabs(x2)<epsilon) {return t2;} d2=sampleCurveDerivativeX(t2); if(fabs(d2)<1e-6) {break;} t2=t2-x2/d2;}
            // Fall back to the bisection method for reliability.
        t0=0.0; t1=1.0; t2=x; if(t2<t0) {return t0;} if(t2>t1) {return t1;}
        while(t0<t1) {x2=sampleCurveX(t2); if(fabs(x2-x)<epsilon) {return t2;} if(x>x2) {t0=t2;}else {t1=t2;} t2=(t1-t0)*.5+t0;}
            return t2; // Failure.
        };
		// Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).
		cx=3.0*p1x; bx=3.0*(p2x-p1x)-cx; ax=1.0-cx-bx; cy=3.0*p1y; by=3.0*(p2y-p1y)-cy; ay=1.0-cy-by;
		// Convert from input time to parametric value in curve, then from that to output time.
		return solve(t, solveEpsilon(duration));
	};