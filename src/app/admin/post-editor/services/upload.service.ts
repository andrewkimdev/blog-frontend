import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) { }

  uploadImage(postId: number, selectedFile: File) {
    const fd = new FormData();
    fd.append('image', selectedFile, encodeURIComponent(selectedFile.name));
    console.log(`uploaded file name: ${selectedFile.name}`);

    return this.http.post(`${environment.baseUrl}/posts/${postId}/image`, fd);
  }
}
