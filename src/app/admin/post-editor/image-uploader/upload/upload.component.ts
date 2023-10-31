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
import { catchError, of, tap } from 'rxjs';

import { ClarityIcons, uploadCloudIcon } from '@cds/core/icon';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @Input('postId')
  postId: number | null = null;

  @Output('fileUpload')
  thumbnailUrl = new EventEmitter<ArrayBuffer>();

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

  private uploadFile(postId: number | null, selectedFile: File) {
    if (!postId || !selectedFile) {
      return;
    }
    this.uploadService.uploadImage(postId, selectedFile).pipe(
      tap((res) => console.log(res)),
      catchError((err) => {
        console.error('An error occurred', err);
        return of(null);
      })
    ).subscribe((res) => {
      console.log(res);

      // Create thumbnail after successful upload.
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result as ArrayBuffer;
        if (!!data) {
          this.thumbnailUrl.emit(data);
          this.cdr.detectChanges();
        }
      }
      reader.readAsDataURL(this.selectedFile);
    });
  }
}
