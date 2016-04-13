"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var view = require("ui/core/view");
var dependency_observable_1 = require("ui/core/dependency-observable");
var proxy_1 = require("ui/core/proxy");
var ImageCacheIt = (function (_super) {
    __extends(ImageCacheIt, _super);
    function ImageCacheIt() {
        _super.call(this);
    }
    Object.defineProperty(ImageCacheIt.prototype, "imageUri", {
        get: function () {
            return this._getValue(ImageCacheIt.imageUriProperty);
        },
        set: function (value) {
            this._setValue(ImageCacheIt.imageUriProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCacheIt.prototype, "placeHolder", {
        get: function () {
            return this._getValue(ImageCacheIt.placeHolderProperty);
        },
        set: function (value) {
            this._setValue(ImageCacheIt.placeHolderProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCacheIt.prototype, "errorHolder", {
        get: function () {
            return this._getValue(ImageCacheIt.errorHolderProperty);
        },
        set: function (value) {
            this._setValue(ImageCacheIt.errorHolderProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCacheIt.prototype, "resize", {
        get: function () {
            return this._getValue(ImageCacheIt.resizeProperty);
        },
        set: function (value) {
            this._setValue(ImageCacheIt.resizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCacheIt.prototype, "centerCrop", {
        get: function () {
            return this._getValue(ImageCacheIt.centerCropProperty);
        },
        set: function (value) {
            this._setValue(ImageCacheIt.centerCropProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ImageCacheIt.imageUriProperty = new dependency_observable_1.Property("imageUri", "ImageCacheIt", new proxy_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None));
    ImageCacheIt.placeHolderProperty = new dependency_observable_1.Property("placeHolder", "ImageCacheIt", new proxy_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None));
    ImageCacheIt.errorHolderProperty = new dependency_observable_1.Property("errorHolder", "ImageCacheIt", new proxy_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None));
    ImageCacheIt.resizeProperty = new dependency_observable_1.Property("resize", "ImageCacheIt", new proxy_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None));
    ImageCacheIt.centerCropProperty = new dependency_observable_1.Property("centerCrop", "ImageCacheIt", new proxy_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None));
    return ImageCacheIt;
}(view.View));
exports.ImageCacheIt = ImageCacheIt;
//# sourceMappingURL=image-cache-it.common.js.map