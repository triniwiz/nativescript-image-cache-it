import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';

import { NSIMAGECACHEIT_DIRECTIVES } from './image-cache-it.directive';
import { ImageCacheIt } from '../';

@NgModule({
    declarations: [NSIMAGECACHEIT_DIRECTIVES],
    exports: [NSIMAGECACHEIT_DIRECTIVES],
})
export class TNSImageCacheItModule {
}

registerElement('ImageCacheIt', () => ImageCacheIt);
