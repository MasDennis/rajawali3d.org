---
title: Creating a day dream
---
# Rajawali Day Dreams
Day dreams are actually quite simple. The Rajawali Day Dream implementation only requires passing an implementation and then setting up the boilerplate Android xml.

## Boilerplate implementation
The XML for Day Dreams is extremely similar to the Live Wallpaper XML. Below is the implementation from my sample application.

### Raw XML
raw/daydream.xml
```xml
<dream xmlns:android="http://schemas.android.com/apk/res/android"
     android:settingsActivity="com.testing.rajawali.DayDream" />
```

### Android Manifest
```xml
<service
    android:name="com.testing.rajawali.DayDream"
    android:exported="true"
    android:icon="@drawable/ic_launcher"
    android:label="@string/app_name" >
    <intent-filter>
        <action android:name="android.service.dreams.DreamService" />

        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
    <meta-data android:name="android.service.dream" android:resource="@xml/daydream"/>
</service>
```

### DayDream.java
```java
@TargetApi(Build.VERSION_CODES.JELLY_BEAN_MR1)
public class DayDream extends RajawaliDaydream {

	@Override
	protected RajawaliRenderer createRenderer() {
		return new MyRenderer(this);
	}

}
```

## Starting a Day Dream
Day Dreams can only be used on Android 4.2 and greater devices. To set a day dream, access Settings > Display > Daydream. From here you can configure when day dreams should appear or force one to show up immediately via the "START NOW" option.

## Source Implementation
You can find the complete implementation example that this wiki was created with here:
[Rajawali Wallpaper and Activity Example](https://github.com/ToxicBakery/Rajawali-Wallpaper-And-Activity-Example)