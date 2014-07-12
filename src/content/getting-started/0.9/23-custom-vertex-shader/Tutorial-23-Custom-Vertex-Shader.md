In this tutorial we’ll take a look at how you can create a custom vertex shader. GLSL shaders are a very powerful feature of OpenGL ES 2.0. In tutorial 7 we created a custom fragment shader. This time we’ll manipulate a sphere’s vertex positions using a vertex shader.

First we’ll create a regular sphere and then we’ll attach a custom material to it. To keep things simple we’ll extend the SimpleMaterial class and use its fragment shader. Like so:
```
public class CustomVertexShaderMaterial extends SimpleMaterial {
	...
	// -- we'll pass our custom vertex shader and SimpleMaterials'
	//     fragment shader into the superclass constructor.
	public CustomVertexShaderMaterial() {
		super(mVShader, SimpleMaterial.mFShader);
	}
```
Because we want the vertices to be animated we’ll use a time parameter. In the shader this will be a uniform:
```
uniform float uTime;
```
In the material class we need to get a handle to this uniform. This can be done by overriding the `setShaders` method and calling `getUniformLocation()`:
```
public void setShaders(String vertexShader, String fragmentShader)
{
	super.setShaders(vertexShader, fragmentShader);
	muTimeHandle = getUniformLocation("uTime");
}
```
We also create a setter so that the time can be updated from the main renderer class. The time value will then be passed to the vertex shader in the `useProgram()` method which is called every frame:
```
public void useProgram() {
	super.useProgram();
	// -- make sure that time updates every frame
	GLES20.glUniform1f(muTimeHandle, mTime);
}

public void setTime(float time) {
	mTime = time;
}
```
Now on to the vertex shader. We want the vertex position to change through time by using trigonometric functions. This should give a nice organic blob effect. The changed vertex position will consist of the original vertex position plus a normalized vector that’s pointing in the same direction but is affected by trigonometric functions. Its always better explained in code :O Here’s the complete vertex shader:
```
// -- normalized axis vectors. we'll use these to
//    get the angles
const vec3 cXaxis = vec3(1.0, 0.0, 0.0);
const vec3 cYaxis = vec3(0.0, 1.0, 0.0);
const vec3 cZaxis = vec3(0.0, 0.0, 1.0);
// -- the amplitude of the 'wave' effect
const float cStrength = 0.5;

uniform mat4 uMVPMatrix;
uniform float uTime;

attribute vec4 aPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;

varying vec2 vTextureCoord;
varying vec4 vColor;		

void main() {
	// -- normalized direction from the origin (0,0,0)

	vec3 directionVec = normalize(vec3(aPosition));

	// -- the angle between this vertex and the x, y, z angles

	float xangle = dot(cXaxis, directionVec) * 5.0;
	float yangle = dot(cYaxis, directionVec) * 6.0;
	float zangle = dot(cZaxis, directionVec) * 4.5;
	vec4 timeVec = aPosition;
	float time = uTime * .05;

	// -- cos & sin calculations for each of the angles
	//    change some numbers here & there to get the
	//    desired effect.

	float cosx = cos(time + xangle);
	float sinx = sin(time + xangle);
	float cosy = cos(time + yangle);
	float siny = sin(time + yangle);
	float cosz = cos(time + zangle);
	float sinz = sin(time + zangle);

	// -- multiply all the parameters to get the final
	//    vertex position

	timeVec.x += directionVec.x * cosx * siny * cosz * cStrength;
	timeVec.y += directionVec.y * sinx * cosy * sinz * cStrength;
	timeVec.z += directionVec.z * sinx * cosy * cosz * cStrength;
	gl_Position = uMVPMatrix * timeVec;
	vTextureCoord = aTextureCoord;

	// -- use the (normalized) direction vector as the
	//    vertex color to get a nice colorful effect

	vColor = vec4(directionVec, 1.0);
}
```
Notice that a nice effect can be created by using the normalized direction vector as the current vertex’s color 

Here’s what it looks like ([YouTube video](http://www.youtube.com/watch?v=LNKLIfgfjZ4&feature=player_embedded)):

![Vertex Shader Blog](http://www.rozengain.com/files/rajawali/rajawali-vertex-shader-blob.jpg)

The full source code:

* [RajawaliVertexShaderActivity.java](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliVertexShaderActivity.java)
* [RajawaliVertexShaderRenderer.java](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliVertexShaderRenderer.java)
* [CustomVertexShaderMaterial.java](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/CustomVertexShaderMaterial.java)