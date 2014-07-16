Rajawali supports simple collision detection using bounding boxes and bounding spheres. The `Geometry3D` class contains two methods that can be used to retrieve the bounding volumes:
```
// -- myObject is of type BaseObject3D
// -- get the bounding box

IBoundingVolume boundingBox = myObject.getGeometry().getBoundingBox();

// -- or get the bounding sphere

IBoundingVolume boundingSphere = myObject.getGeometry().getBoundingSphere();
```
Both the `BoundingBox` and `BoundingSphere` classes have a `transform()` method that takes the current model's model matrix as the only parameter. This is needed to translate, rotate and scale the bounding volume.
```
boundingBox.transform(myObject.getModelMatrix());
```
Once the bounding volume has been transformed we can check if it intersects with another bounding volume (of the same kind):
```
boolean intersects = boundingBox.intersectsWith(otherBoundingBox);
if(intersects)
     // -- collision!
else
    // -- no collision 
```
The source code can be found here:

[RajawaliCollisionDetectionActivity.java](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliCollisionDetectionActivity.java)

[RajawaliCollisionDetectionRenderer.java](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliCollisionDetectionRenderer.java)
