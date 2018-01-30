import * as common from './image-cache-it.common';
import * as app from 'tns-core-modules/application';
import * as fs from 'tns-core-modules/file-system';
import * as utils from 'tns-core-modules/utils/utils';
import * as types from 'tns-core-modules/utils/types';
import * as imageSrc from 'tns-core-modules/image-source';
import {
  View,
  layout,
  Length,
  PercentLength
} from 'tns-core-modules/ui/core/view';
import { ImageCacheItBase } from './image-cache-it.common';
global.moduleMerge(common, exports);
declare const jp;
const RoundedCornersTransformation =
  jp.wasabeef.picasso.transformations.RoundedCornersTransformation;
export class ImageCacheIt extends ImageCacheItBase {
  picasso: com.squareup.picasso.Picasso;
  private builder: com.squareup.picasso.RequestCreator;
  nativeView: org.nativescript.widgets.ImageView;
  constructor() {
    super();
  }

  public createNativeView() {
    this.picasso = (com as any).squareup.picasso.Picasso.get();
    return new android.widget.ImageView(this._context);
  }

  public initNativeView() {
    if (this.imageUri) {
      this.builder = this.picasso.load(this.getImage(this.imageUri));
    }
    if (this.stretch) {
      this.resetImage();
    }
    if (this.builder) {
      if (this.placeHolder) {
        this.builder.placeholder(
          imageSrc.fromFileOrResource(this.placeHolder).android
        );
      }
      if (this.errorHolder) {
        this.builder.error(
          imageSrc.fromFileOrResource(this.errorHolder).android
        );
      }
      if (
        this.resize &&
        this.resize !== undefined &&
        this.resize.split(',').length > 1
      ) {
        this.builder.resize(
          parseInt(this.resize.split(',')[0], 10),
          parseInt(this.resize.split(',')[1], 10)
        );
      }
      this.builder.into(this.nativeView);
    }
  }

  [common.imageUriProperty.getDefault](): any {
    return undefined;
  }
  [common.imageUriProperty.setNative](src: string) {
    this.builder = this.picasso.load(this.getImage(this.imageUri));

    if (!this.builder) {
      return src;
    }
    if (this.stretch) {
      this.resetImage();
    }
    this.builder.into(this.nativeView);
    return src;
  }
  [common.resizeProperty.setNative](resize: string) {
    if (!this.builder) {
      return resize;
    }
    if (resize && resize !== undefined && resize.split(',').length > 1) {
      this.builder.resize(
        parseInt(resize.split(',')[0], 10),
        parseInt(resize.split(',')[1], 10)
      );
    }
    return resize;
  }

  private getImage(src: string): string {
    let nativeImage;
    if (src.substr(0, 1) === '/') {
      nativeImage = new java.io.File(nativeImage);
    } else if (src.startsWith('~/')) {
      nativeImage = new java.io.File(
        fs.path.join(fs.knownFolders.currentApp().path, src.replace('~/', ''))
      );
    } else if (src.startsWith('http')) {
      nativeImage = src;
    } else if (src.startsWith('res://')) {
      nativeImage = utils.ad.resources.getDrawableId(src.replace('res://', ''));
    }
    return nativeImage;
  }
  [common.stretchProperty.getDefault](): 'aspectFit' {
    return 'aspectFit';
  }
  [common.stretchProperty.setNative](
    value: 'none' | 'aspectFill' | 'aspectFit' | 'fill'
  ) {
    if (!this.builder) return value;
    this.resetImage(true);
    return value;
  }
  public clearItem() {}
  private setBorderAndRadius() {
    this.builder
      .transform(
        new RoundedCornersTransformation(
          layout.toDevicePixels(<any>this.borderTopLeftRadius),
          layout.toDevicePixels(<any>this.borderTopWidth),
          RoundedCornersTransformation.CornerType.TOP_LEFT
        )
      )
      .transform(
        new RoundedCornersTransformation(
          layout.toDevicePixels(<any>this.borderTopRightRadius),
          layout.toDevicePixels(<any>this.borderTopWidth),
          RoundedCornersTransformation.CornerType.TOP_RIGHT
        )
      )
      .transform(
        new RoundedCornersTransformation(
          layout.toDevicePixels(<any>this.borderBottomLeftRadius),
          layout.toDevicePixels(<any>this.borderBottomWidth),
          RoundedCornersTransformation.CornerType.BOTTOM_LEFT
        )
      )
      .transform(
        new RoundedCornersTransformation(
          layout.toDevicePixels(<any>this.borderBottomRightRadius),
          layout.toDevicePixels(<any>this.borderBottomWidth),
          RoundedCornersTransformation.CornerType.BOTTOM_RIGHT
        )
      );
  }
  private resetImage(reload = false) {
    switch (this.stretch) {
      case 'aspectFit':
        this.builder = this.picasso.load(this.getImage(this.imageUri));
        this.setBorderAndRadius();
        this.builder.centerInside();
        if (reload) {
          this.builder.into(this.nativeView);
        }
        break;
      case 'aspectFill':
        this.builder = this.picasso.load(this.getImage(this.imageUri));
        this.setBorderAndRadius();
        this.builder.centerCrop();
        if (reload) {
          this.builder.into(this.nativeView);
        }
        break;
      case 'fill':
        this.builder = this.picasso.load(this.getImage(this.imageUri));
        this.setBorderAndRadius();
        this.builder.fit();
        if (reload) {
          this.builder.into(this.nativeView);
        }
        break;
      case 'none':
      default:
        this.builder = this.picasso.load(this.getImage(this.imageUri));
        this.setBorderAndRadius();
        if (reload) {
          this.builder.into(this.nativeView);
        }
        break;
    }
  }
}

