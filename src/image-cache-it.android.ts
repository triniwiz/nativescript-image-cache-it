import * as common from './image-cache-it.common';
import { filterProperty, ImageCacheItBase } from './image-cache-it.common';
import * as fs from 'tns-core-modules/file-system';
import * as utils from 'tns-core-modules/utils/utils';
import * as types from 'tns-core-modules/utils/types';
import {
    borderBottomColorProperty,
    borderBottomLeftRadiusProperty,
    borderBottomRightRadiusProperty,
    borderBottomWidthProperty,
    borderLeftColorProperty,
    borderLeftWidthProperty,
    borderRightColorProperty,
    borderRightWidthProperty,
    borderTopColorProperty,
    borderTopLeftRadiusProperty,
    borderTopRightRadiusProperty,
    borderTopWidthProperty
} from 'tns-core-modules/ui/core/view';
import * as app from 'tns-core-modules/application';
import { ImageSource } from 'tns-core-modules/image-source';
import { Background } from 'tns-core-modules/ui/styling/background';

global.moduleMerge(common, exports);
declare let jp, com, androidx;


export class ImageCacheIt extends ImageCacheItBase {
    private emptyBackground;

    constructor() {
        super();
        this.emptyBackground = new Background();
    }

    public createNativeView() {
       return new com.github.triniwiz.imagecacheit.ImageView(this._context, null);
    }

    // nativeView: com.github.triniwiz.imagecacheit.ImageView;

    public initNativeView() {
        this.style.backgroundInternal = this.emptyBackground;
        ImageCacheIt._setPlaceHolder(this.placeHolder, this.nativeView);
        ImageCacheIt._setErrorHolder(this.errorHolder, this.nativeView);
        ImageCacheIt._setFallback(this.fallback, this.nativeView);

        const image = ImageCacheIt.getImage(this.src);
        if (types.isString(image) && this.nativeView) {
            this.nativeView.setUriSrc(android.net.Uri.parse(image));
        } else if (types.isNumber(image) || image instanceof java.lang.Integer) {
            this.nativeView.setIdSrc(image);
        } else if (image instanceof java.io.File) {
            this.nativeView.setUriSrc(android.net.Uri.parse(image.getAbsolutePath()));
        }
    }

    public disposeNativeView(): void {
        super.disposeNativeView();
    }

    [borderTopColorProperty.setNative](color: any) {
        if (color) {
            this.nativeView.setBorderTopColor(color.android);
        }

    }

    [borderRightColorProperty.setNative](color: any) {
        if (color) {
            this.nativeView.setBorderRightColor(color.android);
        }

    }

    [borderBottomColorProperty.setNative](color: any) {
        if (color) {
            this.nativeView.setBorderBottomColor(color.android);
        }
    }

    [borderLeftColorProperty.setNative](color: any) {
        if (color) {
            this.nativeView.setBorderLeftColor(color.android);
        }

    }

    [borderTopWidthProperty.setNative](width: any) {
        let px = utils.layout.toDevicePixels(width);
        if (isNaN(px)) {
            px = 0;
        }
        this.nativeView.setBorderTopWidth(px);

    }

    [borderRightWidthProperty.setNative](width: any) {
        let px = utils.layout.toDevicePixels(width);
        if (isNaN(px)) {
            px = 0;
        }
        this.nativeView.setBorderRightWidth(px);

    }

    [borderBottomWidthProperty.setNative](width: any) {
        let px = utils.layout.toDevicePixels(width);
        if (isNaN(px)) {
            px = 0;
        }
        this.nativeView.setBorderBottomWidth(px);

    }

    [borderLeftWidthProperty.setNative](width: any) {
        let px = utils.layout.toDevicePixels(width);
        if (isNaN(px)) {
            px = 0;
        }
        this.nativeView.setBorderLeftWidth(px);

    }

    [borderTopLeftRadiusProperty.setNative](radius: any) {
        let px = utils.layout.toDevicePixels(radius);
        if (isNaN(px)) {
            px = 0;
        }
        this.nativeView.setBorderTopLeftRadius(px);

    }

    [borderTopRightRadiusProperty.setNative](radius: any) {
        let px = utils.layout.toDevicePixels(radius);
        if (isNaN(px)) {
            px = 0;
        }
        this.nativeView.setBorderTopRightRadius(px);

    }

    [borderBottomLeftRadiusProperty.setNative](radius: any) {
        let px = utils.layout.toDevicePixels(radius);
        if (isNaN(px)) {
            px = 0;
        }
        this.nativeView.setBorderBottomLeftRadius(px);

    }

    [borderBottomRightRadiusProperty.setNative](radius: any) {
        let px = utils.layout.toDevicePixels(radius);
        if (isNaN(px)) {
            px = 0;
        }
        this.nativeView.setBorderBottomRightRadius(px);

    }

    [filterProperty.setNative](filter: any) {
        if (this.nativeView) {
            this.nativeView.setFilter(filter);
        }
    }

    private static isNumber(value: any) {
        return typeof value === 'number';
    }

    private static getResourceId(res: string = '') {
        if (types.isString(res) && res.startsWith('res://')) {
            return java.lang.Integer.valueOf(utils.ad.resources.getDrawableId(res.replace('res://', '')));
        }
        return java.lang.Integer.valueOf(0);
    }

    private static _setFallback(fallback: any, nativeView?: any){
        const holder = ImageCacheIt.getImage(fallback);
        if (nativeView) {
            if (types.isString(fallback) && fallback.startsWith('res://')) {
                nativeView.setErrorHolder(fallback);
            } else {
                nativeView.setErrorHolder(holder);
            }
        }
    }
    [common.fallbackProperty.setNative](fallback: any) {
        ImageCacheIt._setFallback(fallback, this.nativeView);
    }

    private static _setPlaceHolder(placeHolder: any, nativeView?: any){
        const holder = ImageCacheIt.getImage(placeHolder);
        if (nativeView) {
            if (types.isString(placeHolder) && placeHolder.startsWith('res://')) {
                nativeView.setPlaceHolder(placeHolder);
            } else {
                nativeView.setPlaceHolder(holder);
            }
        }
    }

    [common.placeHolderProperty.setNative](placeHolder: any) {
        ImageCacheIt._setPlaceHolder(placeHolder, this.nativeView);
    }

    private static _setErrorHolder(errorHolder: any,nativeView?: any){
        const holder = ImageCacheIt.getImage(errorHolder);
        if (nativeView) {
            if (types.isString(errorHolder) && errorHolder.startsWith('res://')) {
                nativeView.setErrorHolder(errorHolder);
            } else {
                nativeView.setErrorHolder(holder);
            }
        }
    }
    [common.errorHolderProperty.setNative](errorHolder: any) {
        ImageCacheIt._setErrorHolder(errorHolder, this.nativeView);
    }


    [common.srcProperty.getDefault](): any {
        return undefined;
    }

    private static _setSrc(src: any, nativeView?: any){
        const image = ImageCacheIt.getImage(src);
        if (nativeView) {
            if (types.isString(image)) {
                nativeView.setUriSrc(android.net.Uri.parse(image));
            } else if (types.isNumber(image) || image instanceof java.lang.Integer) {
                nativeView.setIdSrc(image);
            } else if (image instanceof java.io.File) {
                nativeView.setFileSrc(image);
            } else {
                nativeView.setBitmapSrc(image);
            }
        }
    }
    [common.srcProperty.setNative](src: any) {
        ImageCacheIt._setSrc(src, this.nativeView);
    }

    [common.decodedWidthProperty.setNative](width: number) {

    }

    [common.decodedHeightProperty.setNative](height: number) {

    }

    public static getImage(src: any): any {
        let nativeImage: any = null;
        if (types.isNullOrUndefined(src)) {
            return null;
        }

        if (types.isString(src)) {
            if (src.substr(0, 1) === '/') {
                nativeImage = new java.io.File(src);
            } else if (src.startsWith('~/')) {
                nativeImage = new java.io.File(
                    fs.path.join(fs.knownFolders.currentApp().path, src.replace('~/', ''))
                );
            } else if (src.startsWith('http')) {
                nativeImage = src;
            } else if (src.startsWith('res://')) {
                nativeImage = this.getResourceId(src);
            }
        } else if (src instanceof ImageSource) {
            nativeImage = src.android;
        } else {
            nativeImage = src;
        }
        return nativeImage;
    }

    [common.filterProperty.setNative](filter: string) {
        if (this.nativeView) {
            this.nativeView.setFilter(filter);
        }
    }

    [common.stretchProperty.getDefault](): 'aspectFit' {
        return 'aspectFit';
    }

    [common.stretchProperty.setNative](
        value: 'none' | 'aspectFill' | 'aspectFit' | 'fill'
    ) {
        if (this.nativeView) {
            switch (this.stretch) {
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
    }

    public static getItem(src: string): Promise<any> {
        com.github.triniwiz.imagecacheit.ImageCache.init(app.android.context);
        return new Promise<any>((resolve, reject) => {
            com.github.triniwiz.imagecacheit.ImageCache.getItem(src, null, new com.github.triniwiz.imagecacheit.ImageCache.Callback({
                onSuccess(value) {
                    resolve(value);
                },
                onError(error) {
                    reject(error.getMessage());
                }
            }));
        });
    }

    public static deleteItem(src: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            // TODO
            resolve();
        });
    }

    public static hasItem(src: string): Promise<any> {
        com.github.triniwiz.imagecacheit.ImageCache.init(app.android.context);
        return new Promise<any>((resolve, reject) => {
            com.github.triniwiz.imagecacheit.ImageCache.hasItem(src, new com.github.triniwiz.imagecacheit.ImageCache.Callback({
                onSuccess(value) {
                    resolve();
                },
                onError(error) {
                    reject(error.getMessage());
                }
            }));
        });
    }

    public static clear() {
        com.github.triniwiz.imagecacheit.ImageCache.init(app.android.context);
        return new Promise<any>((resolve, reject) => {
            com.github.triniwiz.imagecacheit.ImageCache.clear();
            resolve();
        });
    }

    public static enableAutoMM() {
        (com as any).github.triniwiz.imagecacheit.ImageView.enableAutoMM(app.android.nativeApp)
    }

    public static disableAutoMM() {
        (com as any).github.triniwiz.imagecacheit.ImageView.disableAutoMM(app.android.nativeApp)
    }
}



