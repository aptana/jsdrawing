/**
 * Matrix
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
 * Create a new instance of Matrix
 * 
 * @param {Object} m11 The value at 1,1
 * @param {Object} m12 The value at 1,2
 * @param {Object} m21 The value at 2,1
 * @param {Object} m22 The value at 2,2
 * @param {Object} offsetX The value at 3,1
 * @param {Object} offsetY The value at 3,2
 */
function Matrix(m11, m12, m21, m22, offsetX, offsetY) {
	if (arguments.length == 6) {
		this.m11 = m11;
		this.m12 = m12;
		this.m21 = m21;
		this.m22 = m22;
		this.offsetX = offsetX;
		this.offsetY = offsetY;
	} else {
		this.setToIdentity();
	}
}

/*
 * Properties
 */

/**
 * Get this matrix's determinant
 * 
 * @return {Number} Returns the determinant of this matrix
 */
Matrix.prototype.getDeterminant = function() {
	return this.m11 * this.m22 - this.m21 * this.m12;
};

/**
 * Determine if this matrix is invertible
 * 
 * @return {Boolean} Returns true if this matrix has an inverse
 */
Matrix.prototype.hasInvserse = function() {
	return this.getDeterminant() != 0.0;
};

/**
 * Get the inverse of this matrix
 * 
 * @return {Matrix} Returns the inverse matrix
 */
Matrix.prototype.getInverse = function() {
	var det1 = this.getDeterminant();

	if ( det1 == 0.0 ) 
	{
		throw new InvalidOperationException("Matrix not invertible");
	} 

	return new Matrix(
		 this.m22 / det1,
		-this.m12 / det1,
		-this.m21 / det1,
		 this.m11 / det1,
		(this.m21*this.offsetY - this.offsetX*this.m22) / det1,
		(this.offsetX*this.m12 - this.m11*this.offsetY) / det1
	);
};

/**
 * Determine if this matrix is the identity matrix
 * 
 * @return {Boolean} Returns true if this matrix is the identity matrix
 */
Matrix.prototype.isIdentity = function() {
	return (
		this.m11     == 1.0 &&
		this.m12     == 0.0 &&
		this.m21     == 0.0 &&
		this.m22     == 1.0 &&
		this.offsetX == 0.0 &&
		this.offsetY == 0.0

	);
};

/*
 * Methods
 */

/**
 * Set this matrix to the identity matrix
 */
Matrix.prototype.setToIdentity = function() {
	this.m11 = 1;
	this.m12 = 0;
	this.m21 = 0;
	this.m22 = 1;
	this.offsetX = 0;
	this.offsetY = 0;
};

/**
 * This is equivalent to matrix * this
 * 
 * @param {Object} matrix
 * 		The matrix to pre-multiply against this matrix
 * @return {Matrix} The resulting matrix
 */
Matrix.prototype.preMultiply = function(matrix) {
	return new Matrix(
		matrix.m11*this.m11     + matrix.m12*this.m21,
		matrix.m11*this.m12     + matrix.m12*this.m22,
		matrix.m21*this.m11     + matrix.m22*this.m21,
		matrix.m21*this.m12     + matrix.m22*this.m22,
		matrix.offsetX*this.m11 + matrix.offsetY*this.m21 + this.offsetX,
		matrix.offsetX*this.m12 + matrix.offsetY*this.m22 + this.offsetY
	);
};

/**
 * This is equivalent to this = matrix * this
 * 
 * @param {Object} matrix
 * 		The matrix to pre-multiply against this matrix
 */
Matrix.prototype.preMultiplyEquals = function(matrix) {
	var a = matrix.m11*this.m11     + matrix.m12*this.m21;
	var b = matrix.m11*this.m12     + matrix.m12*this.m22;
	var c = matrix.m21*this.m11     + matrix.m22*this.m21;
	var d = matrix.m21*this.m12     + matrix.m22*this.m22;
	var e = matrix.offsetX*this.m11 + matrix.offsetY*this.m21 + this.offsetX;
	var f = matrix.offsetX*this.m12 + matrix.offsetY*this.m22 + this.offsetY;

	this.m11 = a;
	this.m12 = b;
	this.m21 = c;
	this.m22 = d;
	this.offsetX = e;
	this.offsetY = f;
};

/**
 * This is equivalent to this * matrix;
 * 
 * @param {Matrix} matrix
 * 		The matrix to post-multiply against this matrix
 * @return {Matrix} The resulting matrix
 */
