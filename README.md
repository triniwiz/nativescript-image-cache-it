[![npm](https://img.shields.io/npm/v/nativescript-image-cache-it.svg)](https://www.npmjs.com/package/nativescript-image-cache-it)
[![npm](https://img.shields.io/npm/dt/nativescript-image-cache-it.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-image-cache-it)
# Image-Cache-It
[*Picasso*](http://square.github.io/picasso/) - *Android*

[*SDWebImage*](https://github.com/rs/SDWebImage/) - *IOS*
## Install
```
npm install nativescript-image-cache-it
```
## Usage

```js
import {ImageCacheIt} from 'nativescript-image-cache-it';
```

Set image url to load.
```js
load = image; 
```
Set placeholder while images are downloading.
        
```js
placeHolder = "~/assets/images/ph.png";
```
Set placeholder for images are that failed to download.          
```js
errorHolder = "~/assets/images/broken.png";
```
Set image size.
```js
resize = "300 300"
```
Stretch
```js
stretch = "aspectFit" (optional) aspectFit || aspectFill || fill || none
```
e.g

```js
import {ImageCacheIt} from 'nativescript-image-cache-it';
 let cache = new ImageCacheIt();
        cache.imageUri = image;
        cache.placeHolder = "~/assets/images/broken.png";
        cache.errorHolder = "~/assets/images/ph.png";
        cache.resize = "300,300";
        cache.centerCrop = true;
        cache.stretch = "aspectFit";
        return cache;
```
Xml markup settings
``` xml
resize="300,300" (optional)
placeHolder="~/assets/images/ph.png"  (optional)
errorHolder="~/assets/images/broken.png"  (optional)
centerCrop = true (optional)
stretch = "aspectFit" (optional)
imageUri= "http://screenrant.com/wp-content/uploads/The-Flash-vs-the-Reverse-Flash.jpg" (required)
```

IMPORTANT: Make sure you include xmlns:i="nativescript-image-cache-it" on the Page element

e.g
```xml
<i:ImageCacheIt stretch="aspectFit"  centerCrop="false" resize="300,300" placeHolder="~/assets/images/ph.png" errorHolder="~/assets/images/broken.png" imageUri="http://screenrant.com/wp-content/uploads/The-Flash-vs-the-Reverse-Flash.jpg"/>
```

### Screenshots

#### Repeater

Image |  ImageCacheIt
-------- | ---------
![image_repeater](screenshots/image_repeater.gif?raw=true) | ![imagecacheit_repeater](screenshots/cache-it_repeater.gif?raw=true)

#### ListView

Image |  ImageCacheIt
-------- | ---------
![image_listview](screenshots/image_list_view.gif?raw=true) | ![imagecacheit_listview](screenshots/cache-it_list_view.gif?raw=true)



