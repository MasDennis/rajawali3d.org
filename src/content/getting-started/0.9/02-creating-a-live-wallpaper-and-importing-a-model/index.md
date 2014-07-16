---
title: Creating a live wallpaper
---
The basics of Android live wallpapers are [well documented](http://www.vogella.com/articles/AndroidLiveWallpaper/article.html) so there's no need to go over that in this tutorial.

There is a template project for Rajawali live wallpapers which is meant to make your life easier. You can import it into Eclipse by [downloading it from this page](https://github.com/MasDennis/RajawaliWallpaperTemplate).

The package and class names are generic so you might want to change these before getting started.

Two classes are important here. The first one is `Service`. This is where the renderer gets created and a new `WallpaperEngine` instance is returned. Other live wallpaper stuff can be done here but for this tutorial we'll leave this class alone.

The most important class is `Renderer`. This is where all the funky 3D stuff will be happening. 
Let's import an [.obj](http://en.wikipedia.org/wiki/Wavefront_.obj_file) model and apply a texture:

```
ObjParser parser = new ObjParser(mContext.getResources(), mTextureManager, R.raw.cube);
parser.parse();
mCube = parser.getParsedObject();
addChild(mCube);

mCamera.setZ(-4.2f);

Bitmap texture = BitmapFactory.decodeResource(mContext.getResources(), R.drawable.cubetexture);
mCube.addTexture(mTextureManager.addTexture(texture));
mCube.setRotation(45, 0, 45);
mCube.setScale(.5f);
```

Obj files are text files which are compressed in the final .apk file. Parsing the whole obj file can take some time. There's an optimization which will be covered in the next tutorial (this uses serialized objects and speeds up things significantly).