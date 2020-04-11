import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ImageCacheIt } from 'nativescript-image-cache-it';

@Component({
  moduleId: module.id,
  selector: 'image-component',
  templateUrl: './image.component.html'
})
export class ImageComponent {
  /** Accepts string or binary. */
  @Input() src: any;
  @Input() styling: string = '';
  @Input() width: number = 0;
  @Input() height: number = 0;
  @Input() stretch: string = 'none';

  /** Broken link? Example: res://error_holder */
  @Input() errorHolder: string = '';

  /** Loading.. Example: res://place_holder */
  @Input() placeHolder: string = '';

  /** ? */
  @Input() fallback: string = '';
}
