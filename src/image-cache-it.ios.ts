import * as common from './image-cache-it.common';
import { ImageCacheItBase } from './image-cache-it.common';
import * as imageSrc from 'tns-core-modules/image-source';
import { layout } from 'tns-core-modules/ui/core/view';
import * as fs from 'tns-core-modules/file-system';
import * as types from 'tns-core-modules/utils/types';
import { Length } from 'tns-core-modules/ui/styling/style-properties';

declare var SDWebImageManager, SDWebImageOptions, SDImageCacheType, SDImageCache, ImageHandler;

global.moduleMerge(common, exports);
let ctx: CIContext;
let blurFilter;
let contrastFilter;
let brightnessFilter;
let grayscaleFilter;
let invertFilter;
let sepiaFilter;
let device: MTLDevice;
let queue: MTLCommandQueue;
let colorSpace;

@ObjCClass(MTKViewDelegate)
class MTKViewDelegateImpl extends NSObject implements MTKViewDelegate {
  _owner: WeakRef<ImageCacheIt>;
  public static initWithOwner(
    owner: WeakRef<ImageCacheIt>
  ): MTKViewDelegateImpl {
    const delegate = <MTKViewDelegateImpl>MTKViewDelegateImpl.alloc().init();
    delegate._owner = owner;
    return delegate;
  }

  private _initFilter() {
    const owner = this._owner ? this._owner.get() : null;
  if (types.isNullOrUndefined(owner)) return;
    const getValue = (value: string) => {
        return value.substring(value.indexOf('(') + 1, value.indexOf(')'));
    };

    const createFilterWithName = (value: string) => {
        let filter: CIFilter;
        filter = CIFilter.filterWithName(value);
        return filter;
    };
    const setImageToFilter = (filter: any, img: any) => {
       if (img instanceof CIImage) {
            filter.setValueForKey(img, kCIInputImageKey);
            filter.setDefaults();
        } else if (img instanceof UIImage) {
            if (img.CIImage) {
                filter.setValueForKey(img, kCIInputImageKey);
                return;
            }
            if (img.CGImage) {
                filter.setValueForKey(CIImage.imageWithCGImage(img.CGImage), kCIInputImageKey);
                return;
            }
        } else {
            if (types.isObject(img)) {
                filter.setValueForKey(CIImage.imageWithCGImage(img), kCIInputImageKey);
            }

        }
    };
    if (owner.filter) {
        const filters = owner.filter ? owner.filter.split(' ') : [];
        let filteredImage;
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
                        if (types.isNullOrUndefined(blurFilter)) {
                            blurFilter = createFilterWithName('CIMotionBlur');
                        }
                        if (filteredImage) {
                            setImageToFilter(blurFilter, filteredImage);
                        } else {
                            setImageToFilter(blurFilter, owner._originalImage);
                        }

                        blurFilter.setValueForKey(width, kCIInputRadiusKey);
                        const blurredImg = blurFilter.valueForKey(kCIOutputImageKey);
                        filteredImage = blurredImg;
                    }
                }
            } else if (filter.indexOf('contrast') > -1) {
                if (value.indexOf('%')) {
                    const contrast = parseFloat(value.replace('%', '')) / 100;
                    if (types.isNullOrUndefined(contrastFilter)) {
                        contrastFilter = createFilterWithName('CIColorControls');
                    }
                    if (filteredImage) {
                        setImageToFilter(contrastFilter, filteredImage);
                    } else {
                        setImageToFilter(contrastFilter, owner._originalImage);
                    }
                    contrastFilter.setValueForKey(contrast, kCIInputContrastKey);
                    const contrastImg: CIImage = contrastFilter.valueForKey(kCIOutputImageKey);
                    filteredImage = contrastImg;
                }

            } else if (filter.indexOf('brightness') > -1) {
                if (value.indexOf('%')) {
                    let brightness = parseFloat(value.replace('%', '')) / 100;
                    if (types.isNullOrUndefined(brightnessFilter)) {
                        brightnessFilter = createFilterWithName('CIColorControls');
                    }
                    if (filteredImage) {
                        setImageToFilter(brightnessFilter, filteredImage);
                    } else {
                        setImageToFilter(brightnessFilter, owner._originalImage);
                    }
                    brightnessFilter.setValueForKey(brightness, kCIInputContrastKey);
                    const contrastImg = brightnessFilter.valueForKey(kCIOutputImageKey);
                    filteredImage = contrastImg;

                }
            } else if (filter.indexOf('grayscale') > -1 || filter.indexOf('greyscale') > -1) {
                if (value.indexOf('%')) {
                    let grayscale = parseFloat(value.replace('%', '')) / 100;
                    if (grayscale >= 1) {
                        grayscale = 1;
                    }
                    if (types.isNullOrUndefined(grayscaleFilter)) {
                        grayscaleFilter = createFilterWithName('CIColorMonochrome');
                    }
                    if (filteredImage) {
                        setImageToFilter(grayscaleFilter, filteredImage);
                    } else {
                        setImageToFilter(grayscaleFilter, owner._originalImage);
                    }
                    grayscaleFilter.setValueForKey(CIColor.colorWithRedGreenBlue(0.7, 0.7, 0.7), kCIInputColorKey);
                    grayscaleFilter.setValueForKey(grayscale, kCIInputIntensityKey);
                    const grayscaleImg = grayscaleFilter.valueForKey(kCIOutputImageKey);
                    filteredImage = grayscaleImg;

                }
            } else if (filter.indexOf('invert') > -1) {
                // TODO handle value
                if (types.isNullOrUndefined(invertFilter)) {
                    invertFilter = createFilterWithName('CIColorInvert');
                }
                if (filteredImage) {
                    setImageToFilter(invertFilter, filteredImage);
                } else {
                    setImageToFilter(invertFilter, owner._originalImage);
                }

                const invertImg = invertFilter.valueForKey(kCIOutputImageKey);

                filteredImage = invertImg;

            } else if (filter.indexOf('sepia') > -1) {
                const sepia = parseFloat(value.replace('%', '')) / 100;
                if (types.isNullOrUndefined(sepiaFilter)) {
                    sepiaFilter = createFilterWithName('CISepiaTone');
                }
                if (filteredImage) {
                    setImageToFilter(sepiaFilter, filteredImage);
                } else {
                    setImageToFilter(sepiaFilter, owner._originalImage);
                }
                sepiaFilter.setValueForKey(sepia, kCIInputIntensityKey);
                const sepiaImg = sepiaFilter.valueForKey(kCIOutputImageKey);
                filteredImage = sepiaImg;

            }
        });
        if (!filteredImage) {
            if (owner._originalImage instanceof UIImage) {
                filteredImage = owner._originalImage.CIImage;
            }
        }
        owner._originalImage = null;
        return filteredImage;
    } else {
        return owner._originalImage;
    }
}

