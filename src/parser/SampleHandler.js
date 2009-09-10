/**
 * SampleHandler
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
*   class variables
*/
SampleHandler.VERSION = 1.0;

/*
 * Constructors
 */

/**
 * Create a new instance of SampleHandler
 * 
 * @constructor
 */
function SampleHandler() { }

/*
 * Methods
 */

/**
 * show
 * 
 * @param {Object} name
 * @param {Object} params
 */
SampleHandler.prototype.show = function(name, params) {
    var result = [];
    var args = [];

    for (var i = 0; i < params.length; i++ )
        args[i] = params[i];

    result.push(name);
    result.push("(");
    result.push(args.join(","));
    result.push(")");

    println(result.join(""));
};

/**
 * arcAbs - A
 * 
 * @param {Object} rx
 * @param {Object} ry
 * @param {Object} xAxisRotation
 * @param {Object} largeArcFlag
 * @param {Object} sweepFlag
 * @param {Object} x
 * @param {Object} y
 */
SampleHandler.prototype.arcAbs = function(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
    this.show("arcAbs", arguments);
};

/**
 * arcRel - a
 * 
 * @param {Object} rx
 * @param {Object} ry
 * @param {Object} xAxisRotation
 * @param {Object} largeArcFlag
 * @param {Object} sweepFlag
 * @param {Object} x
 * @param {Object} y
 */
SampleHandler.prototype.arcRel = function(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
    this.show("arcRel", arguments);
};

/**
 * curvetoCubicAbs - C
 * 
 * @param {Object} x1
 * @param {Object} y1
 * @param {Object} x2
 * @param {Object} y2
 * @param {Object} x
 * @param {Object} y
 */
SampleHandler.prototype.curvetoCubicAbs = function(x1, y1, x2, y2, x, y) {
    this.show("curvetoCubicAbs", arguments);
};

/**
 * curvetoCubicRel - c
 * 
 * @param {Object} x1
 * @param {Object} y1
 * @param {Object} x2
 * @param {Object} y2
 * @param {Object} x
 * @param {Object} y
 */
SampleHandler.prototype.curvetoCubicRel = function(x1, y1, x2, y2, x, y) {
    this.show("curvetoCubicRel", arguments);
};

/**
 * linetoHorizontalAbs - H
 * 
 * @param {Object} x
 */
SampleHandler.prototype.linetoHorizontalAbs = function(x) {
    this.show("linetoHorizontalAbs", arguments);
};

/**
 * linetoHorizontalRel - h
 * 
 * @param {Object} x
 */
SampleHandler.prototype.linetoHorizontalRel = function(x) {
    this.show("linetoHorizontalRel", arguments);
};

/**
 * linetoAbs - L
 * 
 * @param {Object} x
 * @param {Object} y
 */
SampleHandler.prototype.linetoAbs = function(x, y) {
    this.show("linetoAbs", arguments);
};

/**
 * linetoRel - l
 * 
 * @param {Object} x
 * @param {Object} y
 */
SampleHandler.prototype.linetoRel = function(x, y) {
    this.show("linetoRel", arguments);
};

/**
 * movetoAbs - M
 * 
 * @param {Object} x
 * @param {Object} y
 */
SampleHandler.prototype.movetoAbs = function(x, y) {
    this.show("movetoAbs", arguments);
};

/**
 * movetoRel - m
 * 
 * @param {Object} x
 * @param {Object} y
 */
SampleHandler.prototype.movetoRel = function(x, y) {
    this.show("movetoRel", arguments);
};

/**
 * curvetoQuadraticAbs - Q
 * 
 * @param {Object} x1
 * @param {Object} y1
 * @param {Object} x
 * @param {Object} y
 */
SampleHandler.prototype.curvetoQuadraticAbs = function(x1, y1, x, y) {
    this.show("curvetoQuadraticAbs", arguments);
};

/**
 * curvetoQuadraticRel - q
 * 
 * @param {Object} x1
 * @param {Object} y1
 * @param {Object} x
 * @param {Object} y
 */
SampleHandler.prototype.curvetoQuadraticRel = function(x1, y1, x, y) {
    this.show("curvetoQuadraticRel", arguments);
};

/**
 * curvetoCubicSmoothAbs - S
 * 
 * @param {Object} x2
 * @param {Object} y2
 * @param {Object} x
 * @param {Object} y
 */
SampleHandler.prototype.curvetoCubicSmoothAbs = function(x2, y2, x, y) {
    this.show("curvetoCubicSmoothAbs", arguments);
};

/**
 * curvetoCubicSmoothRel - s
 * 
 * @param {Object} x2
 * @param {Object} y2
 * @param {Object} x
 * @param {Object} y
 */
SampleHandler.prototype.curvetoCubicSmoothRel = function(x2, y2, x, y) {
    this.show("curvetoCubicSmoothRel", arguments);
};

/**
 * curvetoQuadraticSmoothAbs - T
 * 
 * @param {Object} x
 * @param {Object} y
 */
SampleHandler.prototype.curvetoQuadraticSmoothAbs = function(x, y) {
    this.show("curvetoQuadraticSmoothAbs", arguments);
};

/**
 * curvetoQuadraticSmoothRel - t
 * 
 * @param {Object} x
 * @param {Object} y
 */
SampleHandler.prototype.curvetoQuadraticSmoothRel = function(x, y) {
    this.show("curvetoQuadraticSmoothRel", arguments);
};

/**
 * linetoVerticalAbs - V
 * 
 * @param {Object} y
 */
SampleHandler.prototype.linetoVerticalAbs = function(y) {
    this.show("linetoVerticalAbs", arguments);
};

/**
 * linetoVerticalRel - v
 * 
 * @param {Object} y
 */
SampleHandler.prototype.linetoVerticalRel = function(y) {
    this.show("linetoVerticalRel", arguments);
};

/**
 * closePath
 */
SampleHandler.prototype.closePath = function() {
    this.show("closePath", arguments);
};
