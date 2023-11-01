import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ImageFileInfo } from '../image-file-info.interface';
import { environment } from 'src/environments/environment';

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

  copyButtonText = 'Copy Link'

  constructor(private cdr: ChangeDetectorRef) {
  }

  copyToClipboard() {
    const str = this.urlForMarkdown;
    const clipboardItem = new ClipboardItem({ 'text/plain': new Blob([str], { type: 'text/plain' })});

    // Use the Clipboard API to write the item to the clipboard
    navigator.clipboard.write([clipboardItem]).then(() => {
      this.copyButtonText = 'Copied to clipboard!'
      this.cdr.detectChanges();
    }).catch(err => {
      console.error('Could not copy text to clipboard', err);
    });
  }

  closeModal(): void {
      this.copyButtonText = 'Copy Link';
      this.cdr.detectChanges();
    this.openChange.emit(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const info = changes['fileInfo'];
    if (changes['fileInfo']) {
      this.urlForMarkdown = `![image](${environment.baseUrl}/images/${info.currentValue.id})`;
    }
  }
}
