/**
 * IBridge
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
 * This defines an interface and therefore it should not be included in the
 * overall JSDrawing library. This file serves as both a definition of the
 * entire Bridge interface and as a means of displaying content assist during
 * editing sessions in the Aptana IDE. Objects that define this interface are
 * not required to implement all methods defined here, so this isn't an
 * interface in its truest sense. However, a bridge must minimally define the
 * following methods:
 * 
 * 		moveTo
 * 		lineTo
 * 		close
 * 		isSupported
 * 
 * @constructor
 */
function IBridge() {}

/*
 * Properties
 */

/**
 * Determine if the current user agent supports this type of renderer. This
 * should be defined as a static property
 * 
 * @return {Boolean} Returns true if this renderer is supported by the current
 * user agent
 */
IBridge.prototype.isSupported = function() {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};

/*
 * Methods
 */

/**
 * Start a new rendering session. This method gives the bridge an opportunity
 * to initialize its state before drawing commands are called
 */
IBridge.prototype.beginRender = function() {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};

/**
 * Complete the current rendering session. This method gives the bridge an
 * opportunity to close out the current rendering. Typically a bridge would
 * use this to display all drawing commands that have been processed up to
 * the point of invocation of this method
 */
IBridge.prototype.endRender = function() {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};

/**
 * This clears the bridge's canvas
 */
IBridge.prototype.clear = function() {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};

/**
 * This method removes the currently active transform and restore the CTM to
 * its previous value before the last pushTransform
 */
IBridge.prototype.popTransform = function() {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};

/**
 * This method pushes a new transform into the rendering state. Typically, this
 * transform will be combined with any existing CTM that is effect. Calling
 * popTransform will restore the CTM to its value before this transform was
 * applied.
 * 
 * @param {ITransform} transform
 */
IBridge.prototype.pushTransform = function(transform) {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};

/**
 * This method allows a bridge to process the SVG path data directly.
 * Typically, bridges like SVGBridge will just pass on the path data to their
 * rendering engine; therefore, bypassing calls for each path command as the
 * path is parsed.
 * 
 * @param {String} pathData
 * 		A string of SVG path data
 */
IBridge.prototype.renderPathData = function(pathData) {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};

/**
 * Set the currently active fill color. Note that changing the fill color
 * multiple times within calls to beginRender and endRender is undefined and
 * will be determined by the individual Bridge. For example, one bridge may
 * use the first fill color that is defined after beginRender; whereas, another
 * may use the last color.
 * 
 * @param {Color,Object} fill
 * 		The fill color to be used for the current plot.
 * 
 * Note that most bridges will call a method on Color to convert to their
 * representation of color; however, if a method is not available, an object
 * can be passed that is of the type the renderer needs to represent a fill
 * color
 */
IBridge.prototype.setFillColor = function(fill) {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};

/**
 * Set the currently active stroke color. Note that changing the stroke color
 * multiple times within calls to beginRender and endRender is undefined and
 * will be determined by the individual Bridge. For example, one bridge may
 * use the first stroke color that is defined after beginRender; whereas,
 * another may use the last color.
 * 
 * @param {Color,Object} stroke
 * 		The stroke color to be used for the current plot.
 * 
 * Note that most bridges will call a method on Color to convert to their
 * representation of color; however, if a method is not available, an object
 * can be passed that is of the type the renderer needs to represent a stroke
 * color
 */
IBridge.prototype.setStrokeColor = function(stroke) {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};

/**
 * Set the currently active stroke width. Note that changing the stroke width
 * multiple times within calls to beginRender and endRender is undefined and
 * will be deteremined by the individual Bridge. For example, one bridge may
 * use the first stroke width that is defined after beginRender; whereas,
 * another may use the last width.
 * 
 * @param {Number} width
 * 		The width to be used when stroking curves in the current plot.
 */
IBridge.prototype.setStrokeWidth = function(width) {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};

/**
 * Plot an arc whose raduii are defined by (rx,ry). Other parameters determine
 * the rotation of the arc, with respect to the x-axis, the sweep direction,
 * and the final (x,y) where the pen is left for the next plot.
 * 
 * Note that it is possible to define an arc that cannot meet all requirements
 * as defined by these parameters. In that case, the rx and ry values will be
 * scaled to make the arc plottable given the other parameter values
 * 
 * @param {Number} rx
 * 		The x-radius of this arc
 * @param {Number} ry
 * 		The y-radius of this arc
 * @param {Number} xAxisRotation
 * 		The x-rotation of this arc
 * @param {Boolean} largeArcFlag
 * 		A flag that indicates whether the shortest arc or the longest arc
 * 		should be used starting from the current point and ending at (x,y)
 * @param {Boolean} sweepFlag
 * 		A flag that indicates whether the clockwise or counter-clockwise
 * 		sweep should be followed
 * @param {Number} x
 * 		The plotting pen's x-position after this arc has been plotted
 * @param {Number} y
 * 		The plotting pen's y-position after this arc has been plotted
 */
IBridge.prototype.arcTo = function(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};

/**
 * Plot a cubic bezier segment as defined by the current plotting position,
 * two handles or knots, (x1, y1) and (x2, y2), and the final anchor
 * position, (x,y)
 * 
 * @param {Number} x1
 * 		The x-coordinate of the first handle
 * @param {Number} y1
 * 		The y-coordinate of the first handle
 * @param {Number} x2
 * 		The x-coordinate of the second handle
 * @param {Number} y2
 * 		The y-coordinate of the second handle
 * @param {Number} x
 * 		The plotting pen's x-position after this curve has been plotted
 * @param {Number} y
 * 		The plotting pen's y-position after this curve has been plotted
 */
IBridge.prototype.curveTo = function(x1, y1, x2, y2, x, y) {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};

/**
 * Plot a quadratic bezier segment as defined by the current plotting
 * position, one handle or knot, (x1, y1), and the final anchor position,
 * (x,y)
 * 
 * @param {Number} x1
 * 		The x-coordinate of the handle
 * @param {Number} y1
 * 		The y-coordinate of the handle
 * @param {Number} x
 * 		The plotting pen's x-position after this curve has been plotted
 * @param {Number} y
 * 		The plotting pen's y-position after this curve has been plotted
 */
IBridge.prototype.quadraticCurveTo = function(x1, y1, x, y) {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};

/**
 * Plot a line from the current position to (x,y)
 * 
 * @param {Number} x
 * 		The plotting pen's x-position after this line has been plotted
 * @param {Number} y
 * 		The plotting pen's y-position after this line has been plotted
 */
IBridge.prototype.lineTo = function(x, y) {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};

/**
 * Relocate the cursor to (x,y). This has the effect of not plotting a stroke
 * from the previous current position to this new current position.
 * 
 * @param {Number} x
 * 		The plotting pen's new x-position
 * @param {Number} y
 * 		The plotting pen's new y-position
 */
IBridge.prototype.moveTo = function(x, y) {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};

/**
 * Close the current curve by drawing a line from the current position to the
 * initial position, as defined by the last moveTo instruction.
 */
IBridge.prototype.close = function() {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};