import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs';

import { ClarityIcons, uploadCloudIcon } from '@cds/core/icon';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input('postId')
  postId: number | null = null;

  selectedFile!: File;
  isDragOver: boolean = false;

  thumbnailUrl: string | ArrayBuffer | null = null;

  showEnlarged: boolean = false;
  cursorX: number = 0;
  cursorY: number = 0;

  constructor(
    private uploadService: UploadService,
    private cdr: ChangeDetectorRef,
  ) {}

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
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadFile(this.postId, this.selectedFile);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    const files = event.dataTransfer?.files;
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

  // Enlarged Thumbnail-related
  // Function to track cursor position
  trackCursor(event: MouseEvent) {
    const offsetWidth = 150;
    const offsetHeight = 150;

    this.cursorX = event.clientX - offsetWidth;
    this.cursorY = event.clientY - offsetHeight;
    this.showEnlarged = true;
  }

  // Function to hide the enlarged thumbnail
  hideEnlargedThumbnail() {
    this.showEnlarged = false;
  }
}
