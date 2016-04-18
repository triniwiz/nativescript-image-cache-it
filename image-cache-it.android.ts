import common = require('./image-cache-it.common');
import app = require("application");
import fs = require("file-system");
import utils = require("utils/utils");
import types = require("utils/types");
import imageSrc = require("image-source");
import {Image} from 'ui/image';
import style = require("ui/styling/style");
import view = require("ui/core/view");
import background = require("ui/styling/background");
const Picasso = com.squareup.picasso.Picasso.extend({});
const Request = com.squareup.picasso.Request;
export class ImageCacheIt extends common.ImageCacheIt {
    picasso;
    private _android: org.nativescript.widgets.ImageView;
    constructor() {
        super(); 
    }

    get android(): org.nativescript.widgets.ImageView {
        return this._android;
    }
    public _createUI() {
        this._android = new org.nativescript.widgets.ImageView(this._context);
        if(!this.imageUri){
            return;
        }
       this._setNativeImage(this.imageUri);
    }
    public _setNativeImage(nativeImage: any) {
        this.picasso = new Picasso.with(this._context).load(nativeImage);
        if (this.placeHolder) {
            let ph = this.getImage(this.placeHolder);
            this.picasso.placeholder(ph);
        }

        if (this.errorHolder) {
            let eh = this.getImage(this.errorHolder);
           this.picasso.error(eh);
        }
        if (this.resize && this.resize !== undefined && this.resize.split(',').length > 1) {
            this.picasso.resize(parseInt(this.resize.split(',')[0]), parseInt(this.resize.split(',')[1]))
        }
        if (this.centerCrop) {
            this.picasso.centerCrop();
        }

        this.picasso.into(this._android);
    }



getImage(image) {
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

}

export class ImageStyler implements style.Styler {
    // Corner radius
    private static setBorderRadiusProperty(v: view.View, newValue: any, defaultValue?: any) {
        if (!v._nativeView) {
            return;
        }
        var val = Math.round(newValue * utils.layout.getDisplayDensity());
        (<org.nativescript.widgets.ImageView>v._nativeView).setCornerRadius(val);
        background.ad.onBackgroundOrBorderPropertyChanged(v);
    }

    private static resetBorderRadiusProperty(v: view.View, nativeValue: any) {
        if (!v._nativeView) {
            return;
        }
        (<org.nativescript.widgets.ImageView>v._nativeView).setCornerRadius(0);
        background.ad.onBackgroundOrBorderPropertyChanged(v);
    }

    // Border width
    private static setBorderWidthProperty(v: view.View, newValue: any, defaultValue?: any) {
        if (!v._nativeView) {
            return;
        }

        var val = Math.round(newValue * utils.layout.getDisplayDensity());
        (<org.nativescript.widgets.ImageView>v._nativeView).setBorderWidth(val);
        background.ad.onBackgroundOrBorderPropertyChanged(v);
    }

    private static resetBorderWidthProperty(v: view.View, nativeValue: any) {
        if (!v._nativeView) {
            return;
        }
        (<org.nativescript.widgets.ImageView>v._nativeView).setBorderWidth(0);
        background.ad.onBackgroundOrBorderPropertyChanged(v);
    }

    public static registerHandlers() {
        // Use the same handler for all background/border properties
        // Note: There is no default value getter - the default value is handled in background.ad.onBackgroundOrBorderPropertyChanged

        style.registerHandler(style.borderRadiusProperty, new style.StylePropertyChangedHandler(
            ImageStyler.setBorderRadiusProperty,
            ImageStyler.resetBorderRadiusProperty), "ImageCacheIt");

        style.registerHandler(style.borderWidthProperty, new style.StylePropertyChangedHandler(
            ImageStyler.setBorderWidthProperty,
            ImageStyler.resetBorderWidthProperty), "ImageCacheIt");
    }
}

ImageStyler.registerHandlers();