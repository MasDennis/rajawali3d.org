---
title: Animated sprites
---
[YouTube video demonstrating Animated Sprites](http://www.youtube.com/watch?feature=player_embedded&v=bARIz7iDHgc)

Sprite sheets are basically separate animation frames tiled in a single texture. The shader has logic that loops through these frames at a specified speed.

The shader takes these arguments:

* `setCurrentFrame()` the current frame
* `setTileSize()` the size (in normalized coordinates) of one tile. Tiles must be square. If there are 8 rows of tiles (so 8 * 8 = 64 tiles in total) then the tile size is 1 / 8 = 0.125
* `setNumTileRows()` the number of rows in one texture. If we follow the example in the previous bullet point then this should be 8.
* `setAnimOffsets()` this is a `FloatBuffer` with frame offsets for each separate 'particle'. Setting this to a random value results in the effect in the above video.

The full source code:

* [ExampleParticleSystem2.java](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/ExampleParticleSystem2.java)

* [RajawaliAnimatedSpritesRenderer.java](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliAnimatedSpritesRenderer.java)