import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  triggerOpenModal() {
    this.openModal.emit();
  }
  removeImage(): void {
    this.remove.emit();
  }
}
