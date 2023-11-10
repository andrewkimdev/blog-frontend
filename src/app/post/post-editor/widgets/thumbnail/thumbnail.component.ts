import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ThumbnailDialogComponent } from '../thumbnail-dialog/thumbnail-dialog.component';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent {
  @Input('imageUrl')
  thumbnailUrl: string | ArrayBuffer | null = null;

  @Input('uuid')
  uuid: string | null = null;

  @Output()
  remove = new EventEmitter<void>();

  @Output()
  openModal = new EventEmitter<void>();

  constructor(
    public dialog: MatDialog,
  ) {
  }

  triggerOpenModal(event: MouseEvent) {
    event.stopPropagation();
    const data = {
      fileInfo: {
        id: this.uuid,
        imageUrl: this.thumbnailUrl
      },
    };

    this.dialog.open(ThumbnailDialogComponent, { width: 'lg', data });
  }

  removeImage(): void {
    this.remove.emit();
  }
}
