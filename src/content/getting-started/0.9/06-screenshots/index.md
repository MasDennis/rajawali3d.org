---
title: Screenshots
---
Source discussion : https://github.com/MasDennis/Rajawali/issues/478

Taken from this SO question, where someone provides some code to extract a screenshot from an opengl renderer:

http://stackoverflow.com/questions/3310990/taking-screenshot-of-android-opengl

change the context in your onDrawFrame method to GL10 gl, i.e.

    	public void onDrawFrame(GL10 gl) {
		super.onDrawFrame(gl);

then you can paste in the following code:

        if(screenshot){                     
            int screenshotSize = mViewportWidth * mViewportHeight;
            ByteBuffer bb = ByteBuffer.allocateDirect(screenshotSize * 4);
            bb.order(ByteOrder.nativeOrder());
            gl.glReadPixels(0, 0, mViewportWidth, mViewportHeight, GL10.GL_RGBA, GL10.GL_UNSIGNED_BYTE, bb);
            int pixelsBuffer[] = new int[screenshotSize];
            bb.asIntBuffer().get(pixelsBuffer);
            bb = null;
            Bitmap bitmap = Bitmap.createBitmap(mViewportWidth, mViewportHeight, Bitmap.Config.RGB_565);
            bitmap.setPixels(pixelsBuffer, screenshotSize-mViewportWidth, -mViewportWidth, 0, 0, mViewportWidth, mViewportHeight);
            pixelsBuffer = null;

            short sBuffer[] = new short[screenshotSize];
            ShortBuffer sb = ShortBuffer.wrap(sBuffer);
            bitmap.copyPixelsToBuffer(sb);

            //Making created bitmap (from OpenGL points) compatible with Android bitmap
            for (int i = 0; i < screenshotSize; ++i) {                  
                short v = sBuffer[i];
                sBuffer[i] = (short) (((v&0x1f) << 11) | (v&0x7e0) | ((v&0xf800) >> 11));
            }
            sb.rewind();
            bitmap.copyPixelsFromBuffer(sb);
            lastScreenshot = bitmap;
            saveScreenshot(lastScreenshot);

            screenshot = false;
        }

then just create the following methods in your renderer:

    	public void takeScreenshot() {
		screenshot = true;
	}
	
	public void saveScreenshot(Bitmap screenshot){
		try {
			File file = new File(Environment.getExternalStoragePublicDirectory(
		            Environment.DIRECTORY_PICTURES), "openglscreenshots");
			file.mkdirs();
			String path = file.toString();
			String frametime = new DecimalFormat("##########").format(currentFrameTime);
		       FileOutputStream out = new FileOutputStream(path + "/" + frametime + ".png");
		       screenshot.compress(Bitmap.CompressFormat.PNG, 90, out);
		} catch (Exception e) {
		       e.printStackTrace();
		}		
	}

From your activity you can just call mRenderer.takeScreenshot() to get a screenshot. I have mine saving using the system time to make the filenames unique, you could use a counter or whatever.

My screenshot saving code is not resilient enough for release use, and you should consult this android page:
http://developer.android.com/guide/topics/data/data-storage.html#filesInternal
about doing it properly and checking the external storage is available.

Hope this is useful to somebody and that it belongs here, apologies to the admins if this isn't an appropriate thing to post.