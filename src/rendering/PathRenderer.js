/**
 * PathRenderer.js
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
 * Create a new instance of PathRenderer
 * 
 * @constructor
 * @param {IBridge} bridge
 * 		The underlying bridge that will be used to render to a canvas
 */
function PathRenderer(bridge) {
	this.bridge = bridge;
	
	this._transformStack = [];
	this._flatness = 5;
	
	this._firstX;
	this._firstY;
	this._lastX = 0;
	this._lastY = 0;
	this._lastCommand;
	this._lastHandleX;
	this._lastHandleY;
}

/*
 * Properties
 */

/**
 * Determine if our renderer supports the given method name
 * 
 * @param {String} methodName
 * 		The name of the method to test for existance in the underlying bridge
 * @return {Boolean} Returns true if the bridge defines the given method name
 */
PathRenderer.prototype._hasMethod = function(methodName) {
	return (this.bridge != null && this.bridge[methodName] != null);
}

/*
 * Methods
 */

/**
 * Invoke the specified method name with zero or one argument. Note that this
 * method will first determine if the method is implemented by the underlying
 * bridge. If it is not implemented, then nothing will be invoked.
 * 
 * @param {String} methodName
 * 		The name of the method to invoke on the underlying bridge
 * @param {Object} [parameter]
 * 		An optional parameter that will be passed as an argument when the
 * 		specified method is invoked.
 */
PathRenderer.prototype._invoke = function(methodName) {
	if (this._hasMethod(methodName)) {
		// only support zero or one argument for the method invocation
		if (arguments.length > 2) {
			throw new Error("PathRenderer._invoke only supports one or two arguments");
		}
		
		if (arguments.length == 1) {
			this.bridge[methodName]();
		} else {
			this.bridge[methodName](arguments[1]);
		}
	}
};

/**
 * Start a new rendering session. This method gives the bridge an opportunity
 * to initialize its state before drawing commands are called
 */
PathRenderer.prototype.beginRender = function() {
	this._firstX;
	this._firstY;
	this._lastX = 0;
	this._lastY = 0;
	this._lastCommand;
	this._lastHandleX;
	this._lastHandleY;
	
	this._invoke("beginRender");
};

/**
 * Complete the current rendering session. This method gives the bridge an
 * opportunity to close out the current rendering. Typically a bridge would
 * use this to display all drawing commands that have been processed up to
 * the point of invocation of this method
 */
PathRenderer.prototype.endRender = function() {
	this._invoke("endRender");
};

/**
 * This clears the bridge's canvas
 */
PathRenderer.prototype.clear = function() {
	this._invoke("clear");
};

/**
 * Remove the currently active transform to restore the previous transform
 */
PathRenderer.prototype.popTransform = function() {
	if (this._transformStack.length == 0) {
		throw new Error("tried to pop an element off of an empty transform stack")
	}
	
	// perform underlying state restore
	if (this._hasMethod("popTransform")) {
		this._invoke("popTransform");
	}
};

/**
 * Apply the specified transform to this renderer
 * @param {ITransform} transform
 */
PathRenderer.prototype.pushTransform = function(transform) {
	this._transformStack.push(transform);
	
	// perform underlying state change
	if (this._hasMethod("pushTransform")) {
		this._invoke("pushTransform", transform);
	}
};

/**
 * This method allows a bridge to plot SVG path data commands. This object will
 * parse the specified path data invoking path commands with their parameters
 * as each command is recognized. An exception will be thrown if the path data
 * is not well-formed.
 * 
 * @param {String} pathData
 * 		A string of SVG path data
 */
