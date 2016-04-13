"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common = require('./image-cache-it.common');
var app = require("application");
var utils = require("utils/utils");
var imageSrc = require("image-source");
var Picasso = com.squareup.picasso.Picasso;
var Request = com.squareup.picasso.Request;
var ImageCacheIt = (function (_super) {
    __extends(ImageCacheIt, _super);
    function ImageCacheIt() {
        _super.call(this);
    }
    Object.defineProperty(ImageCacheIt.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    ImageCacheIt.prototype._createUI = function () {
        this._android = new org.nativescript.widgets.ImageView(this._context);
        var p = Picasso.with(app.android.currentContext);
        var picasso = p.load(this.imageUri);
        if (this.placeHolder) {
            var ph = this.getImage(this.placeHolder);
            picasso.placeholder(ph);
        }
        if (this.errorHolder) {
            var eh = this.getImage(this.errorHolder);
            picasso.error(eh);
        }
        if (this.resize && this.resize !== undefined && this.resize.split(',').length > 1) {
            picasso.resize(parseInt(this.resize.split(',')[0]), parseInt(this.resize.split(',')[1]));
        }
        if (this.centerCrop) {
            picasso.centerCrop();
        }
        picasso.into(this._android);
    };
    ImageCacheIt.prototype._setNativeImage = function (nativeImage) {
        this.android.setImageBitmap(nativeImage);
    };
    ImageCacheIt.prototype.getImage = function (image) {
        switch (typeof image) {
            case 'string':
                if (image.indexOf('res://') > -1) {
                    var src = imageSrc.fromResource(image);
                    var res = utils.ad.getApplicationContext().getResources();
                    return new android.graphics.drawable.BitmapDrawable(res, src.android);
                }
                else if (image.substr(0, 2) === '~/') {
                    var src = imageSrc.fromFile(image);
                    var res = utils.ad.getApplicationContext().getResources();
                    return new android.graphics.drawable.BitmapDrawable(res, src.android);
                }
        }
    };
    return ImageCacheIt;
}(common.ImageCacheIt));
exports.ImageCacheIt = ImageCacheIt;
//# sourceMappingURL=image-cache-it.android.js.map