Canvas can be used to modify mutable bitmaps giving you a convenient way to modify or create new textures at any time.

Canvas must be provided a mutable bitmap for this to work. To create a mutable bitmap simply use the static method in the bitmap class.
```java
Bitmap mutableBitmap = Bitmap.createBitmap(256, 256, Bitmap.Config.RGB_565);
```

Now you will need to create a canvas and give it the mutable bitmap to use for drawing.
```java
Canvas canvas = new Canvas(mutableBitmap );
canvas.drawColor(Color.WHITE);
```

And that is all there is to it. You have now created and modified a bitmap that is 256 x 256 and completely white. Simply load it as your texture on a plane or model and behold, a white texture is displayed.

For your convenience, here is a sample of what all the steps might look like for you:
```java
// Create a bitmap to draw to
final Bitmap generatedBitmap = Bitmap.createBitmap(256, 256, Bitmap.Config.RGB_565);

// Paint for coloring
final Paint mLinePaint = new Paint();
mLinePaint.setColor(0xFFFFFFFF);
mLinePaint.setStrokeWidth(3f);
mLinePaint.setStyle(Style.STROKE);

// Create a canvas to do the drawing
final Canvas canvas = new Canvas(generatedBitmap);
canvas.drawColor(Color.DKGRAY);
canvas.drawLine(0, 0, canvas.getWidth(), canvas.getHeight(), mLinePaint);
canvas.drawLine(canvas.getWidth(), 0, 0, canvas.getHeight(), mLinePaint);

final SimpleMaterial simpleMaterial = new SimpleMaterial();
simpleMaterial.addTexture(mTextureManager.addTexture(generatedBitmap));

final Plane largeCanvasPlane = new Plane(2, 2, 2, 2);
largeCanvasPlane.setZ(-0.75f);
largeCanvasPlane.setMaterial(simpleMaterial);
addChild(largeCanvasPlane);
```

![Example of rendering](https://f.cloud.github.com/assets/1614281/483783/9bfba652-b8c8-11e2-9890-0e6bb3742813.png)