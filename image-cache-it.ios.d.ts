import * as common from './image-cache-it.common';
export declare class ImageCacheIt extends common.ImageCacheIt {
    nativeView: UIImageView;
    constructor();
    readonly ios: UIImageView;
    isLoading: boolean;
    onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void;
    createNativeView(): UIImageView;
    initNativeView(): void;
    clearItem(): void;
}
