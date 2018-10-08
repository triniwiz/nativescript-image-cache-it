import * as common from './image-cache-it.common';
import { ImageCacheItBase } from './image-cache-it.common';
import * as fs from 'tns-core-modules/file-system';
import * as utils from 'tns-core-modules/utils/utils';
import * as types from 'tns-core-modules/utils/types';
import { layout } from 'tns-core-modules/ui/core/view';

global.moduleMerge(common, exports);
declare const jp, com;

export class ImageCacheIt extends ImageCacheItBase {
    picasso;
    private builder;
    nativeView: org.nativescript.widgets.ImageView;

    constructor() {
        super();
    }

    public createNativeView() {
        this.picasso = (com as any).squareup.picasso.provider.PicassoProvider.get();
        return new android.widget.ImageView(this._context);
    }

    public initNativeView() {
        if (this.imageUri) {
            const image = this.getImage(this.imageUri);
            if (this.imageUri.startsWith('res://')) {
                if (+image > 0) {
                    this.builder = this.picasso.load(image);
                }
            } else {
                this.builder = this.picasso.load(image);
            }
        }
        if (this.stretch) {
            this.resetImage();
        }
        this.setPlaceHolder();
        this.setErrorHolder();
        if (this.builder) {
            if (
                this.resize &&
                this.resize !== undefined &&
                this.resize.split(',').length > 1 &&
                this.stretch !== 'fill'
            ) {
                this.builder.resize(
                    parseInt(this.resize.split(',')[0], 10),
                    parseInt(this.resize.split(',')[1], 10)
                );
            }
            this.builder.into(this.nativeView);
        }
    }

    private getResourceId(res: string = '') {
        if (res.startsWith('res://')) {
            return utils.ad.resources.getDrawableId(res.replace('res://', ''));
        }
        return 0;
    }

    private setPlaceHolder(): void {
        if (this.placeHolder) {
            const placeholder = this.getResourceId(this.placeHolder);
            if (placeholder > 0) {
                this.builder.placeholder(placeholder);
            }
        }
    }

    private setErrorHolder(): void {
        if (this.errorHolder) {
            const errorholder = this.getResourceId(this.errorHolder);
            if (errorholder > 0) {
                this.builder.error(errorholder);
            }
        }
    }

    set borderRadius(value: any) {
        this.style.borderRadius = value;
        this.setBorderAndRadius();
    }

    set borderWidth(value: any) {
        this.style.borderWidth = value;
        this.setBorderAndRadius();
    }

    set borderLeftWidth(value: any) {
        this.style.borderLeftWidth = value;
        this.setBorderAndRadius();
    }

    set borderRightWidth(value: any) {
        this.style.borderRightWidth = value;
        this.setBorderAndRadius();
    }

    set borderBottomWidth(value: any) {
        this.style.borderBottomWidth = value;
        this.setBorderAndRadius();
    }

    set borderTopWidth(value: any) {
        this.style.borderTopWidth = value;
        this.setBorderAndRadius();
    }

    set borderBottomLeftRadius(value: any) {
        this.style.borderBottomLeftRadius = value;
        this.setBorderAndRadius();
    }

    set borderBottomRightRadius(value: any) {
        this.style.borderBottomRightRadius = value;
        this.setBorderAndRadius();
    }

    set borderTopLeftRadius(value: any) {
        this.style.borderTopLeftRadius = value;
        this.setBorderAndRadius();
    }

    set borderTopRightRadius(value: any) {
        this.style.borderTopRightRadius = value;
        this.setBorderAndRadius();
    }

    [common.imageUriProperty.getDefault](): any {
        return undefined;
    }


    [common.imageUriProperty.setNative](src: any) {
        if (!this.builder) {
            const image = this.getImage(src);
            if (types.isString(src) && this.imageUri.startsWith('res://')) {
                if (+image > 0) {
                    this.builder = this.picasso.load(image);
                }
            } else {
                this.builder = this.picasso.load(image);
            }
        }
        if (this.stretch) {
            this.resetImage();
        }
        this.setPlaceHolder();
        this.setErrorHolder();
        this.setBorderAndRadius();
        this.builder.into(this.nativeView);
        return src;
    }

    [common.resizeProperty.setNative](resize: string) {
        if (!this.builder) {
            return resize;
        }
        if (resize && resize !== undefined && resize.split(',').length > 1 && this.stretch !== 'fill') {
            this.builder.resize(
                parseInt(resize.split(',')[0], 10),
                parseInt(resize.split(',')[1], 10)
            );
        }
        return resize;
    }

