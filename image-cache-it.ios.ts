import * as common from './image-cache-it.common';
import app = require("application");
import fs = require("file-system");
import utils = require("utils/utils");
import types = require("utils/types");
import imageSrc = require("image-source");
import { View, layout } from 'tns-core-modules/ui/core/view';
global.moduleMerge(common, exports);

export class ImageCacheIt extends common.ImageCacheIt {
    nativeView: UIImageView;

    constructor() {
        super();
    }

    get ios(): UIImageView {
        return this.nativeView;
    }
    isLoading: boolean;
    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number) {
        const nativeView = this.nativeView;
        if (nativeView) {
            const width = layout.getMeasureSpecSize(widthMeasureSpec);
            const height = layout.getMeasureSpecSize(heightMeasureSpec);
            this.setMeasuredDimension(width, height);
        }
    }

    public createNativeView() {
        return UIImageView.new();
    }
    public initNativeView() {
        if (this.imageUri.startsWith("http")) {
            this.isLoading = true;
            (<any>this.nativeView).sd_setImageWithURLPlaceholderImageCompleted(this.imageUri, this.placeHolder ? imageSrc.fromFileOrResource(this.placeHolder).ios : null, () => {
                this.isLoading = false;
            });
        } else {
            this.nativeView.image = imageSrc.fromFileOrResource(this.imageUri).ios
        }

        if (this.resize && this.resize !== undefined && this.resize.split(' ').length > 1) {
            this.nativeView.frame.size.width = parseInt(this.resize.split(' ')[0]);
            this.nativeView.frame.size.height = parseInt(this.resize.split(' ')[1]);
        } else if (this.override && this.override !== undefined && this.override.split(' ').length > 1) {
            this.nativeView.frame.size.width = parseInt(this.override.split(' ')[0]);
            this.nativeView.frame.size.height = parseInt(this.override.split(' ')[1]);
        }
    }
    [common.imageUriProperty.getDefault](): any {
        return undefined;
    }
    [common.imageUriProperty.setNative](src: string) {
        if (this.imageUri.startsWith("http")) {
            this.isLoading = true;
            (<any>this.nativeView).sd_setImageWithURLPlaceholderImageCompleted(this.imageUri, this.placeHolder ? imageSrc.fromFileOrResource(this.placeHolder).ios : null, () => {
                this.isLoading = false;
            });
        } else {
            this.nativeView.image = imageSrc.fromFileOrResource(this.imageUri).ios
        }
    }
    [common.resizeProperty.setNative](resize: string) {
        if (this.resize && this.resize !== undefined && this.resize.split(' ').length > 1) {
            this.nativeView.frame.size.width = parseInt(this.resize.split(' ')[0]);
            this.nativeView.frame.size.height = parseInt(this.resize.split(' ')[1]);
        }
    }
    [common.overrideProperty.setNative](override: string) {
        if (this.override && this.override !== undefined && this.override.split(' ').length > 1) {
            this.nativeView.frame.size.width = parseInt(this.override.split(' ')[0]);
            this.nativeView.frame.size.height = parseInt(this.override.split(' ')[1]);
        }
    }

    [common.stretchProperty.getDefault](): "aspectFit" {
        return "aspectFit";
    }
    [common.stretchProperty.setNative](value: "none" | "aspectFill" | "aspectFit" | "fill") {
        switch (value) {
            case "aspectFit":
                this.nativeView.contentMode = UIViewContentMode.ScaleAspectFit;
                break;
            case "aspectFill":
                this.nativeView.contentMode = UIViewContentMode.ScaleAspectFill;
                break;
            case "fill":
                this.nativeView.contentMode = UIViewContentMode.ScaleToFill;
                break;
            case "none":
            default:
                this.nativeView.contentMode = UIViewContentMode.TopLeft;
                break;
        }

    }

    public clearItem() {
        // this.builder.
    }
}