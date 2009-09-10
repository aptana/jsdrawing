/**
 * SVGBridge
 * 
 * @author Kevin Lindsey
 * @version 1.0
 * 
 * Copyright (c) 2005-2006, Kevin Lindsey
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 *     - Redistributions of source code must retain the above copyright notice,
 *       this list of conditions and the following disclaimer.
 * 
 *     - Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 * 
 *     - Neither the name of this software nor the names of its contributors
 *       may be used to endorse or promote products derived from this software
 *       without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 */

/*
 * Class constants
 */
SVGBridge.svgns = "http://www.w3.org/2000/svg";

/*
 * Constructors
 */

/**
 * Create a new instance of SVGBridge
 * 
 * @constructor
 * @param {String} id
 * 		The id of the element that will be used as for rendering
 */
function SVGBridge(id) {
	this._canvas = document.getElementById(id);
	
	this._svgRoot = document.createElementNS(SVGBridge.svgns, "svg");
	this._canvas.appendChild(this._svgRoot);
	
	this._fill;
	this._stroke;
	this._strokeWidth;
	this._transform;
	
	this._pathData;
}

/*
 * Methods
 */

/**
 * Add the specified command to the current path definition
 * 
 * @param {String} command
 * 		This is the SVG command character that will be added to the path
 * 		definition
 * @param {Arguments} args
 * 		These are the arguments, if any, that were passed with the command
 */
SVGBridge.prototype._addCommand = function(command, args) {
	var argArray = [];
	var sameCommand = (command == this._lastCommand);
	var impliedLine = (this._lastCommand == "M" && command == "L");
	
	for (var i = 0; i < args.length; i++) {
		argArray[i] = args[i];
	}
	
	if (sameCommand || impliedLine) {
		this._pathData.push(argArray.join(","));
	} else {
		this._pathData.push(command + argArray.join(","));
	}
};

/*
 * IBridge implementation
 */

/**
 * @see IBridge#isSupported
 */
SVGBridge.isSupported = function() {
	var result = false;
	
	if (document.createElementNS) {
		var svg = document.createElementNS(SVGBridge.svgns, "svg");
		
		result = (svg.x != null);
	}
	
	return result;
};

/**
 * @see IBridge#clear
 */
SVGBridge.prototype.clear = function() {
	while (this._svgRoot.hasChildNodes()) {
		this._svgRoot.removeChild(this._svgRoot.firstChild);
	}
};

/**
 * @see IBridge#beginRender
 */
SVGBridge.prototype.beginRender = function() {
	this._pathData = [];
};

/**
 * @see IBridge#endRender
 */
SVGBridge.prototype.endRender = function() {
	var pathData = this._pathData.join(" ");
	
	this.renderPathData(pathData);
};

/**
 * @see IBridge@popTransform
 */
SVGBridge.prototype.popTransform = function() {
	this._transform = null;
};

/**
 * @see IBridge@pushTransform
 */
SVGBridge.prototype.pushTransform = function(transform) {
	this._transform = transform;
};

/**
 * @see IBridge#setFillColor
 */
SVGBridge.prototype.setFillColor = function(fill) {
	this._fill = fill;
};

/**
 * @see IBridge#setStrokeColor
 */
SVGBridge.prototype.setStrokeColor = function(stroke) {
	this._stroke = stroke;
};

/**
 * @see IBridge#setStrokeWidth
 */
SVGBridge.prototype.setStrokeWidth = function(width) {
	this._strokeWidth = width;
};

/**
 * @see IBridge#renderPathData
 */
SVGBridge.prototype.renderPathData = function(pathData) {
	if (this._fill != null || (this._stroke != null && this._strokeWidth > 0)) {
		var path = document.createElementNS(SVGBridge.svgns, "path");
		
		path.setAttributeNS(null, "d", pathData);
			
		if (this._fill != null) {
			var fillValue;
			
			if (this._fill.constructor === Color) {
				fillValue = this._fill.toHex(); 
			} else {
				fillValue = this._fill;
			}
			
			path.setAttributeNS(null, "fill", fillValue);
		} else {
			path.setAttributeNS(null, "fill", "none");
		}
		
		if (this._stroke != null && this._strokeWidth > 0) {
			var strokeValue;
			
			if (this._stroke.constructor === Color) {
				strokeValue = this._stroke.toHex(); 
			} else {
				strokeValue = this._stroke;
			}
			
			path.setAttributeNS(null, "stroke", strokeValue);
			path.setAttributeNS(null, "stroke-width", this._strokeWidth);
		}
		
		if (this._transform != null) {
			var transform = this._transform.getTransformText();
			
			path.setAttributeNS(null, "transform", transform);
		}
		
		this._svgRoot.appendChild(path);
	}
};

/**
 * see IBridge#arcTo
 */
SVGBridge.prototype.arcTo = function(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
    this._addCommand("A", arguments);
};

/**
 * see IBridge#curveTo
 */
SVGBridge.prototype.curveTo = function(x1, y1, x2, y2, x, y) {
    this._addCommand("C", arguments);
};

/**
 * see IBridge#lineTo
 */
SVGBridge.prototype.lineTo = function(x, y) {
    this._addCommand("L", arguments);
};

/**
 * see IBridge#moveTo
 */
SVGBridge.prototype.moveTo = function(x, y) {
    this._addCommand("M", arguments);
};

/**
 * see IBridge#quadraticCurveTo
 */
SVGBridge.prototype.quadraticCurveTo = function(x1, y1, x, y) {
    this._addCommand("Q", arguments);
};

/**
 * see IBridge#close
 */
SVGBridge.prototype.close = function() {
    this._addCommand("z", arguments);
};
