/**
 * TransformParser
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
 *   Class constants
 */
TransformParser.PARAMCOUNT = {
    matrix:    [6],
    translate: [1, 2],
    scale:     [1, 2],
    rotate:    [1, 3],
    skewX:     [1],
    skewY:     [1]
};
TransformParser.METHODNAME = {
    matrix:    "matrix",
    translate: "translate",
    scale:     "scale",
    rotate:    "rotate",
    skewX:     "skewX",
    skewY:     "skewY"
}

/*
 * Constructors
 */

/**
 * Create a new instance of PathParser
 * 
 * @constructor
 */
function TransformParser() {
    this._lexer = new TransformLexer();
    this._handler = null;
}

/*
 * Methods
 */

/**
 * parseTransform
 * 
 * @param {String} transformText
 * 		A transform definition that is legal in SVG's transform attribute
 */
TransformParser.prototype.parseTransform = function(transformText) {
    if ( typeof(transformText) != "string" )
        throw new Error("TransformParser.parseTransform: The first parameter must be a string");

    // init handler
    if ( this._handler != null && this._handler.beginParse != null )
        this._handler.beginParse();

    // pass the transformText to the lexer
    var lexer = this._lexer;
    lexer.setTransformText(transformText);

    // Process all tokens
    var token = lexer.getNextToken();
    while ( token.typeis(TransformToken.EOD) == false ) {
        var command;
        var param_counts;
        var params = new Array();

        // process current token
        switch ( token.type ) {
            case TransformToken.MATRIX:
            case TransformToken.TRANSLATE:
            case TransformToken.SCALE:
            case TransformToken.ROTATE:
            case TransformToken.SKEWX:
            case TransformToken.SKEWY:
                command = token.text;
                param_counts = TransformParser.PARAMCOUNT[command];

                // Advance past command token
                token = lexer.getNextToken();
                break;

            default:
                throw new Error("TransformParser.parseTransform: expected transform type: " + token.text);
        }
        
        // handle opening parenthesis
        if ( token.type != TransformToken.LPAREN ) {
            throw new Error("TransformParser.parserTransform: expected opening parenthesis: " + token.text);
        }
        token = lexer.getNextToken();

        // Get parameters
        while ( token != TransformToken.EOD && token.type == TransformToken.NUMBER ) {
            // convert current parameter to a float and add to
            // parameter list
            params.push(token.text - 0);

            // advance to next token
            token = lexer.getNextToken();
        }

        // verify parameter counts
        var valid = false;
        var actual_count = params.length;
        for ( var i = 0; i < param_counts.length; i++ ) {
            if ( param_counts[i] == actual_count ) {
                valid = true;
                break;
            }
        }

        if ( valid == false ) {
            throw new Error("TransformParser.parserTransform: incorrect number of arguments for " + command);
        }

        // handle closing parenthesis
        if ( token.type != TransformToken.RPAREN ) {
            throw new Error("TransformParser.parserTransform: expected closing parenthesis: " + token.text);
        }
        token = lexer.getNextToken();
        
        // fire handler
        if ( this._handler != null ) {
            var handler = this._handler;
            var method = TransformParser.METHODNAME[command];

            if ( handler[method] != null )
                handler[method].apply(handler, params);
        }
    }
};

/**
 * setHandler
 * 
 * @param {Function} handler
 */
TransformParser.prototype.setHandler = function(handler) {
    //if ( typeof(handler) != "object" )
    //    throw new Error("TransformParser.setHandler: first parameter must be an object");

    this._handler = handler;
};
