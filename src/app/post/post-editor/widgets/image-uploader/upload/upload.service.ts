import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { FileUploadResponse } from '../file-upload-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(
    private http: HttpClient,
  ) { }

  uploadImage(selectedFile: File): Observable<FileUploadResponse> {
    const fd = new FormData();
    fd.append('image', selectedFile, encodeURIComponent(selectedFile.name));
    return this.http.post<FileUploadResponse>(`${environment.baseUrl}/image`, fd);
  }
}