Matrix.prototype.postMultiply = function(matrix) {
	return new Matrix(
		this.m11*matrix.m11     + this.m12*matrix.m21,
		this.m11*matrix.m12     + this.m12*matrix.m22,
		this.m21*matrix.m11     + this.m22*matrix.m21,
		this.m21*matrix.m12     + this.m22*matrix.m22,
		this.offsetX*matrix.m11 + this.offsetY*matrix.m21 + matrix.offsetX,
		this.offsetX*matrix.m12 + this.offsetY*matrix.m22 + matrix.offsetY
	);
};

/**
 * This is equivalent to this *= matrix;
 * 
 * @param {Matrix} matrix
 * 		The matrix to post-multiply against this matrix
 */
Matrix.prototype.postMultiplyEquals = function(matrix) {
	var a = this.m11*matrix.m11     + this.m12*matrix.m21;
	var b = this.m11*matrix.m12     + this.m12*matrix.m22;
	var c = this.m21*matrix.m11     + this.m22*matrix.m21;
	var d = this.m21*matrix.m12     + this.m22*matrix.m22;
	var e = this.offsetX*matrix.m11 + this.offsetY*matrix.m21 + matrix.offsetX;
	var f = this.offsetX*matrix.m12 + this.offsetY*matrix.m22 + matrix.offsetY;

	this.m11 = a;
	this.m12 = b;
	this.m21 = c;
	this.m22 = d;
	this.offsetX = e;
	this.offsetY = f;
};

/**
 * Apply a rotation about the origin. This is equivalent to this *= rotate(angle)
 * 
 * @param {Number} angle
 * 		The angle of rotation in degrees
 */
Matrix.prototype.postRotateEquals = function(angle) {
	var radians = angle * Math.PI / 180.0;
	var cos = Math.Cos(radians);
	var sin = Math.Sin(radians);

	var a = this.m11*cos - this.m12*sin;
	var b = this.m11*sin + this.m12*cos;
	var c = this.m21*cos - this.m22*sin;
	var d = this.m21*sin + this.m22*cos;
	var e = this.offsetX*cos - this.offsetY*sin;
	var f = this.offsetX*sin + this.offsetY*cos;

	this.m11 = a;
	this.m12 = b;
	this.m21 = c;
	this.m22 = d;
	this.offsetX = e;
	this.offsetY = f;
};

/**
 * Apply a rotation about the origin. This is equivalent to this = rotate(angle) * this
 * 
 * @param {Number} angle
 * 		The angle of rotation in degrees
 */
Matrix.prototype.preRotateEquals = function(angle) {
	// TODO: this function has not been tested
	var radians = angle * Math.PI / 180.0;
	var cos = Math.Cos(radians);
	var sin = Math.Sin(radians);

	var a = this.m11* cos + this.m21*sin;
	var b = this.m12* cos + this.m22*sin;
	var c = this.m11*-sin + this.m21*cos;
	var d = this.m12*-sin + this.m22*cos;
	var e = this.offsetX;
	var f = this.offsetY;

	this.m11 = a;
	this.m12 = b;
	this.m21 = c;
	this.m22 = d;
	this.offsetX = e;
	this.offsetY = f;
};

/**
 * Apply a rotation about the specified origin. This is equivalent to
 * this *= rotate(angle, center)
 * 
 * @param {Number} angle
 * 		The angle of rotation in degrees
 * @param {Point} center
 * 		The center of rotation
 */
Matrix.prototype.postRotateAtEquals = function(angle, center) {
	var radians = angle * Math.PI / 180.0;
	var cos = Math.Cos(radians);
	var sin = Math.Sin(radians);
	var dx  = this.offsetX - center.x;
	var dy  = this.offsetY - center.y;

	var a = this.m11*cos - this.m12*sin;
	var b = this.m11*sin + this.m12*cos;
	var c = this.m21*cos - this.m22*sin;
	var d = this.m21*sin + this.m22*cos;
	var e = center.x + cos*dx - sin*dy;
	var f = center.y + sin*dx + cos*dy;

	this.m11 = a;
	this.m12 = b;
	this.m21 = c;
	this.m22 = d;
	this.offsetX = e;
	this.offsetY = f;
};

/**
 * Apply a rotation about a specified origin. This is equivalent to
 * this = rotate(angle, center) * this
 * 
 * @param {Number} angle
 * 		The angle of rotation in degrees
 * @param {Point} center
 * 		The center of rotation
 */
