---
title: Drawing lines
---
A line in Rajawali consists of one or more line segments. First you need to specify all the points that make up the line. Like so:
```
Stack points = new Stack();
points.add(new Number3D(2, 0, 0));
points.add(new Number3D(4, 0, 0));
points.add(new Number3D(2, 2, 0));
points.add(new Number3D(2, 0, 6));
// ... etc ...
```
This Stack can then be passed into the constructor of the Line3D class along with a thickness and a color:
```
Line3D line = new Line3D(points, 1, 0xffffff00);
SimpleMaterial material = new SimpleMaterial();
material.setUseColor(true);
whirl.setMaterial(material);
addChild(whirl);
```
It's easy as that. Using line segments like this you can create nice looking shapes like this:

![Lines](http://www.rozengain.com/files/rajawali/rajawali-lines.jpg)

It's also relatively easy to draw bezier curves. You first need to create an instance of `BezierPath3D` and then pass in the points and control points:
```
BezierPath3D bezierPath = new BezierPath3D();
bezierPath.addPoint(new Number3D(0, -4, 0), new Number3D(-2, -4, .2f), new Number3D(4, 4, 4), new Number3D(-2, 4, 4.5f));
bezierPath.addPoint(new Number3D(-2, 4, 4.5f), new Number3D(2, -2, -2), new Number3D(4, 4, 4), new Number3D(-2, 4, 4.5f));
```
Now we can interpolate through these points and create line segments. The more segments, the smoother the line.
```
// -- again, create a Stack of Number3Ds
Stack points = new Stack();

// -- the more segments, the smoother the line
int numLineSegments = 100;

for(int i=0; i < numLineSegments; i++) {
	// -- BezierPath3D's calculatePoint() method calculates and interpolated
	//     Number3D. It accepts values between 0 and 1, hence i / numLineSegments
	points.push(bezierPath.calculatePoint(i / (float)numLineSegments));
}

// -- create out bezier curve
Line3D line = new Line3D(points, 1, 0x00ff00);
SimpleMaterial material = new SimpleMaterial();
material.setUseColor(true);
line.setMaterial(material);
addChild(line);
```
… and here's the result of this:

![Bezier Lines](http://www.rozengain.com/files/rajawali/rajawali-bezier-curve.jpg)

The shape in the first image can be seen in the examples app.

Anti aliasing/multi sampling can be enabled in the Activity. Just set the `mMultisamplingEnabled` property to true in `onCreate()` just before `super.onCreate()` is called:
```
@Override
public void onCreate(Bundle savedInstanceState) {
	requestWindowFeature(Window.FEATURE_NO_TITLE);
	getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
				WindowManager.LayoutParams.FLAG_FULLSCREEN);
	mMultisamplingEnabled = true;
	super.onCreate(savedInstanceState);
	...
```
The source code can be found on [here](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliLinesRenderer.java).