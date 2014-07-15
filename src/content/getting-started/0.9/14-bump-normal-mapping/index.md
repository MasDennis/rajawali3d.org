Very easy :O There’s an extra` mTextureManager.addTexture()` parameter that you can use to indicate that you’re adding a Bump/Normal map.
A material called `BumpmapMaterial` should be used for this:
```
Bitmap diffuseTexture = BitmapFactory.decodeResource(mContext.getResources(), R.drawable.diffuse_texture);
Bitmap bumpTexture = BitmapFactory.decodeResource(mContext.getResources(), R.drawable.bump_texture);

myObject.setMaterial(new BumpmapMaterial());
myObject.addTexture(mTextureManager.addTexture(diffuseTexture, TextureType.DIFFUSE));
myObject.addTexture(mTextureManager.addTexture(bumpTexture, TextureType.BUMP));
```
To see this in full splendor you can add in an animated light:
```
Animation3D lightAnim = new RotateAroundAnimation3D(new Number3D(), Axis.Z, 6);
lightAnim.setDuration(5000);
lightAnim.setRepeatCount(Animation3D.INFINITE);
lightAnim.setTransformable3D(mLight);
lightAnim.start();
```
That’s all there is to it. For a full example check out the [RajawaliExamples](https://github.com/MasDennis/RajawaliExamples/tree/master/src/com/monyetmabuk/rajawali/tutorials) project on Github.


# SIMPLIFIED IMAGE MAPPING
As of pull request [#438](https://github.com/MasDennis/Rajawali/pull/438) you can apply image maps directly to the stock materials to simplify alpha, specular, and normal mapping.

Map support by material:<br/>
`PhongMaterial` - Bump/Norm, Spec, Alpha<br/>
`GouraudMaterial` - Spec, Alpha<br/>
`SimpleMaterial` - Alpha<br/>

Here is an example of how mapping is utilized:
```
PhongMaterial myMappedMaterial = new PhongMaterial();
myMappedMaterial.addTexture(mTextureManager.addTexture(BitmapFactory.decodeResource(mContext.getResources(), R.drawable.diffuseTexture), TextureType.DIFFUSE));
myMappedMaterial.addTexture(mTextureManager.addTexture(BitmapFactory.decodeResource(mContext.getResources(), R.drawable.alphaTexture), TextureType.ALPHA)); //Black and white alpha map where white is opaque
myMappedMaterial.addTexture(mTextureManager.addTexture(BitmapFactory.decodeResource(mContext.getResources(), R.drawable.specularTexture), TextureType.SPECULAR)); //Black and white spec map where white is shiny and black is matte
myMappedMaterial.addTexture(mTextureManager.addTexture(BitmapFactory.decodeResource(mContext.getResources(), R.drawable.normalTexture), TextureType.BUMP)); //RGB normal map

BaseObject3D mObject = newBaseObject3D();
mObject.setMaterial(myMappedMaterial);
mObject.addLight(new PointLight());

addChild(mObject);
```