---
title: Optimisation
---
# SERIALIZATION
There's an optimization you can use when large models are involved. It's called serialization. This prevents you from having to load an .obj file and parse it every time the application starts up. It basically writes all the relevant data (vertices, indices, normal, texture coordinates and colors) to a binary file on disk.

So the .obj file has to be loaded only once during development. Once the file has loaded you can save it to the sdcard.
In order to do this you first have to set the permission in AndroidManifest.xml:
```
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```
If you are supporting Android 4.2.2 you will also need:
```
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
```
The .obj model can be loaded and turned into a serialized file:
```
	MeshExporter exporter = new MeshExporter(myBaseObject3D);
	exporter.export("myBaseObject3Dname", ExportType.SERIALIZED);
```
When this is done the code and the .obj file can be discarded. The serialized file is written to the sd card and should be copied into to your resources folder (res/raw). The serialized model is now ready to be loaded into your application:
```
try {
	ObjectInputStream ois;
	ois = new ObjectInputStream(mContext.getResources().openRawResource(R.raw.my_serialized_model));
	mMyModel = new BaseObject3D((SerializedObject3D)ois.readObject());
	addChild(mMyModel);
	ois.close();
} catch (Exception e) {
	e.printStackTrace();
}
```
WIN!

# BATCHING GEOMETRY
There's an optimization you can do when you have a lot of objects of the same kind that share the same material. Sphere with a color material for example:

![Appolonian sphere packing example - many identical objects](http://www.rozengain.com/files/rajawali/rajawali-appolonian.jpg "Appolonian sphere packing example - many identical objects")

Or many cubes sharing the same texture:

![Lots of cubes sharing a texture](http://www.rozengain.com/files/rajawali/rajawali-cubes.jpg "Lots of cubes sharing a texture")

Instead of creating a shader program, uploading textures, vertex buffers, etc for each single one of them, you can share all of this so that the number of calls between the CPU and GPU is drastically reduced.

Here's how to do it:
```
// -- First create the main object with a material and a texture.
//     The child objects will be cloned from this object.
Cube rootCube = new Cube(1.5f);
rootCube.setMaterial(new DiffuseMaterial());
rootCube.addLight(mLight);
rootCube.addTexture(mTextureManager.addTexture(b));
// -- This line indicates that all children will use the same material,
//     texture, vertices, indices, etc. The children can have their
//     own transformation and color.
rootCube.setRenderChildrenAsBatch(true);
addChild(rootCube);	

for(int i=0; i<500; i++) {
	// -- Clone from the main object and then set a position and rotation.
	BaseObject3D c = rootCube.clone();
	c.setPosition(-25f + (float)(Math.random() * 50f), -25f + (float)(Math.random() * 50f), -25f + (float)(Math.random() * 50f));
	c.setRotation((float)Math.random() * 360, (float)Math.random() * 360, (float)Math.random() * 360);
	rootCube.addChild(c);
}
```
As you can see each object can have its own rotation, position and scale. If you're not using textures you can also change an individual object's color. Be aware that the latter will create a new buffer which might reduce performance a little (though not significantly).

Also check Rajawali Tutorial 22: More Optimisation.