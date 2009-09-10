/**
 * VMLBridge
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
 * Class fields
 */
VMLBridge.initialized = false;

/*
 * Constructors
 */

/**
 * Create a new instance of VMLBridge
 * 
 * @constructor
 * @param {String} id
 */
function VMLBridge(id) {
	// save parent
	this._parent = document.getElementById(id);
	
	this._fill;
	this._stroke;
	this._strokeWidth;
	this._pathData;
	
	if (VMLBridge.initialized == false) {
		// add VML namespace
			document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
		
		// add CSS rule
		var style = document.createStyleSheet();
		style.addRule('v\\:*', "behavior: url(#default#VML);");
		
		VMLBridge.initialized = true;
	}
}

/*
 * IBridge implementation
 */

/**
 * @see IBridge#isSupported
 */
VMLBridge.isSupported = function() {
	var ie = navigator.appVersion.match(/MSIE (\d\.\d)/);
	
	return (ie && ie[1] >= 6);
};

/**
 * @see IBridge#clear
 */
VMLBridge.prototype.clear = function() {
	// remove all vml
	while (this._parent.hasChildNodes()) {
		this._parent.removeChild(this._parent.firstChild);
	}
};

/**
 * @see IBridge@beginRender
 */
VMLBridge.prototype.beginRender = function() {
	this._pathData = [];
};

/**
 * @see IBridge#endRender
 */
VMLBridge.prototype.endRender = function() {
	if (this._fill != null || (this._stroke != null && this._strokeWidth > 0)) {
		var shape = document.createElement("v:shape");
		var style = shape.style;
		var pathData = this._pathData.join(" ");
		
		style.position = "absolute";
		style.left = 0;
		style.top = 0;
		style.width = 500;
		style.height = 500;
		shape.setAttribute("coordsize", "500,500");	
		shape.setAttribute("path", pathData);
		
		// handle fill
		var fill = document.createElement("v:fill");
		
		if (this._fill != null) {
			if (this._fill.constructor === Color) {
				fill.setAttribute("color", this._fill.toHex());
			} else {
				fill.setAttribute("color", this._fill);
			}
		} else {
			fill.setAttribute("on", false);
		}
		
		shape.appendChild(fill);
		
		// handle stroke
		var stroke = document.createElement("v:stroke");
		
		if (this._stroke != null && this._strokeWidth > 0) {
			if (this._stroke.constructor === Color) {
				stroke.setAttribute("color", this._stroke.toHex());
			} else {
				stroke.setAttribute("color", this._stroke);
			}
			stroke.setAttribute("weight", this._strokeWidth);
		} else {
			stroke.setAttribute("on", false);
		}
		
		shape.appendChild(stroke);
		
		// add to parent
		this._parent.appendChild(shape);
	}
};

/**
 * @see IBridge#setFillColor
 */
VMLBridge.prototype.setFillColor = function(fill) {
	this._fill = fill;
};

/**
 * @see IBridge#setStrokeColor
 */
VMLBridge.prototype.setStrokeColor = function(stroke) {
	this._stroke = stroke;
};

/**
 * @see IBridge#setStrokeWidth
 */
VMLBridge.prototype.setStrokeWidth = function(width) {
	this._strokeWidth = width;
};

/**
 * @see IBridge#moveTo
 */
VMLBridge.prototype.moveTo = function(x, y) {
	x = Math.round(x);
	y = Math.round(y);
	
	this._pathData.push("m" + x + "," + y);
};

/**
 * @see IBridge#lineTo
 */
VMLBridge.prototype.lineTo = function(x, y) {
	x = Math.round(x);
	y = Math.round(y);
	
	this._pathData.push("l" + x + "," + y);
};

/**
 * @see IBridge#close 
 */
VMLBridge.prototype.close = function() {
	this._pathData.push("x");
};

/**
 * see IBridge#curveTo
 */
VMLBridge.prototype.curveTo = function(x1, y1, x2, y2, x, y) {
	x1 = Math.round(x1);
	y1 = Math.round(y1);
	x2 = Math.round(x2);
	y2 = Math.round(y2);
	x = Math.round(x);
	y = Math.round(y);
	
	this._pathData.push("c" + [x1, y1, x2, y2, x, y].join(","));
};
