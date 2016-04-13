import common = require('./image-cache-it.common');
import app = require("application");
import fs = require("file-system");
import utils = require("utils/utils");
import types = require("utils/types");
import imageSrc = require("image-source");
import {Image} from 'ui/image';

const Picasso = com.squareup.picasso.Picasso;
const Request = com.squareup.picasso.Request;
export class ImageCacheIt extends common.ImageCacheIt {
    private _android: org.nativescript.widgets.ImageView;
    constructor() {
        super();
        
    }

    get android(): org.nativescript.widgets.ImageView {
        return this._android;
    }
    public _createUI() {
        this._android = new org.nativescript.widgets.ImageView(this._context);
        let p = Picasso.with(app.android.currentContext);
        let picasso = p.load(this.imageUri);
       
        if (this.placeHolder) {
            let ph = this.getImage(this.placeHolder);
            picasso.placeholder(ph);
        }

        if (this.errorHolder) {
            let eh = this.getImage(this.errorHolder);
            picasso.error(eh);
        }
        if (this.resize && this.resize !== undefined && this.resize.split(',').length > 1) {
            picasso.resize(parseInt(this.resize.split(',')[0]), parseInt(this.resize.split(',')[1]))
        }
        if (this.centerCrop) {
            picasso.centerCrop();
        }

        picasso.into(this._android);
    }
    public _setNativeImage(nativeImage: any) {
        this.android.setImageBitmap(nativeImage);
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