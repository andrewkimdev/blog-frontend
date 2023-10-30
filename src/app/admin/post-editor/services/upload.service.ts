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
    fd.append('image', selectedFile, selectedFile.name);

    this.http.post(`${environment.baseUrl}/posts/${postId}/image`, fd).subscribe((res) => {
      console.log(res);
    });
  }
}
