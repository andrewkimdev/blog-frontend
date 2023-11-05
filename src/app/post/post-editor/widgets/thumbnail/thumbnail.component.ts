import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClarityIcons, timesCircleIcon } from '@cds/core/icon';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit {
  @Input('imageUrl')
  thumbnailUrl: string | ArrayBuffer | null = null;

  @Output()
  remove = new EventEmitter<void>();

  @Output()
  openModal = new EventEmitter<void>();

  triggerOpenModal() {
    this.openModal.emit();
  }

  ngOnInit() {
    ClarityIcons.addIcons(timesCircleIcon);
  }

  removeImage(): void {
    this.remove.emit();
  }
}
