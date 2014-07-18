---
title: Basic setup and creating a sphere
categories: "tutorials"
tags:
- bang
---
Clone, or download a copy of the Rajawali source code. Make sure you're using `v0.9`. If you cloned, you can do this with `$ git checkout v0.9`.

Import the Rajawali project into Eclipse (Go to [this page](https://github.com/MasDennis/Rajawali/wiki/Importing-Rajawali-and-RajawaliExamples) for a comprehensive guide about how to set up Rajawali..)

Create a new project in Eclipse (Right-click in Package Explorer and choose New > Project > Android Project). Use these values in the configuration screen:
* Application Name: `RajawaliTutorial1`
* Project Name: `RajawaliTutorial1`
* Project Name: `rajawali.tutorials`
* Minimum Required SDK: `API 8: Android 2.2 (Froyo)`
* (leave 'TargetSDK' / 'Compile With' as defaults)
* Theme: `None`
Click "Next >"

* Uncheck 'Create custom launcher icon'
* Leave 'Create activity' checked
Click "Next >"

Leave as "Blank Activity"
Click "Next >"

* Activity Name: `RajawaliTutorial1Activity`
* Layout Name: (leave as default)
* Navigation Type: `None`

Press "Finish"
In your project's settings, [add a library reference](https://developer.android.com/tools/projects/projects-eclipse.html#ReferencingLibraryProject) to Rajawali

Open the RajawaliTutorial1Activity class (RajawaliTutorial1 – src – rajawali.tutorials – RajawaliTutorial1Activity.java) and change this line: 
``` java
extends Activity
```
into
``` java
extends RajawaliActivity
```

You may need to then add the appropriate import:
``` java
import rajawali.RajawaliActivity;
```
(From now on, we'll assume you environment auto-adds the appropriate imports, or you click on the markers to suggest/add the appropriate imports for you.)

Also, you should change:
``` java
protected void onCreate(Bundle savedInstanceState) {
```
into
``` java
public void onCreate(Bundle savedInstanceState) {
```


Right click on the `rajawali.tutorials` package in the package explorer and choose "New > Class". 

Name the class `RajawaliTutorial1Renderer` and set `rajawali.renderer.RajawaliRenderer` as the Superclass.

Check "Constructors from superclass" and "Inherited abstract methods"

Hit "Finish".

Edit the constructor and set the frame rate:

``` java
public RajawaliTutorial1Renderer(Context context)
{
	super(context);
	setFrameRate(60);
}
```
 
Add the `initScene()` method. This is where we'll set up our 3D scene.
``` java
public void initScene() {
}
```
Add a new class variable called `mLight` of type DirectionalLight:
``` java
private DirectionalLight mLight;
```

and add the following code to the `initScene()` method:

``` java
mLight = new DirectionalLight(1f, 0.2f, -1.0f); // set the direction
mLight.setColor(1.0f, 1.0f, 1.0f);
mLight.setPower(2);
```

Create a new folder under /res/ called drawable-nodpi and place your texture there.
(You can copy/paste the "earthtruecolor_nasa_big.jpg" from the same folder in the RajawaliExamples project if you have it installed.)

Next we are going to create a simple sphere and a texture.
First add a class variable called `mSphere` of type BaseObject3D and add this code to the `initScene()` method:
``` java
DiffuseMaterial material = new DiffuseMaterial();
material.addTexture(new TextureInfo(R.drawable.earthtruecolor_nasa_big));
mSphere = new Sphere(1, 24, 24);
mSphere.setMaterial(material);
mSphere.addLight(mLight);
addChild(mSphere); //Queue an addition task for mSphere
```
(Change earthtruecolor_nasa_big to whatever texture you used, if you did not copy the example on as suggested.)

Also set the position of the camera:
``` java
mCamera.setZ(4.2f);
```
The last thing to do is create an instance of this renderer in our main activity. Open the `RajawaliTutorial1Activity` class and add the `mRenderer` class variable:
``` java
private RajawaliTutorial1Renderer mRenderer; 
```

Remove the entire onCreateOptionsMenu method.
And finally, change the onCreate() method to:

``` java
@Override public void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	mRenderer = new RajawaliTutorial1Renderer(this);
	mRenderer.setSurfaceView(mSurfaceView);
	super.setRenderer(mRenderer);
}
```
Build and launch and behold the sphere!

Let's make this a bit less boring and add some animation.
Go back to the `RajawaliTutorial1Renderer` class and override the `onDrawFrame()` method and add y-axis rotation:
``` java
@Override public void onDrawFrame(GL10 glUnused) {
	super.onDrawFrame(glUnused);
	mSphere.setRotY(mSphere.getRotY() + 1);
}
```
That's it. Very basic tutorial here.
You can view the full source code [here] (https://github.com/MasDennis/RajawaliExamples/blob/v0.9/src/com/monyetmabuk/rajawali/tutorials/RajawaliBasicExampleRenderer.java).