'use strict'
let ImageCacheIt = require('./image-cache-it.common');
const app = require("application");
const fs = require("file-system");
const utils = require("utils/utils");
const types = require("utils/types");
const imageSrc = require("image-source");

ImageCacheIt.prototype.load = function(url) {
    let picasso = this.picasso;
    this.picasso = picasso.load(url);
    return this;
}

ImageCacheIt.prototype.placeholder = function(image) {
    let ph = getImage(image);
    this.picasso.placeholder(ph);
    return this;
}
ImageCacheIt.prototype.error = function(image) {
    let eh = getImage(image);
    this.picasso.error(eh);
    return this;
}
ImageCacheIt.prototype.into = function(view) {
    this.picasso.into(view.android);
    return this;
}
ImageCacheIt.prototype.resize = function(w, h) {
    this.picasso.resize(w, h);
    return this;
}
ImageCacheIt.prototype.centerCrop = function() {
    this.picasso.centerCrop();
    return this;
}



function getImage(image) {
    switch (typeof image) {
        case 'string':
            if (image.indexOf('res://') > -1) {
                let src = imageSrc.fromResource(image);
                var res = utils.ad.getApplicationContext().getResources();
                return new android.graphics.drawable.BitmapDrawable(res, src.android);
            } else if (image.substr(0, 2) === '~/') {
                let src = imageSrc.fromFile(image);
                var res = utils.ad.getApplicationContext().getResources();
                return new android.graphics.drawable.BitmapDrawable(res, src.android);
            }

    }

}

module.exports = ImageCacheIt;