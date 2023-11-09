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

  constructor(public dialog: MatDialog) {}

  triggerOpenModal() {
    console.log(this.thumbnailUrl)
    const dialogRef = this.dialog.open(ThumbnailDialogComponent, {
      width: 'lg',
      data: { fileInfo: { id: this.uuid, imageUrl: this.thumbnailUrl } }
    });

    console.log(this.uuid);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }
  removeImage(): void {
    this.remove.emit();
  }
}
