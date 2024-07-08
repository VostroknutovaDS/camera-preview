import { Injectable } from '@angular/core';
import { CameraPreview } from '@capacitor-community/camera-preview';
import { BehaviorSubject, Observable } from 'rxjs';
import { CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';

@Injectable({ providedIn: 'root' })
export class CameraPreviewService {
  private cameraState$ = new BehaviorSubject<boolean>(false);
  private cameraPreviewState$ = new BehaviorSubject<boolean>(false);
  private picture$ = new BehaviorSubject<string>('');
  private readonly cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
    quality: 50,
  };

  getCameraState(): Observable<boolean> {
    return this.cameraState$.asObservable();
  }

  getPreviewCameraState(): Observable<boolean> {
    return this.cameraPreviewState$.asObservable();
  }

  getPicture(): Observable<string> {
    return this.picture$.asObservable();
  }

  start(): void {
    this.cameraPreviewState$.next(true);
    CameraPreview.start({ parent: 'cameraPreview', toBack: true });
    this.cameraState$.next(true);
  }

  stop(): void {
    this.cameraPreviewState$.next(false);
    CameraPreview.stop();
    this.cameraState$.next(false);
  }

  async takePhoto(): Promise<string> {
    let picture = (
      await CameraPreview.capture(this.cameraPreviewPictureOptions)
    ).value;

    picture = `data:image/jpeg;base64,${picture}`;
    this.picture$.next(picture);
    this.stop();
    return picture;
  }
}
