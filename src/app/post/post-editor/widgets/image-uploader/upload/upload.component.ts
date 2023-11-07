// Angular Core Modules
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

// 3rd Party Vendor Modules
import { Store } from '@ngrx/store';

// Custom Data Definitions
import { ImageFileInfo } from '../image-file-info.interface';
import { FileUploadResponse } from '../file-upload-response.interface';

// Application Services
import { UploadService } from './upload.service';

// State Management
import * as PostEditorAction from '../../../store/post-editor.action';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  @Input('postId')
  postId: number | null = null;

  @Output('fileUpload')
  imageFile: EventEmitter<ImageFileInfo> = new EventEmitter<ImageFileInfo>();

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  selectedFile!: File;

  isDragOver: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store,
    private uploadService: UploadService,
  ) {
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
      this.uploadFile(this.selectedFile);
    }
  }

  private handleUploadError(err: any): Observable<null> {
    console.error('An error occurred', err);
    // TODO: handle error for server down. Use Retry.
    return of(null);
  }

  private createThumbnailAndEmit(id: string, selectedFile: File): void {
    const reader = new FileReader();
    reader.onload = (event) => {
      const thumbnailUrl = event.target?.result as ArrayBuffer;
      if (thumbnailUrl && id) {
        const imageFileInfo: ImageFileInfo = { id, imageUrl: thumbnailUrl };
        this.imageFile.emit(imageFileInfo);
        this.store.dispatch(PostEditorAction.addImage({ imageId: id }));
        this.cdr.detectChanges();
      }
    };
    reader.readAsDataURL(selectedFile);
  }

  private uploadFile(selectedFile: File): void {
    if (!selectedFile) {
      return;
    }

    this.uploadService.uploadImage(selectedFile).pipe(
      tap((res) => console.log(res)),
      catchError(this.handleUploadError)
    ).subscribe((res: FileUploadResponse | null) => {
      if (res?.id) {
        this.createThumbnailAndEmit(res.id, selectedFile);
      }
    });
  }
}
