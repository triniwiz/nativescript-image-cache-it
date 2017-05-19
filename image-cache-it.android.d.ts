import * as common from './image-cache-it.common';
export declare class ImageCacheIt extends common.ImageCacheIt {
    picasso: com.squareup.picasso.Picasso;
    private builder;
    constructor();
    readonly android: android.widget.ImageView;
    createNativeView(): androidwidgetImageView;
    initNativeView(): void;
    private getImage(src);
    clearItem(): void;
}
