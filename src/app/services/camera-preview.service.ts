import { Injectable } from '@angular/core';
import { CameraPreview } from '@capacitor-community/camera-preview';
import { BehaviorSubject, Observable } from 'rxjs';
import { CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';

@Injectable({ providedIn: 'root' })
export class CameraPreviewService {
  private cameraState$ = new BehaviorSubject<boolean>(false);
  private readonly cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
    quality: 50,
  };
  private _picture: string = '';

  getCameraState(): Observable<boolean> {
    return this.cameraState$.asObservable();
  }

  start(): void {
    CameraPreview.start({ parent: 'cameraPreview', toBack: true });
    this.cameraState$.next(true);
  }

  stop(): void {
    CameraPreview.stop();
    this.cameraState$.next(false);
  }

  async takePhoto(): Promise<string> {
    const picture = await CameraPreview.capture(
      this.cameraPreviewPictureOptions
    );

    this._picture = `data:image/jpeg;base64,${picture.value}`;
    this.stop();
    return this._picture;
  }
}
