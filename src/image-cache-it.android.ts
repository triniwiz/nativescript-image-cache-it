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
    borderTopWidthProperty,
    Color,
    layout,
    Length,
} from 'tns-core-modules/ui/core/view';
import { topmost } from 'tns-core-modules/ui/frame';
import * as app from 'tns-core-modules/application';
import * as imageSource from 'tns-core-modules/image-source';

global.moduleMerge(common, exports);
declare const jp, com;

export class ImageCacheIt extends ImageCacheItBase {
    private _builder;
    private _manager;
    private _errorManager;

    constructor() {
        super();
    }

    public hasBorderWidth(): boolean {
        return this.borderTopWidth !== 0
            || this.borderRightWidth !== 0
            || this.borderBottomWidth !== 0
            || this.borderLeftWidth !== 0;
    }

    public hasBorderColor(): boolean {
        return !!this.borderTopColor || !!this.borderRightColor || !!this.borderBottomColor || !!this.borderLeftColor;
    }

    public hasUniformBorderColor(): boolean {
        return Color.equals(this.borderTopColor, this.borderRightColor) &&
            Color.equals(this.borderTopColor, this.borderBottomColor) &&
            Color.equals(this.borderTopColor, this.borderLeftColor);
    }

    public hasUniformBorderWidth(): boolean {
        return this.borderTopWidth === this.borderRightWidth &&
            this.borderTopWidth === this.borderBottomWidth &&
            this.borderTopWidth === this.borderLeftWidth;
    }

    public hasBorderRadius(): boolean {
        return this.borderTopLeftRadius > 0
            || this.borderTopRightRadius > 0
            || this.borderBottomRightRadius > 0
            || this.borderBottomLeftRadius > 0;
    }

    public hasUniformBorderRadius(): boolean {
        return this.borderTopLeftRadius === this.borderTopRightRadius &&
            this.borderTopLeftRadius === this.borderBottomRightRadius &&
            this.borderTopLeftRadius === this.borderBottomLeftRadius;
    }

    public hasUniformBorder(): boolean {
        return this.hasUniformBorderColor() &&
            this.hasUniformBorderWidth() &&
            this.hasUniformBorderRadius();
    }

    private getContext() {
        let context;
        if (topmost()) {
            if (topmost().android && topmost().android.activity) {
                context = topmost().android.activity;
            } else if (topmost().currentPage && topmost().currentPage.frame && topmost().currentPage.frame.android && topmost().currentPage.frame.android.activity) {
                context = topmost().currentPage.frame.android.activity;
            }
        }
        if (!context) {
            context = app.android.foregroundActivity || app.android.startActivity;
        }
        if (!context) {
            context = this._context;
        }
        return context;
    }

    private getGlide(): any {
        if (!this._manager) {
            const ref = new WeakRef(this);
            this._manager = com.bumptech.glide.Glide.with(this.getContext()).addDefaultRequestListener(new com.bumptech.glide.request.RequestListener<any>({
                onLoadFailed(param0: com.bumptech.glide.load.engine.GlideException, param1: any, param2: com.bumptech.glide.request.target.Target<any>, param3: boolean): boolean {
                    const owner = (ref as WeakRef<ImageCacheIt>).get();
                    if (owner) {
                        owner.notify({
                            eventName: 'image:failed',
                            object: owner,
                            error: param0.getMessage()
                        });
                    }
                    return false;
                },
                onResourceReady(param0: any, param1: any, param2: com.bumptech.glide.request.target.Target<any>, param3: com.bumptech.glide.load.DataSource, param4: boolean): boolean {
                    const owner = (ref as WeakRef<ImageCacheIt>).get();
                    if (owner) {
                        owner.notify({
                            eventName: 'image:loaded',
                            object: owner
                        });
                    }
                    return false;
                }
            }));
        }
        return this._manager;
    }

    private getErrorGlide(): any {
        if (!this._errorManager) {
            this._errorManager = com.bumptech.glide.Glide.with(this.getContext());
        }
        return this._errorManager;
    }

