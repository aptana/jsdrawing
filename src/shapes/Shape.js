/**
 * Shape
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
 * Class properties
 */
Shape.transformParser = null;

/*
 * Constructors
 */

/**
 * Create a new instance of Shape
 * 
 * @constructor
 */
function Shape() {
	this.stroke = null;
	this.strokeWidth = 0.0;
	this.fill = null;
	this.transform = null;
}

/*
 * Properties
 */

/**
 * Determine if this shape has a transform.
 * 
 * @return {Boolean} Returns true only if transform is not null and is not the identity matrix
 */
Shape.prototype.hasTransform = function() {
	return (this.transform != null);
};

/**
 * Set the current transform to be applied to this shape
 * 
 * @param {String,ITransform} transform
 * 		If this parameter is a string, then it is assumed by be an SVG
 * 		transform as you would define in the transform attribute. This
 * 		function will convert the string into a TransformList. Otherwise this
 * 		parameter is expected to be an ITransform or null
 */
Shape.prototype.setTransform = function(transform) {
	if (transform.constructor === String) {
		// parse transform
		var parser = Shape.transformParser;
		
		if (parser == null) {
			parser = new TransformParser();
			
			// cache for later
			Shape.transformParser = parser;
		}
		
		// make sure we start with an empty transform list
		if (this.transform === TransformList) {
			this.transform.clear();
		} else {
			this.transform = new TransformList();
		}
		
		// we'll act as the handler as parse events are fired
		parser.setHandler(this);
		
		// parse the transform text
		parser.parseTransform(transform);
	} else {
		// assume this is a valid ITransform (or null)
		this.transform = transform
	}
}

/*
 * Methods
 */

/**
 * draw this shape in the specified canvas
 * 
 * @param {PathRenderer} canvas
 */
Shape.prototype.draw = function(renderer) {
	throw new Error("subclasses must override the Shape.draw method");
}

/*
 * TransformParser handlers
 */

/**
 * process a matrix transform
 * 
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} e
 * @param {Number} f
 */
Shape.prototype.matrix = function(a, b, c, d, e, f) {
	this.transform.addTransform(
		new MatrixTransform(a, b, c, d, e, f)
	);
};

/**
 * process a translate transform
 * 
 * @param {Number} offsetX
 * @param {Number} [offsetY]
 */
Shape.prototype.translate = function(offsetX, offsetY) {
	offsetY = offsetY || offsetX;
	
	this.transform.addTransform(
		new TranslateTransform(offsetX, offsetY)
	);
};

/**
 * process a translate transform
 * 
 * @param {Number} scaleX
 * @param {Number} [scaleY]
 */
Shape.prototype.scale = function(scaleX, scaleY) {
	scaleY = scaleY || scaleX;
	
	this.transform.addTransform(
		new ScaleTransform(offsetX, offsetY)
	);
};

/**
 * process a rotate transform
 * 
 * @param {Number} angle
 * @param {Number} [originX]
 * @param {Number} [originY]
 */
Shape.prototype.rotate = function(angle, originX, originY) {
	originX = originX || 0;
	originY = originY || 0;
	
	this.transform.addTransform(
		new RotateTransform(angle, new Point(originX, originY))
	);
};

/**
 * process a skewX transform
 * 
 * @param {Number} angle
 * 		The skew angle
 */
Shape.prototype.skewX = function(angle) {
	throw new Error("not implemented");
};

/**
 * process a skewY transform
 * 
 * @param {Number} angle
 * 		The skew angle
 */
Shape.prototype.skewY = function(angle) {
	throw new Error("not implemented");
};
