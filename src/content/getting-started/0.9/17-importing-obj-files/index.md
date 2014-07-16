---
title: Importing .obj files
---
The basics have been covered in an earlier tutorial but more info about this was requested. There are some specific things to take into account when dealing with .obj files.

The most important thing is that the model should be triangulated. Rajawali doesn't accept quads, only tris. In Blender, this is an option you can select in the exporter. In a program like MeshLab, this is done automatically.

At the moment, Rajawali also doesn't support per-face textures. This is on the todo list.

The options that should be checked when exporting from blender are:

* Apply Modifiers
* Include Normals
* Include UVs
* Write Materials (if applicable)
* Triangulate Faces
* Objects as OBJ Objects

The files should be written to your "res/raw" folder in your ADT project. Usually you'll get errors in the console when you do this. The Android SDK ignores file extensions so it'll regard the .obj and .mtl files as duplicates. The way to fix this is to rename the files. For instance:

* myobject.obj > myobject_obj
* myobject.mtl > myobject_mtl

The parser replaces any dots in file names, so this should be picked up automatically by the parser. Path fragments in front of file names (also texture paths) are discarded so you can leave them as is.

The texture file paths in the .mtl files are stripped off periods and path fragments as well. The textures need to be placed in the res/drawable-nodpi folder.

If it still throws errors check if there are any funny characters or unsupported texture formats (like bmp).

Just as a reminder, here's the code that takes care of the parsing:
```
ObjParser objParser = new ObjParser(mContext.getResources(), mTextureManager, R.raw.myobject_obj);
objParser.parse();
BaseObject3D mObject = objParser.getParsedObject();
mObject.setLight(mLight);
addChild(mObject);
```
Or check the source file [here](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliLoadModelRenderer.java).