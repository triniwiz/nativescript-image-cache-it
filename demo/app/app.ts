import * as application from '@nativescript/core/application';
import { ImageCacheIt } from 'nativescript-image-cache-it';

ImageCacheIt.enableAutoMM();
application.run({moduleName: 'main-page'});
