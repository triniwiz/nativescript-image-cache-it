import view = require("ui/core/view");
import { Property } from "ui/core/dependency-observable";
export declare class ImageCacheIt extends view.View {
    private static imageUriProperty;
    private static placeHolderProperty;
    private static errorHolderProperty;
    private static resizeProperty;
    private static overrideProperty;
    private static centerCropProperty;
    static stretchProperty: Property;
    constructor();
    imageUri: string;
    placeHolder: string;
    errorHolder: string;
    resize: string;
    override: string;
    centerCrop: boolean;
    stretch: string;
}
