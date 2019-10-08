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
    PercentLength
} from 'tns-core-modules/ui/core/view';
import { topmost } from 'tns-core-modules/ui/frame';
import * as app from 'tns-core-modules/application';
import * as imageSource from 'tns-core-modules/image-source';

global.moduleMerge(common, exports);
declare let jp, com, androidx;

function useAndroidX() {
    return (global as any).androidx && (global as any).androidx.core && (global as any).androidx.core.graphics;
}

const DrawableResourcesNamespace = useAndroidX() ? androidx.core.graphics.drawable : android.support.v4.graphics.drawable;

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
            context = this._context;
        }
        if (!context) {
            context = app.android.foregroundActivity || app.android.startActivity;
        }
        return context;
    }

    private getGlide(): any {
        if (!this._manager) {
            const ref = new WeakRef(this);
            this._manager = com.bumptech.glide.Glide.with(this.getContext());
            this._manager.addDefaultRequestListener(new com.bumptech.glide.request.RequestListener({
                onLoadFailed(param0: any /*com.bumptech.glide.load.engine.GlideException*/, param1: any, param2: any /*com.bumptech.glide.request.target.Target<any> */, param3: boolean): boolean {
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
                onResourceReady(param0: any, param1: any, param2: any /*com.bumptech.glide.request.target.Target<any>*/, param3: any /* com.bumptech.glide.load.DataSource*/, param4: boolean): boolean {
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
            if (this._manager) {
                this._manager.clear(this.nativeView);
            }
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
        if (this._manager) {
            this._manager.clear(this.nativeView);
        }
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

    private _placeHolder: any;
    private _errorHolder: any;

    private calculateInSampleSize(options, reqWidth, reqHeight) {
        // Raw height and width of image
        const height = options.outHeight;
        const width = options.outWidth;
        let inSampleSize = 1;

        if (height > reqHeight || width > reqWidth) {

            const halfHeight = height / 2;
            const halfWidth = width / 2;

            // Calculate the largest inSampleSize value that is a power of 2 and keeps both
            // height and width larger than the requested height and width.
            while ((halfHeight / inSampleSize) >= reqHeight
            && (halfWidth / inSampleSize) >= reqWidth) {
                inSampleSize *= 2;
            }
        }

        return inSampleSize;
    };

    private _resources: any;

    private getResources() {
        if (!this._resources) {
            // does this help prevent allocations ?
            this._resources = this.getContext().getResources();
        }
        return this._resources;
    }

    private getDrawableWithBorder(source: any) {
        if (!source) {
            return null;
        } else {
            let image;
            let srcWidth = 0;
            let srcHeight = 0;
            let width = 0;
            let height = 0;
            let opts = new android.graphics.BitmapFactory.Options();

            if (types.isString(source)) {
                if (source.startsWith('res://')) {
                    const id = ImageCacheIt.getResourceId(source);
                    if (id) {
                        opts.inJustDecodeBounds = true;
                        android.graphics.BitmapFactory.decodeResource(this.getResources(), id, opts);
                        srcWidth = opts.outWidth;
                        srcHeight = opts.outHeight;
                        width = PercentLength.toDevicePixels(this.width, srcWidth);
                        height = PercentLength.toDevicePixels(this.height, srcHeight);
                        opts.inJustDecodeBounds = false;
                        opts.inScaled = true;
                        opts.inDensity = srcWidth;
                        opts.inTargetDensity = width;
                        opts.inSampleSize = this.calculateInSampleSize(opts, width, height);
                        opts.inTargetDensity = width * opts.inSampleSize;
                        // worth it ?
                        // opts.inScreenDensity = platforms.screen.mainScreen.scale;
                        image = android.graphics.BitmapFactory.decodeResource(this.getResources(), id, opts);
                    }
                } else {
                    let path = source;
                    if (source.startsWith('~/')) {
                        path = fs.path.join(fs.knownFolders.currentApp().path, source.replace('~/', ''));
                    } else if (source.startsWith('file://')) {
                        path = source.replace('file://', '');
                    }
                    opts.inJustDecodeBounds = true;
                    android.graphics.BitmapFactory.decodeFile(path, opts);
                    srcWidth = opts.outWidth;
                    srcHeight = opts.outHeight;
                    width = PercentLength.toDevicePixels(this.width, srcWidth);
                    height = PercentLength.toDevicePixels(this.height, srcHeight);
                    opts.inJustDecodeBounds = false;
                    opts.inScaled = true;
                    opts.inDensity = srcWidth;
                    opts.inSampleSize = this.calculateInSampleSize(opts, width, height);
                    opts.inTargetDensity = width * opts.inSampleSize;
                    image = android.graphics.BitmapFactory.decodeFile(path, opts);
                }
            } else if (source instanceof imageSource.ImageSource) {
                image = source.android;
            } else if (source instanceof android.graphics.Bitmap) {
                image = source;
            } else if (source instanceof android.graphics.drawable.Drawable) {
                image = this.placeHolder.getBitmap();
            }
            if (image) {
                let left_right = layout.toDevicePixels(<any>this.style.borderLeftWidth) + layout.toDevicePixels(<any>this.style.borderRightWidth);
                left_right = left_right * 2 ? left_right : 0;
                let top_bottom = layout.toDevicePixels(<any>this.style.borderTopWidth) + layout.toDevicePixels(<any>this.style.borderBottomWidth);
                top_bottom = top_bottom ? top_bottom * 2 : 0;

                const pool = com.bumptech.glide.Glide.get(this.getContext()).getBitmapPool();
                let bitmap = pool.get(width, height, opts.inPreferredConfig || android.graphics.Bitmap.Config.ARGB_8888);
                const canvas = new android.graphics.Canvas(bitmap);
                const RectF = android.graphics.RectF;

                const paint = new android.graphics.Paint();
                paint.setAntiAlias(true);
                if (image.getWidth() !== width || image.getHeight() !== height) {
                    const new_holder = android.graphics.Bitmap.createScaledBitmap(image, width, height, true);
                    image = null;
                    image = new_holder;
                }
                let shader = new android.graphics.BitmapShader(image, android.graphics.Shader.TileMode.CLAMP, android.graphics.Shader.TileMode.CLAMP);
                paint.setShader(shader);

                if (this.hasUniformBorder() && this.hasBorderColor()) {
                    let borderWidth = layout.toDevicePixels(<any>this.style.borderBottomWidth);
                    borderWidth = borderWidth ? borderWidth : 0;
                    const radius = layout.toDevicePixels(<any>this.style.borderBottomLeftRadius);
                    const path = new android.graphics.Path();
                    path.addRoundRect(
                        new RectF(
                            borderWidth,
                            borderWidth,
                            width - borderWidth,
                            height - borderWidth
                        ),
                        radius ? radius : 0,
                        radius ? radius : 0,
                        android.graphics.Path.Direction.CW
                    );
                    const borderPaint = new android.graphics.Paint();
                    borderPaint.setAntiAlias(true);
                    borderPaint.setStyle(android.graphics.Paint.Style.STROKE);
                    borderPaint.setColor(this.style.borderRightColor && this.style.borderRightColor.android ? this.style.borderRightColor.android : android.graphics.Color.TRANSPARENT);
                    borderPaint.setStrokeWidth(borderWidth);

                    canvas.drawRoundRect(new RectF(
                        borderWidth,
                        borderWidth,
                        width - borderWidth,
                        height - borderWidth
                    ), radius, radius, paint);

                    if (borderWidth) {
                        canvas.drawPath(path, borderPaint);
                    }
                } else if (this.hasBorderColor()) {
                    let right = width;
                    let bottom = height;
                    let margin = 0;
                    /* Top */
                    let path = new android.graphics.Path();
                    let borderPaint = new android.graphics.Paint();
                    borderPaint.setStyle(android.graphics.Paint.Style.STROKE);
                    borderPaint.setColor(this.style.borderTopColor && this.style.borderTopColor.android ? this.style.borderTopColor.android : android.graphics.Color.TRANSPARENT);
                    let borderTopWidth = layout.toDevicePixels(<any>this.style.borderTopWidth);
                    borderTopWidth = borderTopWidth ? borderTopWidth : 0;
                    borderPaint.setStrokeWidth(borderTopWidth);
                    path.moveTo(margin, 0);
                    path.lineTo(right, 0);
                    path.close();

                    if (borderTopWidth > 0) {
                        canvas.drawRect(new RectF(margin, margin, right, bottom), paint);
                        canvas.drawPath(path, borderPaint);
                    }

                    shader = new android.graphics.BitmapShader(bitmap, android.graphics.Shader.TileMode.CLAMP, android.graphics.Shader.TileMode.CLAMP);
                    paint.setShader(shader);

                    /* Right */
                    path.reset();
                    borderPaint.reset();
                    borderPaint.setStyle(android.graphics.Paint.Style.STROKE);
                    borderPaint.setColor(
                        this.style.borderRightColor && this.style.borderRightColor.android ? this.style.borderRightColor.android : android.graphics.Color.TRANSPARENT
                    );
                    let borderRightWidth = layout.toDevicePixels(<any>this.style.borderRightWidth);
                    borderRightWidth = borderRightWidth ? borderRightWidth : 0;
                    borderPaint.setStrokeWidth(borderRightWidth);
                    path.moveTo(right, margin);
                    path.lineTo(right, bottom);
                    path.close();
                    if (borderRightWidth > 0) {
                        canvas.drawRect(new RectF(margin, margin, right, bottom), paint);
                        canvas.drawPath(path, borderPaint);
                    }


                    /* Bottom */

                    path.reset();
                    borderPaint.reset();
                    borderPaint.setStyle(android.graphics.Paint.Style.STROKE);
                    borderPaint.setColor(
                        this.style.borderBottomColor && this.style.borderBottomColor.android ? this.style.borderBottomColor.android : android.graphics.Color.TRANSPARENT
                    );
                    let borderBottomWidth = layout.toDevicePixels(<any>this.style.borderBottomWidth);
                    borderBottomWidth = borderBottomWidth ? borderBottomWidth : 0;
                    borderPaint.setStrokeWidth(borderBottomWidth);
                    path.moveTo(right, bottom);
                    path.lineTo(0, bottom);
                    path.close();
                    if (borderBottomWidth > 0) {
                        canvas.drawRect(new RectF(margin, margin, right, bottom), paint);
                        canvas.drawPath(path, borderPaint);
                    }

                    /* Left */

                    path.reset();
                    borderPaint.reset();
                    borderPaint.setStyle(android.graphics.Paint.Style.STROKE);
                    borderPaint.setColor(
                        this.style.borderLeftColor && this.style.borderLeftColor.android ? this.style.borderLeftColor.android : android.graphics.Color.TRANSPARENT
                    );
                    let borderLeftWidth = layout.toDevicePixels(<any>this.style.borderLeftWidth);
                    borderLeftWidth = borderLeftWidth ? borderLeftWidth : 0;
                    borderPaint.setStrokeWidth(borderLeftWidth);
                    path.moveTo(0, bottom);
                    path.lineTo(0, 0);
                    path.close();
                    if (borderLeftWidth > 0) {
                        canvas.drawRect(new RectF(0, 0, right, bottom), paint);
                        canvas.drawPath(path, borderPaint);
                    }

                } else {
                    let radius = layout.toDevicePixels(<any>this.style.borderTopLeftRadius);
                    radius = radius ? radius : 0;
                    let diameter = radius * 2;
                    let margin = 0;
                    let right = width;
                    let bottom = height;
                    /* TopLeft */
                    canvas.drawRoundRect(new RectF(0, 0, margin + diameter, margin + diameter), radius,
                        radius, paint);
                    canvas.drawRect(new RectF(margin, margin + radius, margin + radius, bottom), paint);
                    canvas.drawRect(new RectF(margin + radius, margin, right, bottom), paint);


                    /* TopRight */

                    radius = layout.toDevicePixels(<any>this.style.borderTopRightRadius);
                    radius = radius ? radius : 0;
                    diameter = radius * 2;

                    canvas.drawRoundRect(new RectF(right - diameter, margin, right, margin + diameter), radius,
                        radius, paint);
                    canvas.drawRect(new RectF(margin, margin, right - radius, bottom), paint);
                    canvas.drawRect(new RectF(right - radius, margin + radius, right, bottom), paint);


                    /* BottomRight */

                    radius = layout.toDevicePixels(<any>this.style.borderBottomRightRadius);
                    radius = radius ? radius : 0;
                    diameter = radius * 2;

                    canvas.drawRoundRect(new RectF(margin, bottom - diameter, margin + diameter, bottom), radius,
                        radius, paint);
                    canvas.drawRect(new RectF(margin, margin, margin + diameter, bottom - radius), paint);
                    canvas.drawRect(new RectF(margin + radius, margin, right, bottom), paint);


                    /* BottomLeft */

                    radius = layout.toDevicePixels(<any>this.style.borderBottomLeftRadius);
                    radius = radius ? radius : 0;
                    diameter = radius * 2;


                    canvas.drawRoundRect(new RectF(right - diameter, bottom - diameter, right, bottom), radius,
                        radius, paint);
                    canvas.drawRect(new RectF(margin, margin, right - radius, bottom), paint);
                    canvas.drawRect(new RectF(right - radius, margin, right, bottom - radius), paint);
                }

                return new android.graphics.drawable.BitmapDrawable(this.getResources(), bitmap);
            }
            return null;
        }

    }

    private setPlaceHolder(): void {
        if (this.placeHolder) {
            let placeHolder = this.getDrawableWithBorder(this.placeHolder);
            if (placeHolder) {
                if (this._placeHolder) {
                    if (placeHolder.getBitmap().sameAs(this._placeHolder.getBitmap())) {
                        placeHolder.getBitmap().recycle();
                        utils.releaseNativeObject(placeHolder);
                        placeHolder = null;
                        return;
                    } else {
                        this._placeHolder = null;
                    }
                }

                this._placeHolder = placeHolder;

                if (this._builder) {
                    this._builder.placeholder(this._placeHolder);
                }
            }
        }
    }

    private setErrorHolder(): void {
        if (this.errorHolder) {
            let errorHolder = this.getDrawableWithBorder(this._errorHolder);
            if (errorHolder) {
                if (this._errorHolder) {
                    if (errorHolder.getBitmap().sameAs(this._errorHolder.getBitmap())) {
                        errorHolder.getBitmap().recycle();
                        utils.releaseNativeObject(errorHolder);
                        errorHolder = null;
                        return;
                    } else {
                        this._errorHolder = null;
                    }
                }

                this._errorHolder = errorHolder;

                if (this._builder) {
                    this._builder.error(this._errorHolder);
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
                    layout.toDevicePixels(<any>this.style.borderBottomRightRadius),
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
                    layout.toDevicePixels(<any>this.style.borderBottomLeftRadius),
                    0,
                    ColoredRoundedCornerBorders.CornerType.BORDER_LEFT,
                    this.style.borderLeftColor ? this.style.borderLeftColor.android : android.graphics.Color.BLACK,
                    layout.toDevicePixels(<any>this.style.borderLeftWidth),
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



