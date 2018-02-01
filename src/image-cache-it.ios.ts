import * as common from './image-cache-it.common';
import * as app from 'tns-core-modules/application';
import * as fs from 'tns-core-modules/file-system';
import * as utils from 'tns-core-modules/utils/utils';
import * as types from 'tns-core-modules/utils/types';
import * as imageSrc from 'tns-core-modules/image-source';
import { View, layout } from 'tns-core-modules/ui/core/view';
import { ImageCacheItBase } from './image-cache-it.common';
export class ImageCacheIt extends ImageCacheItBase {
  nativeView: UIImageView;

  constructor() {
    super();
    this.nativeView = UIImageView.new();
    this.nativeView.contentMode = UIViewContentMode.ScaleAspectFit;
    this.nativeView.clipsToBounds = true;
    /*
    TODO Loading Indicator

    (this.nativeView as any).sd_setShowActivityIndicatorView(true);
    (this.nativeView as any).sd_setIndicatorStyle(2);


    WhiteLarge = 0,

	White = 1,

	Gray = 2
    */
  }

  isLoading: boolean;

  public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number) {
    const nativeView = this.nativeView;
    if (nativeView) {
      const width = layout.getMeasureSpecSize(widthMeasureSpec);
      const height = layout.getMeasureSpecSize(heightMeasureSpec);
      this.setMeasuredDimension(width, height);
    }
  }

  public initNativeView() {
    if (this.imageUri && this.imageUri.startsWith('http')) {
      this.isLoading = true;
      (<any>this.nativeView).sd_setImageWithURLPlaceholderImageCompleted(
        this.imageUri,
        this.placeHolder
          ? imageSrc.fromFileOrResource(this.placeHolder).ios
          : null,
        () => {
          this.isLoading = false;
        }
      );
    } else if (this.imageUri) {
      const source = imageSrc.fromFileOrResource(this.imageUri);
      console.log(source);
      this.nativeView.image = source ? source.ios : null;
    }

    if (
      this.resize &&
      this.resize !== undefined &&
      this.resize.split(' ').length > 1
    ) {
      this.nativeView.frame.size.width = parseInt(this.resize.split(',')[0]);
      this.nativeView.frame.size.height = parseInt(this.resize.split(',')[1]);
    }
  }

  [common.imageUriProperty.getDefault](): any {
    return undefined;
  }
  [common.imageUriProperty.setNative](src: string) {
    if (!src) return src;
    if (src.startsWith('http')) {
      this.isLoading = true;
      (<any>this.nativeView).sd_setImageWithURLPlaceholderImageCompleted(
        src,
        this.placeHolder
          ? imageSrc.fromFileOrResource(this.placeHolder).ios
          : null,
        (p1: UIImage, p2: NSError, p3: SDImageCacheType, p4: NSURL) => {
          this.isLoading = false;
          if (p2 && this.errorHolder) {
            const source = imageSrc.fromFileOrResource(this.errorHolder);
            this.nativeView.image = source ? source.ios : null;
          }
        }
      );
    } else {
      const source = imageSrc.fromFileOrResource(src);
      this.nativeView.image = source ? source.ios : null;
    }

    return src;
  }
  [common.resizeProperty.setNative](resize: string) {
    if (!this.nativeView) return resize;
    if (
      this.resize &&
      this.resize !== undefined &&
      this.resize.split(',').length > 1
    ) {
      this.nativeView.frame.size.width = parseInt(this.resize.split(' ')[0]);
      this.nativeView.frame.size.height = parseInt(this.resize.split(' ')[1]);
    }
    return resize;
  }

  [common.stretchProperty.getDefault](): 'aspectFit' {
    return 'aspectFit';
  }
  [common.stretchProperty.setNative](
    value: 'none' | 'aspectFill' | 'aspectFit' | 'fill'
  ) {
    if (!this.nativeView) return value;
    switch (value) {
      case 'aspectFit':
        this.nativeView.contentMode = UIViewContentMode.ScaleAspectFit;
        break;
      case 'aspectFill':
        this.nativeView.contentMode = UIViewContentMode.ScaleAspectFill;
        break;
      case 'fill':
        this.nativeView.contentMode = UIViewContentMode.ScaleToFill;
        break;
      case 'none':
      default:
        this.nativeView.contentMode = UIViewContentMode.TopLeft;
        break;
    }
    return value;
  }

  public clearItem() {}
}
