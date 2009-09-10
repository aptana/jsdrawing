/**
 * Circle
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
Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;
Circle.prototype.superclass = Shape;

/*
 * Constructors
 */

/**
 * Create a new instance of Circle
 * 
 * @constructor
 */
function Circle() {
	this.superclass.call(this);
	
	this._cx = 0;
	this._cy = 0;
	this._radius = 0;
}

/**
 * get cx
 */
Circle.prototype.get_cx = function() {
	return this._cx;
};

/**
 * set cx
 * @param {Object} cx
 */
Circle.prototype.set_cx = function(cx) {
	this._cx = cx - 0;
};

/**
 * get cy
 */
Circle.prototype.get_cy = function() {
	return this._cy;
};

/**
 * set cy
 * @param {Object} cy
 */
Circle.prototype.set_cy = function(cy) {
	this._cy = cy - 0;
};

/**
 * get radius
 */
Circle.prototype.get_radius = function() {
	return this._raduis;
}

/**
 * set radius
 * @param {Object} radius
 */
Circle.prototype.set_radius = function(radius) {
	this._radius = radius - 0;
};

/**
 * draw shape
 * @param {Object} canvas
 */
Circle.prototype.draw = function(canvas) {
	var x = this._cx - this._radius;
	var y = this._cy - this._radius;
	var w = this._radius * 2;
	
	if (this._fill != null) {
		canvas.setColor(this._fill);
		canvas.fillEllipse(x, y, w, w);
	}
	
	if (this._stroke != null) {
		canvas.setStroke(this._stroke);
		canvas.drawEllipse(x, y, w, w);
	}
};