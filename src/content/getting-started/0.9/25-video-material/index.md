---
title: Video material
---
`VideoMaterial`. **This only works from API level 15 and upwards**. Thanks to Lubomir Panak (@drakh) for this contribution.

This uses the `SurfaceTexture` class which is included in API Level 15 (Android 4.0.3).

It is very simple to use:
```
private ALight mLight;
private MediaPlayer mMediaPlayer;
private SurfaceTexture mTexture;

public UIExampleRenderer(Context context) {
	super(context);
	setFrameRate(60);
}

protected void initScene() {
	super.initScene();
	mLight = new DirectionalLight(0, 0, 1);
	mCamera.setPosition(0, 0, -17);

	VideoMaterial material = new VideoMaterial();
	TextureInfo tInfo = mTextureManager.addVideoTexture();

	mTexture = new SurfaceTexture(tInfo.getTextureId());

	mMediaPlayer = MediaPlayer.create(getContext(), R.raw.nemo);
	mMediaPlayer.setSurface(new Surface(mTexture));
	mMediaPlayer.start();

	BaseObject3D plane = new Plane(2, 2, 1, 1);
	plane.setMaterial(material);
	plane.addTexture(tInfo);
	plane.addLight(mLight);
	addChild(cube);
}

public void onDrawFrame(GL10 glUnused) {
	// -- important! update every frame
	mTexture.updateTexImage();
	super.onDrawFrame(glUnused);
}

public void onSurfaceCreated(GL10 gl, EGLConfig config) {
	super.onSurfaceCreated(gl, config);
}
```