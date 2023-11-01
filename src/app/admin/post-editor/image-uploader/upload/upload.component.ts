import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import { ClarityIcons, uploadCloudIcon } from '@cds/core/icon';
import { UploadService } from './upload.service';

import { ImageFileInfo } from '../image-file-info.interface';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @Input('postId')
  postId: number | null = null;

  @Output('fileUpload')
  imageFile: EventEmitter<ImageFileInfo> = new EventEmitter<ImageFileInfo>();

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  selectedFile!: File;

  isDragOver: boolean = false;

  constructor(
    private uploadService: UploadService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    ClarityIcons.addIcons(uploadCloudIcon);
  }

  // File Upload - Drag-and-Drop
  onDragOver(event: Event) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: Event) {
    event.preventDefault();
    this.isDragOver = false;
  }

  // Upload component click
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.handleSelectedFiles(input.files);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    this.handleSelectedFiles(event.dataTransfer?.files);
  }

  private handleSelectedFiles(files?: FileList | null) {
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this.uploadFile(this.postId, this.selectedFile);
    }
  }

  private handleUploadError(err: any): Observable<null> {
    console.error('An error occurred', err);
    // TODO: handle error for server down. Use Retry.
    return of(null);
  }

  private createThumbnailAndEmit(id: string, postId: number, selectedFile: File): void {
    const reader = new FileReader();
    reader.onload = (event) => {
      const thumbnailUrl = event.target?.result as ArrayBuffer;
      if (thumbnailUrl && id) {
        const imageFileInfo: ImageFileInfo = { id, postId, imageUrl: thumbnailUrl };
        this.imageFile.emit(imageFileInfo);
        this.cdr.detectChanges();
      }
    };
    reader.readAsDataURL(selectedFile);
  }

  private uploadFile(postId: number | null, selectedFile: File): void {
    if (!postId || !selectedFile) {
      return;
    }

    this.uploadService.uploadImage(postId, selectedFile).pipe(
      tap((res) => console.log(res)),
      catchError(this.handleUploadError)
    ).subscribe((res) => {
      if (res?.id) {
        this.createThumbnailAndEmit(res.id, postId, selectedFile);
      }
    });
  }

}
