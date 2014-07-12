You can create your own materials quite easily. In this example we’ll create a new material based on the `SimpleMaterial` class. `SimpleMaterial` is the most basic material and doesn’t use any lights.
We’ll create a custom material that uses a GLSL fragment shader for an old-school plasma effect. It’ll look like [this (YouTube video)](http://www.youtube.com/watch?feature=player_embedded&v=mB1fmSsCk0w).

The first step is to create a new class that extends `SimpleMaterial`:
```
public class CustomMaterial extends SimpleMaterial {
}
```
Next we’ll create a protected static final String that contains the shader text. I’m not going to explain how GLSL works but if you do a Google search you should find enough quality tutorials.
```
protected static final String mCustomFShader =
		"precision mediump float;" +

		"uniform float uTime;" +
		"varying vec2 vTextureCoord;" +

		"void main() {" +
		"   vec4 newColor = vec4(1.0, 0, 0, 1.0);" +
		"	float x = min(vTextureCoord.s, 1.0 - vTextureCoord.s);" +
		"	float y = vTextureCoord.t;" +
		"	newColor.g = sin(x * cos(uTime/15.0) * 120.0) + " +
		"   	cos(y * sin(uTime/10.0) * 120.0) + " +
		"		sin(sqrt(y * y + x * x) * 40.0);" +
		"	gl_FragColor = newColor;" +
		"}";
```
In the constructor we pass both the vertex and fragment shader to the super class constructor:
```
public CustomMaterial() {
	super(mVShader, mCustomFShader);
	setShaders();
}
```
This will take care of creating the programs and linking.

Now we’ll add a custom parameter to the shader. To make things more interesting we’ll add a time parameter so we can animate our material. This parameter is called `uTime` in the fragment shader. We need to create an extra property to store the handle to this shader parameter:
```
protected int muTimeHandle;
```
In order to get a reference to this handle we need to override the `setShaders()` method. Be careful to always call the same method on the superclass:
```
@Override
public void setShaders(String vertexShader, String fragmentShader)
{
	super.setShaders(vertexShader, fragmentShader);
	muTimeHandle = GLES20.glGetUniformLocation(mProgram, "uTime");
	if(muTimeHandle == -1) {
		throw new RuntimeException("Could not get uniform location for uTime");
	}
}
```
Finally, add a setter that assign the time value to the shader uniform:
```
public void setTime(float time) {
	GLES20.glUniform1f(muTimeHandle, time);
}
```
The complete class now looks like this:
```
package rajawali.tutorials;

import android.opengl.GLES20;
import rajawali.materials.SimpleMaterial;

public class CustomMaterial extends SimpleMaterial {
	protected static final String mCustomFShader =
			"precision mediump float;" +

			"uniform float uTime;" +
			"varying vec2 vTextureCoord;" +

			"void main() {" +
			"   vec4 newColor = vec4(1.0, 0, 0, 1.0);" +
			"	float x = min(vTextureCoord.s, 1.0 - vTextureCoord.s);" +
			"	float y = vTextureCoord.t;" +
			"	newColor.g = sin(x * cos(uTime/15.0) * 120.0) + " +
			"   	cos(y * sin(uTime/10.0) * 120.0) + " +
			"		sin(sqrt(y * y + x * x) * 40.0);" +
			"	gl_FragColor = newColor;" +
			"}";

	protected int muTimeHandle;

	public CustomMaterial() {
		super(mVShader, mCustomFShader);
	}

	@Override
	public void setShaders(String vertexShader, String fragmentShader)
	{
		super.setShaders(vertexShader, fragmentShader);
		muTimeHandle = GLES20.glGetUniformLocation(mProgram, "uTime");
		if(muTimeHandle == -1) {
			throw new RuntimeException("Could not get uniform location for uTime");
		}
	}

	public void setTime(float time) {
		GLES20.glUniform1f(muTimeHandle, time);
	}
}
```
Now we can add this new material to any object we create in the Renderer class:
```
mCustomMaterial = new CustomMaterial();

mSphere = new Sphere(2, 32, 32);
mSphere.setLight(mLight);
mSphere.setMaterial(mCustomMaterial);
addChild(mSphere);
```
… and update the time variable in `onDrawFrame()`:
```
mTime += .1f;
mCustomMaterial.setTime(mTime);
```
You can view the source file for the Activity [here](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliCustomShaderActivity.java) and the Renderer [here](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliCustomShaderRenderer.java).