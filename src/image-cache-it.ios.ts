import * as common from './image-cache-it.common';
import { ImageCacheItBase } from './image-cache-it.common';
import * as imageSrc from 'tns-core-modules/image-source';
import { layout } from 'tns-core-modules/ui/core/view';
import * as fs from 'tns-core-modules/file-system';
import * as types from 'tns-core-modules/utils/types';
import { Length } from 'tns-core-modules/ui/styling/style-properties';
import * as app from 'tns-core-modules/application';

declare var SDWebImageManager, SDWebImageOptions, SDImageCacheType, SDImageCache;

global.moduleMerge(common, exports);
const main_queue = dispatch_get_current_queue();
const filter_queue = dispatch_get_global_queue(qos_class_t.QOS_CLASS_DEFAULT, 0);


export class ImageCacheIt extends ImageCacheItBase {
    nativeView: UIImageView;
    private ctx;

    createNativeView() {
        const nativeView = UIImageView.new();
        nativeView.contentMode = UIViewContentMode.ScaleAspectFit;
        nativeView.userInteractionEnabled = true;
        nativeView.clipsToBounds = true;
        let metalDevice = MTLCreateSystemDefaultDevice() || null;
        if (metalDevice) {
            this.ctx = CIContext.contextWithMTLDevice(metalDevice);
        } else {
            this.ctx = new CIContext(null);
        }
        return nativeView;
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


    private _loadImage(src: any) {
        if (this.nativeView) {
            (<any>this.nativeView).sd_cancelCurrentImageLoad();
        }
        if (!types.isNullOrUndefined(src)) {
            if (types.isString(src) && src.startsWith('http')) {
                // AvoidAutoSetImage | RetryFailed | ScaleDownLargeImages
                const options = 1024 | 1 | 2048;
                this.isLoading = true;
                const context = {};
                const placeholder = this.placeHolder
                    ? imageSrc.fromFileOrResource(this.placeHolder).ios
                    : null;
                (<any>this.nativeView).sd_setImageWithURLPlaceholderImageOptionsContextProgressCompleted(
                    src,
                    placeholder,
                    options,
                    context,
                    (p1: number, p2: number, p3: NSURL) => {

                    }, (p1: UIImage, p2: NSError, p3: any, p4: NSURL) => {
                        this.isLoading = false;
                        if (this.filter) {
                            // this.nativeView.image = placeholder;
                        }
                        if (p2 && this.errorHolder) {
                            const source = imageSrc.fromFileOrResource(this.errorHolder);
                            this.nativeView.image = source ? source.ios : null;
                            this.setAspect(this.stretch);
                            // Fade ?
                            // this.nativeView.alpha = 0;
                            // UIView.animateWithDurationAnimations(1, ()=>{
                            //     this.nativeView.alpha = 1;
                            // })
                        } else if (p3 !== SDImageCacheType.Memory && this.transition) {
                            switch (this.transition) {
                                case 'fade':
                                    this.nativeView.alpha = 0;
                                    UIView.animateWithDurationAnimations(1, () => {
                                        this.nativeView.alpha = 1;
                                    });
                                    break;
                                default:
                                    break;
                            }
                        }

                        if (p1) {
                            if (this.filter) {
                                dispatch_async(filter_queue, () => {
                                    this._setupFilter(p1);
                                });
                            } else {
                                dispatch_async(main_queue, () => {
                                    this._setupFilter(p1);
                                });
                            }
                        }
                    }
                );
            } else if (
                typeof src === 'string' &&
                (src.startsWith('/') || src.startsWith('file'))
            ) {
                const source = imageSrc.fromFileOrResource(src);
                this._setupFilter(source ? source.ios : null);
            } else if (
                typeof src === 'string' &&
                src.startsWith('~')
            ) {
                const path = fs.knownFolders.currentApp().path;
                const file = fs.path.join(path, src.replace('~', ''));
                const source = imageSrc.fromFileOrResource(file);
                this._setupFilter(source ? source.ios : null);
            } else if (typeof src === 'string' && src.startsWith('res://')) {
                this._setupFilter(UIImage.imageNamed(src.replace('res://', '')));
            } else if (types.isObject(src) && src.ios) {
                this._setupFilter(src.ios);
            } else if (types.isObject(src) && src instanceof UIImage) {
                this._setupFilter(src);
            }
        } else {
            if (this.fallback) {
                this._loadImage(this.fallback);
            }
        }

    }

    public initNativeView() {
        super.initNativeView();
        this._loadImage(this.src);
    }

    [common.srcProperty.getDefault](): any {
        return undefined;
    }

    [common.srcProperty.setNative](src: any) {
        this._loadImage(src);
    }

    [common.resizeProperty.setNative](resize: string) {
        if (!this.nativeView) return resize;
        if (
            this.resize &&
            this.resize.split(',').length > 1
        ) {
            this.nativeView.frame.size.width = parseInt(this.resize.split(' ')[0]);
            this.nativeView.frame.size.height = parseInt(this.resize.split(' ')[1]);
        }
        return resize;
    }

    private setAspect(value: string) {
        if (!this.nativeView) return value;
        switch (value) {
            case 'aspectFit':
                this.nativeView.contentMode = UIViewContentMode.ScaleAspectFit;
                break;
            case 'aspectFill':
                this.nativeView.contentMode = UIViewContentMode.ScaleAspectFill;
                break;
            case 'fill':
                this.nativeView.contentMode = UIViewContentMode.ScaleToFill;
                break;
            case 'none':
            default:
                this.nativeView.contentMode = UIViewContentMode.TopLeft;
                break;
        }
        return value;
    }

    [common.stretchProperty.getDefault](): 'aspectFit' {
        return 'aspectFit';
    }

    [common.stretchProperty.setNative](
        value: 'none' | 'aspectFill' | 'aspectFit' | 'fill'
    ) {
        this.setAspect(value);
    }


    [common.filterProperty.setNative](filter: any) {
        this.filter = filter;
        this._setupFilter(this.nativeView.image);
    }

    private static ciFilterMap = {};

    private _setupFilter(image) {
        const getValue = (value: string) => {
            return value.substring(value.indexOf('(') + 1, value.indexOf(')'));
        };
        const createFilterWithName = (value: string) => {
            let filter: CIFilter;
            if (!ImageCacheIt.ciFilterMap[value]) {
                ImageCacheIt.ciFilterMap[value] = CIFilter.filterWithName(value);
            }

            filter = ImageCacheIt.ciFilterMap[value];
            filter.setDefaults();
            if (image && image.CIImage) {
                filter.setValueForKey(image.CIImage, kCIInputImageKey);
                filter.setValueForKey(NSNull, kCIImageColorSpace);
            } else {
                if (image && image.CGImage) {
                    filter.setValueForKey(CIImage.imageWithCGImage(image.CGImage), kCIInputImageKey);
                }

            }
            return filter;
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
                            const blurFilter = createFilterWithName('CIMotionBlur');
                            blurFilter.setValueForKey(width, kCIInputRadiusKey);
                            const blurredImg = blurFilter.valueForKey(kCIOutputImageKey);
                            if (blurredImg && blurredImg.extent) {
                                const cgiImage = this.ctx.createCGImageFromRect(blurredImg, blurredImg.extent);
                                const image = UIImage.imageWithCGImage(cgiImage);
                                dispatch_async(main_queue, () => {
                                    this.nativeView.image = image;
                                    this.setAspect(this.stretch);
                                });
                            }
                        }
                    }
                } else if (filter.indexOf('contrast') > -1) {
                    if (value.indexOf('%')) {
                        const contrast = parseFloat(value.replace('%', '')) / 100;
                        const contrastFilter = createFilterWithName('CIColorControls');
                        contrastFilter.setValueForKey(contrast, kCIInputContrastKey);
                        const contrastImg: CIImage = contrastFilter.valueForKey(kCIOutputImageKey);
                        if (contrastImg && contrastImg.extent) {
                            const cgiImage = this.ctx.createCGImageFromRect(contrastImg, contrastImg.extent);
                            const image = UIImage.imageWithCGImage(cgiImage);
                            dispatch_async(main_queue, () => {
                                this.nativeView.image = image;
                                this.setAspect(this.stretch);
                            });
                        }

                    }

                } else if (filter.indexOf('brightness') > -1) {
                    if (value.indexOf('%')) {
                        let brightness = parseFloat(value.replace('%', '')) / 100;
                        /* if (brightness >= 0 && brightness < 1) {
                             brightness = -1 + brightness;
                         }*/

                        const brightnessFilter = createFilterWithName('CIColorControls');
                        brightnessFilter.setValueForKey(brightness, kCIInputContrastKey);
                        const contrastImg = brightnessFilter.valueForKey(kCIOutputImageKey);
                        if (contrastImg && contrastImg.extent) {
                            const cgiImage = this.ctx.createCGImageFromRect(contrastImg, contrastImg.extent);
                            const image = UIImage.imageWithCGImage(cgiImage);
                            dispatch_async(main_queue, () => {
                                this.nativeView.image = image;
                                this.setAspect(this.stretch);
                            });
                        }


                    }
                } else if (filter.indexOf('grayscale') > -1 || filter.indexOf('greyscale') > -1) {
                    let grayscale = 0;
                    if (value.indexOf('%') > -1) {
                        grayscale = parseFloat(value.replace('%', '')) / 100;
                    } else if (value.indexOf('.') > -1) {
                        grayscale = parseFloat(value);
                    } else {
                        grayscale = parseInt(value, 10);
                    }

                    if (grayscale > 1) {
                        grayscale = 1;
                    }

                    grayscale = 1 - grayscale;

                    const grayscaleFilter = createFilterWithName('CIColorControls');
                    grayscaleFilter.setValueForKey(grayscale, kCIInputSaturationKey);
                    const grayscaleImg = grayscaleFilter.valueForKey(kCIOutputImageKey);
                    if (grayscaleImg && grayscaleImg.extent) {
                        const cgiImage = this.ctx.createCGImageFromRect(grayscaleImg, grayscaleImg.extent);
                        const image = UIImage.imageWithCGImage(cgiImage);
                        dispatch_async(main_queue, () => {
                            this.nativeView.image = image;
                            this.setAspect(this.stretch);
                        });
                    }
                } else if (filter.indexOf('invert') > -1) {
                    // TODO handle value
                    const invertFilter = createFilterWithName('CIColorInvert');
                    const invertImg = invertFilter.valueForKey(kCIOutputImageKey);
                    if (invertImg && invertImg.extent) {
                        const cgiImage = this.ctx.createCGImageFromRect(invertImg, invertImg.extent);
                        const image = UIImage.imageWithCGImage(cgiImage);
                        dispatch_async(main_queue, () => {
                            this.nativeView.image = image;
                            this.setAspect(this.stretch);
                        });
                    }

                } else if (filter.indexOf('sepia') > -1) {
                    const sepia = parseFloat(value.replace('%', '')) / 100;
                    const sepiaFilter = createFilterWithName('CISepiaTone');
                    sepiaFilter.setValueForKey(sepia, kCIInputIntensityKey);
                    const sepiaImg = sepiaFilter.valueForKey(kCIOutputImageKey);
                    if (sepiaImg && sepiaImg.extent) {
                        const cgiImage = this.ctx.createCGImageFromRect(sepiaImg, sepiaImg.extent);
                        const image = UIImage.imageWithCGImage(cgiImage);
                        dispatch_async(main_queue, () => {
                            this.nativeView.image = image;
                            this.setAspect(this.stretch);
                        });
                    }
                } else if (filter.indexOf('opacity') > -1) {
                    let alpha = 1.0;
                    if (value.indexOf('%') > -1) {
                        alpha = parseInt(value.replace('%', ''), 10) / 100;
                    } else if (value.indexOf('.') > -1) {
                        alpha = parseFloat(value);
                    } else {
                        alpha = parseInt(value, 10);
                    }
                    dispatch_async(main_queue, () => {
                        this.nativeView.alpha = alpha;
                        this.setAspect(this.stretch);
                    });
                } else if (filter.indexOf('hue') > -1) {
                    const hueFilter = createFilterWithName('CIHueAdjust');
                    let hue = 0;
                    if (value.indexOf('deg') > -1) {
                        hue = parseInt(value.replace('deg', ''), 10);
                    } else if (value.indexOf('turn') > -1) {
                        hue = parseInt(value.replace('turn', ''), 10) * 360;
                    }
                    hueFilter.setValueForKey(hue, kCIInputAngleKey);

                    const hueImg = hueFilter.valueForKey(kCIOutputImageKey);
                    if (hueImg && hueImg.extent) {
                        const cgiImage = this.ctx.createCGImageFromRect(hueImg, hueImg.extent);
                        const image = UIImage.imageWithCGImage(cgiImage);
                        dispatch_async(main_queue, () => {
                            this.nativeView.image = image;
                            this.setAspect(this.stretch);
                        });
                    }
                } else if (filter.indexOf('saturate') > -1) {
                    const saturateFilter = createFilterWithName('CIColorControls');
                    let saturate = 1.0;
                    if (value.indexOf('%') > -1) {
                        saturate = parseInt(value.replace('%', ''), 10) / 100;
                    } else if (value.indexOf('.') > -1) {
                        saturate = parseFloat(value);
                    } else {
                        saturate = parseInt(value, 10);
                    }
                    saturateFilter.setValueForKey(saturate, kCIInputSaturationKey);
                    const saturateImg = saturateFilter.valueForKey(kCIOutputImageKey);
                    if (saturateImg && saturateImg.extent) {
                        const cgiImage = this.ctx.createCGImageFromRect(saturateImg, saturateImg.extent);
                        const image = UIImage.imageWithCGImage(cgiImage);
                        dispatch_async(main_queue, () => {
                            this.nativeView.image = image;
                            this.setAspect(this.stretch);
                        });
                    }
                }
            });
        } else {
            dispatch_async(main_queue, () => {
                this.nativeView.image = image;
                this.setAspect(this.stretch);
            });
        }
    }

    public static hasItem(src: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const manager = SDWebImageManager.sharedManager;
            if (manager) {
                const key = manager.cacheKeyForURL(NSURL.URLWithString(src));
                manager.imageCache.containsImageForKeyCacheTypeCompletion(key, 3 /* All */, (type) => {
                    if (type > 0) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            } else {
                reject();
            }
        });
    }

    public static deleteItem(src: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const manager = SDWebImageManager.sharedManager;
            if (manager) {
                const key = manager.cacheKeyForURL(NSURL.URLWithString(src));
                manager.imageCache.removeImageForKeyFromDiskWithCompletion(key, true, () => {
                    resolve();
                });
            } else {
                reject();
            }
        });
    }

    public static clear(): Promise<any> {
        return new Promise((resolve, reject) => {
            const manager = SDWebImageManager.sharedManager;
            if (manager) {
                manager.imageCache.clearMemory();
                manager.imageCache.clearDiskOnCompletion(() => {
                    resolve();
                });
            }
        });
    }

    private static autoMMCallback;

    public static enableAutoMM() {
        ImageCacheIt.autoMMCallback = (args) => {
            const manager = SDWebImageManager.sharedManager;
            if (manager) {
                manager.imageCache.clearMemory();
            }
        };
        app.on(app.lowMemoryEvent as any, ImageCacheIt.autoMMCallback);
    }

    public static disableAutoMM() {
        if (ImageCacheIt.autoMMCallback) {
            app.off(app.lowMemoryEvent as any, ImageCacheIt.autoMMCallback);
        }
    }

    public static getItem(src: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const manager = SDWebImageManager.sharedManager;
            if (manager) {
                if (src && src.indexOf('http') > -1) {
                    const nativeSrc = NSURL.URLWithString(src);
                    manager.loadImageWithURLOptionsProgressCompleted(nativeSrc, SDWebImageOptions.scaleDownLargeImages, (receivedSize: number, expectedSize: number, path: NSURL) => {
                    }, (image, data, error, type, finished, completedUrl) => {
                        if (image === null && error !== null && data === null) {
                            reject(error.localizedDescription);
                        } else if (finished && completedUrl != null) {
                            if (type === SDImageCacheType.disk) {
                                const key = manager.cacheKeyForURL(completedUrl);
                                const source = manager.imageCache.cachePathForKey(key);
                                resolve(source);
                            } else {
                                const sharedCache = SDImageCache.sharedImageCache;
                                sharedCache.storeImageForKeyCompletion(image, completedUrl.absoluteString, () => {
                                    const key = manager.cacheKeyForURL(completedUrl);
                                    const source = manager.imageCache.cachePathForKey(key);
                                    resolve(source);
                                });
                            }
                        }
                    });
                }
            } else {
                reject();
            }
        });
    }
}
