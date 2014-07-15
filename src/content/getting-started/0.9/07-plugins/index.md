Rajawali now supports plugins allowing for complex effects to be rendered surpassing the limiting Post Processing implementation. For more details you can visit [Andrew J's](https://github.com/AndrewJo) blog and use the below example as reference.

[Introducing Plugin Architecture For Rajawali](http://www.andrewjo.com/blog/mobile-development/introducing-plugin-architecture-for-rajawali)

```Java
PointLight pLight = new PointLight();
pLight.setPower(1);
pLight.setPosition(0, 0, 1);

DirectionalLight dLight = new DirectionalLight();
dLight.setDirection(new Number3D(0, 0, 0));
dLight.setPosition(1, 0, 1);

// Load lens flare textures
TextureInfo texPrimaryGlare = mTextureManager
      .addTexture(BitmapFactory.decodeResource(mContext.getResources(), R.drawable.glare));
TextureInfo texHorizontalFlare = mTextureManager
      .addTexture(BitmapFactory.decodeResource(mContext.getResources(), R.drawable.hflare));
TextureInfo texSecondaryFlare = mTextureManager
      .addTexture(BitmapFactory.decodeResource(mContext.getResources(), R.drawable.secondaryflare));
TextureInfo texChromaHoop = mTextureManager
      .addTexture(BitmapFactory.decodeResource(mContext.getResources(), R.drawable.chromahoop));

// Lens flare for the first light source; primary glare is 300 pixels
LensFlare lensFlare1 = new LensFlare(texPrimaryGlare, 300, 0.0f, new Number3D(1, 1, 1));
lensFlare1.addLensFlare(texHorizontalFlare, 512, 0.0f, new Number3D(1, 1, 1));
lensFlare1.addLensFlare(texHorizontalFlare, 512, 0.0f, new Number3D(1, 1, 1));
lensFlare1.addLensFlare(texHorizontalFlare, 512, 0.0f, new Number3D(1, 1, 1));
lensFlare1.addLensFlare(texChromaHoop, 900, 0.1f, new Number3D(1, 1, 1));
lensFlare1.addLensFlare(texSecondaryFlare, 120, 0.6f, new Number3D(1, 1, 1));
lensFlare1.addLensFlare(texSecondaryFlare, 120, 0.8f, new Number3D(0.5f, 0.5f, 1));
lensFlare1.addLensFlare(texSecondaryFlare, 120, 0.9f, new Number3D(1, 1, 1));
// Set it to show up at the point light's position
lensFlare1.setPosition(pLight.getPosition());

LensFlare lensFlare2 = new LensFlare(texPrimaryGlare, 300, 0.0f, new Number3D(1, 1, 1));
lensFlare2.addLensFlare(texHorizontalFlare, 512, 0.0f, new Number3D(1, 1, 1));
lensFlare2.addLensFlare(texHorizontalFlare, 512, 0.0f, new Number3D(1, 1, 1));
lensFlare2.addLensFlare(texHorizontalFlare, 512, 0.0f, new Number3D(1, 1, 1));
lensFlare2.addLensFlare(texChromaHoop, 900, 0.1f, new Number3D(1, 1, 1));
lensFlare2.addLensFlare(texSecondaryFlare, 120, 0.6f, new Number3D(1, 1, 1));
lensFlare2.addLensFlare(texSecondaryFlare, 120, 0.8f, new Number3D(0.5f, 0.5f, 1));
lensFlare2.addLensFlare(texSecondaryFlare, 120, 0.9f, new Number3D(1, 1, 1));
// Set it to show up at the directional light's position
lensFlare2.setPosition(dLight.getPosition());

LensFlarePlugin lensFlares = new LensFlarePlugin(this);
lensFlares.addLensFlare(lensFlare1);
lensFlares.addLensFlare(lensFlare2);

// Register the lens flare plugin to the renderer
addPlugin(lensFlares);
```