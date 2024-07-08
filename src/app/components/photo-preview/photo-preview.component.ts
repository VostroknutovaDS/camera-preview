import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo-preview',
  template: '<img [src]="src" />',
  standalone: true,
})
export class PhotoPreviewComponent {
  @Input() src: string = '';
}
