/**
 * Vector
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
 * Statics
 */

/**
 * Create a vector rooted at p1 and pointing to p2
 * 
 * @param {Point} p1
 * 		The base of the Vector that will be created by this method
 * @param {Point} p2
 * 		The head of the Vector that will be created by this method
 * @return {Vector} Returns a newly created vector created from the specified
 * points
 */
Vector.fromPoints = function(p1, p2) {
	return new Vector(
		p2.x - p1.x,
		p2.y - p1.y
	)
};

/*
 * Properties
 */

/**
 * Determine if this vector has zero length
 * 
 * @return {Boolean} Returns true if this vector has zero length
 */
Vector.prototype.isZeroVector = function() {
	return (this.x == 0 && this.y == 0);
};

/**
 * Find the length of this vector
 * 
 * @return {Number} Returns the length of this vector
 */
Vector.prototype.length = function() {
	return Math.sqrt(this.x*this.x + this.y*this.y);
}

/*
 * Constructors
 */

/**
 * Create a new instance of Vector
 * 
 * @constructor
 * @param {Number} x
 * 		The x-component of the new Vector
 * @param {Number} y
 * 		The y-component of the new Vector
 */
function Vector(x, y) {
	this.x = x;
	this.y = y;
}

/*
 * Methods
 */

/**
 * Find the angle (in degrees) between this vector and another vector
 * 
 * @param {Vector} that
 * 		The other vector used to determine the resulting angle
 * @return {Number} Returns the angle between this vector and the other vector
 */
Vector.prototype.angleBetween = function(that) {
	var length1 = Math.sqrt(this.x*this.x + this.y*this.y);
	var length2 = Math.sqrt(that.x*that.x + that.y*that.y);
	var cos     = (this.x*that.x + this.y*that.y) / (length1 * length2);
	var radians = Math.acos(cos);

	if ( this.x*that.y - that.x*this.y < 0.0 ) 
	{
		radians = -radians;
	}

	return 180.0 * radians / Math.PI;
};

/**
 * Find the dot product between this vector and another vector
 * 
 * @param {Vector} that
 * 		The other vector used to find the dot product
 * @return {Number} Returns the dot product between this vector and the other vector
 */
Vector.prototype.dot = function(that) {
	return this.x*that.x + this.y*that.y;
};

/**
 * Find the vector that is perpendicular to the specified vector and that
 * points to this vector's head when this vector's and the specified vector's
 * tails are aligned.
 * 
 * @param {Vector} that
 * 		The vector that establishes the direction of the resulting vector
 * @return {Vector} Returns a vector perpendicular to the specified vector
 * that points to the head of this vector.
 */
Vector.prototype.perpendicular = function(that) {
	var result = this.project(that);
	
	result.x = this.x - result.x;
	result.y = this.y - result.y;
	
	return result;
};

/**
 * Find the projection of this vector onto the specified vector
 * 
 * @param {Vector} that
 * 		The vector onto which to project this vector
 * @return {Vector} Returns the projection of this vector onto the specified
 * vector
 */
Vector.prototype.project = function(that) {
	var scale = that.dot(this) / that.dot(that);
	
	return that.scale(scale);
};

/**
 * Find a vector that is a scalar product of this vector
 * 
 * @param {Number} scale
 * 		The scale that will be applied to this vector
 * @return {Vector} Returns a vector equivalent to this vector with its
 * components scaled by the scale factor
 */
Vector.prototype.scale = function(scale) {
	return new Vector(
		this.x * scale,
		this.y * scale
	);
}