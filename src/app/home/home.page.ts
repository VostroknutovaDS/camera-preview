import { Component } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { CameraPreviewComponent } from '../components/camera-preview/camera-preview.component';
import { CameraPreviewService } from '../services/camera-preview.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, CameraPreviewComponent, AsyncPipe],
})
export class HomePage {
  cameraState$: Observable<boolean>;

  constructor(private _cameraPreviewService: CameraPreviewService) {
    this.cameraState$ = _cameraPreviewService.getCameraState();
  }

  openCamera(): void {
    this._cameraPreviewService.start();
  }
}
