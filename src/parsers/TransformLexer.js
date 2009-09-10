/**
 * TransformLexer
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
 * Create a new instance of TransformLexer
 * 
 * @constructor
 * @param {String} transformText
 */
function TransformLexer(transformText) {
    if ( transformText == null ) transformText = "";

    this.setTransformText(transformText);
}

/**
 * setTransformText
 * 
 * @param {String} transformText
 */
TransformLexer.prototype.setTransformText = function(transformText) {
    if ( typeof(transformText) != "string" )
        throw new Error("TransformLexer.setTransformText: The first parameter must be a string");

    this._transformText = transformText;
};

/**
 * getNextToken
 */
TransformLexer.prototype.getNextToken = function() {
    var result = null;
    var buffer = this._transformText;

    while ( result == null ) {
        if ( buffer == null || buffer == "" ) {
            result = new TransformToken(TransformToken.EOD, "");
        }
        else if ( buffer.match(/^([ \t\r\n,]+)/) )
        {
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(matrix)\b/) )
        {
            result = new TransformToken(TransformToken.MATRIX, RegExp.$1);
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(translate)\b/) )
        {
            result = new TransformToken(TransformToken.TRANSLATE, RegExp.$1);
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(scale)\b/) )
        {
            result = new TransformToken(TransformToken.SCALE, RegExp.$1);
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(rotate)\b/) )
        {
            result = new TransformToken(TransformToken.ROTATE, RegExp.$1);
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(skewX)\b/) )
        {
            result = new TransformToken(TransformToken.SKEWX, RegExp.$1);
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(skewY)\b/) )
        {
            result = new TransformToken(TransformToken.SKEWY, RegExp.$1);
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(\()/) )
        {
            result = new TransformToken(TransformToken.LPAREN, RegExp.$1);
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(\))/) )
        {
            result = new TransformToken(TransformToken.RPAREN, RegExp.$1);
            buffer = buffer.substr(RegExp.$1.length);
        }
        else if ( buffer.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/) )
        {
            result = new TransformToken(TransformToken.NUMBER, parseFloat(RegExp.$1));
            buffer = buffer.substr(RegExp.$1.length);
        }
        else
        {
            throw new Error("TransformLexer.getNextToken: unable to tokenize text: " + buffer);
        }
    }
    
    this._transformText = buffer;

    return result;
};

