---
title: Animation classes
---
NOTE: Rajawali's animation system has gone through a major overhaul and some classes have been removed completely. The documentation below has been updated to reflect the new animation system.

Rajawali's animation classes resemble Android's View animation classes but they're not 100% the same. They are now handled by the OpenGL thread in `RajawaliRenderer` and must be registered with the renderer in order to be updated. This makes the animations now thread safe, eliminating the cause of numerous animation related bugs.

Here's an overview:
* `Animation3DQueue`: a sequence of animations
* `ColorAnimation3D`: animates the vertex color (including alpha) of a `BaseObject3D` instance
* `EllipticalOrbitAnimation3D`: rotate an object around a specific point, optionally with eccentricity
* `RotateAnimation3D`: rotate an object around its axis
* `ScaleAnimation3D`: scale an object
* `TranslateAnimation3D`: translate an object

Here's how a rotate animation is set up:
```
// -- set up a rotation animation that rotates 90 degrees around the x axis,
//    180 degrees around the y axis, 270 degrees around the z axis
Animation3D anim = new RotateAnimation3D(new Number3D(90, 180, 270));
// -- set the duration to 2 seconds
anim.setDuration(2000);
// -- pass in the 3D object that should be animated. This could also be the camera or a lamp.
anim.setTransformable3D(mMonkey);
// -- set the repeat count. This is ignored if the repeat mode is a variant of infinite.
anim.setRepeatCount(10);
// -- set the repeat mode. Animation3D.REVERSE reverses the animation, Animation3D.RESTART
//    restarts the animation from its original values. Each reversal counts as a repeat so 
//    here we will have 5 complete cycles.
anim.setRepeatMode(Animation3D.RepeatMode.REVERSE);
// -- set the interpolation mode. This uses the Android framework's interpolators which can
//    be AccelerateDecelerateInterpolator, AccelerateInterpolator, AnticipateInterpolator,
//    AnticipateOvershootInterpolator, BounceInterpolator, CycleInterpolator, DecelerateInterpolator,
//    LinearInterpolator or OvershootInterpolator
anim.setInterpolator(new BounceInterpolator());
// -- start the animation.
anim.play();
```
You can also add a listener to the animation:
```
anim.setAnimationListener(new Animation3DListener() {
	@Override
	public void onAnimationStart(Animation3D animation) {
		...
	}

	@Override
	public void onAnimationRepeat(Animation3D animation) {
		...
	}

	@Override
	public void onAnimationEnd(Animation3D animation) {
		...
	}
});
```
Instead of executing single animations, you can also create an animation queue:
```
Animation3DQueue queue = new Animation3DQueue();

Animation3D anim = new ScaleAnimation3D(new Number3D(1.6f, .8f, 1));
anim.setInterpolator(new LinearInterpolator());
anim.setDuration(1000);
anim.setRepeatCount(3);
anim.setRepeatMode(Animation3D.RepeatMode.REVERSE);
anim.setTransformable3D(mMonkey);
queue.addAnimation(anim);

anim = new RotateAnimation3D(new Number3D(90, 180, 270));
anim.setDuration(2000);
anim.setTransformable3D(mMonkey);
queue.addAnimation(anim);

anim = new TranslateAnimation3D(new Number3D(-2, -2, 0));
anim.setDuration(500);
anim.setTransformable3D(mMonkey);
queue.addAnimation(anim);

anim = new TranslateAnimation3D(new Number3D(-2, -2, 0), new Number3D(2, 2, 0));
anim.setDuration(2000);
anim.setTransformable3D(mMonkey);
anim.setInterpolator(new BounceInterpolator());
anim.setRepeatCount(3);
queue.addAnimation(anim);

queue.play();
```
The `TranslateAnimation3D` class also accepts a `BezierPath3D` instance:
```
BezierPath3D redBezierPath = new BezierPath3D();
redBezierPath.addPoint(
		new Number3D(0, -4, 0),
		new Number3D(-2, -4, .2f),
		new Number3D(4, 4, 4),
		new Number3D(-2, 4, 4.5f)
);
redBezierPath.addPoint(
		new Number3D(-2, 4, 4.5f),
		new Number3D(2, -2, -2),
		new Number3D(4, 4, 4),
		new Number3D(-2, 4, 4.5f)
);

BezierPath3D yellowBezierPath = new BezierPath3D();
yellowBezierPath.addPoint(
		new Number3D(2, 4, 0),
		new Number3D(-8, 3, 4),
		new Number3D(-4, 0, -2),
		new Number3D(4, -3, 30)
);
yellowBezierPath.addPoint(
		new Number3D(4, -3, 30),
		new Number3D(6, 1, 2),
		new Number3D(4, 2, 3),
		new Number3D(-3, -3, -4.5f)
);

Animation3D redAnim = new TranslateAnimation3D(redBezierPath);
redAnim.setDuration(2000);
redAnim.setRepeatCount(Animation3D.INFINITE);
redAnim.setRepeatMode(Animation3D.RepeatMode.REVERSE);
redAnim.setTransformable3D(redSphere);
redAnim.play();

Animation3D yellowAnim = new TranslateAnimation3D(yellowBezierPath);
yellowAnim.setDuration(3800);
yellowAnim.setRepeatCount(Animation3D.INFINITE);
yellowAnim.setRepeatMode(Animation3D.RepeatMode.REVERSE);
yellowAnim.setTransformable3D(yellowSphere);
yellowAnim.play();
```