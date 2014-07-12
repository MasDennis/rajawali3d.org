Here’s how to do object picking.
First make sure your activity implements `OnTouchListener`. Then register the listener and override the `onTouch` method:
```
public class MyActivity extends RajawaliFragmentActivity implements OnTouchListener {
	...
	@Override
    public void onCreate(Bundle savedInstanceState) {
		...
		mSurfaceView.setOnTouchListener(this);
	}

	@Override
	public boolean onTouch(View v, MotionEvent event) {
		if(event.getAction() == MotionEvent.ACTION_DOWN)
		{
			// this needs to be defined on the renderer:
			mRenderer.getObjectAt(event.getX(), event.getY());
		}
		return super.onTouchEvent(event);
	}
}
```
Then, create a new instance of `ColorObjectPicker` in the renderer class:
```
@Override
protected void initScene() {
	...
	mPicker = new ObjectColorPicker(this);
	...
	mPicker.setOnObjectPickedListener(this);
	mPicker.registerObject(myObject);
}
```
But make sure the renderer class implements `OnObjectPickedListener` and has the `onObjectPicked()` method:
```
public class MyRenderer extends RajawaliRenderer implements OnObjectPickedListener {
	...

	@Override
	public void onObjectPicked(BaseObject3D object) {
		// do something with the object
	}
```
Also add the method that is called from the activity when the touch event was fired:
```
public void getObjectAt(float x, float y) {
	mPicker.getObjectAt(x, y);
}
```
Here’s the activity source code: [RajawaliObjectPickingActivity.java](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliObjectPickingActivity.java) and the renderer source code: [RajawaliObjectPickingRenderer.java](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliObjectPickingRenderer.java)