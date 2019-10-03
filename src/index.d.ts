import { ImageCacheItBase } from './image-cache-it.common';

export declare class ImageCacheIt extends ImageCacheItBase {
    public static getItem(src: string): Promise<string>;

    public static hasItem(src: string): Promise<any>;

    public static clear(src: string): Promise<any>;
}