Matrix.prototype.preRotateAtEquals = function(angle, center) {
	// TODO: this function has not been tested
	var radians = angle * Math.PI / 180.0;
	var cos = Math.Cos(radians);
	var sin = Math.Sin(radians);
	var t1 = -center.x + center.x*cos - center.y*sin;
	var t2 = -center.y + center.y*cos + center.x*sin;

	var a = this.m11* cos + this.m21*sin;
	var b = this.m12* cos + this.m22*sin;
	var c = this.m11*-sin + this.m21*cos;
	var d = this.m12*-sin + this.m22*cos;
	var e = this.m11*t1 + this.m21*t2 + this.offsetX;
	var f = this.m12*t1 + this.m22*t2 + this.offsetY;

	this.m11 = a;
	this.m12 = b;
	this.m21 = c;
	this.m22 = d;
	this.offsetX = e;
	this.offsetY = f;
};

/**
 * Scale this matrix. This is equivalent to this *= scale(scaleX, scaleY)
 * 
 * @param {Number} scaleX
 * 		The amount to scale the x-axis
 * @param {Number} scaleY
 * 		The amount to scale the y-axis
 */
Matrix.prototype.postScaleEquals = function(scaleX, scaleY) {
	this.m11 *= scaleX;
	this.m12 *= scaleY;
	this.m21 *= scaleX;
	this.m22 *= scaleY;
	this.offsetX *= scaleX;
	this.offsetY *= scaleY;
};

/**
 * Scale this matrix. This is equivalent to this = scale(scaleX, scaleY) * this
 * 
 * @param {Number} scaleX
 * 		The amount to scale the x-axis
 * @param {Number} scaleY
 * 		The amount to scale the y-axis
 */
Matrix.prototype.preScaleEquals = function(scaleX, scaleY) {
	this.m11 *= scaleX;
	this.m12 *= scaleX;
	this.m21 *= scaleY;
	this.m22 *= scaleY;
};

/**
 * Scale this matrix at the specified point. This is equivalent to
 * this *= scale(scaleX, scaleY, origin)
 * 
 * @param {Number} scaleX
 * 		The amount to scale the x-axis
 * @param {Number} scaleY
 * 		The amount to scale the y-axis
 * @param {Point} origin
 * 		The point that serves as the origin of this scale
 */
Matrix.prototype.postScaleAtEquals = function(scaleX, scaleY, origin) {
	this.m11 *= scaleX;
	this.m12 *= scaleY;
	this.m21 *= scaleX;
	this.m22 *= scaleY;
	this.offsetX = (this.offsetX - origin.x)*scaleX + origin.x;
	this.offsetY = (this.offsetY - origin.y)*scaleY + origin.y;
};

/**
 * Scale this matrix at the specified point. This is equivalent to
 * this = scale(scaleX, scaleY, origin) * this
 * 
 * @param {Number} scaleX
 * 		The amount to scale the x-axis
 * @param {Number} scaleY
 * 		The amount to scale the y-axis
 * @param {Point} origin
 * 		The point that serves as the origin of this scale
 */
Matrix.prototype.preScaleAtEquals = function(scaleX, scaleY, origin) {
	// TODO: this function has not been tested
	var dx = origin.x - scaleX * origin.x;
	var dy = origin.y - scaleY * origin.y;

	this.m11 *= scaleX;
	this.m12 *= scaleX;
	this.m21 *= scaleY;
	this.m22 *= scaleY;
	this.offsetX = this.offsetX + this.m11*dx + this.m21*dy;
	this.offsetY = this.offsetY + this.m12*dx + this.m22*dy;
};

/**
 * Skew this matrix. This is equivalent to this *= skew(skewX, skewY)
 * 
 * @param {Number} skewX
 * 		The angle, in degrees, of the skew for the x-axis
 * @param {Number} skewY
 * 		The angle, in degrees, of the skew for the y-axis
 */
Matrix.prototype.postSkewEquals = function(skewX, skewY) {
	var tanX = Math.Tan(skewX * Math.PI / 180.0);
	var tanY = Math.Tan(skewY * Math.PI / 180.0);

	var a = this.m11 + this.m12*tanX;
	var b = this.m11*tanY + this.m12;
	var c = this.m21 + this.m22*tanX;
	var d = this.m21*tanY + this.m22;
	var e = this.offsetX + this.offsetY*tanX;
	var f = this.offsetX*tanY + this.offsetY;

	this.m11 = a;
	this.m12 = b;
	this.m21 = c;
	this.m22 = d;
	this.offsetX = e;
	this.offsetY = f;
};

