import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { CameraPreviewService } from 'src/app/services/camera-preview.service';
import { closeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-camera-component',
  templateUrl: './camera-preview.component.html',
  styleUrl: './camera-preview.component.scss',
  standalone: true,
  imports: [IonIcon, IonButton, AsyncPipe],
})
export class CameraPreviewComponent {
  constructor(private _cameraPreviewService: CameraPreviewService) {
    addIcons({ closeOutline });
  }

  async photo(): Promise<void> {
    await this._cameraPreviewService.takePhoto();
  }

  stop() {
    this._cameraPreviewService.stop();
  }
}
