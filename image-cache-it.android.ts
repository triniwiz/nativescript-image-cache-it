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
export class ImageCacheIt extends common.ImageCacheIt {
    glide;
    picasso;
    private _android: android.widget.ImageView;
    constructor() {
        super();
    }

    get android(): android.widget.ImageView {
        return this._android;
    }
    public _createUI() {
        if (!this.imageUri) return;
        this._android = new android.widget.ImageView(this._context);
        if (this.imageUri.toString().substr(0, 2) == '~/') {
            let oldUri = this.imageUri;
            this.imageUri = fs.path.join(fs.knownFolders.currentApp().path, oldUri.replace("~/", ""));
        }
        this._setNativeImage(this.imageUri);
    }
    public _setNativeImage(nativeImage: any) {
        if (!this._android) return;
        if (nativeImage.indexOf('.gif') > -1) {
            this.glide = new com.bumptech.glide.Glide.with(this._context).load(nativeImage).asGif();
            if (this.placeHolder) {
                let ph = this.getImage(this.placeHolder);
                this.glide.placeholder(ph);
            }
            if (this.errorHolder) {
                let eh = this.getImage(this.errorHolder);
                this.glide.error(eh);
            }
            if (this.resize && this.resize !== undefined && this.resize.split(',').length > 1) {
                this.glide.override(parseInt(this.resize.split(',')[0]), parseInt(this.resize.split(',')[1]))
            } else if (this.override && this.override !== undefined && this.override.split(',').length > 1) {
                this.glide.override(parseInt(this.override.split(',')[0]), parseInt(this.override.split(',')[1]))
            }
            if (this.centerCrop) {
                this.glide.centerCrop();
            }

            this.glide.into(this._android);
        } else {
            if (nativeImage.substr(0, 1) == '/') {
                nativeImage = new java.io.File(nativeImage);
            }

            this.picasso = new com.squareup.picasso.Picasso.with(this._context).load(nativeImage);

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
            } else if (this.override && this.override !== undefined && this.override.split(',').length > 1) {
                this.picasso.resize(parseInt(this.override.split(',')[0]), parseInt(this.override.split(',')[1]))
            }
            if (this.centerCrop) {
                this.picasso.centerCrop();
            }

            this.picasso.into(this._android);
        }

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
        (<android.widget.ImageView>v._nativeView).setCornerRadius(val);
        background.ad.onBackgroundOrBorderPropertyChanged(v);
    }

    private static resetBorderRadiusProperty(v: view.View, nativeValue: any) {
        if (!v._nativeView) {
            return;
        }
        (<android.widget.ImageView>v._nativeView).setCornerRadius(0);
        background.ad.onBackgroundOrBorderPropertyChanged(v);
    }

    // Border width
    private static setBorderWidthProperty(v: view.View, newValue: any, defaultValue?: any) {
        if (!v._nativeView) {
            return;
        }

        var val = Math.round(newValue * utils.layout.getDisplayDensity());
        (<android.widget.ImageView>v._nativeView).setBorderWidth(val);
        background.ad.onBackgroundOrBorderPropertyChanged(v);
    }

    private static resetBorderWidthProperty(v: view.View, nativeValue: any) {
        if (!v._nativeView) {
            return;
        }
        (<android.widget.ImageView>v._nativeView).setBorderWidth(0);
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