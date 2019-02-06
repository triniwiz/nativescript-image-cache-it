import * as common from './image-cache-it.common';
import { ImageCacheItBase } from './image-cache-it.common';
import * as imageSrc from 'tns-core-modules/image-source';
import { layout } from 'tns-core-modules/ui/core/view';
import * as fs from 'tns-core-modules/file-system';
import * as utils from 'tns-core-modules/utils/utils';
import * as types from 'tns-core-modules/utils/types'

declare var SDWebImageManager, SDWebImageOptions, SDImageCacheType, SDImageCache;

global.moduleMerge(common, exports);

export class ImageCacheIt extends ImageCacheItBase {
    nativeView: UIImageView;

    createNativeView() {
        const nativeView = UIImageView.new();
        nativeView.contentMode = UIViewContentMode.ScaleAspectFit;
        nativeView.userInteractionEnabled = true;
        nativeView.clipsToBounds = true;
        /*
            TODO Loading Indicator

            (this.nativeView as any).sd_setShowActivityIndicatorView(true);
            (this.nativeView as any).sd_setIndicatorStyle(2);


            WhiteLarge = 0,

            White = 1,

            Gray = 2
            */
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

    public initNativeView() {
        super.initNativeView();
        if (!types.isNullOrUndefined(this.imageUri)) {
            if (typeof this.imageUri === 'string' && this.imageUri.startsWith('http')) {
                this.isLoading = true;
                (<any>this.nativeView).sd_setImageWithURLPlaceholderImageCompleted(
                    this.imageUri,
                    this.placeHolder
                        ? imageSrc.fromFileOrResource(this.placeHolder).ios
                        : null,
                    (p1: UIImage, p2: NSError, p3: any, p4: NSURL) => {
                        this.isLoading = false;
                        if (p2 && this.errorHolder) {
                            const source = imageSrc.fromFileOrResource(this.errorHolder);
                            this.nativeView.image = source ? source.ios : null;
                            this.setAspect(this.stretch);
                        }
                    }
                );
            } else if (
                typeof this.imageUri === 'string' &&
                (this.imageUri.startsWith('/') || this.imageUri.startsWith('file'))
            ) {
                const source = imageSrc.fromFileOrResource(this.imageUri);
                this.nativeView.image = source ? source.ios : null;
                this.setAspect(this.stretch);
            } else if (
                typeof this.imageUri === 'string' &&
                this.imageUri.startsWith('~')
            ) {
                const path = fs.knownFolders.currentApp().path;
                const file = fs.path.join(path, this.imageUri.replace('~', ''));
                const source = imageSrc.fromFileOrResource(file);
                this.nativeView.image = source ? source.ios : null;
                this.setAspect(this.stretch);
            } else if (typeof this.imageUri === 'object' && this.imageUri.ios) {
                this.nativeView.image = this.imageUri.ios;
                this.setAspect(this.stretch);
            }
        }

        if (
            this.resize &&
            this.resize !== undefined &&
            this.resize.split(' ').length > 1
        ) {
            this.nativeView.frame.size.width = parseInt(this.resize.split(',')[0]);
            this.nativeView.frame.size.height = parseInt(this.resize.split(',')[1]);
        }
    }

    [common.imageUriProperty.getDefault](): any {
        return undefined;
    }

    [common.imageUriProperty.setNative](src: any) {
        if (types.isNullOrUndefined(src)) return src;
        if (typeof src === 'string' && src.startsWith('http')) {
            this.isLoading = true;
            (<any>this.nativeView).sd_setImageWithURLPlaceholderImageCompleted(
                src,
                this.placeHolder
                    ? imageSrc.fromFileOrResource(this.placeHolder).ios
                    : null,
                (p1: UIImage, p2: NSError, p3: any, p4: NSURL) => {
                    this.isLoading = false;
                    if (p2 && this.errorHolder) {
                        const source = imageSrc.fromFileOrResource(this.errorHolder);
                        this.nativeView.image = source ? source.ios : null;
                    }
                }
            );
        } else if (
            typeof src === 'string' &&
            (src.startsWith('/') || src.startsWith('file'))
        ) {
            const source = imageSrc.fromFileOrResource(src);
            this.nativeView.image = source ? source.ios : null;
        } else if (typeof src === 'object' && src.ios) {
            this.nativeView.image = src.ios;
        } else if (
            typeof this.imageUri === 'string' &&
            this.imageUri.startsWith('~')
        ) {
            const path = fs.knownFolders.currentApp().path;
            const file = fs.path.join(path, this.imageUri.replace('~', ''));
            const source = imageSrc.fromFileOrResource(file);
            this.nativeView.image = source ? source.ios : null;
        } else if (typeof this.imageUri === 'object' && this.imageUri.ios) {
            this.nativeView.image = this.imageUri.ios;
        }

        return src;
    }

    [common.resizeProperty.setNative](resize: string) {
        if (!this.nativeView) return resize;
        if (
            this.resize &&
            this.resize !== undefined &&
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