    public createNativeView() {
        return new android.widget.ImageView(this._context);
    }

    public initNativeView() {
        if (this.src) {
            const image = ImageCacheIt.getImage(this.src);
            this._builder = this.getGlide().load(image);
        }
        this.resetImage();
        this.setPlaceHolder();
        this.setErrorHolder();
        if (this._builder) {
            this._builder.into(this.nativeView);
        }
    }

    public disposeNativeView(): void {
        this._builder.clear(this.nativeView);
        super.disposeNativeView();
    }

    [borderTopColorProperty.setNative](color: any) {
        this.setBorderAndRadius();
        this.style.backgroundInternal = null;
    }

    [borderRightColorProperty.setNative](color: any) {
        this.setBorderAndRadius();
        this.style.backgroundInternal = null;
    }

    [borderBottomColorProperty.setNative](color: any) {
        this.setBorderAndRadius();
        this.style.backgroundInternal = null;
    }

    [borderLeftColorProperty.setNative](color: any) {
        this.setBorderAndRadius();
        this.style.backgroundInternal = null;
    }

    [borderTopWidthProperty.setNative](width: any) {
        this.setBorderAndRadius();
        this.style.backgroundInternal = null;
    }

    [borderRightWidthProperty.setNative](width: any) {
        this.setBorderAndRadius();
        this.style.backgroundInternal = null;
    }

    [borderBottomWidthProperty.setNative](width: any) {
        this.setBorderAndRadius();
        this.style.backgroundInternal = null;
    }

    [borderLeftWidthProperty.setNative](width: any) {
        this.setBorderAndRadius();
        this.style.backgroundInternal = null;
    }

    [borderTopLeftRadiusProperty.setNative](radius: any) {
        this.setBorderAndRadius();
        this.style.backgroundInternal = null;
    }

    [borderTopRightRadiusProperty.setNative](radius: any) {
        this.setBorderAndRadius();
        this.style.backgroundInternal = null;
    }

    [borderBottomLeftRadiusProperty.setNative](radius: any) {
        this.setBorderAndRadius();
        this.style.backgroundInternal = null;
    }

    [borderBottomRightRadiusProperty.setNative](radius: any) {
        this.setBorderAndRadius();
        this.style.backgroundInternal = null;
    }

    [filterProperty.setNative](filter: any) {
        this.filter = filter;
        this.resetImage(true);
    }

    private static isNumber(value: any) {
        return typeof value === 'number';
    }

    private static getResourceId(res: string = '') {
        if (types.isString(res) && res.startsWith('res://')) {
            return utils.ad.resources.getDrawableId(res.replace('res://', ''));
        }
        return 0;
    }

    private setPlaceHolder(): void {
        if (this.placeHolder) {
            let placeHolder;
            if (types.isString(this.placeHolder)) {
                if (this.placeHolder.startsWith('res://')) {
                    placeHolder = ImageCacheIt.getResourceId(this.placeHolder);
                } else {
                    let path = this.placeHolder;
                    if (this.placeHolder.startsWith('~/')) {
                        path = fs.path.join(fs.knownFolders.currentApp().path, this.placeHolder.replace('~/', ''));
                    }
                    placeHolder = android.graphics.drawable.Drawable.createFromPath(path);
                }
            } else if (this.placeHolder instanceof imageSource.ImageSource) {
                placeHolder = new android.graphics.drawable.BitmapDrawable(this.getContext().getResources(), this.placeHolder.android);
            } else if (this.placeHolder instanceof android.graphics.Bitmap) {
                placeHolder = new android.graphics.drawable.BitmapDrawable(this.getContext().getResources(), this.placeHolder);
            } else if (this.placeHolder instanceof android.graphics.drawable.Drawable) {
                placeHolder = this.placeHolder;
            }
            if (placeHolder) {
                if (this._builder) {
                    this._builder.placeholder(placeHolder);
                }
            }
        }
    }

