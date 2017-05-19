import {
    View,
    Property
} from 'tns-core-modules/ui/core/view';
import { Stretch } from 'tns-core-modules/ui/enums';
export const imageUriProperty = new Property<ImageCacheIt, string>({ name: 'imageUri' });
export const placeHolderProperty = new Property<ImageCacheIt, string>({ name: 'placeHolder' });
export const errorHolderProperty = new Property<ImageCacheIt, string>({ name: 'errorHolder' });
export const resizeProperty = new Property<ImageCacheIt, string>({ name: 'resize' });
export const overrideProperty = new Property<ImageCacheIt, string>({ name: 'override' });
export const centerCropProperty = new Property<ImageCacheIt, boolean>({ name: 'centerCrop', defaultValue: false });
export const stretchProperty = new Property<ImageCacheIt, Stretch>({ name: 'stretch' });

export class ImageCacheIt extends View {

    constructor() {
        super();
    }
    public imageUri: string;
    public placeHolder: string;
    public errorHolder: string;
    public resize: string;
    public override: string;
    public centerCrop: boolean;
    public stretch: Stretch;
}
export type Stretch = 'none' | 'fill' | 'aspectFill' | 'aspectFit';
imageUriProperty.register(ImageCacheIt);
placeHolderProperty.register(ImageCacheIt);
errorHolderProperty.register(ImageCacheIt);
resizeProperty.register(ImageCacheIt);
overrideProperty.register(ImageCacheIt);
centerCropProperty.register(ImageCacheIt);
stretchProperty.register(ImageCacheIt);