private _handleImage(view) {
    const texture = ImageCacheIt.reader.readProp(view.currentDrawable as any, 'texture', interop.types.id);
    if (!texture) return;
            let filteredImage: CIImage = this._initFilter();
            if (!filteredImage) return;
            if (filteredImage instanceof UIImage) {
                if (!filteredImage.CIImage) {
                    filteredImage = CIImage.imageWithCGImage(filteredImage.CGImage);
                } else {
                    filteredImage = filteredImage.CIImage;
                }
            }
            if (queue) {
                const buffer = ImageCacheIt.reader.readProp(queue as any, 'commandBuffer', interop.types.id); // queue.commandBuffer();
                const bounds = CGRectMake(0, 0, view.drawableSize.width, view.drawableSize.height);
                           let originX = filteredImage.extent.origin.x;
                           let originY = filteredImage.extent.origin.y;
                           let scaleX = view.drawableSize.width / filteredImage.extent.size.width;
                           let scaleY = view.drawableSize.height / filteredImage.extent.size.height;
                           let scale = Math.min(scaleX, scaleY);
                           let scaledImage = filteredImage
                               .imageByApplyingTransform(
                    CGAffineTransformMakeTranslation(-originX,
                    -originY))
                       .imageByApplyingTransform(CGAffineTransformMakeScale(scaleX, scaleY));

                ctx.renderToMTLTextureCommandBufferBoundsColorSpace(
                    scaledImage,
                    texture,
                    buffer,
                    bounds,
                    colorSpace
                );
                (buffer as NSObject).performSelectorWithObject('presentDrawable:', view.currentDrawable);
                (buffer as NSObject).performSelector('enqueue');
            }
}

  private _loadImage(src: any, view: MTKView) {
    const owner = this._owner ? this._owner.get() : null;
    console.log('view', view, 'src', src);
    if (types.isNullOrUndefined(owner)) return;
    if (!types.isNullOrUndefined(src)) {
        if (types.isString(src) && src.startsWith('http')) {
            owner.isLoading = true;
            const context = {};
            const manager = SDWebImageManager.sharedManager;
            if (manager) {
                    const url = <any>NSURL.alloc().initWithString(src);
                   manager.loadImageWithURLOptionsContextProgressCompleted(url, 0, context, (receivedSize: number, expectedSize: number, path: NSURL) => {
                    }, (image: UIImage, data, error, type, finished, completedUrl) => {
                        if (image === null && error !== null && data === null) {
                           // Render error Image
                        } else if (finished && completedUrl != null) {
                            owner._originalImage =  image && image.CIImage ? image.CIImage :  CIImage.imageWithCGImage(image.CGImage);
                            this._handleImage(view);
                        } else {
                            // Render error Image
                            //  const source = imageSrc.fromFileOrResource(this.errorHolder);
                            // this.nativeView.image = source ? source.ios : null;
                            // this.setAspect(this.stretch);
                        }
                    });
            } else {
               // Render error Image
            }
        } else if (
            types.isString(src) &&
            (src.startsWith('/') || src.startsWith('file'))
        ) {
            let url;
            if (src.startsWith('file')) {
                url = NSURL.URLWithString(src);
            } else {
                url = NSURL.fileURLWithPath(src);
            }
            owner._originalImage =   CIImage.imageWithContentsOfURL(url);
            this._handleImage(view);
            // this.nativeView.image = source ? source.ios : null;
            // owner.setAspect(owner.stretch);
            // this._initFilter();
        } else if (
            types.isString(src) &&
            src.startsWith('~')
        ) {
            const path = fs.knownFolders.currentApp().path;
            const file = fs.path.join(path, src.replace('~', ''));

            // this.nativeView.image = source ? source.ios : null;
            // this.setAspect(this.stretch);
            // this._initFilter();

            owner._originalImage = CIImage.imageWithContentsOfURL(
                NSURL.fileURLWithPath(file)
            );
            this._handleImage(view);

        } else if (types.isString(src) && src.startsWith('res://')) {
            const image = UIImage.imageNamed(src.replace('res://', ''));
            if (image) {
                owner._originalImage = CIImage.imageWithCGImage(image.CGImage);
            }
            this._handleImage(view);
            // this.nativeView.image = UIImage.imageNamed(src.replace('res://', ''));
            // this.setAspect(this.stretch);
            // this._initFilter();
        } else if (types.isObject(src) && src.ios) {
            // this.nativeView.image = src.ios;
            // this.setAspect(this.stretch);
            // this._initFilter();
        } else if (types.isObject(src) && src instanceof UIImage) {
            // this.nativeView.image = src;
            // this.setAspect(this.src);
            // this._initFilter();
        }
    }
}

  drawInMTKView(view: MTKView): void {
    const owner = this._owner ? this._owner.get() : null;
    if (types.isNullOrUndefined(owner)) return;
    this._loadImage(owner.src, view);
  }

  mtkViewDrawableSizeWillChange(view: MTKView, size: CGSize): void {
      // NOOP
  }
}



