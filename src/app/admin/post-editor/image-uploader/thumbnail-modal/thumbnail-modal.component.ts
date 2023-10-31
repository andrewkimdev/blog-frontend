import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-thumbnail-modal',
  templateUrl: './thumbnail-modal.component.html',
  styleUrls: ['./thumbnail-modal.component.scss']
})
export class ThumbnailModalComponent {
  @Input('thumbnailUrl')
  thumbnailUrl!: ArrayBuffer;

  @Input()
  open = false;

  @Output()
  openChange = new EventEmitter<boolean>();

  closeModal(): void {
    this.openChange.emit(false);
  }
}
