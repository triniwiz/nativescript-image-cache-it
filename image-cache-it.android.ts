import common = require('./image-cache-it.common');
import app = require("application");
import fs = require("file-system");
import utils = require("utils/utils");
import types = require("utils/types");
import imageSrc = require("image-source");
import {Image} from 'ui/image';

const Picasso = com.squareup.picasso.Picasso.extend({});
const Request = com.squareup.picasso.Request;
export class ImageCacheIt extends common.ImageCacheIt {
    picasso;
    private _android: android.widget.ImageView;
    constructor() {
        super(); 
    }

    get android(): android.widget.ImageView {
        return this._android;
    }
    public _createUI() {
        this._android = new android.widget.ImageView(this._context);
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