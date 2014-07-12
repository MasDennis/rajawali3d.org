Bezier path animations can look really nice but they can be a huge pain in the *** when you need to construct them.

Catmull-Rom splines can make your life much easier. This spline is named after two people, one of them being Edwin Catmull who is the founder and president of Pixar Animation Studios. So yeah, it must be good then 

A Catmull-Rom spline consists of two control points and at least two ‘normal’ points. So if you pass in less than four points it will puke all over you. Don’t say I didn’t warn you :O

All you need to do is create an instance of `CatmullRomPath3D` and call `addPoint()` a couple of times:
```
CatmullRomPath3D path = new CatmullRomPath3D();
path.addPoint(new Number3D(2, 0, -2));
path.addPoint(new Number3D(6, 3, 0));
path.addPoint(new Number3D(1, -2, 0));
path.addPoint(new Number3D(-8, -4, 10));
path.addPoint(new Number3D(0, 0, 12));
path.addPoint(new Number3D(11, 6, 8));
```
This line can now be drawn by stitching together line segments or you can use it as an animation path.
To accomplish the latter, just pass the path into the `TranslateAnimation3D` constructor to create a nice animation:
```
TranslateAnimation3D anim = new TranslateAnimation3D(path);
anim.setDuration(12000);
anim.setRepeatCount(Animation3D.INFINITE);
anim.setRepeatMode(Animation3D.REVERSE);
// -- orient to path
anim.setOrientToPath(true);
anim.setTransformable3D(arrow);
anim.start();
```
Passing `true` to the `setOrientToPath()` method will set the object’s orientation to current path segment.

To draw the path you can call `CatmullRomPath3D`’s `calculatePoint()` method to get the interpolated point. Once you’ve filled the `Stack` with `Number3Ds` you can pass it on to the `Line3D` constructor to visualize the spline:
```
Stack linePoints = new Stack();
for (int i = 0; i < 100; i++) {
	linePoints.add(path.calculatePoint(i / 100f));
}
Line3D line = new Line3D(linePoints, 1, 0xffffffff);
SimpleMaterial material = new SimpleMaterial();
material.setUseColor(true);
line.setMaterial(material);
addChild(line);
```
Which will result into something similar to this:

![Catmull-Rom Spline](http://www.rozengain.com/files/rajawali/rajawali-catmull-rom-spline.jpg)

The source code can be found on [here](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliCatmullRomRenderer.java).