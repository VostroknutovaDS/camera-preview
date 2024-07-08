import { Component } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { CameraPreviewComponent } from '../components/camera-preview/camera-preview.component';
import { CameraPreviewService } from '../services/camera-preview.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PhotoPreviewComponent } from '../components/photo-preview/photo-preview.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    CameraPreviewComponent,
    AsyncPipe,
    PhotoPreviewComponent,
  ],
})
export class HomePage {
  pictureSource: Observable<string>;
  isPreviewOpened$: Observable<boolean>;

  constructor(private _cameraPreviewService: CameraPreviewService) {
    this.isPreviewOpened$ = this._cameraPreviewService.getPreviewCameraState();
    this.pictureSource = this._cameraPreviewService.getPicture();
  }

  openCamera(): void {
    this._cameraPreviewService.start();
  }
}
