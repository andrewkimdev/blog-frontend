import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent {
  @Input('imageUrl')
  thumbnailUrl: string | ArrayBuffer | null = null;

  @Input('open')
  isModalOpen: boolean = false;
  showEnlarged: boolean = false;

  cursorX: number = 0;
  cursorY: number = 0;

  openModal() {
    this.isModalOpen = true;
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
