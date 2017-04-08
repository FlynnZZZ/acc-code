var caExamples = [

// ========= BOUNCE =============
{
  name: "Bounce",
  sketch:
  {"settings":{"duration": 0.8,"iterationCount":"1","easeFunction":"linear","preserveFillMode":false},
"frames":[

{"markerId":"start","isBasic":true,"markerTitle":"Start","percent":0,"temp":{},"properties":{"left": 0,"top":0,"scaleX":1,"scaleY":1,"opacity":1,"rotate":0}},

{"markerId":1,"markerTitle":"Bounce 1","percent":15,"temp":{},"properties":{ "top" : -25 }},

{"markerId":2,"markerTitle":"Bounce 2","percent":30,"temp":{},"properties":{ "top" : 0 }},

{"markerId":3,"markerTitle":"Bounce 3","percent":45,"temp":{},"properties":{ "top" : -15 }},

{"markerId":4,"markerTitle":"Bounce 4","percent":60,"temp":{},"properties":{ "top" : 0 }},

{"markerId":5,"markerTitle":"Bounce 5","percent":75,"temp":{},"properties":{ "top" : -5 }},


{"markerId":"end","isBasic":true,"markerTitle":"End","percent":100,"temp":{},"properties":{ "top" : 0 }}]}

},

// =========== SHAKE ================
{
	name: "Shake",
	sketch:
	{"settings":{"duration":"1","iterationCount":"1","easeFunction":"linear","preserveFillMode":false},
"frames":[

{"markerId":"start","isBasic":true,"markerTitle":"Start","percent":0,"temp":{},"properties":{"left": 0,"top":0,"scaleX":1,"scaleY":1,"opacity":1,"rotate":0}},

{"markerId":1,"markerTitle":"Shake 1","percent":10,"temp":{},"properties":{"left": -10 }},

{"markerId":2,"markerTitle":"Shake 2","percent":20,"temp":{},"properties":{"left": 10  }},

{"markerId":3,"markerTitle":"Shake 3","percent":30,"temp":{},"properties":{"left": -10  }},

{"markerId":4,"markerTitle":"Shake 4","percent":40,"temp":{},"properties":{"left": 10  }},

{"markerId":5,"markerTitle":"Shake 5","percent":50,"temp":{},"properties":{"left": -10  }},

{"markerId":6,"markerTitle":"Shake 6","percent":60,"temp":{},"properties":{"left": 10  }},

{"markerId":7,"markerTitle":"Shake 7","percent":70,"temp":{},"properties":{"left": -10  }},

{"markerId":8,"markerTitle":"Shake 8","percent":80,"temp":{},"properties":{"left": 10  }},

{"markerId":9,"markerTitle":"Shake 9","percent":90,"temp":{},"properties":{"left": -10  }},


{"markerId":"end","isBasic":true,"markerTitle":"End","percent":100,"temp":{},"properties":{ "left" : 0 }}]}
}
,
// ============== SWING =====================
{
	name: "Swing",
	sketch:
	{"settings":
	{"duration":"1","iterationCount":"1","easeFunction":"linear","preserveFillMode":false,
	"transformPoint" : "50% 0%"
	},
"frames":[

{"markerId":"start","isBasic":true,"markerTitle":"Start","percent":0,"temp":{},"properties":{"left": 0,"top":0,"scaleX":1,"scaleY":1,"opacity":1,"rotate":0}},

{"markerId":1,"markerTitle":"Swing 1","percent":20,"temp":{},"properties":{ "rotate" : 15 }},

{"markerId":2,"markerTitle":"Swing 2","percent":40,"temp":{},"properties":{ "rotate" : -10 }},

{"markerId":3,"markerTitle":"Swing 3","percent":60,"temp":{},"properties":{ "rotate" : 5 }},

{"markerId":4,"markerTitle":"Swing 4","percent":80,"temp":{},"properties":{ "rotate" : -5 }},




{"markerId":"end","isBasic":true,"markerTitle":"End","percent":100,"temp":{},"properties":{  "rotate" : 0 }}]}
}

,
// ============== TADA =====================
{
	name: "Tada",
	sketch:
	{"settings":{"duration":"1","iterationCount":"1","easeFunction":"linear","preserveFillMode":false},
"frames":[

{"markerId":"start","isBasic":true,"markerTitle":"Start","percent":0,"temp":{},"properties":{"left": 0,"top":0,"scaleX":1,"scaleY":1,"opacity":1,"rotate":0}},

{"markerId":1,"markerTitle":"Tada 1","percent":10,"temp":{},"properties":{"scaleX":0.8,"scaleY":0.8, "rotate" : -3 }},

{"markerId":2,"markerTitle":"Tada 2","percent":20,"temp":{},"properties":{"scaleX":0.8,"scaleY":0.8, "rotate" : -3 }},

{"markerId":3,"markerTitle":"Tada 3","percent":30,"temp":{},"properties":{"scaleX":1.2,"scaleY":1.2, "rotate" : 3 }},

{"markerId":4,"markerTitle":"Tada 4","percent":40,"temp":{},"properties":{"scaleX":1.2,"scaleY":1.2, "rotate" : -3 }},

{"markerId":5,"markerTitle":"Tada 5","percent":50,"temp":{},"properties":{"scaleX":1.2,"scaleY":1.2, "rotate" : 3 }},

{"markerId":6,"markerTitle":"Tada 6","percent":60,"temp":{},"properties":{"scaleX":1.2,"scaleY":1.2, "rotate" : -3 }},

{"markerId":7,"markerTitle":"Tada 7","percent":70,"temp":{},"properties":{"scaleX":1.2,"scaleY":1.2, "rotate" : 3 }},

{"markerId":8,"markerTitle":"Tada 8","percent":80,"temp":{},"properties":{"scaleX":1.2,"scaleY":1.2, "rotate" : -3 }},

{"markerId":9,"markerTitle":"Tada 9","percent":90,"temp":{},"properties":{"scaleX":1.2,"scaleY":1.2, "rotate" : 3 }},


{"markerId":"end","isBasic":true,"markerTitle":"End","percent":100,"temp":{},"properties":{ "scale":1, "rotate" : 0 }}]}
}	

,
// ============== Woble =====================
{
	name: "Woble",
	sketch:
	{"settings":{"duration":"1","iterationCount":"1","easeFunction":"linear","preserveFillMode":false},
"frames":[

{"markerId":"start","isBasic":true,"markerTitle":"Start","percent":0,"temp":{},"properties":{"left": 0,"top":0,"scaleX":1,"scaleY":1,"opacity":1,"rotate":0}},

{"markerId":1,"markerTitle":"Woble 1","percent":15,"temp":{},"properties":{"left" : -25 , "rotate" : -5 }},

{"markerId":2,"markerTitle":"Woble 2","percent":30,"temp":{},"properties":{"left" : 20, "rotate" : 3 }},

{"markerId":3,"markerTitle":"Woble 3","percent":45,"temp":{},"properties":{"left" : -15 , "rotate" : -3 }},

{"markerId":4,"markerTitle":"Woble 4","percent":60,"temp":{},"properties":{"left" : 10 , "rotate" : 2 }},

{"markerId":5,"markerTitle":"Woble 5","percent":75,"temp":{},"properties":{"left" : -5 , "rotate" : -1 }},

{"markerId":"end","isBasic":true,"markerTitle":"End","percent":100,"temp":{},"properties":{ "left" : 0, "scale":1, "rotate" : 0 }}]}

}	
,

// =========== ROTATE IN ================
{
	name: "Rotate In",
	sketch:
	{"settings":{"duration":"0.7","iterationCount":"1","easeFunction":"linear","preserveFillMode":false},
"frames":[

{"markerId":"start","isBasic":true,"markerTitle":"Start","percent":0,"temp":{},"properties":{"left": 0,"top":0,"scaleX":1,"scaleY":1,"opacity":0,"rotate":-200}},

{"markerId":"end","isBasic":true,"markerTitle":"End","percent":100,"temp":{},"properties":{ "rotate" : 0, "opacity" : 1 }}]}
}

,

// =========== ROTATE Out ================
{
	name: "Rotate Out",
	sketch:
	{"settings":{"duration":"0.7","iterationCount":"1","easeFunction":"linear","preserveFillMode":false},
"frames":[

{"markerId":"start","isBasic":true,"markerTitle":"Start","percent":0,"temp":{},"properties":{"left": 0,"top":0,"scaleX":1,"scaleY":1,"opacity":1,"rotate":0}},

{"markerId":"end","isBasic":true,"markerTitle":"End","percent":100,"temp":{},"properties":{ "rotate" : 200, "opacity" : 0 }}]}
}

,

// =========== ROTATE IN DOWN LEFT ================
{
	name: "Rotate In Down",
	sketch:
	{"settings":{"duration":"0.7","iterationCount":"1","easeFunction":"linear","preserveFillMode":false,
  "transformPoint" : "0% 100%"
  },
"frames":[

{"markerId":"start","isBasic":true,"markerTitle":"Start","percent":0,"temp":{},"properties":{"left": 0,"top":0,"scaleX":1,"scaleY":1,"opacity":0,"rotate":-90}},

{"markerId":"end","isBasic":true,"markerTitle":"End","percent":100,"temp":{},"properties":{ "rotate" : 0, "opacity" : 1 }}]}
}

,
// ============== Bounce Out =====================
{
	name: "Bounce Out",
	sketch:
	{"settings":{"duration":"1","iterationCount":"1","easeFunction":"linear","preserveFillMode":false},
"frames":[

{"markerId":"start","isBasic":true,"markerTitle":"Start","percent":0,"temp":{},"properties":{"left": 0,"top":0,"scaleX":1,"scaleY":1,"opacity":1,"rotate":0}},

{"markerId":1,"markerTitle":"Bounce Out 1","percent":25,"temp":{},"properties":{ "scaleX" : 0.95, "scaleY" : 0.95 }},

{"markerId":2,"markerTitle":"Bounce Out 2","percent":50,"temp":{},"properties":{  "scaleX" : 1.1, "scaleY" : 1.1, "opacity" : 1 }},



{"markerId":"end","isBasic":true,"markerTitle":"End","percent":100,"temp":{},"properties":{ "opacity" : 0, "scaleX" : 0.3, "scaleY" : 0.3 }}]}

}

,
// ============== Hinge =====================
{
	name: "Hinge",
	sketch:
	{"settings":{"duration":"1","iterationCount":"1","easeFunction":"ease","preserveFillMode":true,
    "transformPoint" : "0% 0%"
  },
"frames":[

{"markerId":"start","isBasic":true,"markerTitle":"Start","percent":0,"temp":{},"properties":{"left": 0,"top":0,"scaleX":1,"scaleY":1,"opacity":1,"rotate":0}},

{"markerId":1,"markerTitle":"Hinge 1","percent":20,"temp":{},"properties":{ "rotate" : 60 }},

{"markerId":2,"markerTitle":"Hinge 2","percent":40,"temp":{},"properties":{ "rotate" : 40 }},

{"markerId":3,"markerTitle":"Hinge 3","percent":60,"temp":{},"properties":{ "rotate" : 54 }},

{"markerId":4,"markerTitle":"Hinge 4","percent":80,"temp":{},"properties":{  "rotate" : 42 }},


{"markerId":"end","isBasic":true,"markerTitle":"End","percent":100,"temp":{},"properties":{ "rotate" : 46  }}]}

}	

,
// ============== Light Speed In =====================
{
	name: "Light Speed In",
	sketch:
	{"settings":{"duration":"0.8","iterationCount":"1","easeFunction":"ease-out","preserveFillMode":true,
    
  },
"frames":[

{"markerId":"start","isBasic":true,"markerTitle":"Start","percent":0,"temp":{},"properties":{"left": 300,"top":0,"scaleX":1,"scaleY":1,"opacity":0,"rotate":0, "skewX" : -30}},

{"markerId":1,"markerTitle":"LightIn 1","percent":60,"temp":{},"properties":{ "left" : -40, "opacity": 1, "skewX" : 30 }},

{"markerId":2,"markerTitle":"LightIn 2","percent":80,"temp":{},"properties":{ "left" : 0, "skewX" : -15 }},


{"markerId":"end","isBasic":true,"markerTitle":"End","percent":100,"temp":{},"properties":{ "left" : 0, "opacity" : 1, "skewX" : 0  }}]}

}

,
// ============== Bounce out left =====================
{
	name: "Bounce Out Left",
	sketch:
	{"settings":{"duration":"1","iterationCount":"1","easeFunction":"ease","preserveFillMode":true,
    
  },
"frames":[

{"markerId":"start","isBasic":true,"markerTitle":"Start","percent":0,"temp":{},"properties":{"left": 0,"top":0,"scaleX":1,"scaleY":1,"opacity":1,"rotate":0}},

{"markerId":1,"markerTitle":"BounceOut 1","percent":20,"temp":{},"properties":{ "left" : 20, "opacity": 1 }},

{"markerId":"end","isBasic":true,"markerTitle":"End","percent":100,"temp":{},"properties":{ "left" : -1000, "opacity" : 0  }}]}

},

// ============== Fade In Down =====================
{
	name: "Fade In Down",
	sketch:
	{"settings":{"duration":"1","iterationCount":"1","easeFunction":"ease","preserveFillMode":true,
    
  },
"frames":[

{"markerId":"start","isBasic":true,"markerTitle":"Start","percent":0,"temp":{},"properties":{"left": 0,"top": -25,"scaleX":1,"scaleY":1,"opacity":0,"rotate":0}},

{"markerId":"end","isBasic":true,"markerTitle":"End","percent":100,"temp":{},"properties":{ "top" : 0, "opacity" : 1  }}]}

},

// ============== Bounce In Left =====================
{
	name: "Bounce In Left",
	sketch:
	{"settings":{"duration":"1","iterationCount":"1","easeFunction":"ease","preserveFillMode":true,
    
  },
"frames":[

{"markerId":"start","isBasic":true,"markerTitle":"Start","percent":0,"temp":{},"properties":{"left": -1500,"top": 0,"scaleX":1,"scaleY":1,"opacity":0,"rotate":0}},
{"markerId":1,"markerTitle":"BounceInLeft 1","percent":60,"temp":{},"properties":{ "left" : 30, "opacity": 1 }},
{"markerId":2,"markerTitle":"BounceInLeft 2","percent":80,"temp":{},"properties":{ "left" : -10 }},
{"markerId":"end","isBasic":true,"markerTitle":"End","percent":100,"temp":{},"properties":{ "left" : 0  }}]}

}

];


var caBasicSketch = 
  {"settings":{"duration": 4,"iterationCount":"1","easeFunction":"linear","preserveFillMode":false},
"frames":[

{"markerId":"start","isBasic":true,"markerTitle":"Start","percent":0,"temp":{},"properties":{"left": 0,"top":0,"scaleX":1,"scaleY":1,"opacity":1,"rotate":0}},


{"markerId":"end","isBasic":true,"markerTitle":"End","percent":100,"temp":{},"properties":{ "top" : 0, "left" : 200, "rotate" : 180 }}]
 

};