class NativePropertyReader {
    private _invocationCache = new Map<string, NSInvocation>();

    private getInvocationObject(object: NSObject, selector: string, isMethod: boolean = false, argsCount: number = 0): NSInvocation {
        let invocation = this._invocationCache.get(selector);
        if (!invocation) {
            const sig = !isMethod ? object.methodSignatureForSelector(selector) : NSMethodSignature.signatureWithObjCTypes("v@:@");
            invocation =  NSInvocation.invocationWithMethodSignature(sig);
            invocation.selector = selector;
        }

        this._invocationCache[selector] = invocation;

        return invocation;
    }

    public readProp<T>(object: NSObject, prop: string, type: interop.Type<T>): T {
        const invocation = this.getInvocationObject(object, prop);
        invocation.invokeWithTarget(object);

        const ret = new interop.Reference<T>(type, new interop.Pointer());
        invocation.getReturnValue(ret);
        return ret.value;
    }

    public executeMethod<T>(object: any, method: string, args: any[] , type: interop.Type<T>): T {
        const count = Array.isArray(args) ? args.length : 0;
        const invocation = this.getInvocationObject(object, method, true, count);
        if (count === 1) { // TODO handle more args
            args.forEach((item, index) => {
                invocation.setArgumentAtIndex(new interop.Reference(interop.types.id, item), 2);
            });
        }
        invocation.invokeWithTarget(object);
        const ret = new interop.Reference<T>(type, new interop.Pointer());
        invocation.getReturnValue(ret);
        return ret.value;
    }
}


