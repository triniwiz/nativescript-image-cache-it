[![npm](https://img.shields.io/npm/v/nativescript-image-cache-it.svg)](https://www.npmjs.com/package/nativescript-image-cache-it)
[![npm](https://img.shields.io/npm/dt/nativescript-image-cache-it.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-image-cache-it)
[![Build Status](https://travis-ci.org/triniwiz/nativescript-image-cache-it.svg?branch=master)](https://travis-ci.org/triniwiz/nativescript-image-cache-it)

# Image-Cache-It

[_Glide_](https://github.com/bumptech/glide/) - _Android_

[_SDWebImage_](https://github.com/rs/SDWebImage/) - _IOS_

## Install

#### NativeScript 4x

* `tns plugin add nativescript-image-cache-it`

#### NativeScript 3x

* `tns plugin add nativescript-image-cache-it@3.0.7`

#### NativeScript 2x

* `tns plugin add nativescript-image-cache-it@1.6.0`

## Usage

```ts
import { ImageCacheIt } from 'nativescript-image-cache-it';
// **new** call in your app.ts/ main.ts/ app.js to enable image-cache to hook into the device's lowmemory events
ImageCacheIt.enableAutoMM();
```

Set image url to load.

```js
load = image;
```

Set placeholder while images are downloading.

```js
placeHolder = '~/assets/images/ph.png';
```

Set placeholder for images are that failed to download.

```js
errorHolder = '~/assets/images/broken.png';
```

Set decoded image size.

```js
decodedWidth = '300';
decodedHeight = '300';
```

Stretch

```js
stretch = "aspectFit" // (optional) aspectFit || aspectFill || fill || none
```

Prefetch
```typescript
import { ImageCacheIt } from 'nativescript-image-cache-it';
ImageCacheIt.fetchItem('https://source.unsplash.com/random').then(imageUrl =>{}).catch();
```

Delete item from cache

```typescript
import { ImageCacheIt } from 'nativescript-image-cache-it';
ImageCacheIt.deleteItem('https://source.unsplash.com/random').then().catch();
```

Get item from cache
```typescript
import { ImageCacheIt } from 'nativescript-image-cache-it';
ImageCacheIt.getItem('https://source.unsplash.com/random').then(imageUrl =>{}).catch();
```
e.g

```ts
import { ImageCacheIt } from 'nativescript-image-cache-it';
let cache = new ImageCacheIt();
cache.src = image;
cache.placeHolder = '~/assets/images/broken.png';
cache.errorHolder = '~/assets/images/ph.png';
cache.decodedWidth = '300';
cache.decodedHeight = '300';
cache.filter = 'blur(10px);';
cache.stretch = 'aspectFit';
return cache;
```

Xml markup settings

```xml
decodedWidth="300"; <!-- (optional) -->
decodedHeight="300"; <!-- (optional) -->
placeHolder="~/assets/images/ph.png" <!-- (optional) -->
errorHolder="~/assets/images/broken.png"  <!-- (optional) -->
stretch = "aspectFit" <!-- (optional) -->
src= "http://screenrant.com/wp-content/uploads/The-Flash-vs-the-Reverse-Flash.jpg" <!-- (required) -->

```

IMPORTANT: Make sure you include xmlns:i="nativescript-image-cache-it" on the Page element

e.g

```xml
<i:ImageCacheIt stretch="aspectFit"  resize="300,300" placeHolder="~/assets/images/ph.png" errorHolder="~/assets/images/broken.png" src="http://screenrant.com/wp-content/uploads/The-Flash-vs-the-Reverse-Flash.jpg"/>
```

### Angular

```ts
import { TNSImageCacheItModule } from 'nativescript-image-cache-it/angular';

@NgModule({
    imports: [
    TNSImageCacheItModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
```
### Screenshots

#### Repeater

| Image                                                      | ImageCacheIt                                                         |
| ---------------------------------------------------------- | -------------------------------------------------------------------- |
| ![image_repeater](screenshots/image_repeater.gif?raw=true) | ![imagecacheit_repeater](screenshots/cache-it_repeater.gif?raw=true) |

#### ListView

| Image                                                       | ImageCacheIt                                                          |
| ----------------------------------------------------------- | --------------------------------------------------------------------- |
| ![image_listview](screenshots/image_list_view.gif?raw=true) | ![imagecacheit_listview](screenshots/cache-it_list_view.gif?raw=true) |
