---
title: Texture compression
---
The type of camera that is used by Rajawali as the default one is a perspective camera. With this type of camera parallel lines appear to converge in the horizon.
An orthographic camera however will render objects uniformly without a sense of perspective.

Here are the two types of projections side by side. 
![Perspective and Orthographic Projections](http://rozengain.com/files/rajawali/projections.jpg)

Setting up an orthographic camera is easy:
```
// -- Create an instance
OrthographicCamera camera = new OrthographicCamera();
// -- Set the zoom level
camera.setZoom(1); // -- this is the default
camera.setZoom(2);
// -- Set the look at coordinates
camera.setLookAt(1, 10, 3);
```
Check out [this page](http://www.significant-bits.com/a-laymans-guide-to-projection-in-videogames) to learn more about projection types in video games.