    private getImage(src: string): string {
        let nativeImage;
        if (types.isNullOrUndefined(src)) {
            return src;
        }
        if (src.substr(0, 1) === '/') {
            nativeImage = new java.io.File(src);
        } else if (src.startsWith('~/')) {
            nativeImage = new java.io.File(
                fs.path.join(fs.knownFolders.currentApp().path, src.replace('~/', ''))
            );
        } else if (src.startsWith('http')) {
            nativeImage = src;
        } else if (src.startsWith('res://')) {
            nativeImage = utils.ad.resources.getDrawableId(src.replace('res://', ''));
        }
        return nativeImage;
    }

    [common.stretchProperty.getDefault](): 'aspectFit' {
        return 'aspectFit';
    }

    [common.stretchProperty.setNative](
        value: 'none' | 'aspectFill' | 'aspectFit' | 'fill'
    ) {
        if (!this.builder) return value;
        this.resetImage(true);
        return value;
    }

    public clearItem() {
    }

    private setBorderAndRadius() {
        if (!this.builder) return;

        const RoundedCornersTransformation = jp.wasabeef.picasso.transformations.RoundedCornersTransformation;
        this.builder = this.builder
            .transform(
                new RoundedCornersTransformation(
                    layout.toDevicePixels(<any>this.style.borderTopLeftRadius),
                    layout.toDevicePixels(<any>this.style.borderTopWidth),
                    RoundedCornersTransformation.CornerType.TOP_LEFT
                )
            )
            .transform(
                new RoundedCornersTransformation(
                    layout.toDevicePixels(<any>this.style.borderTopRightRadius),
                    layout.toDevicePixels(<any>this.style.borderTopWidth),
                    RoundedCornersTransformation.CornerType.TOP_RIGHT
                )
            )
            .transform(
                new RoundedCornersTransformation(
                    layout.toDevicePixels(<any>this.style.borderBottomLeftRadius),
                    layout.toDevicePixels(<any>this.style.borderBottomWidth),
                    RoundedCornersTransformation.CornerType.BOTTOM_LEFT
                )
            )
            .transform(
                new RoundedCornersTransformation(
                    layout.toDevicePixels(<any>this.style.borderBottomRightRadius),
                    layout.toDevicePixels(<any>this.style.borderBottomWidth),
                    RoundedCornersTransformation.CornerType.BOTTOM_RIGHT
                )
            );
    }

    /**
     * Helper method to call the Picasso resize method, which is necessary before centerCrop() and centerInside().
     * Will use the `resize` value if provided, next is the `height` and `width` of the imageCacheIt instance
     * last is the parent which is probably not reliable.
     * Only used when aspectFit or aspectFill are set on the stretch property.
     */
    private setAspectResize() {
        let newSize;
        if (
            this.resize &&
            this.resize !== undefined &&
            this.resize.split(',').length > 1
        ) {
            newSize = {
                width: parseInt(this.resize.split(',')[0], 10),
                height: parseInt(this.resize.split(',')[1], 10)
            };
        } else if (this.width || this.height) {
            // use the images height/width (need to be set - more gurds if needed)
            newSize = {
                width: parseInt(this.width.toString(), 10),
                height: parseInt(this.height.toString(), 10)
            };
        } else {
            // use parent size (worth a shot I guess but probably not going to work here reliably)
            newSize = {
                width: this.parent.effectiveWidth,
                height: this.parent.effectiveHeight
            };
        }

        this.builder.resize(newSize.width, newSize.height);
    }

    private resetImage(reload = false) {
        if (!this.builder) return;
        switch (this.stretch) {
            case 'aspectFit':
                this.builder = this.picasso.load(this.getImage(this.imageUri));
                this.setBorderAndRadius();
                this.setAspectResize();
                this.builder.centerInside();
                if (reload) {
                    this.builder.into(this.nativeView);
                }
                break;
            case 'aspectFill':
                this.builder = this.picasso.load(this.getImage(this.imageUri));
                this.setBorderAndRadius();
                this.setAspectResize();
                this.builder.centerCrop();
                if (reload) {
                    this.builder.into(this.nativeView);
                }
                break;
            case 'fill':
                this.builder = this.picasso.load(this.getImage(this.imageUri));
                this.setBorderAndRadius();
                this.builder.fit();
                if (reload) {
                    this.builder.into(this.nativeView);
                }
                break;
            case 'none':
            default:
                this.builder = this.picasso.load(this.getImage(this.imageUri));
                this.setBorderAndRadius();
                if (reload) {
                    this.builder.into(this.nativeView);
                }
                break;
        }
    }
}
