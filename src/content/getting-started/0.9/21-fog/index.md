![Fog](http://www.rozengain.com/files/rajawali/rajawali-fog.jpg)

So here's fog. There's not much to it. The most important thing is to enable fog on the `RajawaliRenderer`:
```
setFogEnabled(true);
```
It's important that you do this before creating any materials. If you don't there will be no fog. This has to do with shader optimisation.

The other fog parameters can be set on the camera:
```
mCamera.setFogNear(5);
mCamera.setFogFar(15);
mCamera.setFogColor(0x999999);
```
Setting the background color to be the same color as the fog color makes it complete:
```
setBackgroundColor(0x999999);
```
As usual, the full example can be found on [here](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliFogRenderer.java)