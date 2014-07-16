---
title: Skeleton animation
---
These are a few quick notes about skeletal animation for now. A full tutorial is in the making.

Rajawali can import [.md5anim and .md5mesh files](http://tfc.duke.free.fr/coding/md5-specs-en.html). These file types were originally used in Doom 3. Collada and FBX skeletal animation aren't supported. Mostly because these files can be enormous.

Here's a quick example that shows how to import .md5mesh and .md5anim files.

``` java
// -- Load the .md5mesh file from the raw resource folder
MD5MeshParser meshParser = new MD5MeshParser(this, R.raw.boblampclean_mesh);
meshParser.parse();

// -- Load the .md5anim file from the raw resource folder
MD5AnimParser animParser = new MD5AnimParser("animation1", this, R.raw.boblampclean_anim);
animParser.parse();

// -- Get the animation sequence
BoneAnimationSequence sequence = (BoneAnimationSequence)animParser.getParsedAnimationSequence();

// -- Get the parsed AnimationSkeleton object
AnimationSkeleton bob = (AnimationSkeleton)meshParser.getParsedAnimationObject();
// -- Set the animation. You can use multiple .md5anim files in your project for one 
//    .md5mesh file
bob.setAnimationSequence(sequence);
bob.addLight(mLight);
bob.setScale(.04f);
bob.setRotY(180);
// -- Play the animation
bob.play();

addChild(mObject);
```
# Blender to MD5 Script

[Katsbits](http://www.katsbits.com/) has a Blender to MD5 exporter script that almost works. Here's how to install a working version:
- [go to this page](http://www.katsbits.com/smforum/index.php?topic=178.0) to download the zip file. This page also has installation instructions.
- Once the Python scripts has been dropped into the Blender addons folder you need to open the script (io_export_md5-263.py) in a text editor. Go to [Pasteall.org](http://www.pasteall.org/34591/python) and copy the code and paste it into the .py file. This fixes incorrect weight calculations.

# Blender Workflow

This will become a full tutorial but for now here's a few quick hints:
- You need to create actions in the dopesheet editor
- When exporting your file you need to select both the mesh and the armature. You'll also need to select the dopesheet actions that you want to export in your .md5anim file.