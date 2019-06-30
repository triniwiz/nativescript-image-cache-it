import * as common from './image-cache-it.common';
import { ImageCacheItBase } from './image-cache-it.common';
import * as imageSrc from 'tns-core-modules/image-source';
import { layout } from 'tns-core-modules/ui/core/view';
import * as fs from 'tns-core-modules/file-system';
import * as utils from 'tns-core-modules/utils/utils';
import * as types from 'tns-core-modules/utils/types';

declare var SDWebImageManager, SDWebImageOptions, SDImageCacheType, SDImageCache;

global.moduleMerge(common, exports);

export class ImageCacheIt extends ImageCacheItBase {
    nativeView: UIImageView;

    createNativeView() {
        const nativeView = UIImageView.new();
        nativeView.contentMode = UIViewContentMode.ScaleAspectFit;
        nativeView.userInteractionEnabled = true;
        nativeView.clipsToBounds = true;
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
        if (!types.isNullOrUndefined(src)) {
            if (types.isString(src) && src.startsWith('http')) {
                this.isLoading = true;
                const context = {};
                (<any>this.nativeView).sd_setImageWithURLPlaceholderImageOptionsContextProgressCompleted(
                    src,
                    this.placeHolder
                        ? imageSrc.fromFileOrResource(this.placeHolder).ios
                        : null,
                    0,
                    context,
                    (p1: number, p2: number, p3: NSURL) => {

                    }, (p1: UIImage, p2: NSError, p3: any, p4: NSURL) => {
                        this.isLoading = false;
                        if (p2 && this.errorHolder) {
                            const source = imageSrc.fromFileOrResource(this.errorHolder);
                            this.nativeView.image = source ? source.ios : null;
                            this.setAspect(this.stretch);
                        }
                    }
                );
            } else if (
                typeof src === 'string' &&
                (src.startsWith('/') || src.startsWith('file'))
            ) {
                const source = imageSrc.fromFileOrResource(src);
                this.nativeView.image = source ? source.ios : null;
                this.setAspect(this.stretch);
            } else if (
                typeof src === 'string' &&
                src.startsWith('~')
            ) {
                const path = fs.knownFolders.currentApp().path;
                const file = fs.path.join(path, src.replace('~', ''));
                const source = imageSrc.fromFileOrResource(file);
                this.nativeView.image = source ? source.ios : null;
                this.setAspect(this.stretch);
            } else if (typeof src === 'string' && src.startsWith('res://')) {
                this.nativeView.image = UIImage.imageNamed(src.replace('res://', ''));
                this.setAspect(this.stretch);
            } else if (types.isObject(src) && src.ios) {
                this.nativeView.image = src.ios;
                this.setAspect(this.stretch);
            } else if (types.isObject(src) && src instanceof UIImage) {
                this.nativeView.image = src;
                this.setAspect(this.src);
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
        // TODO

        /*
        this.filter = filter;

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
                        }
                    }
                } else if (filter.indexOf('contrast') > -1) {
                    if (value.indexOf('%')) {
                        const contrast = parseFloat(value.replace('%', '')) / 100;

                    }

                } else if (filter.indexOf('brightness') > -1) {
                    if (value.indexOf('%')) {
                        let brightness = parseFloat(value.replace('%', '')) / 100;
                        if (brightness >= 0 && brightness < 1) {
                            brightness = -1 + brightness;
                        }

                    }
                } else if (filter.indexOf('grayscale') > -1 || filter.indexOf('greyscale') > -1) {
                    // TODO handle value

                } else if (filter.indexOf('invert') > -1) {
                    // TODO handle value

                } else if (filter.indexOf('sepia') > -1) {
                    const sepia = parseFloat(value.replace('%', '')) / 100;

                }
            });
        }
        */
    }

    public static getItem(src: string): Promise<string> {
        return new Promise<any>((resolve, reject) => {
            const manager = utils.ios.getter(SDWebImageManager, SDWebImageManager.sharedManager);
            if (manager) {
                if (src && src.indexOf('http') > -1) {
                    const url = <any>NSURL.alloc().initWithString(src);
                    manager.loadImageWithURLOptionsProgressCompleted(url, SDWebImageOptions.scaleDownLargeImages, (receivedSize: number, expectedSize: number, path: NSURL) => {
                    }, (image, data, error, type, finished, completedUrl) => {
                        if (image === null && error !== null && data === null) {
                            reject(error.localizedDescription)
                        } else if (finished && completedUrl != null) {
                            if (type == SDImageCacheType.disk) {
                                const key = manager.cacheKeyForURL(completedUrl);
                                const source = manager.imageCache.defaultCachePathForKey(key);
                                resolve(source)
                            } else {
                                const sharedCache = utils.ios.getter(SDImageCache, SDImageCache.sharedImageCache);
                                sharedCache.storeImageForKeyCompletion(image, completedUrl.absoluteString, () => {
                                    const key = manager.cacheKeyForURL(completedUrl);
                                    const source = manager.imageCache.defaultCachePathForKey(key);
                                    resolve(source);
                                });
                            }
                        } else {
                            reject();
                        }
                    })
                }
            } else {
                reject();
            }
        });
    }

    public static deleteItem(src: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const manager = utils.ios.getter(SDWebImageManager, SDWebImageManager.sharedManager);
            if (manager) {
                manager.imageCache.removeImageForKeyFromDiskWithCompletion(src, true, () => {
                    resolve();
                });
            } else {
                reject();
            }
        });
    }

    public static fetchItem(src: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const manager = utils.ios.getter(SDWebImageManager, SDWebImageManager.sharedManager);
            if (manager) {
                if (src && src.indexOf('http') > -1) {
                    const nativeSrc = NSURL.alloc().initWithString(src);
                    manager.loadImageWithURLOptionsProgressCompleted(nativeSrc, SDWebImageOptions.scaleDownLargeImages, (receivedSize: number, expectedSize: number, path: NSURL) => {
                    }, (image, data, error, type, finished, completedUrl) => {
                        if (image === null && error !== null && data === null) {
                            reject(error.localizedDescription)
                        } else if (finished && completedUrl != null) {
                            if (type === SDImageCacheType.disk) {
                                const key = manager.cacheKeyForURL(completedUrl);
                                const source = manager.imageCache.defaultCachePathForKey(key);
                                resolve(source);
                            } else {
                                const sharedCache = utils.ios.getter(SDImageCache, SDImageCache.sharedImageCache);
                                sharedCache.storeImageForKeyCompletion(image, completedUrl.absoluteString, () => {
                                    const key = manager.cacheKeyForURL(completedUrl);
                                    const source = manager.imageCache.defaultCachePathForKey(key);
                                    resolve(source)
                                })
                            }
                        }
                    })
                }
            } else {
                reject();
            }
        });
    }
}
