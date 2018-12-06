[![npm](https://img.shields.io/npm/v/nativescript-image-cache-it.svg)](https://www.npmjs.com/package/nativescript-image-cache-it)
[![npm](https://img.shields.io/npm/dt/nativescript-image-cache-it.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-image-cache-it)
[![Build Status](https://travis-ci.org/triniwiz/nativescript-image-cache-it.svg?branch=master)](https://travis-ci.org/triniwiz/nativescript-image-cache-it)

# Image-Cache-It

[_Picasso_](http://square.github.io/picasso/) - _Android_

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

Set image size.

_Note:_ Resize should be width then height and split with a `,` (comma).

```js
resize = '300 300';
```

Stretch

_Note:_ When using `aspectFit` or `aspectFill` on android you need to provide the `resize` value or set a height/width on the ImageCacheIt instance.

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
cache.imageUri = image;
cache.placeHolder = '~/assets/images/broken.png';
cache.errorHolder = '~/assets/images/ph.png';
cache.resize = '300,300';
cache.stretch = 'aspectFit';
return cache;
```

Xml markup settings

```xml
resize="300,300" <!-- (optional) -->
placeHolder="~/assets/images/ph.png" <!-- (optional) -->
errorHolder="~/assets/images/broken.png"  <!-- (optional) -->
stretch = "aspectFit" <!-- (optional) -->
imageUri= "http://screenrant.com/wp-content/uploads/The-Flash-vs-the-Reverse-Flash.jpg" <!-- (required) -->

```

IMPORTANT: Make sure you include xmlns:i="nativescript-image-cache-it" on the Page element

e.g

```xml
<i:ImageCacheIt stretch="aspectFit"  resize="300,300" placeHolder="~/assets/images/ph.png" errorHolder="~/assets/images/broken.png" imageUri="http://screenrant.com/wp-content/uploads/The-Flash-vs-the-Reverse-Flash.jpg"/>
```

### Angular

import { registerElement } from 'nativescript-angular/element-registry';
registerElement('ImageCacheIt', () => require('nativescript-image-cache-it').ImageCacheIt);

### Screenshots

#### Repeater

| Image                                                      | ImageCacheIt                                                         |
| ---------------------------------------------------------- | -------------------------------------------------------------------- |
| ![image_repeater](screenshots/image_repeater.gif?raw=true) | ![imagecacheit_repeater](screenshots/cache-it_repeater.gif?raw=true) |

#### ListView

| Image                                                       | ImageCacheIt                                                          |
| ----------------------------------------------------------- | --------------------------------------------------------------------- |
| ![image_listview](screenshots/image_list_view.gif?raw=true) | ![imagecacheit_listview](screenshots/cache-it_list_view.gif?raw=true) |
