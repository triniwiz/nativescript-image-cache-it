import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'image-component',
  templateUrl: './image.component.html'
})
export class ImageComponent {
    @Input() src: string | null;
    @Input() styling: string = '';
    @Input() width: number = 0;
    @Input() height: number = 0;
    @Input() stretch: string = 'none';
    @Input() errorHolder: string = '';
    @Input() placeHolder: string = '';
}
