MD2 animations were originally used in Quake 2 and contain keyframe per-vertex animations. 3D programs like Blender are able to export to this format.

MD2 files can be imported as follows:
```
MD2Parser parser = new MD2Parser(mContext.getResources(), mTextureManager, R.raw.ogro);
parser.parse();

VertexAnimationObject3D myMD2Object = (VertexAnimationObject3D)parser.getParsedAnimationObject();
myMD2Object.setLight(mLight);
addChild(myMD2Object);
```
Playback can be triggered by using any of the following functions:
```
// -- play all frames
myMD2Object.play();
// -- play a specific animation, don't loop:
myMD2Object.play("crawl", false);
// -- play a specific animation, loop:
myMD2Object.play("crawl", true);
```
Check out the full example on Github:

[RajawaliMD2Activity](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliMD2Activity.java)

[RajawaliMD2Renderer](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliMD2Renderer.java)