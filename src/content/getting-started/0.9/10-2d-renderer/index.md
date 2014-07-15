With `Camera2D` you can add a 2D camera to the scene, add a plane (width 1, height 1) and then add a custom material to it and do some GLSL 2D funkiness.

Check it out:
```
package rajawali.tutorials;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import rajawali.Camera2D;
import rajawali.primitives.Plane;
import rajawali.renderer.RajawaliRenderer;
import android.content.Context;

public class Rajawali2DExampleRenderer extends RajawaliRenderer {
	private float mTime;
	private CustomMaterial mCustomMaterial;

	public Rajawali2DExampleRenderer(Context context) {
		super(context);
		setCamera(new Camera2D());
		setFrameRate(30);
		mTime = 0;
	}

	@Override
	public void initScene() {
		super.initScene();

		mCustomMaterial = new CustomMaterial();

		Plane plane = new Plane(1, 1, 1, 1, 1);
		plane.setMaterial(mCustomMaterial);
		addChild(plane);
	}

	@Override
	public void onDrawFrame(GL10 glUnused) {
		super.onDrawFrame(glUnused);
		mTime += .2f;
		mCustomMaterial.setTime(mTime);
	}
}
```
You can view the result [here (YouTube video)](http://www.youtube.com/watch?v=UwC1-Q9i0YM&feature=player_embedded), the [Activity source here](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/Rajawali2DActivity.java) and [Renderer source here](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/Rajawali2DRenderer.java).
