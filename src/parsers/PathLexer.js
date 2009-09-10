/**
 * PathLexer
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
 * Create a new instance of PathLexer
 * 
 * @constructor
 * @param {String} pathData
 */
function PathLexer(pathData) {
    if ( pathData == null ) pathData = "";

    this.setPathData(pathData);
}

/*
 * Methods
 */

/**
 * setPathData
 * 
 * @param {String} pathData
 */
PathLexer.prototype.setPathData = function(pathData) {
    if ( typeof(pathData) != "string" )
        throw new Error("PathLexer.setPathData: The first parameter must be a string");

    this._pathData = pathData;
};

/**
 * getNextToken
 */
PathLexer.prototype.getNextToken = function() {
    var result = null;
    var d = this._pathData;

    while ( result == null ) {
        if ( d == null || d == "" ) {
            result = new PathToken(PathToken.EOD, "");
        }
        else if ( d.match(/^([ \t\r\n,]+)/) )
        {
            d = d.substr(RegExp.$1.length);
        }
        // NOTE: Batik seemed to ignore the trailing /i in the following regex,
        // so I expanded the regex to explicitly list both uppercase and
        // lowercase commands.
        else if ( d.match(/^([AaCcHhLlMmQqSsTtVvZz])/) )
        {
            result = new PathToken(PathToken.COMMAND, RegExp.$1);
            d = d.substr(RegExp.$1.length);
        }
        else if ( d.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/) )
        {
            result = new PathToken(PathToken.NUMBER, parseFloat(RegExp.$1));
            d = d.substr(RegExp.$1.length);
        }
        else
        {
            throw new Error("PathLexer.getNextToken: unrecognized path data " + d);
        }
    }
    
    this._pathData = d;

    return result;
};
