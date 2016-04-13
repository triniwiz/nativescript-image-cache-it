#Image-Cache-It
[*Picasso*](http://square.github.io/picasso/) - *Android*

##Install
```
npm install nativescript-image-cache-it
```
##Usage

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
resize = "300,300"
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
        return cache;
```
Xml markup settings
``` xml
centerCrop="false" (optional)
resize="300,300" (optional)
placeHolder="~/assets/images/ph.png"  (optional)
errorHolder="~/assets/images/broken.png"  (optional)
centerCrop = true (optional)
imageUri= "http://screenrant.com/wp-content/uploads/The-Flash-vs-the-Reverse-Flash.jpg" (required)
```

e.g
```xml
<i:ImageCacheIt centerCrop="false" resize="300,300" placeHolder="~/assets/images/ph.png" errorHolder="~/assets/images/broken.png" imageUri="http://screenrant.com/wp-content/uploads/The-Flash-vs-the-Reverse-Flash.jpg"/>
```
