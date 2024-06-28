import { Injectable } from '@angular/core';
import { CameraPreview } from '@capacitor-community/camera-preview';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CameraPreviewService {
  private cameraState$ = new BehaviorSubject<boolean>(false);

  getCameraState(): Observable<boolean> {
    return this.cameraState$.asObservable();
  }

  start(): void {
    CameraPreview.start({ parent: 'cameraPreview' });
    this.cameraState$.next(true);
  }

  stop(): void {
    CameraPreview.stop();
    this.cameraState$.next(false);
  }
}
