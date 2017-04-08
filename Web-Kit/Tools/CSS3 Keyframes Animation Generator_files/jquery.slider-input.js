/*!
 * jQuery lightweight plugin for advanced slider control input
 * Version: 0.0.1
 * Original author: Bylim Alex
 * Copyright (c) 2013
 * Further changes, comments: @sani4xl
 * Licensed under the MIT license
 */

(function( $ ){
    $.extend($.fn, {
        inputSlider: function(options){
          var settings = $.extend({}, {step: 1, showArrows: false }, options);
          var baseInput;
          var valueLabel;
          var arrowDownStarTimerId;
          var arrowDownCounterTimerId;
          var arrowDownCounterTimerInteval = 50;
          var arrowDownCounterDelay = 800; // 0.5 sec
          var deltaDirection = 1;
         	return this.each(function(i,e) {
      		  
      		  var input = jQuery(e);
      		  
      		  e.type = 'hidden';
      		  input.change(onValueChange);
            input.focusout(inputFocusOut);
            input.bind('value_update', onValueChange);
            baseInput = input;

      		  var label = jQuery('<span>').addClass('inputSliderLabel');
            valueLabel = label;
            label.attr('title','drag to change value');
      		  
      		  label.text(input.val());
      		  
      		  label.mousedown(labelMouseDown);
            label.mouseup(labelMouseUp);

            wrapLabel = jQuery('<span>').addClass('inputSliderElement');

            if(settings.showArrows){
              var leftArrow = jQuery('<span>').addClass('inputSliderLeftArrow');
              leftArrow.html('&#x25C2;');
              wrapLabel.append(leftArrow);
              leftArrow.click(leftArrowClick);
              leftArrow.mousedown(function(){ 
                 jQuery(window).bind('mouseup', arrowWindowMouseUp); 
                 arrowDownStarTimerId = setTimeout( arrowDownCounterTimerStart, arrowDownCounterDelay);
                 deltaDirection = -1;
              });

            }

            wrapLabel.append(label);

            if(settings.showArrows){
              var leftArrow = jQuery('<span>').addClass('inputSliderRightArrow');
              leftArrow.html('&#x25B8;');
              wrapLabel.append(leftArrow);
              leftArrow.click(rightArrowClick);
              leftArrow.mousedown(function(){ 
                 jQuery(window).bind('mouseup', arrowWindowMouseUp); 
                 arrowDownStarTimerId = setTimeout( arrowDownCounterTimerStart, arrowDownCounterDelay);
                 deltaDirection = 1;
              });
            }

            wrapLabel.insertAfter(input);

            // putting base input inside new element
            input.insertAfter(label);
      		  
    	 	});

        function arrowDownCounterTimerStart(){
           arrowDownCounterTimerId = setInterval( arrowDownCounterTimer, arrowDownCounterTimerInteval);
        }

        function arrowDownCounterTimer(){
          updateInputValueByDelta(deltaDirection);
        }

        function arrowWindowMouseUp(e) {
          jQuery(window).unbind('mouseup', arrowWindowMouseUp);
          if(arrowDownStarTimerId){
            clearTimeout( arrowDownStarTimerId );
            arrowDownStarTimerId = null;
          }

          if(arrowDownCounterTimerId){
            clearInterval( arrowDownCounterTimerId );
            arrowDownCounterTimerId = null;
          }
        };

        function inputFocusOut(e){
          var input = jQuery(this);
          var label = valueLabel;//input.next();
          
          if(label.hasClass('inputSliderLabel')){
            
            label.show();
            input[0].type = 'hidden' ;
          }
          return false;
        }

    	 	function onValueChange(e){
    	 		var input = jQuery(this);
    	 		var label = valueLabel;
          if(label.hasClass('inputSliderLabel')){
            var newValue = input.val();
            
            if( !isInt(settings.step))
              newValue = parseFloat(newValue).toFixed(2);
            else  
              newValue = parseInt(newValue);

            if(typeof settings.minValue != 'undefined' && newValue < settings.minValue)
              newValue = settings.minValue;  

            if(typeof settings.maxValue != 'undefined' && newValue > settings.maxValue)
              newValue = settings.maxValue; 

              
    	 		  label.text(newValue);
            label.show();
            input.val( newValue );
            input[0].type = 'hidden';
          }
    	 		return false;
    	 	}

    	 	var prevMouseWindowX;
    	 	var currentInput;
        var labelMouseDownDone = false;
    	 	function labelMouseDown(e){
    	 	   
    	 	   prevMouseWindowX = e.clientX;
    	 	   jQuery(window).bind('mousemove', windowMouseMove);
    	 	   jQuery(window).bind('mouseup', windowMouseUp);
    	 	   currentInput = baseInput;
           labelMouseDownDone = true;
    	 	}

        function labelMouseUp(e){
          var label = jQuery(this);
          var input = baseInput;
          if(labelMouseDownDone){
            label.hide();
            input[0].type = 'text';
            input.focus();
            input.select();
            labelMouseDownDone = false;
            jQuery(window).unbind('mousemove', windowMouseMove);
            jQuery(window).unbind('mouseup', windowMouseUp);
          }
          return false;
        }

			  function windowMouseUp(e){
    	 	   jQuery(window).unbind('mousemove', windowMouseMove);
    	 	   jQuery(window).unbind('mouseup', windowMouseUp);
    	 	}

        function rightArrowClick(e){
          updateInputValueByDelta(1);
        }

        function leftArrowClick(e){
          updateInputValueByDelta(-1);
        }

        function updateInputValueByDelta(delta){
          
          var prevVal;
          var stepIsFloat = false;
          delta = parseInt(delta);
          if( isInt(settings.step))
            prevVal = parseInt(baseInput.val())
          else{
            prevVal = parseFloat(baseInput.val());
            stepIsFloat = true;
          }

          var newVal = prevVal + delta * settings.step;
          
          if(stepIsFloat)
              newVal = newVal.toFixed(2);

          if(typeof settings.minValue != 'undefined' && newVal < settings.minValue)
            newVal = settings.minValue;  

          if(typeof settings.maxValue != 'undefined' && newVal > settings.maxValue)
            newVal = settings.maxValue;  

          baseInput.val(newVal).change();
          
        }

    	 	function windowMouseMove(e){
    	 		var delta = e.clientX - prevMouseWindowX;
    	 		prevMouseWindowX = e.clientX;
          updateInputValueByDelta(delta);

    	 		return false;
    	 	}

        function isInt(n) {
          return typeof n === 'number' && parseFloat(n) == parseInt(n, 10) && !isNaN(n);
        }

        }
    });
})( jQuery );