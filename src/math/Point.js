/**
 * Point
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
 * Create a new instance of Point
 * 
 * @constructor 
 * @param {Number} x
 * 		The x-coordinate of the new Point
 * @param {Number} y
 * 		The y-coordinate of the new Point
 */
function Point(x, y) {
	this.x = x;
	this.y = y;
}

/*
 * Methods
 */

/**
 * Linearly interpolate between this point and another.
 * 
 * @param {Point} that
 * 		The other point used for this interpolation
 * @param {Number} t
 * 		A value that is clamped to the close interval [0,1], where zero
 * 		will return a value equal to this Point and one will return a
 * 		value equal to the other point. All other values will return a
 * 		point in between the two.
 * @return {Point} Returns a new point between this point and the other
 */
Point.prototype.lerp = function(that, t) {
	t = Math.min(1.0, t);
	t = Math.max(0.0, t);
	
	var omt = 1.0 - t;
	
	return new Point(
		this.x * omt + that.x * t,
		this.y * omt + that.y * t
	);
};

/**
 * Find the point exactly in the middle of this point and another. This is
 * equivalent to calling lerp(that, 0.5), however this may execute a bit
 * faster for this one special case t-value
 * 
 * @param {Point} that
 * 		The other point used to calculate the mid-point
 */
Point.prototype.midpoint = function(that) {
	return new Point(
		(this.x + that.x) * 0.5,
		(this.y + that.y) * 0.5
	)
};

/**
 * Return a string representation of this point
 * 
 * @return {String} Return a string representation of this point
 */
Point.prototype.toString = function() {
	return this.x + "," + this.y;
};
