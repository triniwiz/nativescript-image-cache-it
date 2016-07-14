import common = require('./image-cache-it.common');
export declare class ImageCacheIt extends common.ImageCacheIt {
    constructor();
    imageUri: string;
    placeHolder: string;
    errorHolder: string;
    resize: string;
    override: string;
    centerCrop: boolean;
    stretch: string;
    clearItem();
}