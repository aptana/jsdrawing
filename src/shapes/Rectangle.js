/**
 * Rectangle
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
 * inheritance
 */
Rectangle.prototype = new Shape();
Rectangle.prototype.constructor = Path;
Rectangle.prototype.superclass = Shape;

/*
 * Constructors
 */

/**
 * Create a new instance of Rectangle
 * 
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {Number} [rx]
 * @param {Number} [ry]
 */
function Rectangle(x, y, width, height, rx, ry) {
	this.superclass.call(this);
	
	this._x = x;
	this._y = y;
	this._width = width;
	this._height = height;
	this._rx = rx || 0;
	this._ry = ry || 0;
}

/*
 * Methods
 */

/**
 * @see Shape@draw
 */
Rectangle.prototype.draw = function(renderer) {
	if (this.fill != null || (this.stroke != null && this.strokeWidth != 0)) {
		renderer.beginRender();
		
		if (this.fill != null) {
			renderer.setFillColor(this.fill);
		}
		
		if (this.stroke != null && this.strokeWidth != 0.0) {
			renderer.setStrokeColor(this.stroke);
			renderer.setStrokeWidth(this.strokeWidth);
		}
		
		if (this._rx == 0 && this._ry == 0) {
			renderer.movetoAbs(this._x, this._y);
			renderer.linetoAbs(this._x + this._width, this._y);
			renderer.linetoAbs(this._x + this._width, this._y + this._height);
			renderer.linetoAbs(this._x, this._y + this._height);
			renderer.closePath();
		} else {
			// temp
			var x = this._x;
			var y = this._y;
			var w = this._width;
			var h = this._height;
			var r = x + w;
			var b = y + h;
			var rx = this._rx;
			var ry = this._ry;
			
			// left
			renderer.movetoAbs(x, y + ry);
			renderer.linetoAbs(x, b - ry);
			
			// bottom-left
			renderer.curvetoQuadraticAbs(x, b, x + rx, b);
			
			// bottom 
			renderer.linetoAbs(r - rx, b);
			
			// bottom-right
			renderer.curvetoQuadraticAbs(r, b, r, b - ry);
			
			// right
			renderer.linetoAbs(r, y + ry);
			
			// top-right
			renderer.curvetoQuadraticAbs(r, y, r - rx, y);
			
			// top
			renderer.linetoAbs(x + rx, y);
			
			// top-left
			renderer.curvetoQuadraticAbs(x, y, x, y + ry)
		}
		
		renderer.endRender();
	}
};