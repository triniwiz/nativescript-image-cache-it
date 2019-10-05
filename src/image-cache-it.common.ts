import { CssProperty, Property, Style, View } from 'tns-core-modules/ui/core/view';
import { Stretch } from 'tns-core-modules/ui/enums';

export enum Transition {
    Fade = 'fade',
    None = 'none'
}

export const srcProperty = new Property<ImageCacheItBase, any>({
    name: 'src'
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
export const decodedWidthProperty = new Property<ImageCacheItBase, number>({
    name: 'decodedWidth'
});
export const decodedHeightProperty = new Property<ImageCacheItBase, number>({
    name: 'decodedHeight'
});
export const filterProperty = new CssProperty<Style, any>({
    name: 'filter',
    cssName: 'filter'
});

export const transitionProperty = new Property<ImageCacheItBase, Transition>({
    name: 'transition',
    defaultValue: Transition.None
});

export class ImageCacheItBase extends View {
    public src: any;
    public placeHolder: any;
    public errorHolder: any;
    public resize: string;
    public stretch: Stretch;
    public decodedHeight: number;
    public decodedWidth: number;
    public filter: any;
    public transition: Transition;
}

export type Stretch = 'none' | 'fill' | 'aspectFill' | 'aspectFit';
srcProperty.register(ImageCacheItBase);
placeHolderProperty.register(ImageCacheItBase);
errorHolderProperty.register(ImageCacheItBase);
resizeProperty.register(ImageCacheItBase);
stretchProperty.register(ImageCacheItBase);
decodedHeightProperty.register(ImageCacheItBase);
decodedWidthProperty.register(ImageCacheItBase);
filterProperty.register(Style);
transitionProperty.register(ImageCacheItBase);
