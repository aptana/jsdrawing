/**
 * CanvasBridge
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
 * Create a new instance of CanvasBridge
 * 
 * @constructor
 * @param {String} id
 * 		The id of the canvas element that will be used for rendering
 */
function CanvasBridge(id) {
	var canvasElement = document.getElementById(id);
	
	this._width = canvasElement.width;
	this._height = canvasElement.height;
	this._canvas = canvasElement.getContext("2d");
	
	this._fill;
	this._stroke;
	this._strokeWidth;
}

/**
 * Apply the specified transform to the current rendering state
 * 
 * @param {ITransform} transform
 * 		The transform to apply to the canvas
 */
CanvasBridge.prototype._applyTransform = function(transform) {
	var ctor = transform.constructor;
	
	if (ctor === ScaleTransform)
	{
		var origin = transform.origin;
		
		if (origin.x == 0.0 && origin.y == 0.0) {
			this._canvas.scale(transform.scaleX, transform.scaleY);
		} else {
			this._canvas.translate(origin.x, origin.y);
			this._canvas.scale(transform.scaleX, transform.scaleY);
			this._canvas.translate(-origin.x, -origin.y);
		}
	}
	else if (ctor === RotateTransform)
	{
		var origin = transform.origin;
		
		if (origin.x == 0.0 && origin.y == 0.0) {
			this._canvas.rotate(transform.angle * Math.PI / 180.0);
		} else {
			this._canvas.translate(origin.x, origin.y);
			this._canvas.rotate(transform.angle * Math.PI / 180.0);
			this._canvas.translate(-origin.x, -origin.y);
		}
	}
	else if (ctor === TranslateTransform)
	{
		this._canvas.translate(transform.offsetX, transform.offsetY);
	}
	else if (ctor == TransformList)
	{
		var transforms = transform.transforms;
		
		for (var i = 0; i < transforms.length; i++) {
			this._applyTransform(transforms[i]);
		}
	}
};

/*
 * IBridge implementation
 */

/**
 * @see IBridge#isSupported
 */
CanvasBridge.isSupported = function() {
	var canvas = document.createElement("canvas");
	var result = false;
	
	if (canvas.getContext != null) {
		var context = canvas.getContext("2d");
		
		result = (context != null);
	}
	
	return result;
};

/**
 * @see IBridge#clear
 */
CanvasBridge.prototype.clear = function() {
	this._canvas.clearRect(0, 0, this._width, this._height);
};

/**
 * @see IBridge#beginRender
 */
CanvasBridge.prototype.beginRender = function() {
	this._canvas.beginPath();
};

/**
 * @see IBridge#endRender
 */
CanvasBridge.prototype.endRender = function() {
	if (this._fill != null || (this._stroke != null && this._strokeWidth > 0)) {
		if (this._fill != null) {
			var fillValue;
	
			if (this._fill.constructor === Color) {
				fillValue = this._fill.toRGB(); 
			} else {
				fillValue = this._fill;
			}
			
			this._canvas.fillStyle = fillValue;
			this._canvas.fill();
		}
		
		if (this._stroke != null && this._strokeWidth > 0) {
			var strokeValue;
	
			if (this._stroke.constructor === Color) {
				strokeValue = this._stroke.toRGB(); 
			} else {
				strokeValue = this._stroke;
			}
			
			this._canvas.strokeStyle = strokeValue;
			this._canvas.lineWidth = this._strokeWidth;
			this._canvas.stroke();
		}
	}
};

/**
 * @see IBridge@popTransform
 */
CanvasBridge.prototype.popTransform = function() {
	this._canvas.restore();
};

/**
 * @see IBridge@pushTransform
 */
CanvasBridge.prototype.pushTransform = function(transform) {
	this._canvas.save();
	this._applyTransform(transform);
};

/**
 * @see IBridge#setFillColor
 */
CanvasBridge.prototype.setFillColor = function(fill) {
	this._fill = fill;
};

/**
 * @see IBridge#setStrokeColor
 */
CanvasBridge.prototype.setStrokeColor = function(stroke) {
	this._stroke = stroke;
};

/**
 * @see IBridge#setStrokeWidth
 */
CanvasBridge.prototype.setStrokeWidth = function(width) {
	this._strokeWidth = width;
};

/**
 * @see IBridge#moveTo
 */
CanvasBridge.prototype.moveTo = function(x, y) {
	this._canvas.moveTo(x, y);
};

/**
 * @see IBridge#lineTo
 */
CanvasBridge.prototype.lineTo = function(x, y) {
	this._canvas.lineTo(x, y);
};

/**
 * @see IBridge#cubicCurveTo
 */
CanvasBridge.prototype.curveTo = function(x1, y1, x2, y2, x, y) {
	this._canvas.bezierCurveTo(x1, y1, x2, y2, x, y);
};

/**
 * @see IBridge#quadraticCurveTo
 */
CanvasBridge.prototype.quadraticCurveTo = function(x1, y1, x, y) {
	this._canvas.quadraticCurveTo(x1, y1, x, y);
};

/**
 * @see IBridge#close
 */
CanvasBridge.prototype.close = function() {
	this._canvas.closePath();
};