    private setErrorHolder(): void {
        if (this.errorHolder) {
            let errorHolder;
            if (types.isString(this.errorHolder)) {
                if (this.errorHolder.startsWith('res://')) {
                    errorHolder = ImageCacheIt.getResourceId(this.errorHolder);
                    /* if (id) {
                         errorHolder = this.getContext().getResources().getDrawable(id);
                     }*/
                } else {
                    let path = this.errorHolder;
                    if (this.errorHolder.startsWith('~/')) {
                        path = fs.path.join(fs.knownFolders.currentApp().path, this.errorHolder.replace('~/', ''));
                    }
                    errorHolder = path; // android.graphics.drawable.Drawable.createFromPath(path);
                }
            } else if (this.errorHolder instanceof imageSource.ImageSource) {
                errorHolder = this.errorHolder.android; // new android.graphics.drawable.BitmapDrawable(this.getContext().getResources(), this.errorHolder.android);
            } else if (this.errorHolder instanceof android.graphics.Bitmap) {
                errorHolder = this.errorHolder; // new android.graphics.drawable.BitmapDrawable(this.getContext().getResources(), this.errorHolder);
            } else if (this.errorHolder instanceof android.graphics.drawable.Drawable) {
                errorHolder = this.errorHolder;
            }
            if (this._builder) {
                if (types.isNumber(errorHolder) && errorHolder > 0) {
                    this._builder.error(errorHolder);
                } else if(!types.isNumber(errorHolder)) {
                    this._builder.error(this.getErrorGlide().load(errorHolder));
                }
            }
        }
    }

    [common.srcProperty.getDefault](): any {
        return undefined;
    }

    [common.srcProperty.setNative](src: any) {
        const image = ImageCacheIt.getImage(src);
        if (!this._builder) {
            this._builder = this.getGlide().load(image);
        } else {
            this._builder.load(image);
        }
        this.resetImage();
        this.setPlaceHolder();
        this.setErrorHolder();
        this._builder.into(this.nativeView);
        return src;
    }

    [common.decodedWidthProperty.setNative](width: number) {
        this.resetImage(true);
    }

    [common.decodedHeightProperty.setNative](height: number) {
        this.resetImage(true);
    }

    public static getImage(src: string): string {
        let nativeImage;
        if (types.isNullOrUndefined(src)) {
            return src;
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
                nativeImage = java.lang.Integer.valueOf(utils.ad.resources.getDrawableId(src.replace('res://', '')));
            }
        }

