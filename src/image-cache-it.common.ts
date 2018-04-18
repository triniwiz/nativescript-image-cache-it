import { Property, View } from 'tns-core-modules/ui/core/view';
import { Stretch } from 'tns-core-modules/ui/enums';

export const imageUriProperty = new Property<ImageCacheItBase, string>({
    name: 'imageUri'
});
export const placeHolderProperty = new Property<ImageCacheItBase, string>({
    name: 'placeHolder'
});
export const errorHolderProperty = new Property<ImageCacheItBase, string>({
    name: 'errorHolder'
});
export const resizeProperty = new Property<ImageCacheItBase, string>({
    name: 'resize'
});
export const stretchProperty = new Property<ImageCacheItBase, Stretch>({
    name: 'stretch'
});

export class ImageCacheItBase extends View {
    constructor() {
        super();
    }

    public imageUri: string;
    public placeHolder: string;
    public errorHolder: string;
    public resize: string;
    public stretch: Stretch;
}

export type Stretch = 'none' | 'fill' | 'aspectFill' | 'aspectFit';
imageUriProperty.register(ImageCacheItBase);
placeHolderProperty.register(ImageCacheItBase);
errorHolderProperty.register(ImageCacheItBase);
resizeProperty.register(ImageCacheItBase);
stretchProperty.register(ImageCacheItBase);
