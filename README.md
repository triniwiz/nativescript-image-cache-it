#Image-Cache-It

##Install
```
tns plugin add https://github.com/triniwiz/nativescript-image-cache-it;
var ImageCacheIt = require('nativescript-image-cache-it');
```
##Usage



Set image url to load.
```js
.load(image) 
```
Set placeholder while images are downloading.
        
```js
.placeholder("~/assets/images/ph.png")
```
Set placeholder for images are that failed to download.          
```js
.error("~/assets/images/broken.png")
```
Set image size.
```js
.resize(300, 300)
```
 Set view to load image in (Image).        
```js
.into(view)
```

e.g

```js
var ImageCacheIt = require('nativescript-image-cache-it');
var cache = new ImageCacheIt();

cache.load(image) 
.placeholder("~/assets/images/ph.png")
.error("~/assets/images/broken.png")
.resize(300, 300)
.into(view)
```