PathRenderer.prototype.renderPathData = function(pathData) {
	var renderer = this.bridge;
	
	if (renderer != null) {
		if ( this._hasMethod("renderPathData") ) {
			renderer.renderPathData(pathData);
		} else {
			this.beginRender();
			
			if (this._pathParser == null) {
				this._pathParser = new PathParser();
				this._pathParser.setHandler(this);
			} 
			
			this._pathParser.parseData(pathData);
			
			this.endRender();
		}
	}
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
PathRenderer.prototype.setFillColor = function(fill) {
	this._invoke("setFillColor", fill);
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
PathRenderer.prototype.setStrokeColor = function(stroke) {
	this._invoke("setStrokeColor", stroke);
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
PathRenderer.prototype.setStrokeWidth = function(strokeWidth) {
	this._invoke("setStrokeWidth", strokeWidth);
};

/*
 * Path parser handlers
 */

/**
 * arcAbs - A
 * 
 * @param {Number} rx
 * @param {Number} ry
 * @param {Number} xAxisRotation
 * @param {Boolean} largeArcFlag
 * @param {Boolean} sweepFlag
 * @param {Number} x
 * @param {Number} y
 */
PathRenderer.prototype.arcAbs = function(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
	var renderer = this.bridge;
	
	if (renderer != null && (this._lastX != x || this._lastY != y))
	{
		if ( this._hasMethod("arcTo") )
		{
			renderer.arcTo(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y);
		}
		else 
		{
			var cx, cy;
			var startAngle, sweepAngle, endAngle;
			
			if ( rx != 0.0 || ry != 0.0 )
			{
				var halfDx  = (this._lastX - x) * 0.5;
				var halfDy  = (this._lastY - y) * 0.5;
				var radians = xAxisRotation * Math.PI / 180.0;
				var cos     = Math.cos(radians);
				var sin     = Math.sin(radians);
				var x1p     = halfDx *  cos + halfDy * sin;
				var y1p     = halfDx * -sin + halfDy * cos;
				var x1px1p  = x1p*x1p;
				var y1py1p  = y1p*y1p;
				var lambda  = (x1px1p/(rx*rx)) + (y1py1p/(ry*ry));

				// it may be impossible for the specified radii to describe
				// an ellipse passing through the previous point and end point.
				// Adjust radii, if necessary, so ellipse can pass through those
				// points.
				if ( lambda > 1.0 )
				{
					var factor = Math.sqrt(lambda);
					
					rx *= factor;
					ry *= factor;
				}

				var rxrx = rx*rx;
				var ryry = ry*ry;
				var rxrxryry = rxrx*ryry;
				var rxrxy1py1p = rxrx*y1py1p;
				var ryryx1px1p = ryry*x1px1p;
				var numerator = rxrxryry - rxrxy1py1p - ryryx1px1p;
				var s;
				
				if ( numerator < 1e-6 )
				{
					s = 0;
				}
				else
				{
					s = Math.sqrt( numerator / (rxrxy1py1p + ryryx1px1p));
				}
				if ( largeArcFlag == sweepFlag )
				{
					s = -s;
				}
				var cxp = s *  rx*y1p / ry;
				var cyp = s * -ry*x1p / rx;
				cx  = cxp * cos - cyp * sin + (this._lastX + x) * 0.5;
				cy  = cxp * sin + cyp * cos + (this._lastY + y) * 0.5;

				var u = new Vector(1, 0);
				// [KEL] SVG spec divides x-component by rx and y-component by ry
				var v = new Vector(( x1p - cxp), ( y1p - cyp));
				var w = new Vector((-x1p - cxp), (-y1p - cyp));
			
				startAngle = u.angleBetween(v);
				sweepAngle = v.angleBetween(w);

				if ( !sweepFlag && sweepAngle > 0.0 )
				{
					sweepAngle -= 360;
				}
				else if ( sweepFlag && sweepAngle < 0.0 )
				{
					sweepAngle += 360;
				}
				
				endAngle = startAngle + sweepAngle;
			}
			
			/*
			if ( this._hasMethod("curveTo") )
			{
				
			}
			else
			*/
			if ( this._hasMethod("quadraticCurveTo") )
			{
				if ( startAngle != endAngle )
				{
					// determine direction
					var sign = (sweepAngle > 0) ? 1 : -1;
					var incr = sign * 45;
	
					// determine steps
					var steps = sign * Math.floor(sweepAngle / 45);
					var start = startAngle * Math.PI / 180;
	
					for ( var i = 0; i < steps; i++ )
					{
						// determine ending angle for this segment
						var end = (startAngle + incr) * Math.PI / 180;
	
						var startX = rx * Math.cos(start) + cx;
						var startY = ry * Math.sin(start) + cy;
						var endX = rx * Math.cos(end) + cx;
						var endY = ry * Math.sin(end) + cy;
	
						var halfAngle = (start + end) * 0.5;
						var midX = rx * Math.cos(halfAngle) + cx;
						var midY = ry * Math.sin(halfAngle) + cy;
	
						var controlX = 2 * (midX - 0.25*startX - 0.25*endX);
						var controlY = 2 * (midY - 0.25*startY - 0.25*endY);
	
						renderer.quadraticCurveTo(controlX, controlY, endX, endY);
	
						// update startAngle
						startAngle += incr;
						start = end;
					}
	
					if ( startAngle != endAngle )
					{
						// determine ending angle for this segment
						var end = endAngle * Math.PI / 180;
	
						var startX = rx * Math.cos(start) + cx;
						var startY = ry * Math.sin(start) + cy;
						var endX = rx * Math.cos(end) + cx;
						var endY = ry * Math.sin(end) + cy;
	
						var halfAngle = (start + end) * 0.5;
						var midX = rx * Math.cos(halfAngle) + cx;
						var midY = ry * Math.sin(halfAngle) + cy;
	
						var controlX = 2 * (midX - 0.25*startX - 0.25*endX);
						var controlY = 2 * (midY - 0.25*startY - 0.25*endY);
	
						renderer.quadraticCurveTo(controlX, controlY, endX, endY);
					}
				}
			}
			else if ( this._hasMethod("lineTo") )
			{
				var flatness = this._flatness;
				var radPerDeg = Math.PI / 180.0;
				var startDegree = startAngle * radPerDeg;
				var endDegree = endAngle * radPerDeg;
				
				function pointAtAngle(angle) {
					return new Point(
						cx + Math.cos(angle) * rx,
						cy + Math.sin(angle) * ry
					);
				}
				
				function plotInterior(start, end) {
					var mid = (start + end) * 0.5;
					var startPoint = pointAtAngle(start);
					var midPoint = pointAtAngle(mid);
					var endPoint = pointAtAngle(end);
					
					var v1 = Vector.fromPoints(startPoint, midPoint);
					var v2 = Vector.fromPoints(startPoint, endPoint);
					var perp = v1.perpendicular(v2);
					var dmax = perp.length();
					
					if (dmax > flatness) {
						plotInterior(start, mid);
						renderer.lineTo(midPoint.x, midPoint.y);
						plotInterior(mid, end);
					} else {
						renderer.lineTo(midPoint.x, midPoint.y);
					}
				}
				
				// plot first point
				var firstPoint = pointAtAngle(startDegree);
				renderer.lineTo(firstPoint.x, firstPoint.y);
				
				// plot interior points
				plotInterior(startDegree, endDegree);
				
				// plot last point
				var lastPoint = pointAtAngle(endDegree);
				renderer.lineTo(lastPoint.x, lastPoint.y);
			}
		}
	}
	
	this._lastX = x;
	this._lastY = y;
	this._lastCommand = "A";
};

/**
 * arcRel - a
 * 
 * @param {Number} rx
 * @param {Number} ry
 * @param {Number} xAxisRotation
 * @param {Boolean} largeArcFlag
 * @param {Boolean} sweepFlag
 * @param {Number} x
 * @param {Number} y
 */
PathRenderer.prototype.arcRel = function(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
	this.arcAbs(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, this._lastX + x, this._lastY + y);
};

/**
 * curvetoCubicAbs - C
 * 
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x
 * @param {Number} y
 */
PathRenderer.prototype.curvetoCubicAbs = function(x1, y1, x2, y2, x, y) {
	var renderer = this.bridge;
	
	if (renderer != null) {
		if ( this._hasMethod("curveTo") )
		{
			renderer.curveTo(x1, y1, x2, y2, x, y);
		}
		else if ( this._hasMethod("quadraticCurveTo") )
		{
			var ab8X = (x1 - this._lastX) * 0.125;	 
			var ab8Y = (y1 - this._lastY) * 0.125; 
			var dc8X = (x - x2) * 0.125;	 
			var dc8Y = (y - y2) * 0.125;
			var eX = this._lastX + ab8X * 4;
			var eY = this._lastY + ab8Y * 4;
			var fX = (x2 - x1) * 0.5 + x1;
			var fY = (y2 - y1) * 0.5 + y1;
			var gX = x2 + dc8X * 4;
			var gY = y2 + dc8Y * 4;
			var hX = (fX - eX) * 0.5 + eX;
			var hY = (fY - eY) * 0.5 + eY;
			var iX = (gX - fX) * 0.5 + fX;
			var iY = (gY - fY) * 0.5 + fY;
			var hi8X = (iX - hX) * 0.125;
			var hi8Y = (iY - hY) * 0.125;
		    
		    // plot interior points
		    var c0x = this._lastX + ab8X * 3;
		    var c0y = this._lastY + ab8Y * 3;
		    var c1x = hX + hi8X;
		    var c1y = hY + hi8Y;
		    var a0x = (c1x - c0x) * 0.5 + c0x;
		    var a0y = (c1y - c0y) * 0.5 + c0y;
		    var a1x = hX + hi8X * 4;
		    var a1y = hY + hi8Y * 4;
		    var c2x = hX + hi8X * 7;
		    var c2y = hY + hi8Y * 7;
		    var c3x = gX + dc8X;
		    var c3y = gY + dc8Y;
		    var a2x = (c3x - c2x) * 0.5 + c2x;
		    var a2y = (c3y - c2y) * 0.5 + c2y;
		    
			// plot
			renderer.quadraticCurveTo(c0x, c0y, a0x, a0y);
			renderer.quadraticCurveTo(c1x, c1y, a1x, a1y);
			renderer.quadraticCurveTo(c2x, c2y, a2x, a2y);
			renderer.quadraticCurveTo(c3x, c3y, x, y);
		}
		else if ( this._hasMethod("lineTo") )
		{
			var flatness = this._flatness;
			
			function plotInterior(p1, p2, p3, p4) {
				var p5 = p1.midpoint(p2);
				var p6 = p2.midpoint(p3);
				var p7 = p3.midpoint(p4);
				
				var p8 = p5.midpoint(p6);
				var p9 = p6.midpoint(p7);
				
				var p10 = p8.midpoint(p9);
				
				var baseline = Vector.fromPoints(p1, p4);
				var tangent1 = Vector.fromPoints(p1, p2);
				var tangent2 = Vector.fromPoints(p4, p3);
				var dmax = 0;
				
				if (tangent1.isZeroVector() == false) {
					var perpendicular = baseline.perpendicular(tangent1);
					
					dmax = perpendicular.length();
				}
				if (tangent2.isZeroVector() == false) {
					var perpendicular = baseline.perpendicular(tangent2);
					
					dmax = Math.max(dmax, perpendicular.length());
				}
				
				if (dmax > flatness) {
					plotInterior(p1, p5, p8, p10);
					renderer.lineTo(p10.x, p10.y);
					plotInterior(p10, p9, p7, p4);
				} else {
					renderer.lineTo(p10.x, p10.y);
				}
			}
		    
		    // plot interior points
		    plotInterior(
				new Point(this._lastX, this._lastY),
				new Point(x1, y1),
				new Point(x2, y2),
				new Point(x, y)
			);
		    
		    // plot last point
		    renderer.lineTo(x, y);
		}
	}
	
	this._lastX = x;
	this._lastY = y;
	this._lastCommand = "C";
	this._lastHandleX = x2;
	this._lastHandleY = y2;
};

/**
 * curvetoCubicRel - c
 * 
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x
 * @param {Number} y
 */
PathRenderer.prototype.curvetoCubicRel = function(x1, y1, x2, y2, x, y) {
	this.curvetoCubicAbs(
		this._lastX + x1, this._lastY + y1,
		this._lastX + x2, this._lastY + y2,
		this._lastX + x, this._lastY + y
	);
};

/**
 * linetoHorizontalAbs - H
 * 
 * @param {Number} x
 */
PathRenderer.prototype.linetoHorizontalAbs = function(x) {
	this.linetoAbs(x, this._lastY);
};

/**
 * linetoHorizontalRel - h
 * 
 * @param {Number} x
 */
PathRenderer.prototype.linetoHorizontalRel = function(x) {
	this.linetoAbs(this._lastX + x, this._lastY);
};

/**
 * linetoAbs - L
 * 
 * @param {Number} x
 * @param {Number} y
 */
PathRenderer.prototype.linetoAbs = function(x, y) {
	if (this.bridge != null) {
		if ( this._hasMethod("lineTo") ) {
			this.bridge.lineTo(x, y);
		}
	}
	
	this._lastX = x;
	this._lastY = y;
	this._lastCommand = "L";
};

/**
 * linetoRel - l
 * 
 * @param {Number} x
 * @param {Number} y
 */
PathRenderer.prototype.linetoRel = function(x, y) {
	this.linetoAbs(this._lastX + x, this._lastY + y);
};

/**
 * movetoAbs - M
 * 
 * @param {Number} x
 * @param {Number} y
 */
PathRenderer.prototype.movetoAbs = function(x, y) {
	if (this.bridge != null) {
		if ( this._hasMethod("moveTo") ) {
			this.bridge.moveTo(x, y);
		}
	}
	
	this._firstX = x;
	this._firstY = y;
	this._lastX = x;
	this._lastY = y;
	this._lastCommand = "M";
};

/**
 * movetoRel - m
 * 
 * @param {Number} x
 * @param {Number} y
 */
PathRenderer.prototype.movetoRel = function(x, y) {
	this.movetoAbs(this._lastX + x, this._lastY + y);
};

/**
 * curvetoQuadraticAbs - Q
 * 
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x
 * @param {Number} y
 */
PathRenderer.prototype.curvetoQuadraticAbs = function(x1, y1, x, y) {
	var renderer = this.bridge;
	
	if ( renderer != null ) {
		if ( this._hasMethod("quadraticCurveTo") )
		{
			renderer.quadraticCurveTo(x1, y1, x, y);
		}
		else if ( this._hasMethod("curveTo") )
		{
			var c1x = this._lastX + (x1 - this._lastX) * 2 / 3;
			var c1y = this._lastY + (y1 - this._lastY) * 2 / 3;
			var c2x = x1 + (x - x1) / 3;
			var c2y = y1 + (y - y1) / 3;
			
			renderer.curveTo(c1x, c1y, c2x, c2y, x, y);
		}
		else if ( this._hasMethod("lineTo") )
		{
			var flatness = this._flatness;
			
			function plotInterior(p1, p2, p3) {
				var p4 = p1.midpoint(p2);
				var p5 = p2.midpoint(p3);
				var p6 = p4.midpoint(p5);
				var baseline = Vector.fromPoints(p1, p3);
				var tangent = Vector.fromPoints(p1, p2);
				var dmax = 0;
				
				if (tangent.isZeroVector() == false) {
					var perpendicular = baseline.perpendicular(tangent);
					
					dmax = perpendicular.length();
				}
				
				if (dmax > flatness) {
					plotInterior(p1, p4, p6);
					renderer.lineTo(p6.x, p6.y);
					plotInterior(p6, p5, p3);
				} else {
					renderer.lineTo(p6.x, p6.y);
				}
			}
			
			// plot interior points
			plotInterior(
				new Point(this._lastX, this._lastY),
				new Point(x1, y1),
				new Point(x, y)
			);
			
			// plot last point
			renderer.lineTo(x, y);
		}
	}
	
	this._lastX = x;
	this._lastY = y;
	this._lastCommand = "Q";
	this._lastHandleX = x1;
	this._lastHandleY = y1;
};

/**
 * curvetoQuadraticRel - q
 * 
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x
 * @param {Number} y
 */
PathRenderer.prototype.curvetoQuadraticRel = function(x1, y1, x, y) {
	this.curvetoQuadraticAbs(
		this._lastX + x1, this._lastY + y1,
		this._lastX + x, this._lastY + y
	);
};

/**
 * curvetoCubicSmoothAbs - S
 * 
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x
 * @param {Number} y
 */
PathRenderer.prototype.curvetoCubicSmoothAbs = function(x2, y2, x, y) {
	var x1, y1;
	
	if (this._lastCommand == "C") {
		x1 = this._lastX + (this._lastX - this._lastHandleX);
		y1 = this._lastY + (this._lastY - this._lastHandleY);
	} else {
		x1 = this._lastX;
		y1 = this._lastY;
	}
	
	this.curvetoCubicAbs(x1, y1, x2, y2, x, y);
};

/**
 * curvetoCubicSmoothRel - s
 * 
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x
 * @param {Number} y
 */
PathRenderer.prototype.curvetoCubicSmoothRel = function(x2, y2, x, y) {
	this.curvetoCubicSmoothAbs(
		this._lastX + x2, this._lastY + y2,
		this._lastX + x, this._lastY + y
	);
};

/**
 * curvetoQuadraticSmoothAbs - T
 * 
 * @param {Number} x
 * @param {Number} y
 */
PathRenderer.prototype.curvetoQuadraticSmoothAbs = function(x, y) {
	var x1, y1;
	
	if (this._lastCommand == "Q") {
		x1 = this._lastX + (this._lastX - this._lastHandleX);
		y1 = this._lastY + (this._lastY - this._lastHandleY);
	} else {
		x1 = this._lastX;
		y1 = this._lastY;
	}
	
	this.curvetoQuadraticAbs(x1, y1, x, y);
};

/**
 * curvetoQuadraticSmoothRel - t
 * 
 * @param {Number} x
 * @param {Number} y
 */
PathRenderer.prototype.curvetoQuadraticSmoothRel = function(x, y) {
	this.curvetoQuadraticSmoothAbs(this._lastX + x, this._lastY + y);
};

/**
 * linetoVerticalAbs - V
 * 
 * @param {Number} y
 */
PathRenderer.prototype.linetoVerticalAbs = function(y) {
	this.linetoAbs(this._lastX, y);
};

/**
 * linetoVerticalRel - v
 * 
 * @param {Number} y
 */
PathRenderer.prototype.linetoVerticalRel = function(y) {
	this.linetoAbs(this._lastX, this._lastY + y);
};

/**
 * closePath
 */
PathRenderer.prototype.closePath = function() {
	this._invoke("close");
	
	this._lastX = this._firstX;
	this._lastY = this._firstY;
	this._lastCommand = "Z";
};
