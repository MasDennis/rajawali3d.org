You can add user interface elements and layouts on top  of the OpenGL Surface View.

It can be done in the `Activity` and it's very easy:
```
@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mRenderer = new UIExampleRenderer(this);
        mRenderer.setSurfaceView(mSurfaceView);
        super.setRenderer(mRenderer);

        LinearLayout ll = new LinearLayout(this);
        ll.setOrientation(LinearLayout.VERTICAL);

        TextView label = new TextView(this);
        label.setText("Halo Dunia!");
        label.setTextSize(20);
        ll.addView(label);

        label = new TextView(this);
        label.setText("Apa kabar?");
        label.setTextSize(20);
        ll.addView(label);

        label = new TextView(this);
        label.setText("Blah\n\tblah\n\t\tblah\n\t\t\tblah\n\t\t\t\tblah\n\t\t\t\t\tblah\n\t\t\t\t\t\tblah\n\t\t\t\t\t\t\tblah\n\t\t\t\t\t\t\t\tblah\n\t\t\t\t\t\t\t\t\tblah\n");
        label.setTextSize(20);
        ll.addView(label);

        mLayout.addView(ll);
    }
```
![User Interface Elements](http://www.rozengain.com/files/rajawali/rajawali-ui.jpg)

You can view the source files for the Activity [here](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliUIElementsActivity.java) and Renderer [here](https://github.com/MasDennis/RajawaliExamples/blob/master/src/com/monyetmabuk/rajawali/tutorials/RajawaliUIElementsRenderer.java).