/**
 * Skew this matrix. This is equivalent to this = skew(skewX, skewY) * this
 * 
 * @param {Number} skewX
 * 		The angle, in degrees, of the skew for the x-axis
 * @param {Number} skewY
 * 		The angle, in degrees, of the skew for the y-axis
 */
Matrix.prototype.preSkewEquals = function(skewX, skewY) {
	// TODO: this function has not been tested
	var tanX = Math.Tan(skewX * Math.PI / 180.0);
	var tanY = Math.Tan(skewY * Math.PI / 180.0);

	var a = this.m11 + this.m21*tanY;
	var b = this.m12 + this.m22*tanY;
	var c = this.m11*tanX + this.m21;
	var d = this.m12*tanX + this.m22;

	this.m11 = a;
	this.m12 = b;
	this.m21 = c;
	this.m22 = d;
};

/**
 * Skew this matrix using the specified point as an origin. This is equivalent to
 * this *= skew(skewX, skewY, origin)
 * 
 * @param {Number} skewX
 *		The angle, in degrees, of the skew for the x-axis
 * @param {Number} skewY
 * 		The angle, in degrees, of the skew for the y-axis
 * @param {Point} origin
 * 		The point that serves as the origin of this scale
 */
Matrix.prototype.postSkewAtEquals = function(skewX, skewY, origin) {
	var tanX = Math.Tan(skewX * Math.PI / 180.0);
	var tanY = Math.Tan(skewY * Math.PI / 180.0);

	var a = this.m11 + this.m12*tanX;
	var b = this.m11*tanY + this.m12;
	var c = this.m21 + this.m22*tanX;
	var d = this.m21*tanY + this.m22;
	var e = this.offsetX + (this.offsetY - origin.y)*tanX;
	var f = (this.offsetX - origin.x)*tanY + this.offsetY;

	this.m11 = a;
	this.m12 = b;
	this.m21 = c;
	this.m22 = d;
	this.offsetX = e;
	this.offsetY = f;
};

/**
 * Skew this matrix using the specified point as an origin. This is equivalent to
 * this = skew(skewX, skewY, origin) * this
 * 
 * @param {Number} skewX
 *		The angle, in degrees, of the skew for the x-axis
 * @param {Number} skewY
 * 		The angle, in degrees, of the skew for the y-axis
 * @param {Point} origin
 * 		The point that serves as the origin of this scale
 */
Matrix.prototype.preSkewAtEquals = function(offestX, offsetY, origin) {
	throw new Error("not implemented");
};

/**
 * Translate this matrix. This is equivalent to this *= trans(offsetX, offsetY)
 * 
 * @param {Number} offsetX
 * 		The amount to translate in the x-axis
 * @param {Number} offsetY
 * 		The amount to translate in the y-axis
 */
Matrix.prototype.postTranslateEquals = function(offsetX, offsetY) {
	this.offsetX += offsetX;
	this.offsetY += offsetY;
};

/**
 * Translate this matrix. This is equivalent to this = trans(offsetX, offsetY) * this
 * 
 * @param {Number} offsetX
 * 		The amount to translate in the x-axis
 * @param {Number} offsetY
 * 		The amount to translate in the y-axis
 */
Matrix.prototype.preTranslateEquals = function(offsetX, offsetY) {
	this.offsetX += this.m11*offsetX + this.m21*offsetY;
	this.offsetY += this.m12*offsetX + this.m22*offsetY;
};

/**
 * Return a string representation of this matrix
 * 
 * @return {String} Return a string representation of this matrix
 */
Matrix.prototype.toString = function() {
	return [
		this.m11,
		this.m12,
		this.m21,
		this.m22,
		this.offsetX,
		this.offsetY
	].join(",");
};

/*
 * Point and Vector methods
 */

/**
 * Transform the point
 * 
 * @param {Point} point
 * 		The point to transform
 * @return {Point} Returns a transformed point
 */
Matrix.prototype.transformPoint  = function(point) {
	return new Point(
		this.m11*point.x + this.m21*point.y + this.offsetX,
		this.m12*point.x + this.m22*point.y + this.offsetY
	);
};

/**
 * Transform the vector
 * 
 * @param {Vector} point
 * 		The vector to transform
 * @return {Vector} Returns a transformed vector
 */
Matrix.prototype.transformPoint  = function(vector) {
	// TODO: this function has not been tested
	return new Vector(
		this.m11*point.x + this.m21*point.y,
		this.m12*point.x + this.m22*point.y
	);
};