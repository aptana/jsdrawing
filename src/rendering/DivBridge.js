/**
 * DivBridge
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
 * Create a new instance of DivBridge
 * 
 * @constructor
 * @param {String} id
 * 		The id of the div that will be used for rendering
 */
function DivBridge(id) {
	this._canvas = new jsGraphics(id);
	
	this._fill;
	this._stroke;
	this._strokeWidth;
	
	this._x = [];
	this._y = [];
	
	this._firstX;
	this._firstY;
}

/*
 * IBridge implementation
 */

/**
 * @see IBridge#isSupported
 */
DivBridge.isSupported = function() {
	return true;
};

/**
 * @see IBridge#clear
 */
DivBridge.prototype.clear = function() {
	this._canvas.clear();
};

/**
 * @see IBridge#endRender
 */
DivBridge.prototype.endRender = function() {
	if (this._x.length > 1) {
		if (this._fill != null || (this._stroke != null && this._strokeWidth != 0) )
		{
			if (this._fill != null) {
				var fillValue;
		
				if (this._fill.constructor === Color) {
					fillValue = this._fill.toHex(); 
				} else {
					fillValue = this._fill;
				}
				
				this._canvas.setColor(fillValue);
				this._canvas.fillPolygon(this._x, this._y);
			}
			
			if (this._stroke != null && this._strokeWidth > 0) {
				var strokeValue;
		
				if (this._stroke.constructor === Color) {
					strokeValue = this._stroke.toHex(); 
				} else {
					strokeValue = this._stroke;
				}
				
				this._canvas.setColor(strokeValue);
				this._canvas.setStroke(this._strokeWidth);
				this._canvas.drawPolyline(this._x, this._y);
			}
			
			this._canvas.paint();
		}
	}
	
	// clear point cache
	this._x = [];
	this._y = [];
};

/**
 * @see IBridge#setFillColor
 */
DivBridge.prototype.setFillColor = function(fill) {
	this._fill = fill;
};

/**
 * @see IBridge#setStrokeColor
 */
DivBridge.prototype.setStrokeColor = function(stroke) {
	this._stroke = stroke;
};

/**
 * @see IBridge#setStrokeWidth
 */
DivBridge.prototype.setStrokeWidth = function(width) {
	this._strokeWidth = width;
};

/**
 * @see IBridge#moveTo
 */
DivBridge.prototype.moveTo = function(x, y) {
	this.endRender();
	
	this._x.push(x);
	this._y.push(y);
	
	this._firstX = x;
	this._firstY = y;
};

/**
 * @see IBridge#lineTo
 */
DivBridge.prototype.lineTo = function(x, y) {
	this._x.push(x);
	this._y.push(y);
};

/**
 * @see IBridge#close
 */
DivBridge.prototype.close = function() {
	this._x.push(this._firstX);
	this._y.push(this._firstY);
	
	this.endRender();
};