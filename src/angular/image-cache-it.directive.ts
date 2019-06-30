import { Directive } from '@angular/core';

@Directive({
    selector: 'ImageCacheIt'
})
export class ImageCacheItDirective {
    constructor() {
    }
}

export const NSIMAGECACHEIT_DIRECTIVES = [ImageCacheItDirective];
