import app = require("application");
import view = require("ui/core/view");
import {Property, PropertyMetadataSettings} from "ui/core/dependency-observable";
import {PropertyMetadata} from "ui/core/proxy";

export class ImageCacheIt extends view.View {
    private static imageUriProperty = new Property("imageUri", "ImageCacheIt", new PropertyMetadata(undefined, PropertyMetadataSettings.None));
    private static placeHolderProperty = new Property("placeHolder", "ImageCacheIt", new PropertyMetadata(undefined, PropertyMetadataSettings.None))
    private static errorHolderProperty = new Property("errorHolder", "ImageCacheIt", new PropertyMetadata(undefined, PropertyMetadataSettings.None))
    private static resizeProperty = new Property("resize", "ImageCacheIt", new PropertyMetadata(undefined, PropertyMetadataSettings.None))
    private static centerCropProperty = new Property("centerCrop", "ImageCacheIt", new PropertyMetadata(undefined, PropertyMetadataSettings.None))
 
    constructor() {
        super();
    }
    get imageUri(): string {
        return this._getValue(ImageCacheIt.imageUriProperty);
    }

    set imageUri(value: string) {
        this._setValue(ImageCacheIt.imageUriProperty, value)
    }

    get placeHolder(): string {
        return this._getValue(ImageCacheIt.placeHolderProperty);
    }

    set placeHolder(value: string) {
        this._setValue(ImageCacheIt.placeHolderProperty, value)
    }
    get errorHolder(): string {
        return this._getValue(ImageCacheIt.errorHolderProperty);
    }

    set errorHolder(value: string) {
        this._setValue(ImageCacheIt.errorHolderProperty, value)
    }

    get resize(): string {
        return this._getValue(ImageCacheIt.resizeProperty);
    }
    set resize(value: string) {
        this._setValue(ImageCacheIt.resizeProperty, value)
    }

    get centerCrop(): boolean {
        return this._getValue(ImageCacheIt.centerCropProperty);
    }

    set centerCrop(value: boolean) {
        this._setValue(ImageCacheIt.centerCropProperty, value)
    }
}
