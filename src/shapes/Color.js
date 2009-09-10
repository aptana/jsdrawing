/**
 * Color
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

/**
 * Create a new instance of Color
 * 
 * @constructor
 * @param {Number} red
 * 		The red channel of this color
 * @param {Number} green
 * 		The green channel of this color
 * @param {Number} blue
 * 		The blue channel of this color
 */
function Color(red, green, blue) {
	this.red = red;
	this.green = green;
	this.blue = blue;
}

/*
 * Methods
 */

/**
 * Linearly interpolate between this color and another.
 * 
 * @param {Color} that
 * 		The other color used for this interpolation
 * @param {Number} t
 * 		A value that is clamped between the close interval [0,1], where a value
 * 		of zero will return this color and a value of one will return the other
 * 		color. All values in between will be a mixture between the two colors.
 * @return {Color} Returns a new interpolated color
 */
Color.prototype.lerp = function(that, t) {
	t = Math.min(1, t);
	t = Math.max(0, t);
	
	var omt = 1.0 - t;
	var r = Math.round(this.red * omt + that.red * t);
	var g = Math.round(this.green * omt + that.green * t);
	var b = Math.round(this.blue * omt + that.blue * t);
	
	return new Color(r, g, b);
};

/**
 * toHex
 */
Color.prototype.toHex = function() {
	var r = this.red.toString(16);
	var g = this.green.toString(16);
	var b = this.blue.toString(16);
	
	if (r.length == 1) r = "0" + r;
	if (g.length == 1) g = "0" + g;
	if (b.length == 1) b = "0" + b;
	
	return "#" + r + g + b;
};

/**
 * toRGB
 */
Color.prototype.toRGB = function() {
	return "rgb(" + [this.red, this.green, this.blue].join(",") + ")";
};

/**
 * toRGBA
 */
Color.prototype.toRGBA = function() {
	return "rgba(" + [this.red, this.green, this.blue, 1].join(",") + ")";
};

/**
 * toInt
 */
Color.prototype.toInt = function() {
	return (this.red << 16 | this.green << 8 | this.blue);
};
