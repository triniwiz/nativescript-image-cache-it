import * as application from 'tns-core-modules/application';
import { ImageCacheIt } from 'nativescript-image-cache-it';

ImageCacheIt.enableAutoMM();
application.run({moduleName: 'main-page'});
