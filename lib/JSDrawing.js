/*****
*
*   The contents of this file were written by Kevin Lindsey
*   copyright 2005-2006 Kevin Lindsey
*
*   This file was compacted by jscompact
*   A Perl utility written by Kevin Lindsey (kevin@kevlindev.com)
*
*****/

function Point(x,y){this.x=x;this.y=y;}
Point.prototype.lerp=function(that,t){t=Math.min(1.0,t);t=Math.max(0.0,t);var omt=1.0-t;return new Point(this.x*omt+that.x*t,this.y*omt+that.y*t);};
Point.prototype.midpoint=function(that){return new Point((this.x+that.x)*0.5,(this.y+that.y)*0.5)};
Point.prototype.toString=function(){return this.x+","+this.y;};
Vector.fromPoints=function(p1,p2){return new Vector(p2.x-p1.x,p2.y-p1.y)};
Vector.prototype.isZeroVector=function(){return(this.x==0&&this.y==0);};
Vector.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y);}
function Vector(x,y){this.x=x;this.y=y;}
Vector.prototype.angleBetween=function(that){var length1=Math.sqrt(this.x*this.x+this.y*this.y);var length2=Math.sqrt(that.x*that.x+that.y*that.y);var cos=(this.x*that.x+this.y*that.y)/(length1*length2);var radians=Math.acos(cos);if(this.x*that.y-that.x*this.y<0.0){radians=-radians;}return 180.0*radians/Math.PI;};
Vector.prototype.dot=function(that){return this.x*that.x+this.y*that.y;};
Vector.prototype.perpendicular=function(that){var result=this.project(that);result.x=this.x-result.x;result.y=this.y-result.y;return result;};
Vector.prototype.project=function(that){var scale=that.dot(this)/that.dot(that);return that.scale(scale);};
Vector.prototype.scale=function(scale){return new Vector(this.x*scale,this.y*scale);}
function Matrix(m11,m12,m21,m22,offsetX,offsetY){if(arguments.length==6){this.m11=m11;this.m12=m12;this.m21=m21;this.m22=m22;this.offsetX=offsetX;this.offsetY=offsetY;}else{this.setToIdentity();}}
Matrix.prototype.getDeterminant=function(){return this.m11*this.m22-this.m21*this.m12;};
Matrix.prototype.hasInvserse=function(){return this.getDeterminant()!=0.0;};
Matrix.prototype.getInverse=function(){var det1=this.getDeterminant();if(det1==0.0){throw new InvalidOperationException("Matrix not invertible");}return new Matrix(this.m22/det1,-this.m12/det1,-this.m21/det1,this.m11/det1,(this.m21*this.offsetY-this.offsetX*this.m22)/det1,(this.offsetX*this.m12-this.m11*this.offsetY)/det1);};
Matrix.prototype.isIdentity=function(){return(this.m11==1.0&&this.m12==0.0&&this.m21==0.0&&this.m22==1.0&&this.offsetX==0.0&&this.offsetY==0.0);};
Matrix.prototype.setToIdentity=function(){this.m11=1;this.m12=0;this.m21=0;this.m22=1;this.offsetX=0;this.offsetY=0;};
Matrix.prototype.preMultiply=function(matrix){return new Matrix(matrix.m11*this.m11+matrix.m12*this.m21,matrix.m11*this.m12+matrix.m12*this.m22,matrix.m21*this.m11+matrix.m22*this.m21,matrix.m21*this.m12+matrix.m22*this.m22,matrix.offsetX*this.m11+matrix.offsetY*this.m21+this.offsetX,matrix.offsetX*this.m12+matrix.offsetY*this.m22+this.offsetY);};
Matrix.prototype.preMultiplyEquals=function(matrix){var a=matrix.m11*this.m11+matrix.m12*this.m21;var b=matrix.m11*this.m12+matrix.m12*this.m22;var c=matrix.m21*this.m11+matrix.m22*this.m21;var d=matrix.m21*this.m12+matrix.m22*this.m22;var e=matrix.offsetX*this.m11+matrix.offsetY*this.m21+this.offsetX;var f=matrix.offsetX*this.m12+matrix.offsetY*this.m22+this.offsetY;this.m11=a;this.m12=b;this.m21=c;this.m22=d;this.offsetX=e;this.offsetY=f;};
Matrix.prototype.postMultiply=function(matrix){return new Matrix(this.m11*matrix.m11+this.m12*matrix.m21,this.m11*matrix.m12+this.m12*matrix.m22,this.m21*matrix.m11+this.m22*matrix.m21,this.m21*matrix.m12+this.m22*matrix.m22,this.offsetX*matrix.m11+this.offsetY*matrix.m21+matrix.offsetX,this.offsetX*matrix.m12+this.offsetY*matrix.m22+matrix.offsetY);};
Matrix.prototype.postMultiplyEquals=function(matrix){var a=this.m11*matrix.m11+this.m12*matrix.m21;var b=this.m11*matrix.m12+this.m12*matrix.m22;var c=this.m21*matrix.m11+this.m22*matrix.m21;var d=this.m21*matrix.m12+this.m22*matrix.m22;var e=this.offsetX*matrix.m11+this.offsetY*matrix.m21+matrix.offsetX;var f=this.offsetX*matrix.m12+this.offsetY*matrix.m22+matrix.offsetY;this.m11=a;this.m12=b;this.m21=c;this.m22=d;this.offsetX=e;this.offsetY=f;};
Matrix.prototype.postRotateEquals=function(angle){var radians=angle*Math.PI/180.0;var cos=Math.Cos(radians);var sin=Math.Sin(radians);var a=this.m11*cos-this.m12*sin;var b=this.m11*sin+this.m12*cos;var c=this.m21*cos-this.m22*sin;var d=this.m21*sin+this.m22*cos;var e=this.offsetX*cos-this.offsetY*sin;var f=this.offsetX*sin+this.offsetY*cos;this.m11=a;this.m12=b;this.m21=c;this.m22=d;this.offsetX=e;this.offsetY=f;};
Matrix.prototype.preRotateEquals=function(angle){var radians=angle*Math.PI/180.0;var cos=Math.Cos(radians);var sin=Math.Sin(radians);var a=this.m11*cos+this.m21*sin;var b=this.m12*cos+this.m22*sin;var c=this.m11*-sin+this.m21*cos;var d=this.m12*-sin+this.m22*cos;var e=this.offsetX;var f=this.offsetY;this.m11=a;this.m12=b;this.m21=c;this.m22=d;this.offsetX=e;this.offsetY=f;};
Matrix.prototype.postRotateAtEquals=function(angle,center){var radians=angle*Math.PI/180.0;var cos=Math.Cos(radians);var sin=Math.Sin(radians);var dx=this.offsetX-center.x;var dy=this.offsetY-center.y;var a=this.m11*cos-this.m12*sin;var b=this.m11*sin+this.m12*cos;var c=this.m21*cos-this.m22*sin;var d=this.m21*sin+this.m22*cos;var e=center.x+cos*dx-sin*dy;var f=center.y+sin*dx+cos*dy;this.m11=a;this.m12=b;this.m21=c;this.m22=d;this.offsetX=e;this.offsetY=f;};
Matrix.prototype.preRotateAtEquals=function(angle,center){var radians=angle*Math.PI/180.0;var cos=Math.Cos(radians);var sin=Math.Sin(radians);var t1=-center.x+center.x*cos-center.y*sin;var t2=-center.y+center.y*cos+center.x*sin;var a=this.m11*cos+this.m21*sin;var b=this.m12*cos+this.m22*sin;var c=this.m11*-sin+this.m21*cos;var d=this.m12*-sin+this.m22*cos;var e=this.m11*t1+this.m21*t2+this.offsetX;var f=this.m12*t1+this.m22*t2+this.offsetY;this.m11=a;this.m12=b;this.m21=c;this.m22=d;this.offsetX=e;this.offsetY=f;};
Matrix.prototype.postScaleEquals=function(scaleX,scaleY){this.m11*=scaleX;this.m12*=scaleY;this.m21*=scaleX;this.m22*=scaleY;this.offsetX*=scaleX;this.offsetY*=scaleY;};
Matrix.prototype.preScaleEquals=function(scaleX,scaleY){this.m11*=scaleX;this.m12*=scaleX;this.m21*=scaleY;this.m22*=scaleY;};
Matrix.prototype.postScaleAtEquals=function(scaleX,scaleY,origin){this.m11*=scaleX;this.m12*=scaleY;this.m21*=scaleX;this.m22*=scaleY;this.offsetX=(this.offsetX-origin.x)*scaleX+origin.x;this.offsetY=(this.offsetY-origin.y)*scaleY+origin.y;};
Matrix.prototype.preScaleAtEquals=function(scaleX,scaleY,origin){var dx=origin.x-scaleX*origin.x;var dy=origin.y-scaleY*origin.y;this.m11*=scaleX;this.m12*=scaleX;this.m21*=scaleY;this.m22*=scaleY;this.offsetX=this.offsetX+this.m11*dx+this.m21*dy;this.offsetY=this.offsetY+this.m12*dx+this.m22*dy;};
Matrix.prototype.postSkewEquals=function(skewX,skewY){var tanX=Math.Tan(skewX*Math.PI/180.0);var tanY=Math.Tan(skewY*Math.PI/180.0);var a=this.m11+this.m12*tanX;var b=this.m11*tanY+this.m12;var c=this.m21+this.m22*tanX;var d=this.m21*tanY+this.m22;var e=this.offsetX+this.offsetY*tanX;var f=this.offsetX*tanY+this.offsetY;this.m11=a;this.m12=b;this.m21=c;this.m22=d;this.offsetX=e;this.offsetY=f;};
Matrix.prototype.preSkewEquals=function(skewX,skewY){var tanX=Math.Tan(skewX*Math.PI/180.0);var tanY=Math.Tan(skewY*Math.PI/180.0);var a=this.m11+this.m21*tanY;var b=this.m12+this.m22*tanY;var c=this.m11*tanX+this.m21;var d=this.m12*tanX+this.m22;this.m11=a;this.m12=b;this.m21=c;this.m22=d;};
Matrix.prototype.postSkewAtEquals=function(skewX,skewY,origin){var tanX=Math.Tan(skewX*Math.PI/180.0);var tanY=Math.Tan(skewY*Math.PI/180.0);var a=this.m11+this.m12*tanX;var b=this.m11*tanY+this.m12;var c=this.m21+this.m22*tanX;var d=this.m21*tanY+this.m22;var e=this.offsetX+(this.offsetY-origin.y)*tanX;var f=(this.offsetX-origin.x)*tanY+this.offsetY;this.m11=a;this.m12=b;this.m21=c;this.m22=d;this.offsetX=e;this.offsetY=f;};
Matrix.prototype.preSkewAtEquals=function(offestX,offsetY,origin){throw new Error("not implemented");};
Matrix.prototype.postTranslateEquals=function(offsetX,offsetY){this.offsetX+=offsetX;this.offsetY+=offsetY;};
Matrix.prototype.preTranslateEquals=function(offsetX,offsetY){this.offsetX+=this.m11*offsetX+this.m21*offsetY;this.offsetY+=this.m12*offsetX+this.m22*offsetY;};
Matrix.prototype.toString=function(){return[this.m11,this.m12,this.m21,this.m22,this.offsetX,this.offsetY].join(",");};
Matrix.prototype.transformPoint=function(point){return new Point(this.m11*point.x+this.m21*point.y+this.offsetX,this.m12*point.x+this.m22*point.y+this.offsetY);};
Matrix.prototype.transformPoint=function(vector){return new Vector(this.m11*point.x+this.m21*point.y,this.m12*point.x+this.m22*point.y);};
function MatrixTransform(a,b,c,d,e,f){this._transform=new Matrix(a,b,c,d,e,f);}
MatrixTransform.prototype.getTransformMatrix=function(){return this._transform;};
MatrixTransform.prototype.getTransformText=function(){return"matrix("+this._trasnform+")";};
function RotateTransform(angle,origin){this.angle=angle;this.origin=origin||new Point(0,0);this._transform=null;}
RotateTransform.prototype.getTransformMatrix=function(){if(this._transform==null){var result=new Matrix();result.postRotateAtEquals(this.angle,this.origin);this._transform=result;}return this._transform;};
RotateTransform.prototype.getTransformText=function(){var result="rotate("+this.angle;if(this.origin!=null&&(this.origin.x!=0||this.origin.y!=0)){result+=","+this.origin.toString();}result+=")";return result;};
function ScaleTransform(scaleX,scaleY,origin){this.scaleX=scaleX;this.scaleY=scaleY;this.origin=origin||new Point(0,0);this._transform=null;}
ScaleTransform.prototype.getTransformMatrix=function(){if(this._transform==null){var result=new Matrix();result.postScaleAtEquals(this.scaleX,this.scaleY,origin);this._transform=result;}return this._transform;};
ScaleTransform.prototype.getTransformText=function(){var result="scale("+this.scaleX+","+this.scaleY;if(this.origin!=null&&(this.origin.x!=0||this.origin.y!=0)){result+=","+this.origin.x+","+this.origin.y;}result+=")";return result;};
function TranslateTransform(offsetX,offsetY){this.offsetX=offsetX;this.offsetY=offsetY;this._transform=null;}
TranslateTransform.prototype.getTransformMatrix=function(){if(this._transform==null){var result=new Matrix();result.postTranslateTransformEquals(this.offsetX,this.offsetY);this._transform=result;}return this._transform;};
TranslateTransform.prototype.getTransformText=function(){return"translate("+this.offsetX+","+this.offsetY+")";};
function TransformList(){this.transforms=[];this._transform=null;}
TransformList.prototype.addTransform=function(transform){this.transforms.add(transform);this._transform=null;};
TransformList.prototype.clear=function(){this.transforms.length=0;this._transform=null;};
TransformList.prototype.removeTransform=function(transform){for(var i=0;i<this.transforms.length;i++){var target=this.transforms[i];if(target===transform){this.transforms.splice(i,1);break;}}};
TransformList.prototype.getTransformMatrix=function(){if(this._transform==null){var result=new Matrix();for(var i=0;i<this.transforms.length;i++){var transform=this.transforms[i];var matrix=transform.getTransformMatrix();result.postMultiplyEquals(matrix);}this._transform=result;}return this._transform;};
TransformList.prototype.getTransformText=function(){var buffer=[];for(var i=0;i<this.transforms.length;i++){var transform=this.transforms[i];buffer.push(transform.getTransformText());}return buffer.join(" ");};
PathParser.PARAMCOUNT={A:7,C:6,H:1,L:2,M:2,Q:4,S:4,T:2,V:1,Z:0};
PathParser.METHODNAME={A:"arcAbs",a:"arcRel",C:"curvetoCubicAbs",c:"curvetoCubicRel",H:"linetoHorizontalAbs",h:"linetoHorizontalRel",L:"linetoAbs",l:"linetoRel",M:"movetoAbs",m:"movetoRel",Q:"curvetoQuadraticAbs",q:"curvetoQuadraticRel",S:"curvetoCubicSmoothAbs",s:"curvetoCubicSmoothRel",T:"curvetoQuadraticSmoothAbs",t:"curvetoQuadraticSmoothRel",V:"linetoVerticalAbs",v:"linetoVerticalRel",Z:"closePath",z:"closePath"}
function PathParser(){this._lexer=new PathLexer();this._handler=null;}
PathParser.prototype.parseData=function(pathData){if(typeof(pathData)!="string")throw new Error("PathParser.parseData: The first parameter must be a string");if(this._handler!=null&&this._handler.beginParse!=null)this._handler.beginParse();var lexer=this._lexer;lexer.setPathData(pathData);var mode="BOP";var token=lexer.getNextToken();while(!token.typeis(PathToken.EOD)){var param_count;var params=new Array();switch(token.type){case PathToken.COMMAND:if(mode=="BOP"&&token.text!="M"&&token.text!="m")throw new Error("PathParser.parseData: a path must begin with a moveto command");mode=token.text;param_count=PathParser.PARAMCOUNT[token.text.toUpperCase()];token=lexer.getNextToken();break;case PathToken.NUMBER:break;default:throw new Error("PathParser.parseData: unrecognized token type: "+token.type);}for(var i=0;i<param_count;i++){switch(token.type){case PathToken.COMMAND:throw new Error("PathParser.parseData: parameter must be a number: "+token.text);case PathToken.NUMBER:params[i]=token.text-0;break;default:throw new Errot("PathParser.parseData: unrecognized token type: "+token.type);}token=lexer.getNextToken();}if(this._handler!=null){var handler=this._handler;var method=PathParser.METHODNAME[mode];if(handler[method]!=null)handler[method].apply(handler,params);}if(mode=="M")mode="L";if(mode=="m")mode="l";}};
PathParser.prototype.setHandler=function(handler){this._handler=handler;};
function PathLexer(pathData){if(pathData==null)pathData="";this.setPathData(pathData);}
PathLexer.prototype.setPathData=function(pathData){if(typeof(pathData)!="string")throw new Error("PathLexer.setPathData: The first parameter must be a string");this._pathData=pathData;};
PathLexer.prototype.getNextToken=function(){var result=null;var d=this._pathData;while(result==null){if(d==null||d==""){result=new PathToken(PathToken.EOD,"");}else if(d.match(/^([ \t\r\n,]+)/)){d=d.substr(RegExp.$1.length);}else if(d.match(/^([AaCcHhLlMmQqSsTtVvZz])/)){result=new PathToken(PathToken.COMMAND,RegExp.$1);d=d.substr(RegExp.$1.length);}else if(d.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)){result=new PathToken(PathToken.NUMBER,parseFloat(RegExp.$1));d=d.substr(RegExp.$1.length);}else{throw new Error("PathLexer.getNextToken: unrecognized path data "+d);}}this._pathData=d;return result;};
PathToken.UNDEFINED=0;
PathToken.COMMAND=1;
PathToken.NUMBER=2;
PathToken.EOD=3;
function PathToken(type,text){if(arguments.length>0){this.init(type,text);}}
PathToken.prototype.init=function(type,text){this.type=type;this.text=text;};
PathToken.prototype.typeis=function(type){return this.type==type;}
TransformParser.PARAMCOUNT={matrix:[6],translate:[1,2],scale:[1,2],rotate:[1,3],skewX:[1],skewY:[1]};
TransformParser.METHODNAME={matrix:"matrix",translate:"translate",scale:"scale",rotate:"rotate",skewX:"skewX",skewY:"skewY"}
function TransformParser(){this._lexer=new TransformLexer();this._handler=null;}
TransformParser.prototype.parseTransform=function(transformText){if(typeof(transformText)!="string")throw new Error("TransformParser.parseTransform: The first parameter must be a string");if(this._handler!=null&&this._handler.beginParse!=null)this._handler.beginParse();var lexer=this._lexer;lexer.setTransformText(transformText);var token=lexer.getNextToken();while(token.typeis(TransformToken.EOD)==false){var command;var param_counts;var params=new Array();switch(token.type){case TransformToken.MATRIX:case TransformToken.TRANSLATE:case TransformToken.SCALE:case TransformToken.ROTATE:case TransformToken.SKEWX:case TransformToken.SKEWY:command=token.text;param_counts=TransformParser.PARAMCOUNT[command];token=lexer.getNextToken();break;default:throw new Error("TransformParser.parseTransform: expected transform type: "+token.text);}if(token.type!=TransformToken.LPAREN){throw new Error("TransformParser.parserTransform: expected opening parenthesis: "+token.text);}token=lexer.getNextToken();while(token!=TransformToken.EOD&&token.type==TransformToken.NUMBER){params.push(token.text-0);token=lexer.getNextToken();}var valid=false;var actual_count=params.length;for(var i=0;i<param_counts.length;i++){if(param_counts[i]==actual_count){valid=true;break;}}if(valid==false){throw new Error("TransformParser.parserTransform: incorrect number of arguments for "+command);}if(token.type!=TransformToken.RPAREN){throw new Error("TransformParser.parserTransform: expected closing parenthesis: "+token.text);}token=lexer.getNextToken();if(this._handler!=null){var handler=this._handler;var method=TransformParser.METHODNAME[command];if(handler[method]!=null)handler[method].apply(handler,params);}}};
TransformParser.prototype.setHandler=function(handler){this._handler=handler;};
function TransformLexer(transformText){if(transformText==null)transformText="";this.setTransformText(transformText);}
TransformLexer.prototype.setTransformText=function(transformText){if(typeof(transformText)!="string")throw new Error("TransformLexer.setTransformText: The first parameter must be a string");this._transformText=transformText;};
TransformLexer.prototype.getNextToken=function(){var result=null;var buffer=this._transformText;while(result==null){if(buffer==null||buffer==""){result=new TransformToken(TransformToken.EOD,"");}else if(buffer.match(/^([ \t\r\n,]+)/)){buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(matrix)\b/)){result=new TransformToken(TransformToken.MATRIX,RegExp.$1);buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(translate)\b/)){result=new TransformToken(TransformToken.TRANSLATE,RegExp.$1);buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(scale)\b/)){result=new TransformToken(TransformToken.SCALE,RegExp.$1);buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(rotate)\b/)){result=new TransformToken(TransformToken.ROTATE,RegExp.$1);buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(skewX)\b/)){result=new TransformToken(TransformToken.SKEWX,RegExp.$1);buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(skewY)\b/)){result=new TransformToken(TransformToken.SKEWY,RegExp.$1);buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(\()/)){result=new TransformToken(TransformToken.LPAREN,RegExp.$1);buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(\))/)){result=new TransformToken(TransformToken.RPAREN,RegExp.$1);buffer=buffer.substr(RegExp.$1.length);}else if(buffer.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)){result=new TransformToken(TransformToken.NUMBER,parseFloat(RegExp.$1));buffer=buffer.substr(RegExp.$1.length);}else{throw new Error("TransformLexer.getNextToken: unable to tokenize text: "+buffer);}}this._transformText=buffer;return result;};
TransformToken.UNDEFINED=0;
TransformToken.MATRIX=1;
TransformToken.TRANSLATE=2;
TransformToken.SCALE=3;
TransformToken.ROTATE=4;
TransformToken.SKEWX=5;
TransformToken.SKEWY=6;
TransformToken.LPAREN=7;
TransformToken.RPAREN=8;
TransformToken.NUMBER=9;
TransformToken.EOD=10;
function TransformToken(type,text){if(arguments.length>0){this.init(type,text);}}
TransformToken.prototype.init=function(type,text){this.type=type;this.text=text;};
TransformToken.prototype.typeis=function(type){return this.type==type;}
function Color(red,green,blue){this.red=red;this.green=green;this.blue=blue;}
Color.prototype.lerp=function(that,t){t=Math.min(1,t);t=Math.max(0,t);var omt=1.0-t;var r=Math.round(this.red*omt+that.red*t);var g=Math.round(this.green*omt+that.green*t);var b=Math.round(this.blue*omt+that.blue*t);return new Color(r,g,b);};
Color.prototype.toHex=function(){var r=this.red.toString(16);var g=this.green.toString(16);var b=this.blue.toString(16);if(r.length==1)r="0"+r;if(g.length==1)g="0"+g;if(b.length==1)b="0"+b;return"#"+r+g+b;};
Color.prototype.toRGB=function(){return"rgb("+[this.red,this.green,this.blue].join(",")+")";};
Color.prototype.toRGBA=function(){return"rgba("+[this.red,this.green,this.blue,1].join(",")+")";};
Color.prototype.toInt=function(){return(this.red<<16|this.green<<8|this.blue);};
Shape.transformParser=null;
function Shape(){this.stroke=null;this.strokeWidth=0.0;this.fill=null;this.transform=null;}
Shape.prototype.hasTransform=function(){return(this.transform!=null);};
Shape.prototype.setTransform=function(transform){if(transform.constructor===String){var parser=Shape.transformParser;if(parser==null){parser=new TransformParser();Shape.transformParser=parser;}if(this.transform===TransformList){this.transform.clear();}else{this.transform=new TransformList();}parser.setHandler(this);parser.parseTransform(transform);}else{this.transform=transform}}
Shape.prototype.draw=function(renderer){throw new Error("subclasses must override the Shape.draw method");}
Shape.prototype.matrix=function(a,b,c,d,e,f){this.transform.addTransform(new MatrixTransform(a,b,c,d,e,f));};
Shape.prototype.translate=function(offsetX,offsetY){offsetY=offsetY||offsetX;this.transform.addTransform(new TranslateTransform(offsetX,offsetY));};
Shape.prototype.scale=function(scaleX,scaleY){scaleY=scaleY||scaleX;this.transform.addTransform(new ScaleTransform(offsetX,offsetY));};
Shape.prototype.rotate=function(angle,originX,originY){originX=originX||0;originY=originY||0;this.transform.addTransform(new RotateTransform(angle,new Point(originX,originY)));};
Shape.prototype.skewX=function(angle){throw new Error("not implemented");};
Shape.prototype.skewY=function(angle){throw new Error("not implemented");};
Group.prototype=new Shape();
Group.prototype.constructor=Path;
Group.prototype.superclass=Shape;
function Group(){this._children=[];}
Group.prototype.addChild=function(child){this._children.push(child);};
Group.prototype.draw=function(renderer){if(this.hasTransform()){renderer.pushTransform(this.transform);}for(var i=0;i<this._children.length;i++){this._children[i].draw(renderer);}if(this.hasTransform()){renderer.popTransform();}};
Group.prototype.removeChild=function(child){for(var i=0;i<this._children.length;i++){var target=this._children[i];if(target===child){this._children.splice(i,1);break;}}};
Path.prototype=new Shape();
Path.prototype.constructor=Path;
Path.prototype.superclass=Shape;
function Path(pathData){this.superclass.call(this);this._pathData=pathData;}
Path.prototype.draw=function(renderer){if(this.fill!=null||(this.stroke!=null&&this.strokeWidth!=0)){if(this.fill!=null){renderer.setFillColor(this.fill);}if(this.stroke!=null&&this.strokeWidth!=0.0){renderer.setStrokeColor(this.stroke);renderer.setStrokeWidth(this.strokeWidth);}if(this.hasTransform()){renderer.pushTransform(this.transform);}renderer.renderPathData(this._pathData);if(this.hasTransform()){renderer.popTransform();}}};
Rectangle.prototype=new Shape();
Rectangle.prototype.constructor=Path;
Rectangle.prototype.superclass=Shape;
function Rectangle(x,y,width,height,rx,ry){this.superclass.call(this);this._x=x;this._y=y;this._width=width;this._height=height;this._rx=rx||0;this._ry=ry||0;}
Rectangle.prototype.draw=function(renderer){if(this.fill!=null||(this.stroke!=null&&this.strokeWidth!=0)){renderer.beginRender();if(this.fill!=null){renderer.setFillColor(this.fill);}if(this.stroke!=null&&this.strokeWidth!=0.0){renderer.setStrokeColor(this.stroke);renderer.setStrokeWidth(this.strokeWidth);}if(this._rx==0&&this._ry==0){renderer.movetoAbs(this._x,this._y);renderer.linetoAbs(this._x+this._width,this._y);renderer.linetoAbs(this._x+this._width,this._y+this._height);renderer.linetoAbs(this._x,this._y+this._height);renderer.closePath();}else{var x=this._x;var y=this._y;var w=this._width;var h=this._height;var r=x+w;var b=y+h;var rx=this._rx;var ry=this._ry;renderer.movetoAbs(x,y+ry);renderer.linetoAbs(x,b-ry);renderer.curvetoQuadraticAbs(x,b,x+rx,b);renderer.linetoAbs(r-rx,b);renderer.curvetoQuadraticAbs(r,b,r,b-ry);renderer.linetoAbs(r,y+ry);renderer.curvetoQuadraticAbs(r,y,r-rx,y);renderer.linetoAbs(x+rx,y);renderer.curvetoQuadraticAbs(x,y,x,y+ry)}renderer.endRender();}};
function PathRenderer(bridge){this.bridge=bridge;this._transformStack=[];this._flatness=5;this._firstX;this._firstY;this._lastX=0;this._lastY=0;this._lastCommand;this._lastHandleX;this._lastHandleY;}
PathRenderer.prototype._hasMethod=function(methodName){return(this.bridge!=null&&this.bridge[methodName]!=null);}
PathRenderer.prototype._invoke=function(methodName){if(this._hasMethod(methodName)){if(arguments.length>2){throw new Error("PathRenderer._invoke only supports one or two arguments");}if(arguments.length==1){this.bridge[methodName]();}else{this.bridge[methodName](arguments[1]);}}};
PathRenderer.prototype.beginRender=function(){this._firstX;this._firstY;this._lastX=0;this._lastY=0;this._lastCommand;this._lastHandleX;this._lastHandleY;this._invoke("beginRender");};
PathRenderer.prototype.endRender=function(){this._invoke("endRender");};
PathRenderer.prototype.clear=function(){this._invoke("clear");};
PathRenderer.prototype.popTransform=function(){if(this._transformStack.length==0){throw new Error("tried to pop an element off of an empty transform stack")}if(this._hasMethod("popTransform")){this._invoke("popTransform");}};
PathRenderer.prototype.pushTransform=function(transform){this._transformStack.push(transform);if(this._hasMethod("pushTransform")){this._invoke("pushTransform",transform);}};
PathRenderer.prototype.renderPathData=function(pathData){var renderer=this.bridge;if(renderer!=null){if(this._hasMethod("renderPathData")){renderer.renderPathData(pathData);}else{this.beginRender();if(this._pathParser==null){this._pathParser=new PathParser();this._pathParser.setHandler(this);}this._pathParser.parseData(pathData);this.endRender();}}};
PathRenderer.prototype.setFillColor=function(fill){this._invoke("setFillColor",fill);};
PathRenderer.prototype.setStrokeColor=function(stroke){this._invoke("setStrokeColor",stroke);};
PathRenderer.prototype.setStrokeWidth=function(strokeWidth){this._invoke("setStrokeWidth",strokeWidth);};
PathRenderer.prototype.arcAbs=function(rx,ry,xAxisRotation,largeArcFlag,sweepFlag,x,y){var renderer=this.bridge;if(renderer!=null&&(this._lastX!=x||this._lastY!=y)){if(this._hasMethod("arcTo")){renderer.arcTo(rx,ry,xAxisRotation,largeArcFlag,sweepFlag,x,y);}else{var cx,cy;var startAngle,sweepAngle,endAngle;if(rx!=0.0||ry!=0.0){var halfDx=(this._lastX-x)*0.5;var halfDy=(this._lastY-y)*0.5;var radians=xAxisRotation*Math.PI/180.0;var cos=Math.cos(radians);var sin=Math.sin(radians);var x1p=halfDx*cos+halfDy*sin;var y1p=halfDx*-sin+halfDy*cos;var x1px1p=x1p*x1p;var y1py1p=y1p*y1p;var lambda=(x1px1p/(rx*rx)) + (y1py1p/(ry*ry));if(lambda>1.0){var factor=Math.sqrt(lambda);rx*=factor;ry*=factor;}var rxrx=rx*rx;var ryry=ry*ry;var rxrxryry=rxrx*ryry;var rxrxy1py1p=rxrx*y1py1p;var ryryx1px1p=ryry*x1px1p;var numerator=rxrxryry-rxrxy1py1p-ryryx1px1p;var s;if(numerator<1e-6){s=0;}else{s=Math.sqrt(numerator/(rxrxy1py1p+ryryx1px1p));}if(largeArcFlag==sweepFlag){s=-s;}var cxp=s*rx*y1p/ry;var cyp=s*-ry*x1p/rx;cx=cxp*cos-cyp*sin+(this._lastX+x)*0.5;cy=cxp*sin+cyp*cos+(this._lastY+y)*0.5;var u=new Vector(1,0);var v=new Vector((x1p-cxp),(y1p-cyp));var w=new Vector((-x1p-cxp),(-y1p-cyp));startAngle=u.angleBetween(v);sweepAngle=v.angleBetween(w);if(!sweepFlag&&sweepAngle>0.0){sweepAngle-=360;}else if(sweepFlag&&sweepAngle<0.0){sweepAngle+=360;}endAngle=startAngle+sweepAngle;}if(this._hasMethod("quadraticCurveTo")){if(startAngle!=endAngle){var sign=(sweepAngle>0)?1:-1;var incr=sign*45;var steps=sign*Math.floor(sweepAngle/45);var start=startAngle*Math.PI/180;for(var i=0;i<steps;i++){var end=(startAngle+incr)*Math.PI/180;var startX=rx*Math.cos(start)+cx;var startY=ry*Math.sin(start)+cy;var endX=rx*Math.cos(end)+cx;var endY=ry*Math.sin(end)+cy;var halfAngle=(start+end)*0.5;var midX=rx*Math.cos(halfAngle)+cx;var midY=ry*Math.sin(halfAngle)+cy;var controlX=2*(midX-0.25*startX-0.25*endX);var controlY=2*(midY-0.25*startY-0.25*endY);renderer.quadraticCurveTo(controlX,controlY,endX,endY);startAngle+=incr;start=end;}if(startAngle!=endAngle){var end=endAngle*Math.PI/180;var startX=rx*Math.cos(start)+cx;var startY=ry*Math.sin(start)+cy;var endX=rx*Math.cos(end)+cx;var endY=ry*Math.sin(end)+cy;var halfAngle=(start+end)*0.5;var midX=rx*Math.cos(halfAngle)+cx;var midY=ry*Math.sin(halfAngle)+cy;var controlX=2*(midX-0.25*startX-0.25*endX);var controlY=2*(midY-0.25*startY-0.25*endY);renderer.quadraticCurveTo(controlX,controlY,endX,endY);}}}else if(this._hasMethod("lineTo")){var flatness=this._flatness;var radPerDeg=Math.PI/180.0;var startDegree=startAngle*radPerDeg;var endDegree=endAngle*radPerDeg;function pointAtAngle(angle){return new Point(cx+Math.cos(angle)*rx,cy+Math.sin(angle)*ry);}function plotInterior(start,end){var mid=(start+end)*0.5;var startPoint=pointAtAngle(start);var midPoint=pointAtAngle(mid);var endPoint=pointAtAngle(end);var v1=Vector.fromPoints(startPoint,midPoint);var v2=Vector.fromPoints(startPoint,endPoint);var perp=v1.perpendicular(v2);var dmax=perp.length();if(dmax>flatness){plotInterior(start,mid);renderer.lineTo(midPoint.x,midPoint.y);plotInterior(mid,end);}else{renderer.lineTo(midPoint.x,midPoint.y);}}var firstPoint=pointAtAngle(startDegree);renderer.lineTo(firstPoint.x,firstPoint.y);plotInterior(startDegree,endDegree);var lastPoint=pointAtAngle(endDegree);renderer.lineTo(lastPoint.x,lastPoint.y);}}}this._lastX=x;this._lastY=y;this._lastCommand="A";};
PathRenderer.prototype.arcRel=function(rx,ry,xAxisRotation,largeArcFlag,sweepFlag,x,y){this.arcAbs(rx,ry,xAxisRotation,largeArcFlag,sweepFlag,this._lastX+x,this._lastY+y);};
PathRenderer.prototype.curvetoCubicAbs=function(x1,y1,x2,y2,x,y){var renderer=this.bridge;if(renderer!=null){if(this._hasMethod("curveTo")){renderer.curveTo(x1,y1,x2,y2,x,y);}else if(this._hasMethod("quadraticCurveTo")){var ab8X=(x1-this._lastX)*0.125;var ab8Y=(y1-this._lastY)*0.125;var dc8X=(x-x2)*0.125;var dc8Y=(y-y2)*0.125;var eX=this._lastX+ab8X*4;var eY=this._lastY+ab8Y*4;var fX=(x2-x1)*0.5+x1;var fY=(y2-y1)*0.5+y1;var gX=x2+dc8X*4;var gY=y2+dc8Y*4;var hX=(fX-eX)*0.5+eX;var hY=(fY-eY)*0.5+eY;var iX=(gX-fX)*0.5+fX;var iY=(gY-fY)*0.5+fY;var hi8X=(iX-hX)*0.125;var hi8Y=(iY-hY)*0.125;var c0x=this._lastX+ab8X*3;var c0y=this._lastY+ab8Y*3;var c1x=hX+hi8X;var c1y=hY+hi8Y;var a0x=(c1x-c0x)*0.5+c0x;var a0y=(c1y-c0y)*0.5+c0y;var a1x=hX+hi8X*4;var a1y=hY+hi8Y*4;var c2x=hX+hi8X*7;var c2y=hY+hi8Y*7;var c3x=gX+dc8X;var c3y=gY+dc8Y;var a2x=(c3x-c2x)*0.5+c2x;var a2y=(c3y-c2y)*0.5+c2y;renderer.quadraticCurveTo(c0x,c0y,a0x,a0y);renderer.quadraticCurveTo(c1x,c1y,a1x,a1y);renderer.quadraticCurveTo(c2x,c2y,a2x,a2y);renderer.quadraticCurveTo(c3x,c3y,x,y);}else if(this._hasMethod("lineTo")){var flatness=this._flatness;function plotInterior(p1,p2,p3,p4){var p5=p1.midpoint(p2);var p6=p2.midpoint(p3);var p7=p3.midpoint(p4);var p8=p5.midpoint(p6);var p9=p6.midpoint(p7);var p10=p8.midpoint(p9);var baseline=Vector.fromPoints(p1,p4);var tangent1=Vector.fromPoints(p1,p2);var tangent2=Vector.fromPoints(p4,p3);var dmax=0;if(tangent1.isZeroVector()==false){var perpendicular=baseline.perpendicular(tangent1);dmax=perpendicular.length();}if(tangent2.isZeroVector()==false){var perpendicular=baseline.perpendicular(tangent2);dmax=Math.max(dmax,perpendicular.length());}if(dmax>flatness){plotInterior(p1,p5,p8,p10);renderer.lineTo(p10.x,p10.y);plotInterior(p10,p9,p7,p4);}else{renderer.lineTo(p10.x,p10.y);}}plotInterior(new Point(this._lastX,this._lastY),new Point(x1,y1),new Point(x2,y2),new Point(x,y));renderer.lineTo(x,y);}}this._lastX=x;this._lastY=y;this._lastCommand="C";this._lastHandleX=x2;this._lastHandleY=y2;};
PathRenderer.prototype.curvetoCubicRel=function(x1,y1,x2,y2,x,y){this.curvetoCubicAbs(this._lastX+x1,this._lastY+y1,this._lastX+x2,this._lastY+y2,this._lastX+x,this._lastY+y);};
PathRenderer.prototype.linetoHorizontalAbs=function(x){this.linetoAbs(x,this._lastY);};
PathRenderer.prototype.linetoHorizontalRel=function(x){this.linetoAbs(this._lastX+x,this._lastY);};
PathRenderer.prototype.linetoAbs=function(x,y){if(this.bridge!=null){if(this._hasMethod("lineTo")){this.bridge.lineTo(x,y);}}this._lastX=x;this._lastY=y;this._lastCommand="L";};
PathRenderer.prototype.linetoRel=function(x,y){this.linetoAbs(this._lastX+x,this._lastY+y);};
PathRenderer.prototype.movetoAbs=function(x,y){if(this.bridge!=null){if(this._hasMethod("moveTo")){this.bridge.moveTo(x,y);}}this._firstX=x;this._firstY=y;this._lastX=x;this._lastY=y;this._lastCommand="M";};
PathRenderer.prototype.movetoRel=function(x,y){this.movetoAbs(this._lastX+x,this._lastY+y);};
PathRenderer.prototype.curvetoQuadraticAbs=function(x1,y1,x,y){var renderer=this.bridge;if(renderer!=null){if(this._hasMethod("quadraticCurveTo")){renderer.quadraticCurveTo(x1,y1,x,y);}else if(this._hasMethod("curveTo")){var c1x=this._lastX+(x1-this._lastX)*2/3;var c1y=this._lastY+(y1-this._lastY)*2/3;var c2x=x1+(x-x1)/3;var c2y=y1+(y-y1)/3;renderer.curveTo(c1x,c1y,c2x,c2y,x,y);}else if(this._hasMethod("lineTo")){var flatness=this._flatness;function plotInterior(p1,p2,p3){var p4=p1.midpoint(p2);var p5=p2.midpoint(p3);var p6=p4.midpoint(p5);var baseline=Vector.fromPoints(p1,p3);var tangent=Vector.fromPoints(p1,p2);var dmax=0;if(tangent.isZeroVector()==false){var perpendicular=baseline.perpendicular(tangent);dmax=perpendicular.length();}if(dmax>flatness){plotInterior(p1,p4,p6);renderer.lineTo(p6.x,p6.y);plotInterior(p6,p5,p3);}else{renderer.lineTo(p6.x,p6.y);}}plotInterior(new Point(this._lastX,this._lastY),new Point(x1,y1),new Point(x,y));renderer.lineTo(x,y);}}this._lastX=x;this._lastY=y;this._lastCommand="Q";this._lastHandleX=x1;this._lastHandleY=y1;};
PathRenderer.prototype.curvetoQuadraticRel=function(x1,y1,x,y){this.curvetoQuadraticAbs(this._lastX+x1,this._lastY+y1,this._lastX+x,this._lastY+y);};
PathRenderer.prototype.curvetoCubicSmoothAbs=function(x2,y2,x,y){var x1,y1;if(this._lastCommand=="C"){x1=this._lastX+(this._lastX-this._lastHandleX);y1=this._lastY+(this._lastY-this._lastHandleY);}else{x1=this._lastX;y1=this._lastY;}this.curvetoCubicAbs(x1,y1,x2,y2,x,y);};
PathRenderer.prototype.curvetoCubicSmoothRel=function(x2,y2,x,y){this.curvetoCubicSmoothAbs(this._lastX+x2,this._lastY+y2,this._lastX+x,this._lastY+y);};
PathRenderer.prototype.curvetoQuadraticSmoothAbs=function(x,y){var x1,y1;if(this._lastCommand=="Q"){x1=this._lastX+(this._lastX-this._lastHandleX);y1=this._lastY+(this._lastY-this._lastHandleY);}else{x1=this._lastX;y1=this._lastY;}this.curvetoQuadraticAbs(x1,y1,x,y);};
PathRenderer.prototype.curvetoQuadraticSmoothRel=function(x,y){this.curvetoQuadraticSmoothAbs(this._lastX+x,this._lastY+y);};
PathRenderer.prototype.linetoVerticalAbs=function(y){this.linetoAbs(this._lastX,y);};
PathRenderer.prototype.linetoVerticalRel=function(y){this.linetoAbs(this._lastX,this._lastY+y);};
PathRenderer.prototype.closePath=function(){this._invoke("close");this._lastX=this._firstX;this._lastY=this._firstY;this._lastCommand="Z";};
function FlashBridge(movieClip){this._canvas=movieClip;this._stroke;this._strokeWidth;this._firstX;this._firstY;}
FlashBridge.isSupported=function(){var result=false;if(navigator.userAgent.indexOf("Opera")==-1){var parts=[0,0];if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){var desc1=x.description;var desc2=desc1.replace(/([a-z]|[A-Z]|\s)+/,"");var desc3=desc2.replace(/(\s+r|\s+b[0-9]+)/,".");parts=desc3.split(".");}}else if(window.ActiveXObject){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");parts=axo.GetVariable("$version").split(" ")[1].split(",");}catch(e){}}var major=parts[0]||0;var minor=parts[1]||0;result=(major>8||(major==8&&minor>=0));}return result;};
FlashBridge.prototype.clear=function(){this._canvas.clear();};
FlashBridge.prototype.endRender=function(){this._canvas.endFill();this._canvas.lineStyle(undefined);};
FlashBridge.prototype.setFillColor=function(fill){var fillValue;if(fill.constructor===Color){fillValue=fill.toInt();}else{fillValue=parseInt(fill.substring(1,fill.length),16);}this._canvas.beginFill(fillValue,100);};
FlashBridge.prototype.setStrokeColor=function(stroke){var strokeValue;if(stroke.constructor===Color){strokeValue=stroke.toInt();}else{strokeValue=parseInt(stroke.substring(1,fill.length),16);}this._stroke=strokeValue;if(this._strokeWidth!=null){this._canvas.lineStyle(this._strokeWidth,this._stroke);}};
FlashBridge.prototype.setStrokeWidth=function(width){this._strokeWidth=width;if(this._stroke!=null){this._canvas.lineStyle(this._strokeWidth,this._stroke);}};
FlashBridge.prototype.moveTo=function(x,y){this._canvas.moveTo(x,y);this._firstX=x;this._firstY=y;};
FlashBridge.prototype.lineTo=function(x,y){this._canvas.lineTo(x,y);};
FlashBridge.prototype.quadraticCurveTo=function(x1,y1,x,y){this._canvas.curveTo(x1,y1,x,y);};
FlashBridge.prototype.close=function(){this._canvas.moveTo(this._firstX,this._firstY);};
function CanvasBridge(id){var canvasElement=document.getElementById(id);this._width=canvasElement.width;this._height=canvasElement.height;this._canvas=canvasElement.getContext("2d");this._fill;this._stroke;this._strokeWidth;}
CanvasBridge.prototype._applyTransform=function(transform){var ctor=transform.constructor;if(ctor===ScaleTransform){var origin=transform.origin;if(origin.x==0.0&&origin.y==0.0){this._canvas.scale(transform.scaleX,transform.scaleY);}else{this._canvas.translate(origin.x,origin.y);this._canvas.scale(transform.scaleX,transform.scaleY);this._canvas.translate(-origin.x,-origin.y);}}else if(ctor===RotateTransform){var origin=transform.origin;if(origin.x==0.0&&origin.y==0.0){this._canvas.rotate(transform.angle*Math.PI/180.0);}else{this._canvas.translate(origin.x,origin.y);this._canvas.rotate(transform.angle*Math.PI/180.0);this._canvas.translate(-origin.x,-origin.y);}}else if(ctor===TranslateTransform){this._canvas.translate(transform.offsetX,transform.offsetY);}else if(ctor==TransformList){var transforms=transform.transforms;for(var i=0;i<transforms.length;i++){this._applyTransform(transforms[i]);}}};
CanvasBridge.isSupported=function(){var canvas=document.createElement("canvas");var result=false;if(canvas.getContext!=null){var context=canvas.getContext("2d");result=(context!=null);}return result;};
CanvasBridge.prototype.clear=function(){this._canvas.clearRect(0,0,this._width,this._height);};
CanvasBridge.prototype.beginRender=function(){this._canvas.beginPath();};
CanvasBridge.prototype.endRender=function(){if(this._fill!=null||(this._stroke!=null&&this._strokeWidth>0)){if(this._fill!=null){var fillValue;if(this._fill.constructor===Color){fillValue=this._fill.toRGB();}else{fillValue=this._fill;}this._canvas.fillStyle=fillValue;this._canvas.fill();}if(this._stroke!=null&&this._strokeWidth>0){var strokeValue;if(this._stroke.constructor===Color){strokeValue=this._stroke.toRGB();}else{strokeValue=this._stroke;}this._canvas.strokeStyle=strokeValue;this._canvas.lineWidth=this._strokeWidth;this._canvas.stroke();}}};
CanvasBridge.prototype.popTransform=function(){this._canvas.restore();};
CanvasBridge.prototype.pushTransform=function(transform){this._canvas.save();this._applyTransform(transform);};
CanvasBridge.prototype.setFillColor=function(fill){this._fill=fill;};
CanvasBridge.prototype.setStrokeColor=function(stroke){this._stroke=stroke;};
CanvasBridge.prototype.setStrokeWidth=function(width){this._strokeWidth=width;};
CanvasBridge.prototype.moveTo=function(x,y){this._canvas.moveTo(x,y);};
CanvasBridge.prototype.lineTo=function(x,y){this._canvas.lineTo(x,y);};
CanvasBridge.prototype.curveTo=function(x1,y1,x2,y2,x,y){this._canvas.bezierCurveTo(x1,y1,x2,y2,x,y);};
CanvasBridge.prototype.quadraticCurveTo=function(x1,y1,x,y){this._canvas.quadraticCurveTo(x1,y1,x,y);};
CanvasBridge.prototype.close=function(){this._canvas.closePath();};
function DivBridge(id){this._canvas=new jsGraphics(id);this._fill;this._stroke;this._strokeWidth;this._x=[];this._y=[];this._firstX;this._firstY;}
DivBridge.isSupported=function(){return true;};
DivBridge.prototype.clear=function(){this._canvas.clear();};
DivBridge.prototype.endRender=function(){if(this._x.length>1){if(this._fill!=null||(this._stroke!=null&&this._strokeWidth!=0)){if(this._fill!=null){var fillValue;if(this._fill.constructor===Color){fillValue=this._fill.toHex();}else{fillValue=this._fill;}this._canvas.setColor(fillValue);this._canvas.fillPolygon(this._x,this._y);}if(this._stroke!=null&&this._strokeWidth>0){var strokeValue;if(this._stroke.constructor===Color){strokeValue=this._stroke.toHex();}else{strokeValue=this._stroke;}this._canvas.setColor(strokeValue);this._canvas.setStroke(this._strokeWidth);this._canvas.drawPolyline(this._x,this._y);}this._canvas.paint();}}this._x=[];this._y=[];};
DivBridge.prototype.setFillColor=function(fill){this._fill=fill;};
DivBridge.prototype.setStrokeColor=function(stroke){this._stroke=stroke;};
DivBridge.prototype.setStrokeWidth=function(width){this._strokeWidth=width;};
DivBridge.prototype.moveTo=function(x,y){this.endRender();this._x.push(x);this._y.push(y);this._firstX=x;this._firstY=y;};
DivBridge.prototype.lineTo=function(x,y){this._x.push(x);this._y.push(y);};
DivBridge.prototype.close=function(){this._x.push(this._firstX);this._y.push(this._firstY);this.endRender();};
SVGBridge.svgns="http://www.w3.org/2000/svg";
function SVGBridge(id){this._canvas=document.getElementById(id);this._svgRoot=document.createElementNS(SVGBridge.svgns,"svg");this._canvas.appendChild(this._svgRoot);this._fill;this._stroke;this._strokeWidth;this._transform;this._pathData;}
SVGBridge.prototype._addCommand=function(command,args){var argArray=[];var sameCommand=(command==this._lastCommand);var impliedLine=(this._lastCommand=="M"&&command=="L");for(var i=0;i<args.length;i++){argArray[i]=args[i];}if(sameCommand||impliedLine){this._pathData.push(argArray.join(","));}else{this._pathData.push(command+argArray.join(","));}};
SVGBridge.isSupported=function(){var result=false;if(document.createElementNS){var svg=document.createElementNS(SVGBridge.svgns,"svg");result=(svg.x!=null);}return result;};
SVGBridge.prototype.clear=function(){while(this._svgRoot.hasChildNodes()){this._svgRoot.removeChild(this._svgRoot.firstChild);}};
SVGBridge.prototype.beginRender=function(){this._pathData=[];};
SVGBridge.prototype.endRender=function(){var pathData=this._pathData.join(" ");this.renderPathData(pathData);};
SVGBridge.prototype.popTransform=function(){this._transform=null;};
SVGBridge.prototype.pushTransform=function(transform){this._transform=transform;};
SVGBridge.prototype.setFillColor=function(fill){this._fill=fill;};
SVGBridge.prototype.setStrokeColor=function(stroke){this._stroke=stroke;};
SVGBridge.prototype.setStrokeWidth=function(width){this._strokeWidth=width;};
SVGBridge.prototype.renderPathData=function(pathData){if(this._fill!=null||(this._stroke!=null&&this._strokeWidth>0)){var path=document.createElementNS(SVGBridge.svgns,"path");path.setAttributeNS(null,"d",pathData);if(this._fill!=null){var fillValue;if(this._fill.constructor===Color){fillValue=this._fill.toHex();}else{fillValue=this._fill;}path.setAttributeNS(null,"fill",fillValue);}else{path.setAttributeNS(null,"fill","none");}if(this._stroke!=null&&this._strokeWidth>0){var strokeValue;if(this._stroke.constructor===Color){strokeValue=this._stroke.toHex();}else{strokeValue=this._stroke;}path.setAttributeNS(null,"stroke",strokeValue);path.setAttributeNS(null,"stroke-width",this._strokeWidth);}if(this._transform!=null){var transform=this._transform.getTransformText();path.setAttributeNS(null,"transform",transform);}this._svgRoot.appendChild(path);}};
SVGBridge.prototype.arcTo=function(rx,ry,xAxisRotation,largeArcFlag,sweepFlag,x,y){this._addCommand("A",arguments);};
SVGBridge.prototype.curveTo=function(x1,y1,x2,y2,x,y){this._addCommand("C",arguments);};
SVGBridge.prototype.lineTo=function(x,y){this._addCommand("L",arguments);};
SVGBridge.prototype.moveTo=function(x,y){this._addCommand("M",arguments);};
SVGBridge.prototype.quadraticCurveTo=function(x1,y1,x,y){this._addCommand("Q",arguments);};
SVGBridge.prototype.close=function(){this._addCommand("z",arguments);};
VMLBridge.initialized=false;
function VMLBridge(id){this._parent=document.getElementById(id);this._fill;this._stroke;this._strokeWidth;this._pathData;if(VMLBridge.initialized==false){document.namespaces.add("v","urn:schemas-microsoft-com:vml");var style=document.createStyleSheet();style.addRule('v\\:*',"behavior: url(#default#VML);");VMLBridge.initialized=true;}}
VMLBridge.isSupported=function(){var ie=navigator.appVersion.match(/MSIE (\d\.\d)/);return(ie&&ie[1]>=6);};
VMLBridge.prototype.clear=function(){};
VMLBridge.prototype.beginRender=function(){this._pathData=[];};
VMLBridge.prototype.endRender=function(){if(this._fill!=null||(this._stroke!=null&&this._strokeWidth>0)){var shape=document.createElement("v:shape");var style=shape.style;var pathData=this._pathData.join(" ");style.position="absolute";style.left=0;style.top=0;style.width=500;style.height=500;shape.setAttribute("coordsize","500,500");shape.setAttribute("path",pathData);var fill=document.createElement("v:fill");if(this._fill!=null){if(this._fill.constructor===Color){fill.setAttribute("color",this._fill.toHex());}else{fill.setAttribute("color",this._fill);}}else{fill.setAttribute("on",false);}shape.appendChild(fill);var stroke=document.createElement("v:stroke");if(this._stroke!=null&&this._strokeWidth>0){if(this._stroke.constructor===Color){stroke.setAttribute("color",this._stroke.toHex());}else{stroke.setAttribute("color",this._stroke);}stroke.setAttribute("weight",this._strokeWidth);}else{stroke.setAttribute("on",false);}shape.appendChild(stroke);this._parent.appendChild(shape);}};
VMLBridge.prototype.setFillColor=function(fill){this._fill=fill;};
VMLBridge.prototype.setStrokeColor=function(stroke){this._stroke=stroke;};
VMLBridge.prototype.setStrokeWidth=function(width){this._strokeWidth=width;};
VMLBridge.prototype.moveTo=function(x,y){x=Math.round(x);y=Math.round(y);this._pathData.push("m"+x+","+y);};
VMLBridge.prototype.lineTo=function(x,y){x=Math.round(x);y=Math.round(y);this._pathData.push("l"+x+","+y);};
VMLBridge.prototype.close=function(){this._pathData.push("x");};
VMLBridge.prototype.curveTo=function(x1,y1,x2,y2,x,y){x1=Math.round(x1);y1=Math.round(y1);x2=Math.round(x2);y2=Math.round(y2);x=Math.round(x);y=Math.round(y);this._pathData.push("c"+[x1,y1,x2,y2,x,y].join(","));};