enum CornerType {
  ALL = 'all',
  TOP_LEFT = 'top_left',
  TOP_RIGHT = 'top_right',
  BOTTOM_LEFT = 'bottom_left',
  BOTTOM_RIGHT = 'bottom_right',
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  OTHER_TOP_LEFT = 'other_top_left',
  OTHER_TOP_RIGHT = 'other_top_right',
  OTHER_BOTTOM_LEFT = 'other_bottom_left',
  OTHER_BOTTOM_RIGHT = 'other_bottom_right',
  DIAGONAL_FROM_TOP_LEFT = 'diagonal_from_top_left',
  DIAGONAL_FROM_TOP_RIGHT = 'diagonal_from_top_right'
}

/*
class RoundedCornersTransformation extends java.lang.Object
  implements com.squareup.picasso.Transformation {
  private mRadius: number;
  private mDiameter: number;
  private mMargin: number;
  private mCornerType: CornerType;

  constructor(
    radius: number,
    margin: number,
    cornerType: CornerType = CornerType.ALL
  ) {
    super();
    this.mRadius = radius;
    this.mDiameter = radius * 2;
    this.mMargin = margin;
    this.mCornerType = cornerType;
    return global.__native(this);
  }

  public transform(source: android.graphics.Bitmap) {
    const width = source.getWidth();
    const height = source.getHeight();

    const bitmap = android.graphics.Bitmap.createBitmap(
      width,
      height,
      android.graphics.Bitmap.Config.ARGB_8888
    );

    const canvas = new android.graphics.Canvas(bitmap);
    const paint = new android.graphics.Paint();
    paint.setAntiAlias(true);
    paint.setShader(
      new android.graphics.BitmapShader(
        source,
        android.graphics.Shader.TileMode.CLAMP,
        android.graphics.Shader.TileMode.CLAMP
      )
    );
    this.drawRoundRect(canvas, paint, width, height);
    source.recycle();

    return bitmap;
  }

  private drawRoundRect(
    canvas: android.graphics.Canvas,
    paint: android.graphics.Paint,
    width: number,
    height: number
  ) {
    const right = width - this.mMargin;
    const bottom = height - this.mMargin;

    switch (this.mCornerType) {
      case CornerType.ALL:
        canvas.drawRoundRect(
          new android.graphics.RectF(this.mMargin, this.mMargin, right, bottom),
          this.mRadius,
          this.mRadius,
          paint
        );
        break;
      case CornerType.TOP_LEFT:
        this.drawTopLeftRoundRect(canvas, paint, right, bottom);
        break;
      case CornerType.TOP_RIGHT:
        this.drawTopRightRoundRect(canvas, paint, right, bottom);
        break;
      case CornerType.BOTTOM_LEFT:
        this.drawBottomLeftRoundRect(canvas, paint, right, bottom);
        break;
      case CornerType.BOTTOM_RIGHT:
        this.drawBottomRightRoundRect(canvas, paint, right, bottom);
        break;
      case CornerType.TOP:
        this.drawTopRoundRect(canvas, paint, right, bottom);
        break;
      case CornerType.BOTTOM:
        this.drawBottomRoundRect(canvas, paint, right, bottom);
        break;
      case CornerType.LEFT:
        this.drawLeftRoundRect(canvas, paint, right, bottom);
        break;
      case CornerType.RIGHT:
        this.drawRightRoundRect(canvas, paint, right, bottom);
        break;
      case CornerType.OTHER_TOP_LEFT:
        this.drawOtherTopLeftRoundRect(canvas, paint, right, bottom);
        break;
      case CornerType.OTHER_TOP_RIGHT:
        this.drawOtherTopRightRoundRect(canvas, paint, right, bottom);
        break;
      case CornerType.OTHER_BOTTOM_LEFT:
        this.drawOtherBottomLeftRoundRect(canvas, paint, right, bottom);
        break;
      case CornerType.OTHER_BOTTOM_RIGHT:
        this.drawOtherBottomRightRoundRect(canvas, paint, right, bottom);
        break;
      case CornerType.DIAGONAL_FROM_TOP_LEFT:
        this.drawDiagonalFromTopLeftRoundRect(canvas, paint, right, bottom);
        break;
      case CornerType.DIAGONAL_FROM_TOP_RIGHT:
        this.drawDiagonalFromTopRightRoundRect(canvas, paint, right, bottom);
        break;
      default:
        canvas.drawRoundRect(
          new android.graphics.RectF(this.mMargin, this.mMargin, right, bottom),
          this.mRadius,
          this.mRadius,
          paint
        );
        break;
    }
  }

  private drawTopLeftRoundRect(
    canvas: android.graphics.Canvas,
    paint: android.graphics.Paint,
    right: number,
    bottom: number
  ) {
    canvas.drawRoundRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin,
        this.mMargin + this.mDiameter,
        this.mMargin + this.mDiameter
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin + this.mRadius,
        this.mMargin + this.mRadius,
        bottom
      ),
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin + this.mRadius,
        this.mMargin,
        right,
        bottom
      ),
      paint
    );
  }

  private drawTopRightRoundRect(
    canvas: android.graphics.Canvas,
    paint: android.graphics.Paint,
    right: number,
    bottom: number
  ) {
    canvas.drawRoundRect(
      new android.graphics.RectF(
        right - this.mDiameter,
        this.mMargin,
        right,
        this.mMargin + this.mDiameter
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin,
        right - this.mRadius,
        bottom
      ),
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        right - this.mRadius,
        this.mMargin + this.mRadius,
        right,
        bottom
      ),
      paint
    );
  }

  private drawBottomLeftRoundRect(
    canvas: android.graphics.Canvas,
    paint: android.graphics.Paint,
    right: number,
    bottom: number
  ) {
    canvas.drawRoundRect(
      new android.graphics.RectF(
        this.mMargin,
        bottom - this.mDiameter,
        this.mMargin + this.mDiameter,
        bottom
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin,
        this.mMargin + this.mDiameter,
        bottom - this.mRadius
      ),
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin + this.mRadius,
        this.mMargin,
        right,
        bottom
      ),
      paint
    );
  }

  private drawBottomRightRoundRect(
    canvas: android.graphics.Canvas,
    paint: android.graphics.Paint,
    right: number,
    bottom: number
  ) {
    canvas.drawRoundRect(
      new android.graphics.RectF(
        right - this.mDiameter,
        bottom - this.mDiameter,
        right,
        bottom
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin,
        right - this.mRadius,
        bottom
      ),
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        right - this.mRadius,
        this.mMargin,
        right,
        bottom - this.mRadius
      ),
      paint
    );
  }

  private drawTopRoundRect(
    canvas: android.graphics.Canvas,
    paint: android.graphics.Paint,
    right: number,
    bottom: number
  ) {
    canvas.drawRoundRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin,
        right,
        this.mMargin + this.mDiameter
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin + this.mRadius,
        right,
        bottom
      ),
      paint
    );
  }

  private drawBottomRoundRect(
    canvas: android.graphics.Canvas,
    paint: android.graphics.Paint,
    right: number,
    bottom: number
  ) {
    canvas.drawRoundRect(
      new android.graphics.RectF(
        this.mMargin,
        bottom - this.mDiameter,
        right,
        bottom
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin,
        right,
        bottom - this.mRadius
      ),
      paint
    );
  }

  private drawLeftRoundRect(
    canvas: android.graphics.Canvas,
    paint: android.graphics.Paint,
    right: number,
    bottom: number
  ) {
    canvas.drawRoundRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin,
        this.mMargin + this.mDiameter,
        bottom
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin + this.mRadius,
        this.mMargin,
        right,
        bottom
      ),
      paint
    );
  }

  private drawRightRoundRect(
    canvas: android.graphics.Canvas,
    paint: android.graphics.Paint,
    right: number,
    bottom: number
  ) {
    canvas.drawRoundRect(
      new android.graphics.RectF(
        right - this.mDiameter,
        this.mMargin,
        right,
        bottom
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin,
        right - this.mRadius,
        bottom
      ),
      paint
    );
  }

  private drawOtherTopLeftRoundRect(
    canvas: android.graphics.Canvas,
    paint: android.graphics.Paint,
    right: number,
    bottom: number
  ) {
    canvas.drawRoundRect(
      new android.graphics.RectF(
        this.mMargin,
        bottom - this.mDiameter,
        right,
        bottom
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRoundRect(
      new android.graphics.RectF(
        right - this.mDiameter,
        this.mMargin,
        right,
        bottom
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin,
        right - this.mRadius,
        bottom - this.mRadius
      ),
      paint
    );
  }

  private drawOtherTopRightRoundRect(
    canvas: android.graphics.Canvas,
    paint: android.graphics.Paint,
    right: number,
    bottom: number
  ) {
    canvas.drawRoundRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin,
        this.mMargin + this.mDiameter,
        bottom
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRoundRect(
      new android.graphics.RectF(
        this.mMargin,
        bottom - this.mDiameter,
        right,
        bottom
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin + this.mRadius,
        this.mMargin,
        right,
        bottom - this.mRadius
      ),
      paint
    );
  }

  private drawOtherBottomLeftRoundRect(
    canvas: android.graphics.Canvas,
    paint: android.graphics.Paint,
    right: number,
    bottom: number
  ) {
    canvas.drawRoundRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin,
        right,
        this.mMargin + this.mDiameter
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRoundRect(
      new android.graphics.RectF(
        right - this.mDiameter,
        this.mMargin,
        right,
        bottom
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin + this.mRadius,
        right - this.mRadius,
        bottom
      ),
      paint
    );
  }

  private drawOtherBottomRightRoundRect(
    canvas: android.graphics.Canvas,
    paint: android.graphics.Paint,
    right: number,
    bottom: number
  ) {
    canvas.drawRoundRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin,
        right,
        this.mMargin + this.mDiameter
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRoundRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin,
        this.mMargin + this.mDiameter,
        bottom
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin + this.mRadius,
        this.mMargin + this.mRadius,
        right,
        bottom
      ),
      paint
    );
  }

  private drawDiagonalFromTopLeftRoundRect(
    canvas: android.graphics.Canvas,
    paint: android.graphics.Paint,
    right: number,
    bottom: number
  ) {
    canvas.drawRoundRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin,
        this.mMargin + this.mDiameter,
        this.mMargin + this.mDiameter
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRoundRect(
      new android.graphics.RectF(
        right - this.mDiameter,
        bottom - this.mDiameter,
        right,
        bottom
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin + this.mRadius,
        right - this.mDiameter,
        bottom
      ),
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin + this.mDiameter,
        this.mMargin,
        right,
        bottom - this.mRadius
      ),
      paint
    );
  }

  private drawDiagonalFromTopRightRoundRect(
    canvas: android.graphics.Canvas,
    paint: android.graphics.Paint,
    right: number,
    bottom: number
  ) {
    canvas.drawRoundRect(
      new android.graphics.RectF(
        right - this.mDiameter,
        this.mMargin,
        right,
        this.mMargin + this.mDiameter
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRoundRect(
      new android.graphics.RectF(
        this.mMargin,
        bottom - this.mDiameter,
        this.mMargin + this.mDiameter,
        bottom
      ),
      this.mRadius,
      this.mRadius,
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin,
        this.mMargin,
        right - this.mRadius,
        bottom - this.mRadius
      ),
      paint
    );
    canvas.drawRect(
      new android.graphics.RectF(
        this.mMargin + this.mRadius,
        this.mMargin + this.mRadius,
        right,
        bottom
      ),
      paint
    );
  }

  public key(): string {
    return (
      'RoundedTransformation(radius=' +
      this.mRadius +
      ', margin=' +
      this.mMargin +
      ', diameter=' +
      this.mDiameter +
      ', cornerType=' +
      this.mCornerType +
      ')'
    );
  }
}
*/
