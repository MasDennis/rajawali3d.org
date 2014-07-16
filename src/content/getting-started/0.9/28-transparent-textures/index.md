---
title: Transparent textures
---
Transparent textures are very much supported by Rajawali but there are a few caveats.
Merely assigning a .png texture to your object won't give you the desired result:
``` java
Plane plane1 = new Plane();
plane1.setMaterial(new SimpleMaterial());
plane1.addTexture(mTextureManager.addTexture(
		BitmapFactory.decodeResource(mContext.getResources(), R.drawable.newcastle)));
plane1.setPosition(-.2f, -.3f, 2.5f);
addChild(plane1);

Plane plane2 = new Plane();
plane2.setMaterial(new SimpleMaterial());
plane2.addTexture(mTextureManager.addTexture(
		BitmapFactory.decodeResource(mContext.getResources(), R.drawable.arrogant_bastard)));
plane2.setPosition(.2f, .2f, 2);
addChild(plane2);
```
![Using a .png file but no transparent texture](http://www.rozengain.com/files/rajawali/rajawali-transparent-textures-01.jpg)

There's an extra method you need to call to get the desired effect:  `setTransparent(true);`.
``` java
Plane plane1 = new Plane();
plane1.setMaterial(new SimpleMaterial());
plane1.addTexture(mTextureManager.addTexture(
		BitmapFactory.decodeResource(mContext.getResources(), R.drawable.newcastle)));
plane1.setPosition(-.2f, -.3f, 2.5f);
plane1.setTransparent(true);
addChild(plane1);

Plane plane2 = new Plane();
plane2.setMaterial(new SimpleMaterial());
plane2.addTexture(mTextureManager.addTexture(
		BitmapFactory.decodeResource(mContext.getResources(), R.drawable.arrogant_bastard)));
plane2.setPosition(.2f, .2f, 2);
plane2.setTransparent(true);
addChild(plane2);
```
![A transparent texture but wrong rendering order](http://www.rozengain.com/files/rajawali/rajawali-transparent-textures-02.jpg)

So here we have two transparent textures. But hold on ... isn't `plane1` supposed to be in front of `plane2`? Correct. `plane1`'s z coordinate is 2.5 which means it is closer to the camera than `plane2` (2). This is not a Rajawali bug but an OpenGL feature. Unfortunately transparent textures only work when passing `false` to OpenGL's `glDepthMask()` function. This is the description of this function in the OpenGL documentation:

> glDepthMask specifies whether the depth buffer is enabled for writing. If flag is GL_FALSE, depth buffer writing is disabled. Otherwise, it is enabled. Initially, depth buffer writing is enabled.

This basically means that you have to order your objects manually. In our example this means that we have to swap the `addChild()` calls:
``` java
addChild(plane2);
addChild(plane1);
```
![A transparent texture with correct rendering order](http://www.rozengain.com/files/rajawali/rajawali-transparent-textures-03.jpg)

Great! It is working the way it should.

However, this solution is acceptable only when the scene consists of a few static objects. When the scene gets more complex and things start to fly around we'll have to come up with another solution.

One possible solution is tedious and will affect performance. You can write your own sorting algorithm that constantly compares the object's z coordinates and rearranges the order.

# Alpha Masking

Fortunately there is a much simpler solution. It is called `Alpha Masking`. This fixes our problem by discarding pixels that fall below a certain threshold. This is done in the fragment shader. This way we don't have to mess with `glDepthMask()` and leave depth buffer writing enabled. There is one significant difference though. Alpha Masking results in a transparency value that is either 0 or 1 as opposed to regular transparency which can be any value from 0 to 1. Most of the time this isn't really noticeable and the advantages outweigh this issue.

So let's give this a try. We can pass a new parameter to `SimpleMaterial`:
``` java
Plane plane1 = new Plane();
plane1.setMaterial(new SimpleMaterial(AMaterial.ALPHA_MASKING)));
plane1.addTexture(mTextureManager.addTexture(
		BitmapFactory.decodeResource(mContext.getResources(), R.drawable.newcastle)));
plane1.setPosition(-.2f, -.3f, 2.5f);
plane1.setTransparent(true);
addChild(plane1);

Plane plane2 = new Plane();
plane2.setMaterial(new SimpleMaterial(AMaterial.ALPHA_MASKING)));
plane2.addTexture(mTextureManager.addTexture(
		BitmapFactory.decodeResource(mContext.getResources(), R.drawable.arrogant_bastard)));
plane2.setPosition(.2f, .2f, 2);
plane2.setTransparent(true);
addChild(plane2);
```
![A transparent texture with incorrect rendering order. Again.](http://www.rozengain.com/files/rajawali/rajawali-transparent-textures-04.jpg)

So what's wrong with this picture? Exactly. The ordering is wrong again. This is because we left the `setTransparent()` method call in there. This disabled depth buffer writing. So lets remove these calls.
``` java
Plane plane1 = new Plane();
plane1.setMaterial(new SimpleMaterial(AMaterial.ALPHA_MASKING));
plane1.addTexture(mTextureManager.addTexture(
		BitmapFactory.decodeResource(mContext.getResources(), R.drawable.newcastle)));
plane1.setPosition(-.2f, -.3f, 2.5f);
addChild(plane1);

Plane plane2 = new Plane();
plane2.setMaterial(new SimpleMaterial(AMaterial.ALPHA_MASKING));
plane2.addTexture(mTextureManager.addTexture(
		BitmapFactory.decodeResource(mContext.getResources(), R.drawable.arrogant_bastard)));
plane2.setPosition(.2f, .2f, 2);
addChild(plane2);
```
![A glorious transparent texture.](http://www.rozengain.com/files/rajawali/rajawali-transparent-textures-05.jpg)

There. We did it.