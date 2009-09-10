/**
 * Rectangles.js
 * 
 * @author Kevin Lindsey
 * @version 1.0
 * 
 * copyright 2006, Kevin Lindsey
 * 
 */

/**
 * Build an image with a series of shapes
 */
function makeImage() {
	var r1 = new Rectangle(10, 10, 100, 100);
	var r2 = new Rectangle(120, 10, 220, 100, 10, 10);
	
	r1.fill = new Color(128, 0, 0);
	r2.fill = new Color(0, 128, 0);
	
	shapes.addChild(r1);
	shapes.addChild(r2);
}
