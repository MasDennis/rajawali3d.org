You can set the skybox images in your renderer class. It is defined in `RajawaliRenderer`.
Make sure you put six images in /res/drawable-nodpi/ and pass them to the `setSkybox()` method:
```
setSkybox(R.drawable.posz, R.drawable.posx, R.drawable.negz, R.drawable.negx, R.drawable.posy, R.drawable.negy);
```
The images are courtesy of Emil Persson aka Humus. Check his website for an awesome collection of high-quality sky box textures: [http://www.humus.name/index.php?page=Textures](http://www.humus.name/index.php?page=Textures)

There's also an option to use a single image as a skybox. This reduces load times:
```
setSkybox(R.drawable.skyboxtexture);
```
Your skybox texture needs to look like this (resize the height so that it is a square texture):

![Skybox using a single image](http://www.rozengain.com/files/skybox.jpg)

You can view the source files for the Activity [here](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliSkyboxActivity.java) and the Renderer [here](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliSkyboxRenderer.java).

# UPDATING A SKYBOX TEXTURE

Skybox textures can be update by calling the `Renderer`'s `updateSkybox()` method. There are two `updateSkybox()` methods. One is for a single texture skybox and the other is for a 6 texture skybox:
```
updateSkybox(R.drawable.single_texture);
```
or
```
updateSkybox(R.drawable.posz, R.drawable.posx, R.drawable.negz, R.drawable.negx, R.drawable.posy, R.drawable.negy);
```