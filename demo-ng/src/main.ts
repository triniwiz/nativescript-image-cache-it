import { platformNativeScriptDynamic } from 'nativescript-angular/platform';

import { AppModule } from './app.module';
import { ImageCacheIt } from 'nativescript-image-cache-it';

platformNativeScriptDynamic().bootstrapModule(AppModule);
ImageCacheIt.enableAutoMM();

