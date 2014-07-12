Rajawali includes support for various methods of texture compression. The most common type of texture compression is known as Ericsson Texture Compression and is available for all OpenGL ES 2.0 capable devices.

Texture compression is the easiest way to achieve performance gains and save memory space at the same time because the size of the texture in the case of ETC1 compression is about 6:1 ratio. The performance is gained even further by enabling mipmapping at the cost of extra 33% gain in memory usage (but lowering the memory bandwidth by fetching from smaller sized textures when needed).

Due to the limitations of handling compressed texture data in OpenGL ES 2.0 itself, automatic mipmap generation is disabled although some GPUs (e.g. Mali-400 series) allow automatic mipmap generation from ETC1 textures.

![Texture compression comparison](http://software.intel.com/sites/default/files/8532-1.jpg)

When utilizing compressed textures, be sure to add the following line in the manifest to filter out devices that cannot handle ETC1 textures.

```xml
<supports-gl-texture android:name="GL_OES_compressed_ETC1_RGB8_texture" />
```

Adding compressed texture in Rajawali is similar to adding a regular Bitmap as a texture.

```java
// Add a compressed texture
mObject.addEtc1Texture(mTextureManager.addEtc1Texture(
		mContext.getResources().openRawResource(R.raw.tex), 
		null,
		TextureType.DIFFUSE));

// Add a mipmapped compressed texture for further performance gains
mObject.addEtc1Texture(mTextureManager.addEtc1Texture(mContext, new int[] { 
		R.raw.tex_mip_0,
		R.raw.tex_mip_1,
		R.raw.tex_mip_2,
		R.raw.tex_mip_3,
		R.raw.tex_mip_4,
		R.raw.tex_mip_5,
		R.raw.tex_mip_6,
		R.raw.tex_mip_7,
		R.raw.tex_mip_8,
		R.raw.tex_mip_9}, TextureType.DIFFUSE));
```

There are many ways to create compressed textures, and a simple Google search will reveal a long list of tools. One of the most simple and industry standard tools is the [Mail Texture Compression Tool](http://malideveloper.arm.com/develop-for-mali/mali-gpu-texture-compression-tool/) and it is highly recommended. Files created with this tool should be saved as PKM format.

A caveat when using ETC1 is that it does not support alpha channels, so instead you should output a separate compressed file of the alpha channel for your transparent textures. Then you can employ `AlphaMasking` simply by adding both textures to your object and flagging the alpha texture a `TextureType.ALPHA`