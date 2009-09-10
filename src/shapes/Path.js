/**
 * Path
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
Path.prototype = new Shape();
Path.prototype.constructor = Path;
Path.prototype.superclass = Shape;

/*
 * Constructors
 */

/**
 * Create a new instance of Path
 * 
 * @constructor
 * @param {String} pathData
 */
function Path(pathData) {
	this.superclass.call(this);
	
	this._pathData = pathData;
}

/*
 * Methods
 */

/**
 * @see Shape@draw
 */
Path.prototype.draw = function(renderer) {
	if (this.fill != null || (this.stroke != null && this.strokeWidth != 0)) {
		if (this.fill != null) {
			renderer.setFillColor(this.fill);
		}
		
		if (this.stroke != null && this.strokeWidth != 0.0) {
			renderer.setStrokeColor(this.stroke);
			renderer.setStrokeWidth(this.strokeWidth);
		}
		
		// push transform
		if (this.hasTransform()) {
			renderer.pushTransform(this.transform);
		}
		
		// render
		renderer.renderPathData(this._pathData);
		
		// remove transform
		if (this.hasTransform()) {
			renderer.popTransform();
		}
	}
};
