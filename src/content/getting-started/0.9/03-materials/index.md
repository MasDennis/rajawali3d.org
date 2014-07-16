---
title: Materials
---
# SIMPLE MATERIAL
A basic material is just a color or a texture without any lighting enabled. This renders a green cube:
```
SimpleMaterial simple = new SimpleMaterial();
simple.setUseColor(true);
mCube.setMaterial(simple);
mCube.setColor(0xff009900);
```
This renders a textured cube:
```
SimpleMaterial simple = new SimpleMaterial();
mCube.setMaterial(simple);
Bitmap texture = BitmapFactory.decodeResource(mContext.getResources(), R.drawable.mytexture);
mCube.addTexture(mTextureManager.addTexture(texture));
```

# GOURAUD MATERIAL
This material can be used in combination with a light. For more info check out [this Wikipedia article](http://en.wikipedia.org/wiki/Gouraud_shading).
```
mLight = new DirectionalLight();
mLight.setPosition(0, 5, -3);

GouraudMaterial gouraud = new GouraudMaterial();
gouraud.setSpecularColor(0xffffff00); // yellow
gouraud.setUseColor(true);
mCube.setMaterial(gouraud);
mCube.addLight(mLight);
```

# PHONG MATERIAL
Use this material to get nice specular highlights. See [this article](http://en.wikipedia.org/wiki/Phong_shading) on Wikipedia.
```
PhongMaterial phong = new PhongMaterial();
phong.setSpecularColor(0xffffffff); // white
phong.setAmbientcolor(0xffffff00); // yellow
phong.setShininess(0.5f);
phong.setUseColor(true);
mCube.setMaterial(phong);
mCube.addLight(mLight);
```

# IMAGE MAPPING
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
myMappedMaterial.addTexture(mTextureManager.addTexture(BitmapFactory.decodeResource(mContext.getResources(), R.drawable.normalTexture), TextureType.BUMP)); //RGB normal map

BaseObject3D mObject = newBaseObject3D();
mObject.setMaterial(myMappedMaterial);
mObject.addLight(new PointLight());

addChild(mObject);
```

# ENVIRONMENT CUBE MAP MATERIAL
This is a reflective material. It requires 6 textures. Check [this Wikipedia article](http://en.wikipedia.org/wiki/Reflection_mapping) for more information.
```
Bitmap[] textures = new Bitmap[6];

String ns = "com.mynamespace.myapp:drawable/";
String dns = "com.mynamespace.myapp";
String prefix = "";

textures[0] = BitmapFactory.decodeResource(mContext.getResources(), mContext.getResources().getIdentifier(ns + prefix + "_posx", null, dns));
textures[1] = BitmapFactory.decodeResource(mContext.getResources(), mContext.getResources().getIdentifier(ns + prefix + "_negx", null, dns));
textures[2] = BitmapFactory.decodeResource(mContext.getResources(), mContext.getResources().getIdentifier(ns + prefix + "_posy", null, dns));
textures[3] = BitmapFactory.decodeResource(mContext.getResources(), mContext.getResources().getIdentifier(ns + prefix + "_negy", null, dns));
textures[4] = BitmapFactory.decodeResource(mContext.getResources(), mContext.getResources().getIdentifier(ns + prefix + "_posz", null, dns));
textures[5] = BitmapFactory.decodeResource(mContext.getResources(), mContext.getResources().getIdentifier(ns + prefix + "_negz", null, dns));

TextureInfo tInfo = mTextureManager.addCubemapTextures(textures);

CubeMapMaterial mat = new CubeMapMaterial();
mat.addTexture(tInfo);
mCube.setMaterial(mat);

DirectionalLight light = new DirectionalLight();
light.setPosition(3, 5, -3);
mCube.addLight(mLight);
```
# ENVIRONMENT SPHERE MAP MATERIAL
This one is more economic then the cube map material. It requires one reflection texture only.
It can be combined with either a color:
```
SphereMapMaterial material = new SphereMapMaterial();
material.setSphereMapStrength(2);
material.setUseColor(true);

Bitmap sphereMap = BitmapFactory.decodeResource(mContext.getResources(), R.drawable.my_sphere_map);

myObject.setMaterial(material);
myObject.setColor(0xFF999999);
myObject.addLight(mLight);
myObject.addTexture(mTextureManager.addTexture(sphereMap, TextureType.SPHERE_MAP));
```
or it can be combined with a normal diffuse texture:
```
SphereMapMaterial material = new SphereMapMaterial();
material.setSphereMapStrength(.4f);

Bitmap sphereMap = BitmapFactory.decodeResource(mContext.getResources(), R.drawable.my_sphere_map);
Bitmap texture = BitmapFactory.decodeResource(mContext.getResources(), R.drawable.my_texture);

myObject.setMaterial(material);
myObject.setColor(0xFF999999);
myObject.addLight(mLight);
myObject.addTexture(mTextureManager.addTexture(sphereMap, TextureType.SPHERE_MAP));
myObject.addTexture(mTextureManager.addTexture(texture, TextureType.DIFFUSE));
```
# BUMP MAP/NORMAL MAP MATERIAL
See https://github.com/MasDennis/Rajawali/wiki/Tutorial-14-Bump-Normal-Mapping

# PARTICLE MATERIAL
See https://github.com/MasDennis/Rajawali/wiki/Tutorial-11-Particles

# CUSTOM MATERIAL/GLSL SHADER
See https://github.com/MasDennis/Rajawali/wiki/Tutorial-09-Creating-a-Custom-Material---GLSL-Shader

# TOON/CEL MATERIAL
For a nice cartoon-style effect. Read more about this in [this Wikipedia article](http://en.wikipedia.org/wiki/Cel-shaded_animation).

```
ToonMaterial toonMat = new ToonMaterial();
toonMat.setToonColors(0xffffffff, 0xff000000, 0xff666666, 0xff000000);
myObject.setMaterial(toonMat);
myObject.addLight(mLight);
```