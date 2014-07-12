This is the uber-optimisation. Communication between the CPU and the GPU is minimal. It is a bit harder to do though.
Instead of using the normal `setPosition()`, `setScale()` and `setRotation()` methods you’ll have to write a shader that does this.

[Here’s a video of 2000 planes](http://www.youtube.com/watch?feature=player_embedded&v=Iqg4U6yoabg) that are combined into one object but have individual textures and rotations.

If you would do this the normal way (create 2000 Plane objects with individual textures) your device would melt in your hands. When you do it the way described here, it will run on full speed and make a happy dance. Now that’s a bold promise.

Like I said, this is not an easy optimization if you’re not very familiar with creating your own geometry and shaders. I’ll attempt to explain it anyway. Please post a comment if you have any questions.

In order to create the geometries for each separate plane we’ll need to create a custom `BaseObject3D`. We are going to create the usual vertex, normal, color and texture coordinates buffers manually. On top of that we’ll create new buffers for the positions and rotations.

First, create the new class that inherits from `BaseObject3D`:
```
public class PlanesGalore extends BaseObject3D {
```
Then add our buffers and buffer handles to the class variable declarations:
```
protected FloatBuffer mPlanePositions;
protected FloatBuffer mRotationSpeeds;
protected int mPlanePositionsBufferHandle;
protected int mRotationSpeedsBufferHandle;
protected PlanesGaloreMaterial mGaloreMat;
```
In the `init()` method we create the arrays that will contain all relevant data. These will fed into `FloatBuffers` and `IntBuffers` after that:
```
final int numPlanes = 2000;
final float planeSize = .3f;

int numVertices = numPlanes * 4;
float[] vertices = new float[numVertices * 3];
float[] textureCoords = new float[numVertices * 2];
float[] normals = new float[numVertices * 3];
float[] planePositions = new float[numVertices * 3];
float[] rotationSpeeds = new float[numVertices];
float[] colors = new float[numVertices * 4];
int[] indices = new int[numPlanes * 6];
```
Next up is the loop that fills the arrays with all the relevant data. I won’t expand much on this, but it creates all the individual planes (vertices, indices, textures coordinates, normals, random rotations, random positions):
```
for (int i = 0; i < numPlanes; ++i) {
	Number3D r = new Number3D(-10f + (Math.random() * 20f), -10 + (Math.random() * 20f), (Math.random() * 80f));
	int randColor = 0xff000000 + (int) (0xffffff * Math.random());

	int vIndex = i * 4 * 3;
	vertices[vIndex + 0] = -planeSize;
	vertices[vIndex + 1] = planeSize;
	vertices[vIndex + 2] = 0;
	vertices[vIndex + 3] = planeSize;
	vertices[vIndex + 4] = planeSize;
	vertices[vIndex + 5] = 0;
	vertices[vIndex + 6] = planeSize;
	vertices[vIndex + 7] = -planeSize;
	vertices[vIndex + 8] = 0;
	vertices[vIndex + 9] = -planeSize;
	vertices[vIndex + 10] = -planeSize;
	vertices[vIndex + 11] = 0;

	for (int j = 0; j < 12; j += 3) {
		normals[vIndex + j] = 0;
		normals[vIndex + j + 1] = 0;
		normals[vIndex + j + 2] = 1;

		planePositions[vIndex + j] = r.x;
		planePositions[vIndex + j + 1] = r.y;
		planePositions[vIndex + j + 2] = r.z;
	}

	vIndex = i * 4 * 4;

	for (int j = 0; j < 16; j += 4) {
		colors[vIndex + j] = Color.red(randColor) / 255f;
		colors[vIndex + j + 1] = Color.green(randColor) / 255f;
		colors[vIndex + j + 2] = Color.blue(randColor) / 255f;
		colors[vIndex + j + 3] = 1.0f;
	}

	vIndex = i * 4 * 2;

	float u1 = .25f * (int) Math.floor(Math.random() * 4f);
	float v1 = .25f * (int) Math.floor(Math.random() * 4f);
	float u2 = u1 + .25f;
	float v2 = v1 + .25f;

	textureCoords[vIndex + 0] = u2;
	textureCoords[vIndex + 1] = v1;
	textureCoords[vIndex + 2] = u1;
	textureCoords[vIndex + 3] = v1;
	textureCoords[vIndex + 4] = u1;
	textureCoords[vIndex + 5] = v2;
	textureCoords[vIndex + 6] = u2;
	textureCoords[vIndex + 7] = v2;

	vIndex = i * 4;
	int iindex = i * 6;
	indices[iindex + 0] = (short) (vIndex + 0);
	indices[iindex + 1] = (short) (vIndex + 1);
	indices[iindex + 2] = (short) (vIndex + 3);
	indices[iindex + 3] = (short) (vIndex + 1);
	indices[iindex + 4] = (short) (vIndex + 2);
	indices[iindex + 5] = (short) (vIndex + 3);

	float rotationSpeed = -1f + (float) (Math.random() * 2f);
	rotationSpeeds[vIndex + 0] = rotationSpeed;
	rotationSpeeds[vIndex + 1] = rotationSpeed;
	rotationSpeeds[vIndex + 2] = rotationSpeed;
	rotationSpeeds[vIndex + 3] = rotationSpeed;
}
```
One important thing to note here is how the texture coordinates are being calculated. Instead of using a separate texture for each plane, the textures are combined into a texture atlas. In this case, I’ve put 16 textures into a single texture. Each plane then gets texture coordinates that correspond to one these textures.

Finally, the usual data can be passed on to the superclass:
```
setData(vertices, normals, textureCoords, colors, indices);
```
Since we have custom position and rotation speed arrays we’ll need to create two Buffers and obtain a handle from the OpenGL context:
```
mPlanePositions = ByteBuffer.allocateDirect(planePositions.length * Geometry3D.FLOAT_SIZE_BYTES).order(ByteOrder.nativeOrder()).asFloatBuffer();
mPlanePositions.put(planePositions).position(0);

mRotationSpeeds = ByteBuffer.allocateDirect(rotationSpeeds.length * Geometry3D.FLOAT_SIZE_BYTES).order(ByteOrder.nativeOrder()).asFloatBuffer();
mRotationSpeeds.put(rotationSpeeds).position(0);

mPlanePositionsBufferHandle = mGeometry.createBuffer(BufferType.FLOAT_BUFFER, mPlanePositions, GLES20.GL_ARRAY_BUFFER);
GLES20.glBindBuffer(GLES20.GL_ARRAY_BUFFER, 0);

mRotationSpeedsBufferHandle = mGeometry.createBuffer(BufferType.FLOAT_BUFFER, mRotationSpeeds, GLES20.GL_ARRAY_BUFFER);
GLES20.glBindBuffer(GLES20.GL_ARRAY_BUFFER, 0);
```
We’ll also have to write a custom shader. Creating a custom shader is the topic of this tutorial so please read that first.

In this shader we’ll need to add two new attributes to the vertex shader:
```
attribute vec4 aPlanePosition;
attribute float aRotationSpeed;
Then in the main() method we apply the rotation matrices manually:

float rotation = uTime * aRotationSpeed;

// -- first rotate around the z axis
mat4 mz = mat4(1.0);
mz[0][0] = cos(rotation);
mz[0][1] = sin(rotation);
mz[1][0] = -sin(rotation);
mz[1][1] = cos(rotation);

// -- then rotate around the y axis
mat4 my = mat4(1.0);
my[0][0] = cos(rotation);
my[0][2] = -sin(rotation);
my[2][0] = sin(rotation);
my[2][2] = cos(rotation);

// -- rotate the vertex before translating it
vec4 rotPos = aPosition * mz * my;

// -- now translate it to the plane position
gl_Position = uMVPMatrix * (rotPos + aPlanePosition);
```
It’s more work than `Object3D.setRenderChildrenAsBatch()` but the performance gain is significant.

The full source code:

* [Rajawali2000PlanesRenderer.java](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/Rajawali2000PlanesRenderer.java)
* [PlanesGalore.java](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/planes/PlanesGalore.java)
* [PlanesGaloreMaterial.java](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/planes/PlanesGaloreMaterial.java)