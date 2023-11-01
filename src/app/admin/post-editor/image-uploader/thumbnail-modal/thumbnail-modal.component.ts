import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ImageFileInfo } from '../image-file-info.interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-thumbnail-modal',
  templateUrl: './thumbnail-modal.component.html',
  styleUrls: ['./thumbnail-modal.component.scss']
})
export class ThumbnailModalComponent implements OnChanges {
  @Input('imageFile')
  fileInfo!: ImageFileInfo;

  @Input()
  open = false;

  @Output()
  openChange = new EventEmitter<boolean>();

  urlForMarkdown = '';

  copyToClipboard() {
    const str = this.urlForMarkdown;
    const clipboardItem = new ClipboardItem({ 'text/plain': new Blob([str], { type: 'text/plain' })});

    // Use the Clipboard API to write the item to the clipboard
    navigator.clipboard.write([clipboardItem]).then(() => {
      console.log('Image url copied to clipboard!');
    }).catch(err => {
      console.error('Could not copy text to clipboard', err);
    });
  }

  closeModal(): void {
    this.openChange.emit(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const info = changes['fileInfo'];
    if (changes['fileInfo']) {
      this.urlForMarkdown = `![image](${environment.baseUrl}/images/${info.currentValue.id})`;
    }
  }
}
