import * as common from './image-cache-it.common';
import app = require("application");
import fs = require("file-system");
import utils = require("utils/utils");
import types = require("utils/types");
import imageSrc = require("image-source");
import { View } from 'tns-core-modules/ui/core/view';
global.moduleMerge(common, exports);

export class ImageCacheIt extends common.ImageCacheIt {
    picasso: com.squareup.picasso.Picasso;
    private builder: com.squareup.picasso.RequestCreator;
    constructor() {
        super();
    }

    get android(): android.widget.ImageView {
        return this.nativeView;
    }
    public createNativeView() {
        this.picasso = com.squareup.picasso.Picasso.with(this._context);
        return new android.widget.ImageView(this._context);
    }
    public initNativeView() {
        this.builder = this.picasso.load(this.getImage(this.imageUri));

        if (this.placeHolder) {
            this.builder.placeholder(imageSrc.fromFileOrResource(this.placeHolder).android);
        }
        if (this.errorHolder) {
            this.builder.error(imageSrc.fromFileOrResource(this.errorHolder).android);
        }
        if (this.resize && this.resize !== undefined && this.resize.split(' ').length > 1) {
            this.builder.resize(parseInt(this.resize.split(' ')[0]), parseInt(this.resize.split(' ')[1]))
        } else if (this.override && this.override !== undefined && this.override.split(' ').length > 1) {
            this.builder.resize(parseInt(this.override.split(' ')[0]), parseInt(this.override.split(' ')[1]))
        }
        if (this.centerCrop) {
            this.builder.centerCrop();
        }
        this.builder.into(this.nativeView);
    }
    [common.imageUriProperty.getDefault](): any {
        return undefined;
    }
    [common.imageUriProperty.setNative](src: string) {
        if (!this.builder) {
            return;
        }
        this.builder = this.picasso.load(this.getImage(this.imageUri));
        this.builder.into(this.nativeView);
    }
    [common.resizeProperty.setNative](resize: string) {
        if (!this.builder) {
            return;
        }
        if (resize && resize !== undefined && resize.split(' ').length > 1) {
            this.builder.resize(parseInt(resize.split(' ')[0]), parseInt(resize.split(' ')[1]))
        }
    }
    [common.overrideProperty.setNative](override: string) {
        if (!this.builder) {
            return;
        }
        if (override && override !== undefined && override.split(' ').length > 1) {
            this.builder.resize(parseInt(override.split(' ')[0]), parseInt(override.split(' ')[1]))
        }
    }
    private getImage(src: string): string {
        let nativeImage;
        if (src.substr(0, 1) === '/') {
            nativeImage = new java.io.File(nativeImage);
        } else if (src.startsWith("~/")) {
            nativeImage = new java.io.File(fs.path.join(fs.knownFolders.currentApp().path, src.replace("~/", "")));
        } else if (src.startsWith("https://") || src.startsWith("http://")) {
            nativeImage = src;
        } else if (src.startsWith('res://')) {
            nativeImage = utils.ad.resources.getDrawableId(src.replace('res://', ''));
        }
        return nativeImage;
    }
    [common.stretchProperty.getDefault](): "aspectFit" {
        return "aspectFit";
    }
    [common.stretchProperty.setNative](value: "none" | "aspectFill" | "aspectFit" | "fill") {
        switch (value) {
            case 'aspectFit':
                this.nativeView.setScaleType(android.widget.ImageView.ScaleType.FIT_CENTER);
                break;
            case 'aspectFill':
                this.nativeView.setScaleType(android.widget.ImageView.ScaleType.CENTER_CROP);
                break;
            case 'fill':
                this.nativeView.setScaleType(android.widget.ImageView.ScaleType.FIT_XY);
                break;
            case 'none':
            default:
                this.nativeView.setScaleType(android.widget.ImageView.ScaleType.MATRIX);
                break;
        }
    }

    public clearItem() {
        // this.builder.
    }
}