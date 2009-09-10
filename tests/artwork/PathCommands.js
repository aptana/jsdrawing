/**
 * PathCommands.js
 * 
 * @author Kevin Lindsey
 * @version 1.0
 * 
 * copyright 2006, Kevin Lindsey
 * 
 */

function arcToAbs() {
	var path = new Path("M50,25 A25,25 0 0,0 50,75");
	
	path.stroke = new Color(128, 0, 0);
	path.strokeWidth = 3;
	
	return path;
}

function arcToRel() {
	var path = new Path("M50,25 a25,25 0 0,0 0,50");
	
	path.stroke = new Color(0, 128, 0);
	path.strokeWidth = 3;
	
	return path;
}

function curveToAbs() {
	var path = new Path("M25,25 C25,75 75,25 75,75");
	
	path.stroke = new Color(128, 0, 0);
	path.strokeWidth = 3;
	
	return path;
}

function curveToRel() {
	var path = new Path("M25,25 c0,50 50,0 50,50");
	
	path.stroke = new Color(0, 128, 0);
	path.strokeWidth = 3;
	
	return path;
}

function horizontalAbs() {
	var path = new Path("M25,50 H75");
	
	path.stroke = new Color(128, 0, 0);
	path.strokeWidth = 3;
	
	return path;
}

function horizontalRel() {
	var path = new Path("M25,50 h50");
	
	path.stroke = new Color(0, 128, 0);
	path.strokeWidth = 3;
	
	return path;
}

function lineToAbs() {
	var path = new Path("M25,25 L75,75");
	
	path.stroke = new Color(128, 0, 0);
	path.strokeWidth = 3;
	
	return path;
}

function lineToRel() {
	var path = new Path("M25,25 l50,50");
	
	path.stroke = new Color(0, 128, 0);
	path.strokeWidth = 3;
	
	return path;
}

function moveToAbs() {
	var path = new Path("M25,25 25,75 M75,25 75,75");
	
	path.stroke = new Color(128, 0, 0);
	path.strokeWidth = 3;
	
	return path;
}

function moveToRel() {
	var path = new Path("m25,25 0,50 m50,-50 0,50");
	
	path.stroke = new Color(0, 128, 0);
	path.strokeWidth = 3;
	
	return path;
}

function quadraticCurveToAbs() {
	var path = new Path("M25,75 Q50,25 75,75");
	
	path.stroke = new Color(128, 0, 0);
	path.strokeWidth = 3;
	
	return path;
}

function quadraticCurveToRel() {
	var path = new Path("M25,75 q25,-50 50,0");
	
	path.stroke = new Color(0, 128, 0);
	path.strokeWidth = 3;
	
	return path;
}

function smoothCurveToAbs() {
	var path = new Path("M20,50 C30,25 40,25 50,50 S70,75 80,50");
	
	path.stroke = new Color(128, 0, 0);
	path.strokeWidth = 3;
	
	return path;
}

function smoothCurveToRel() {
	var path = new Path("M20,50 C30,25 40,25 50,50 s20,25 30,0");
	
	path.stroke = new Color(0, 128, 0);
	path.strokeWidth = 3;
	
	return path;
}

function smoothQuadraticCurveToAbs() {
	var path = new Path("M20,50 Q35,25 50,50 T80,50");
	
	path.stroke = new Color(128, 0, 0);
	path.strokeWidth = 3;
	
	return path;
}

function smoothQuadraticCurveToRel() {
	var path = new Path("M20,50 Q35,25 50,50 t30,0");
	
	path.stroke = new Color(0, 128, 0);
	path.strokeWidth = 3;
	
	return path;
}

function verticalAbs() {
	var path = new Path("M50,25 V75");
	
	path.stroke = new Color(128, 0, 0);
	path.strokeWidth = 3;
	
	return path;
}

function verticalRel() {
	var path = new Path("M50,25 v50");
	
	path.stroke = new Color(0, 128, 0);
	path.strokeWidth = 3;
	
	return path;
}
