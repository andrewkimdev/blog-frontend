import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { catchError, of, tap } from 'rxjs';

import { ClarityIcons, uploadCloudIcon } from '@cds/core/icon';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @Input('postId')
  postId: number | null = null;

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  selectedFile!: File;
  thumbnailUrl: string = '';

  isDragOver: boolean = false;
  isModalOpen: boolean = false;

  constructor(
    private uploadService: UploadService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    ClarityIcons.addIcons(uploadCloudIcon);
  }

  handleKeyOnModal(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.isModalOpen = false;
    }
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
        // @ts-ignore
        this.thumbnailUrl = event.target?.result;
        this.cdr.detectChanges();
      }
      reader.readAsDataURL(this.selectedFile);
    });
  }
}
