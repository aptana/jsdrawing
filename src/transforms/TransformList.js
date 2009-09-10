/**
 * TransformList
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

function TransformList() {
	this.transforms = [];
	this._transform = null;
}

/*
 * Methods
 */

/**
 * Add the specified transform to the end of this list of transform
 * 
 * @param {ITransform} transform
 * 		The transform to append to this list
 */
TransformList.prototype.addTransform = function(transform) {
	// add transform
	this.transforms.add(transform);
	
	// invalidate the cache
	this._transform = null;
};

/**
 * Remove all transforms from this list
 */
TransformList.prototype.clear = function() {
	// zero out the list
	this.transforms.length = 0;
	
	// invalidte the cache
	this._transform = null;
};

/**
 * Remove the specified transform from this list. This method performs no
 * action if the transform does not exist in this list
 * 
 * @param {ITransform} transform
 */
TransformList.prototype.removeTransform = function(transform) {
	for (var i = 0; i < this.transforms.length; i++) {
		var target = this.transforms[i];
		
		if (target === transform) {
			this.transforms.splice(i, 1);
			break;
		}
	}
};

/*
 * ITransform implementation
 */

/**
 * @see ITransform#getTransformMatrix
 */
TransformList.prototype.getTransformMatrix = function() {
	if (this._transform == null) {
		var result = new Matrix();
		
		for (var i = 0; i < this.transforms.length; i++) {
			var transform = this.transforms[i];
			var matrix = transform.getTransformMatrix();
			
			result.postMultiplyEquals(matrix);
		}
		
		this._transform = result;
	}
	
	return this._transform;
};

/**
 * @see ITransform#getTransformText
 */
TransformList.prototype.getTransformText = function() {
	var buffer = [];
	
	for (var i = 0; i < this.transforms.length; i++) {
		var transform = this.transforms[i];
		
		buffer.push(transform.getTransformText());
	}
	
	return buffer.join(" ");
};