        return nativeImage;
    }


    [common.stretchProperty.getDefault](): 'aspectFit' {
        return 'aspectFit';
    }

    [common.stretchProperty.setNative](
        value: 'none' | 'aspectFill' | 'aspectFit' | 'fill'
    ) {
        if (!this._builder) return value;
        this.resetImage(true);
        return value;
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

    private setBorderAndRadius() {
        if (!this._builder) return null;
        const ColoredRoundedCornerBorders = com.github.triniwiz.imagecacheit.ColoredRoundedCornerBorders;
        const list = new java.util.ArrayList();

        if (this.hasUniformBorder() && this.hasBorderColor()) {
            list.add(
                new ColoredRoundedCornerBorders(
                    layout.toDevicePixels(<any>this.style.borderTopLeftRadius),
                    0,
                    ColoredRoundedCornerBorders.CornerType.ALL,
                    this.style.borderTopColor ? this.style.borderTopColor.android : android.graphics.Color.BLACK,
                    layout.toDevicePixels(<any>this.style.borderTopWidth),
                    -1,
                    -1
                )
            );
        } else if (this.hasBorderColor()) {
            list.add(
                new ColoredRoundedCornerBorders(
                    layout.toDevicePixels(<any>this.style.borderTopRightRadius),
                    0,
                    ColoredRoundedCornerBorders.CornerType.BORDER_TOP,
                    this.style.borderTopColor ? this.style.borderTopColor.android : android.graphics.Color.BLACK,
                    layout.toDevicePixels(<any>this.style.borderTopWidth),
                    -1,
                    -1
                )
            );
            list.add(
                new ColoredRoundedCornerBorders(
                    layout.toDevicePixels(<any>this.style.borderBottomRightRadius),
                    0,
                    ColoredRoundedCornerBorders.CornerType.BORDER_RIGHT,
                    this.style.borderRightColor ? this.style.borderRightColor.android : android.graphics.Color.BLACK,
                    layout.toDevicePixels(<any>this.style.borderRightWidth),
                    -1,
                    -1
                )
            );
            list.add(
                new ColoredRoundedCornerBorders(
                    layout.toDevicePixels(<any>this.style.borderBottomLeftRadius),
                    0,
                    ColoredRoundedCornerBorders.CornerType.BORDER_BOTTOM,
                    this.style.borderBottomColor ? this.style.borderBottomColor.android : android.graphics.Color.BLACK,
                    layout.toDevicePixels(<any>this.style.borderBottomWidth),
                    -1,
                    -1
                )
            );
            list.add(
                new ColoredRoundedCornerBorders(
                    layout.toDevicePixels(<any>this.style.borderTopLeftRadius),
                    0,
                    ColoredRoundedCornerBorders.CornerType.BORDER_LEFT,
                    this.style.borderTopColor ? this.style.borderTopColor.android : android.graphics.Color.BLACK,
                    layout.toDevicePixels(<any>this.style.borderTopWidth),
                    -1,
                    -1
                )
            );
        } else {
            list.add(new ColoredRoundedCornerBorders(layout.toDevicePixels(<any>this.style.borderTopRightRadius), 0, ColoredRoundedCornerBorders.CornerType.TOP_RIGHT, 0, 0, -1, -1));
            list.add(new ColoredRoundedCornerBorders(layout.toDevicePixels(<any>this.style.borderBottomRightRadius), 0, ColoredRoundedCornerBorders.CornerType.BOTTOM_RIGHT, 0, 0, -1, -1));
            list.add(new ColoredRoundedCornerBorders(layout.toDevicePixels(<any>this.style.borderBottomLeftRadius), 0, ColoredRoundedCornerBorders.CornerType.BOTTOM_LEFT, 0, 0, -1, -1));
            list.add(new ColoredRoundedCornerBorders(layout.toDevicePixels(<any>this.style.borderTopLeftRadius), 0, ColoredRoundedCornerBorders.CornerType.TOP_LEFT, 0, 0, -1, -1));
        }
        return list;
    }

    private setAspectResize() {
        const Target = com.bumptech.glide.request.target.Target;
        if (ImageCacheIt.isNumber(this.decodedWidth) && Number.isNaN(this.decodedHeight)) {
            this._builder.override(
                layout.toDevicePixels(this.decodedWidth)
                , Target.SIZE_ORIGINAL);
        }

        if (ImageCacheIt.isNumber(this.decodedHeight) && Number.isNaN(this.decodedWidth)) {
            this._builder.override(
                Target.SIZE_ORIGINAL
                , layout.toDevicePixels(this.decodedHeight)
            );
        }

        if (ImageCacheIt.isNumber(this.decodedHeight) && ImageCacheIt.isNumber(this.decodedWidth)) {
            this._builder.override(
                layout.toDevicePixels(this.decodedWidth)
                , layout.toDevicePixels(this.decodedHeight)
            );
        }
    }

    resetImage(reload = false) {
        if (!this._builder) return;
        const transformations = new java.util.ArrayList<any>();
        const MultiTransformation = com.bumptech.glide.load.MultiTransformation;
        switch (this.stretch) {
            case 'aspectFit':
                // this.nativeView.setScaleType(android.widget.ImageView.ScaleType.FIT_CENTER);
                transformations.add(
                    new com.bumptech.glide.load.resource.bitmap.FitCenter()
                );
                break;
            case 'aspectFill':
                transformations.add(
                    new com.bumptech.glide.load.resource.bitmap.CenterCrop()
                );
                // this.nativeView.setScaleType(android.widget.ImageView.ScaleType.CENTER_CROP);
                break;
            case 'fill':
                this.nativeView.setScaleType(android.widget.ImageView.ScaleType.FIT_XY);
                break;
            case 'none':
            default:
                this.nativeView.setScaleType(android.widget.ImageView.ScaleType.MATRIX);
                break;
        }

        const getValue = (value: string) => {
            return value.substring(value.indexOf('(') + 1, value.indexOf(')'));
        };

        if (this.filter) {
            const filters = this.filter ? this.filter.split(' ') : [];
            filters.forEach((filter: any) => {
                let value = getValue(filter) as any;
                if (filter.indexOf('blur') > -1) {
                    let width = -1;
                    if (value.indexOf('%') === -1) {
                        value = Length.parse(value);
                        if (value.unit === 'px') {
                            width = value.value;
                        } else if (value.unit === 'dip') {
                            width = layout.toDevicePixels(value.unit);
                        }
                        if (width > -1) {
                            transformations.add(new jp.wasabeef.glide.transformations.BlurTransformation(
                                width
                            ));
                        }
                    }
                } else if (filter.indexOf('contrast') > -1) {
                    if (value.indexOf('%')) {
                        const contrast = parseFloat(value.replace('%', '')) / 100;
                        transformations.add(
                            new jp.wasabeef.glide.transformations.gpu.ContrastFilterTransformation(
                                new java.lang.Float(contrast).intValue()
                            )
                        );
                    }

                } else if (filter.indexOf('brightness') > -1) {
                    if (value.indexOf('%')) {
                        let brightness = parseFloat(value.replace('%', '')) / 100;
                        if (brightness >= 0 && brightness < 1) {
                            brightness = -1 + brightness;
                        }
                        transformations.add(
                            new jp.wasabeef.glide.transformations.gpu.BrightnessFilterTransformation(
                                new java.lang.Float(brightness).intValue()
                            )
                        );
                    }
                } else if (filter.indexOf('grayscale') > -1 || filter.indexOf('greyscale') > -1) {
                    // TODO handle value
                    transformations.add(
                        new jp.wasabeef.glide.transformations.GrayscaleTransformation()
                    );
                } else if (filter.indexOf('invert') > -1) {
                    // TODO handle value
                    transformations.add(
                        new jp.wasabeef.glide.transformations.gpu.InvertFilterTransformation()
                    );
                } else if (filter.indexOf('sepia') > -1) {
                    const sepia = parseFloat(value.replace('%', '')) / 100;
                    transformations.add(
                        new jp.wasabeef.glide.transformations.gpu.SepiaFilterTransformation(
                            new java.lang.Float(sepia).intValue()
                        )
                    );
                }
            });
        }
        if (reload) {
            const image = ImageCacheIt.getImage(this.src);
            this._builder.load(image);
            this.setPlaceHolder();
            this.setErrorHolder();
        }

        const borderTransformations = this.setBorderAndRadius();
        if (borderTransformations.size() > 0) {
            const borderArray = borderTransformations.toArray();
            const borderArrayLength = borderArray.length;
            for (let i = 0; i < borderArrayLength; i++) {
                transformations.add(borderArray[i]);
            }
        }

        if (transformations.size() > 0) {
            const array = transformations.toArray();
            const count = array.length;
            const transformationArray = Array.create('com.bumptech.glide.load.Transformation', count);
            for (let i = 0; i < count; i++) {
                transformationArray[i] = array[i];
            }
            this._builder.apply(
                com.bumptech.glide.request.RequestOptions.bitmapTransform(
                    new MultiTransformation(
                        transformationArray
                    )
                )
            );
        }

        switch (this.transition) {
            case 'fade':
                const builder = new com.bumptech.glide.request.transition.DrawableCrossFadeFactory.Builder()
                    .setCrossFadeEnabled(true)
                    .build();
                this._builder.transition(
                    com.bumptech.glide.load.resource.drawable.DrawableTransitionOptions.withCrossFade(
                        builder
                    )
                );
                break;
            default:
                break;
        }

        this.setAspectResize();
    }
}