export class ImageCacheIt extends ImageCacheItBase {
    nativeView: MTKView;
    _originalImage: any;
    _imageLoaded: boolean;
    _filteredImage: any;
    private _delegate;
    public static reader = new NativePropertyReader();
    constructor() {
        super();
        if (types.isNullOrUndefined(device)) {
            device = MTLCreateSystemDefaultDevice();
            colorSpace = CGColorSpaceCreateDeviceRGB();
        }
        if (device  && types.isNullOrUndefined(ctx)) {
            ctx = CIContext.contextWithMTLDevice(device);
        }
        if (device && types.isNullOrUndefined(queue)) {
            queue =  ImageCacheIt.reader.readProp(device as any, 'newCommandQueue', interop.types.id);
        }
    }

    createNativeView() {
        const nativeView = MTKView.new();
        nativeView.autoresizingMask = UIViewAutoresizing.None; // .FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
        if (device) {
            nativeView.device = device;
        }
        nativeView.contentScaleFactor = UIScreen.mainScreen.nativeScale;
        nativeView.opaque = false;
        nativeView.paused = true;
        nativeView.enableSetNeedsDisplay = true;
        nativeView.contentMode = UIViewContentMode.ScaleAspectFit;
        nativeView.userInteractionEnabled = true;
        nativeView.clipsToBounds = true;
        ImageHandler.clearColorWithView(nativeView);
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
        this._delegate = MTKViewDelegateImpl.initWithOwner(new WeakRef(this));
        this.nativeView.delegate = this._delegate;
        if (this.src) {
            this.nativeView.setNeedsDisplay();
        }
    }

    [common.srcProperty.getDefault](): any {
        return undefined;
    }

    [common.srcProperty.setNative](src: any) {
       this.nativeView.setNeedsDisplay();
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
        if (this.src) {
            this.nativeView.setNeedsDisplay();
        }
    }

    public static getItem(src: string): Promise<string> {
        return new Promise<any>((resolve, reject) => {
            const manager = SDWebImageManager.sharedManager;
            if (manager) {
                if (src && src.indexOf('http') > -1) {
                    const url = <any>NSURL.alloc().initWithString(src);
                    manager.loadImageWithURLOptionsProgressCompleted(url, SDWebImageOptions.scaleDownLargeImages, (receivedSize: number, expectedSize: number, path: NSURL) => {
                    }, (image, data, error, type, finished, completedUrl) => {
                        if (image === null && error !== null && data === null) {
                            reject(error.localizedDescription);
                        } else if (finished && completedUrl != null) {
                            if (type === SDImageCacheType.disk) {
                                const key = manager.cacheKeyForURL(completedUrl);
                                const source = manager.imageCache.defaultCachePathForKey(key);
                                resolve(source);
                            } else {
                                const sharedCache = SDImageCache.sharedImageCache;
                                sharedCache.storeImageForKeyCompletion(image, completedUrl.absoluteString, () => {
                                    const key = manager.cacheKeyForURL(completedUrl);
                                    const source = manager.imageCache.defaultCachePathForKey(key);
                                    resolve(source);
                                });
                            }
                        } else {
                            reject();
                        }
                    });
                }
            } else {
                reject();
            }
        });
    }

    public static deleteItem(src: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const manager = SDWebImageManager.sharedManager;
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
            const manager = SDWebImageManager.sharedManager;
            if (manager) {
                if (src && src.indexOf('http') > -1) {
                    const nativeSrc = NSURL.alloc().initWithString(src);
                    manager.loadImageWithURLOptionsProgressCompleted(nativeSrc, SDWebImageOptions.scaleDownLargeImages, (receivedSize: number, expectedSize: number, path: NSURL) => {
                    }, (image, data, error, type, finished, completedUrl) => {
                        if (image === null && error !== null && data === null) {
                            reject(error.localizedDescription);
                        } else if (finished && completedUrl != null) {
                            if (type === SDImageCacheType.disk) {
                                const key = manager.cacheKeyForURL(completedUrl);
                                const source = manager.imageCache.defaultCachePathForKey(key);
                                resolve(source);
                            } else {
                                const sharedCache = SDImageCache.sharedImageCache;
                                sharedCache.storeImageForKeyCompletion(image, completedUrl.absoluteString, () => {
                                    const key = manager.cacheKeyForURL(completedUrl);
                                    const source = manager.imageCache.defaultCachePathForKey(key);
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
