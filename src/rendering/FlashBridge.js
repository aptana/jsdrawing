/**
 * FlashBridge
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
 * Constructors
 */

/**
 * Create a new instance of FlashBridge
 * 
 * @constructor
 * @param {AFLAX.MovieClip} movieClip
 * 		The underlying Flash MovieClip that will be used for rendering
 */
function FlashBridge(movieClip) {
	this._canvas = movieClip;
	
	this._stroke;
	this._strokeWidth;
	
	this._firstX;
	this._firstY;
}

/*
 * IBridge implementation
 */

/**
 * @see IBridge#isSupported
 */
FlashBridge.isSupported = function() {
	var result = false;
	
	if (navigator.userAgent.indexOf("Opera") == -1) {
		var parts = [0, 0];
		
		if (navigator.plugins && navigator.mimeTypes.length) {
			var x = navigator.plugins["Shockwave Flash"];
			
			if (x && x.description) {
				var desc1 = x.description;
				var desc2 = desc1.replace(/([a-z]|[A-Z]|\s)+/, "");
				var desc3 = desc2.replace(/(\s+r|\s+b[0-9]+)/, ".");
				
				parts = desc3.split(".");
			}
		} else if (window.ActiveXObject) {
			try {
				var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
	   			
	   			parts = axo.GetVariable("$version").split(" ")[1].split(",");
	   		} catch (e) {
		   	}
		}
		
		var major = parts[0] || 0;
	   	var minor = parts[1] || 0;
	   	
	   	result = (major > 8 ||(major == 8 && minor >= 0));
   	}
   	
   	return result;
};

/**
 * @see IBridge#clear
 */
FlashBridge.prototype.clear = function() {
	this._canvas.clear();
};

/**
 * @see IBridge#beginRender
 */
FlashBridge.prototype.endRender = function() {
	this._canvas.endFill();
	this._canvas.lineStyle(undefined);
};

/**
 * @see IBridge#setFillColor
 */
FlashBridge.prototype.setFillColor = function(fill) {
	var fillValue;
	
	if (fill.constructor === Color) {
		fillValue = fill.toInt(); 
	} else {
		fillValue = parseInt(fill.substring(1, fill.length), 16);
	}
	
	this._canvas.beginFill(fillValue, 100);
};

/**
 * @see IBridge#setStrokeColor
 */
FlashBridge.prototype.setStrokeColor = function(stroke) {
	var strokeValue;
	
	if (stroke.constructor === Color) {
		strokeValue = stroke.toInt(); 
	} else {
		strokeValue = parseInt(stroke.substring(1, fill.length), 16);
	}
	
	this._stroke = strokeValue;
	
	if (this._strokeWidth != null) {
		this._canvas.lineStyle(this._strokeWidth, this._stroke);
	}
};

/**
 * @see IBridge#setStrokeWidth
 */
FlashBridge.prototype.setStrokeWidth = function(width) {
	this._strokeWidth = width;
	
	if (this._stroke != null) {
		this._canvas.lineStyle(this._strokeWidth, this._stroke);
	}
};

/**
 * @see IBridge#moveTo
 */
FlashBridge.prototype.moveTo = function(x, y) {
	this._canvas.moveTo(x, y);
	
	this._firstX = x;
	this._firstY = y;
};

/**
 * @see IBridge#lineTo
 */
FlashBridge.prototype.lineTo = function(x, y) {
	this._canvas.lineTo(x, y);
};

/**
 * @see IBridge#quadraticCurveTo
 */
FlashBridge.prototype.quadraticCurveTo = function(x1, y1, x, y) {
	this._canvas.curveTo(x1, y1, x, y);
};

/**
 * @see IBridge#close
 */
FlashBridge.prototype.close = function() {
	this._canvas.moveTo(this._firstX, this._firstY);
};