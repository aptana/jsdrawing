/**
 * ITransform
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
 * entire Transform interface and as a means of displaying content assist
 * during editing sessions in the Aptana IDE. Objects that define this
 * interface are not required to implement all methods defined here, so this
 * isn't an interface in its truest sense. However, a bridge must minimally
 * define the following methods:
 * 
 * 		<TBD>
 * 
 * @constructor
 */
function ITransform() {}

/*
 * Properties
 */

/**
 * Get the matrix represented by this transform.
 * 
 * @return {Matrix} Returns the matrix this transform represents
 */
ITransform.prototype.getTransformMatrix = function() {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};

/**
 * Get the SVG transform text that represents this transform.
 * 
 * @return {String} Returns the text that represnets this transform
 */
ITransform.prototype.getTransformText = function() {
	throw new Error("This method is part of an interface definition and cannot be invoked");
};
