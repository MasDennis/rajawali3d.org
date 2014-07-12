This is a small example that shows how to access geometry data and how to use it to position and rotate objects.

In this example I will create a sphere and use its vertices and normals. I will place a spike at each vertex position and then I will use the corresponding normal to rotate the spike so that it faces the same direction as the vertex normal.

It will look like this:

![Spikes](http://www.rozengain.com/files/rajawali/rajawali-spikey-ball.jpg)

To access the vertex and normal data we first need to call the `getGeometry()` method on the `BaseObject3D`. This gives us access to methods like `getVertices()`, `getIndices()`, `getTextureCoords()`, `getColors()`, etc. The `getVertices()` and `getNormals()` methods return a `FloatBuffer` each:
```
// -- create a sphere so we can use its vertices and normals
BaseObject3D sphere = new Sphere(1, 16, 8);
// -- get vertex buffer
FloatBuffer vertBuffer = sphere.getGeometry().getVertices();
// -- get the normal buffer
FloatBuffer normBuffer = sphere.getGeometry().getNormals();
```
Now we can loop through the buffers and get its data. The vertices and normals are x, y and z coordinates that can be accessed by calling get(index), get(index+1), get(index+2) on the `FloatBuffer` object:
```
int numVerts = vertBuffer.limit();
for(int i=0; i<numVerts; i+=3) {
	Number3D position = new Number3D(vertBuffer.get(i), vertBuffer.get(i+1), vertBuffer.get(i+2));
	Number3D normal = new Number3D(normBuffer.get(i), normBuffer.get(i+1), normBuffer.get(i+2));

	// -- ... do other stuff ...
}
```
For instance, we can use the vertex buffer values to position the spikes:
```
spike.setPosition(vertBuffer.get(i), vertBuffer.get(i+1), vertBuffer.get(i+2));
```
This way the spikes are nicely distributed across the sphere. But they’re all pointing in the same direction.
Next, let’s set up the orientation so that they face the same direction as the normal:
```
// -- get the normal so we can orient the spike to the normal
Number3D normal = new Number3D(-normBuffer.get(i), normBuffer.get(i+1), normBuffer.get(i+2));
// -- get the rotation axis. The upAxis is a Number3D(0, 1, 0) (y up)
Number3D axis = Number3D.cross(upAxis, normal);
// -- get the rotation angle
float angle = MathUtil.radiansToDegrees((float)Math.acos(Number3D.dot(upAxis, normal)));
// -- create the quaternion
Quaternion q = new Quaternion();
q.fromAngleAxis(angle, axis);
// -- set the orientation so that it is aligned with the current normal
spike.setOrientation(q);
```
… and now they all face the same direction. Schweet.

Source code:
* [RajawaliUsingGeometryDataRenderer.java](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliUsingGeometryDataRenderer.java)
