import { ImageCacheItBase } from './image-cache-it.common';

export declare class ImageCacheIt extends ImageCacheItBase {
    public static getItem(src: string): Promise<string>;

    public static fetchItem(src: string): Promise<any>;

    public static deleteItem(src: string): Promise<any>;
}
