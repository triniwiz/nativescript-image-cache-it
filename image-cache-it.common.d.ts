import { View, Property } from 'tns-core-modules/ui/core/view';
export declare const imageUriProperty: Property<ImageCacheIt, string>;
export declare const placeHolderProperty: Property<ImageCacheIt, string>;
export declare const errorHolderProperty: Property<ImageCacheIt, string>;
export declare const resizeProperty: Property<ImageCacheIt, string>;
export declare const overrideProperty: Property<ImageCacheIt, string>;
export declare const centerCropProperty: Property<ImageCacheIt, boolean>;
export declare const stretchProperty: Property<ImageCacheIt, "none" | "aspectFill" | "aspectFit" | "fill">;
export declare class ImageCacheIt extends View {
    constructor();
    imageUri: string;
    placeHolder: string;
    errorHolder: string;
    resize: string;
    override: string;
    centerCrop: boolean;
    stretch: Stretch;
}
export declare type Stretch = 'none' | 'fill' | 'aspectFill' | 'aspectFit';
