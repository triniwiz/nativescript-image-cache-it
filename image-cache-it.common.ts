import app = require("application");
import view = require("ui/core/view");
import {Property, PropertyMetadataSettings, PropertyChangeData} from "ui/core/dependency-observable";
import {PropertyMetadata} from "ui/core/proxy";
import {Stretch} from 'ui/enums';
import platform = require('platform');
const AffectsLayout = platform.device.os === platform.platformNames.android ? PropertyMetadataSettings.None : PropertyMetadataSettings.AffectsLayout;


export class ImageCacheIt extends view.View {
    public static imageUriProperty = new Property("imageUri", "ImageCacheIt", new PropertyMetadata(undefined, PropertyMetadataSettings.None));
    public static placeHolderProperty = new Property("placeHolder", "ImageCacheIt", new PropertyMetadata(undefined, PropertyMetadataSettings.None))
    public static errorHolderProperty = new Property("errorHolder", "ImageCacheIt", new PropertyMetadata(undefined, PropertyMetadataSettings.None))
    public static resizeProperty = new Property("resize", "ImageCacheIt", new PropertyMetadata(undefined, PropertyMetadataSettings.None))
    public static overrideProperty = new Property("override", "ImageCacheIt", new PropertyMetadata(undefined, PropertyMetadataSettings.None))
    public static centerCropProperty = new Property("centerCrop", "ImageCacheIt", new PropertyMetadata(undefined, PropertyMetadataSettings.None))
    public static stretchProperty = new Property("stretch", "ImageCacheIt", new PropertyMetadata(Stretch.aspectFit, AffectsLayout));

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

    get override(): string {
        return this._getValue(ImageCacheIt.overrideProperty);
    }
    set override(value: string) {
        this._setValue(ImageCacheIt.overrideProperty, value)
    }
    get centerCrop(): boolean {
        return this._getValue(ImageCacheIt.centerCropProperty);
    }

    set centerCrop(value: boolean) {
        this._setValue(ImageCacheIt.centerCropProperty, value)
    }

    get stretch(): string {
        return this._getValue(ImageCacheIt.stretchProperty);
    }
    set stretch(value: string) {
        this._setValue(ImageCacheIt.stretchProperty, value);
    }
}
