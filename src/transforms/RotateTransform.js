/**
 * RotateTransform
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
 * Create a new instance of RotateTransform
 * 
 * @constructor
 * @param {Number} angle
 * 		The angle of rotation in degress
 * @param {Point} [origin]
 * 		An optional parameter that specifies the origin of rotation
 */
function RotateTransform(angle, origin) {
	this.angle = angle;
	this.origin = origin || new Point(0,0);
	this._transform = null;
}

/*
 * ITransform implementation
 */

/**
 * @see ITransform#getTransformMatrix
 */
RotateTransform.prototype.getTransformMatrix = function() {
	if (this._transform == null) {
		var result = new Matrix();
		
		result.postRotateAtEquals(this.angle, this.origin);
		
		this._transform = result;
	}
	
	return this._transform;
};

/**
 * @see ITransform#getTransformText
 */
RotateTransform.prototype.getTransformText = function() {
	var result = "rotate(" + this.angle;
	
	if (this.origin != null && (this.origin.x != 0 || this.origin.y != 0)) {
		result += "," + this.origin.toString();
	}
	
	result += ")";
	
	return result;
};