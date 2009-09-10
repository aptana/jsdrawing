/*
 * Globals
 */
var renderer;
var fill = "#000000";
var shapes = new Group();

/**
 * initialize test harness
 * 
 * @param {IBridge} bridge
 * @param {Function} imageCreator
 */
function initTest(bridge, imageCreator) {
	// create path walker and store globally
	renderer = new PathRenderer(bridge);
				
	// create shapes
	imageCreator();
	
	// draw
	drawShapes();
}

/**
 * Output all shapes
 */
function drawShapes() {
	// clear renderer
	renderer.clear();
	
	// draw shapes
	shapes.draw(renderer);
}

/**
 * Add a new path using the currently active fill
 * 
 * @param {String} pathData
 */
function addPath(pathData) {
	var path = new Path(pathData);
	
	path.fill = fill;
	
	shapes.addChild(path);
}